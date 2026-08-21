export default function HelpAndSupportPage() {
  return (
    <div className="relative h-screen w-screen">
      <iframe
        src="https://support.theodin.ai/"
        title="Help & Support"
        allow="storage-access-by-user-activation"
        referrerPolicy="strict-origin-when-cross-origin"
        className="fixed inset-0 block h-screen w-screen border-0 m-0 p-0"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center p-3">
        <div className="pointer-events-auto rounded-md border border-white/20 bg-black/65 px-3 py-2 text-xs text-white shadow-lg backdrop-blur-sm">
          If login fails in this embedded view, open support directly:&nbsp;
          <a
            href="https://support.theodin.ai/login"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-300 underline decoration-cyan-300/70 underline-offset-2 hover:text-cyan-200"
          >
            Open support login
          </a>
        </div>
      </div>
    </div>
  );
}
