// ponytail: SharedWorker holds ONE SSE connection per browser origin (not per tab).
// Browsers cap concurrent HTTP/1.1 connections per origin at 6; N tabs each opening
// their own SSE stream exhausts that pool and later tabs hang on page load.
// Fallback (Safari, no SharedWorker support) lives in NotificationContext.tsx.

/** @type {Set<MessagePort>} ports whose tab is currently logged in and wants notifications */
const activePorts = new Set();

let controller = null;
let connected = false;
let retries = 0;
let reconnectTimer = null;
let sseUrl = null;
// userId the CURRENTLY OPEN stream is authenticated as. The backend binds an SSE
// connection to req.user once at connect and never re-checks it — so if a differently
// -authenticated tab (e.g. after impersonation swap) attaches without this check, it
// silently receives another user's notifications for the life of the connection.
let sseOwnerId = null;

function broadcast(msg) {
  for (const port of activePorts) {
    try {
      port.postMessage(msg);
    } catch (_) {
      // Best-effort only: MessagePort.postMessage does not throw for a port whose
      // document was closed via the tab's close button, so this rarely fires. Dead
      // ports are otherwise harmless — the browser tears down the whole worker (and
      // this Set) once the last real tab referencing it closes.
      activePorts.delete(port);
    }
  }
}

function setConnected(next) {
  if (connected === next) return;
  connected = next;
  broadcast({ type: "__status", connected });
}

function stopStream() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  controller?.abort();
  controller = null;
  sseOwnerId = null;
  setConnected(false);
}

function scheduleReconnect() {
  if (activePorts.size === 0) return;
  setConnected(false);
  const delay = Math.min(1000 * 2 ** retries, 30000);
  retries++;
  reconnectTimer = setTimeout(openStream, delay);
}

function openStream() {
  if (activePorts.size === 0 || !sseUrl) return;
  controller = new AbortController();
  const signal = controller.signal;

  fetch(sseUrl, { credentials: "include", signal })
    .then((res) => {
      if (!res.ok || !res.body) {
        scheduleReconnect();
        return;
      }
      retries = 0;
      setConnected(true);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      function read() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            scheduleReconnect();
            return;
          }
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";
          for (const chunk of lines) {
            if (!chunk.startsWith("data: ")) continue;
            try {
              broadcast(JSON.parse(chunk.slice(6)));
            } catch (_) {
              // skip non-JSON (e.g. heartbeat)
            }
          }
          return read();
        });
      }
      return read();
    })
    .catch((err) => {
      if (err?.name === "AbortError") return;
      scheduleReconnect();
    });
}

self.onconnect = (event) => {
  const port = event.ports[0];

  port.onmessage = (e) => {
    const msg = e.data || {};
    if (msg.type === "start") {
      sseUrl = msg.url;
      activePorts.add(port);

      // A live connection authenticated as a DIFFERENT user than this tab is attaching
      // as (e.g. impersonation swap in another tab) must not keep feeding its data here.
      // Force a reconnect so the stream re-reads whichever cookie is current now.
      if (controller && sseOwnerId && msg.userId && sseOwnerId !== msg.userId) {
        stopStream();
      }

      sseOwnerId = msg.userId ?? sseOwnerId;
      port.postMessage({ type: "__status", connected });
      if (!controller && !reconnectTimer) openStream();
    } else if (msg.type === "stop") {
      activePorts.delete(port);
      if (activePorts.size === 0) stopStream();
    }
  };

  port.start();
};
