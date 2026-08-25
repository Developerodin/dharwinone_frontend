import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useConversationListPagination } from "./useConversationListPagination";

const listConversations = vi.fn();

vi.mock("@/shared/lib/api/chat", () => ({
  listConversations: (...args: unknown[]) => listConversations(...args),
}));

function makeConversation(id: string, type: "direct" | "group" = "direct") {
  return { id, type, name: type === "group" ? `Group ${id}` : undefined };
}

describe("useConversationListPagination", () => {
  beforeEach(() => {
    listConversations.mockReset();
  });

  it("fetches recent conversations page 1 on mount", async () => {
    listConversations.mockResolvedValueOnce({
      results: [makeConversation("c1")],
      page: 1,
      limit: 50,
      total: 1,
      totalPages: 1,
    });

    const { result } = renderHook(() => useConversationListPagination());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(listConversations).toHaveBeenCalledWith({ page: 1, limit: 50 });
    expect(result.current.conversations).toHaveLength(1);
  });

  it("requests page 2 on load more and appends results", async () => {
    listConversations
      .mockResolvedValueOnce({
        results: [makeConversation("c1")],
        page: 1,
        limit: 50,
        total: 2,
        totalPages: 2,
      })
      .mockResolvedValueOnce({
        results: [makeConversation("c2")],
        page: 2,
        limit: 50,
        total: 2,
        totalPages: 2,
      });

    const { result } = renderHook(() => useConversationListPagination());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.loadMore();
    });

    expect(listConversations).toHaveBeenLastCalledWith({ page: 2, limit: 50 });
    expect(result.current.conversations.map((c) => c.id)).toEqual(["c1", "c2"]);
  });

  it("does not request another page after totalPages is reached", async () => {
    listConversations.mockResolvedValue({
      results: [makeConversation("c1")],
      page: 1,
      limit: 50,
      total: 1,
      totalPages: 1,
    });

    const { result } = renderHook(() => useConversationListPagination());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.loadMore();
    });

    expect(listConversations).toHaveBeenCalledTimes(1);
  });

  it("requests type=group for the groups dataset", async () => {
    listConversations.mockResolvedValue({
      results: [makeConversation("g1", "group")],
      page: 1,
      limit: 50,
      total: 1,
      totalPages: 1,
    });

    const { result } = renderHook(() => useConversationListPagination("group", true));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(listConversations).toHaveBeenCalledWith({ page: 1, limit: 50, type: "group" });
    expect(result.current.conversations[0].type).toBe("group");
  });

  it("appends group page 2 results", async () => {
    listConversations
      .mockResolvedValueOnce({
        results: [makeConversation("g1", "group")],
        page: 1,
        limit: 50,
        total: 2,
        totalPages: 2,
      })
      .mockResolvedValueOnce({
        results: [makeConversation("g2", "group")],
        page: 2,
        limit: 50,
        total: 2,
        totalPages: 2,
      });

    const { result } = renderHook(() => useConversationListPagination("group", true));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.loadMore();
    });

    expect(listConversations).toHaveBeenLastCalledWith({ page: 2, limit: 50, type: "group" });
    expect(result.current.conversations.map((c) => c.id)).toEqual(["g1", "g2"]);
  });

  it("keeps recent and group datasets separate", async () => {
    listConversations
      .mockResolvedValueOnce({
        results: [makeConversation("c1")],
        page: 1,
        limit: 50,
        total: 1,
        totalPages: 1,
      })
      .mockResolvedValueOnce({
        results: [makeConversation("g1", "group")],
        page: 1,
        limit: 50,
        total: 1,
        totalPages: 1,
      });

    const recent = renderHook(() => useConversationListPagination());
    const groups = renderHook(() => useConversationListPagination("group", true));

    await waitFor(() => expect(recent.result.current.loading).toBe(false));
    await waitFor(() => expect(groups.result.current.loading).toBe(false));

    expect(recent.result.current.conversations.map((c) => c.id)).toEqual(["c1"]);
    expect(groups.result.current.conversations.map((c) => c.id)).toEqual(["g1"]);
  });

  it("resets to page 1 on refresh", async () => {
    listConversations
      .mockResolvedValueOnce({
        results: [makeConversation("c1")],
        page: 1,
        limit: 50,
        total: 2,
        totalPages: 2,
      })
      .mockResolvedValueOnce({
        results: [makeConversation("c2")],
        page: 2,
        limit: 50,
        total: 2,
        totalPages: 2,
      })
      .mockResolvedValueOnce({
        results: [makeConversation("c3")],
        page: 1,
        limit: 50,
        total: 1,
        totalPages: 1,
      });

    const { result } = renderHook(() => useConversationListPagination());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.loadMore();
    });
    await act(async () => {
      await result.current.refresh();
    });

    expect(listConversations).toHaveBeenLastCalledWith({ page: 1, limit: 50 });
    expect(result.current.conversations.map((c) => c.id)).toEqual(["c3"]);
  });

  it("uses loadingMore for page 2 without toggling initial loading", async () => {
    listConversations
      .mockResolvedValueOnce({
        results: [makeConversation("c1")],
        page: 1,
        limit: 50,
        total: 2,
        totalPages: 2,
      })
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(
              () =>
                resolve({
                  results: [makeConversation("c2")],
                  page: 2,
                  limit: 50,
                  total: 2,
                  totalPages: 2,
                }),
              30
            );
          })
      );

    const { result } = renderHook(() => useConversationListPagination());
    await waitFor(() => expect(result.current.loading).toBe(false));

    let loadMorePromise: Promise<void> | undefined;
    act(() => {
      loadMorePromise = result.current.loadMore();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingMore).toBe(true);

    await act(async () => {
      await loadMorePromise;
    });

    expect(result.current.loadingMore).toBe(false);
  });

  it("clears loadingMore when refresh supersedes an in-flight loadMore", async () => {
    let resolveMore: ((v: unknown) => void) | undefined;
    listConversations
      .mockResolvedValueOnce({
        results: [makeConversation("c1")],
        page: 1,
        limit: 50,
        total: 3,
        totalPages: 2,
      })
      .mockImplementationOnce(() => new Promise((resolve) => { resolveMore = resolve; }))
      .mockResolvedValueOnce({
        results: [makeConversation("c1")],
        page: 1,
        limit: 50,
        total: 2,
        totalPages: 2,
      });

    const { result } = renderHook(() => useConversationListPagination());
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      void result.current.loadMore();
    });
    await waitFor(() => expect(result.current.loadingMore).toBe(true));

    await act(async () => {
      await result.current.refresh();
    });

    // refresh result is authoritative: back to the single page-1 conversation.
    expect(result.current.conversations.map((c) => c.id)).toEqual(["c1"]);

    await act(async () => {
      resolveMore?.({ results: [makeConversation("c2")], page: 2, limit: 50, total: 3, totalPages: 2 });
      await Promise.resolve();
      await Promise.resolve();
    });

    // stale loadMore response must not have been applied on top of refresh's result.
    expect(result.current.conversations.map((c) => c.id)).toEqual(["c1"]);
    expect(result.current.loadingMore).toBe(false);

    // loadMore must work again after the stale response resolved.
    listConversations.mockResolvedValueOnce({
      results: [makeConversation("c3")],
      page: 2,
      limit: 50,
      total: 2,
      totalPages: 2,
    });
    await act(async () => {
      await result.current.loadMore();
    });
    expect(listConversations).toHaveBeenLastCalledWith({ page: 2, limit: 50 });
  });

  it("prevents duplicate load-more requests while one is in flight", async () => {
    let resolveSecond: ((value: unknown) => void) | undefined;
    listConversations
      .mockResolvedValueOnce({
        results: [makeConversation("c1")],
        page: 1,
        limit: 50,
        total: 3,
        totalPages: 3,
      })
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveSecond = resolve;
          })
      );

    const { result } = renderHook(() => useConversationListPagination());
    await waitFor(() => expect(result.current.loading).toBe(false));

    let firstLoad: Promise<void> | undefined;
    act(() => {
      firstLoad = result.current.loadMore();
      void result.current.loadMore();
    });

    expect(listConversations).toHaveBeenCalledTimes(2);

    await act(async () => {
      resolveSecond?.({
        results: [makeConversation("c2")],
        page: 2,
        limit: 50,
        total: 3,
        totalPages: 3,
      });
      await firstLoad;
    });
  });
});
