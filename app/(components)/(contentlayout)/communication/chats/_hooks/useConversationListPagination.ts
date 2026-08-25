import { useCallback, useEffect, useRef, useState } from "react";
import { listConversations, type Conversation } from "@/shared/lib/api/chat";

export const CONVERSATIONS_PAGE_LIMIT = 50;

export type ConversationListType = "direct" | "group" | undefined;

type FetchMode = "initial" | "more" | "refresh";

const getConversationId = (conversation: Conversation) =>
  String((conversation as { id?: string }).id || (conversation as { _id?: string })._id || "");

function hasMorePages(page: number, totalPages: number) {
  return page < totalPages;
}

export function useConversationListPagination(type?: ConversationListType, enabled = true) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(enabled);
  const [loadingMore, setLoadingMore] = useState(false);

  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);
  const loadingRef = useRef(false);
  const loadingMoreRef = useRef(false);
  const fetchSeqRef = useRef(0);

  const hasMore = page < totalPages;

  const fetchPage = useCallback(
    async (targetPage: number, mode: FetchMode) => {
      if (!enabled) return;

      if (mode === "more") {
        if (loadingMoreRef.current || loadingRef.current || !hasMorePages(pageRef.current, totalPagesRef.current)) {
          return;
        }
        loadingMoreRef.current = true;
        setLoadingMore(true);
      } else {
        if (loadingRef.current) return;
        loadingRef.current = true;
        if (mode === "initial") setLoading(true);
      }

      const seq = ++fetchSeqRef.current;
      try {
        const res = await listConversations({
          page: targetPage,
          limit: CONVERSATIONS_PAGE_LIMIT,
          ...(type ? { type } : {}),
        });
        if (seq !== fetchSeqRef.current) return;

        const next = res.results || [];
        const nextPage = res.page ?? targetPage;
        const nextTotalPages = res.totalPages ?? 1;
        const nextTotal = res.total ?? 0;

        pageRef.current = nextPage;
        totalPagesRef.current = nextTotalPages;
        setPage(nextPage);
        setTotalPages(nextTotalPages);
        setTotal(nextTotal);

        if (mode === "more") {
          setConversations((prev) => {
            const seen = new Set(prev.map(getConversationId));
            const merged = [...prev];
            for (const item of next) {
              const id = getConversationId(item);
              if (!id || seen.has(id)) continue;
              seen.add(id);
              merged.push(item);
            }
            return merged;
          });
        } else {
          setConversations(next);
        }
      } catch {
        if (mode !== "more") {
          setConversations([]);
          setPage(1);
          setTotalPages(1);
          setTotal(0);
          pageRef.current = 1;
          totalPagesRef.current = 1;
        }
      } finally {
        // ponytail: each call releases only the flag it set — never gate this on
        // seq, or a stale (superseded) call leaves loadingMore/loading stuck true.
        if (mode === "more") {
          loadingMoreRef.current = false;
          setLoadingMore(false);
        } else {
          loadingRef.current = false;
          setLoading(false);
        }
      }
    },
    [enabled, type]
  );

  const loadMore = useCallback(async () => {
    await fetchPage(pageRef.current + 1, "more");
  }, [fetchPage]);

  const refresh = useCallback(async () => {
    pageRef.current = 1;
    totalPagesRef.current = 1;
    await fetchPage(1, "refresh");
  }, [fetchPage]);

  const resetAndLoad = useCallback(async () => {
    pageRef.current = 1;
    totalPagesRef.current = 1;
    setConversations([]);
    setPage(1);
    setTotalPages(1);
    setTotal(0);
    await fetchPage(1, "initial");
  }, [fetchPage]);

  useEffect(() => {
    if (!enabled) return;
    pageRef.current = 1;
    totalPagesRef.current = 1;
    setConversations([]);
    setPage(1);
    setTotalPages(1);
    setTotal(0);
    void fetchPage(1, "initial");
  }, [enabled, type, fetchPage]);

  return {
    conversations,
    setConversations,
    page,
    totalPages,
    total,
    loading,
    loadingMore,
    hasMore,
    loadMore,
    refresh,
    resetAndLoad,
  };
}
