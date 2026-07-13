"use client";

import { ArrowLeft, Building2, Search, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { type ChatMessage, threads as seedThreads } from "../../lib/messages";

export function MessagesView() {
  const [threads, setThreads] = useState(seedThreads);
  const [selectedId, setSelectedId] = useState<string | null>(seedThreads[0]?.id ?? null);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threads;
    return threads.filter(
      (thread) => thread.business.toLowerCase().includes(q) || thread.context.toLowerCase().includes(q),
    );
  }, [threads, query]);

  const active = threads.find((thread) => thread.id === selectedId) ?? null;

  function openThread(id: string) {
    setSelectedId(id);
    setThreads((current) => current.map((thread) => (thread.id === id ? { ...thread, unread: 0 } : thread)));
  }

  function send() {
    const text = draft.trim();
    if (!text || !active) return;
    const message: ChatMessage = { id: `m-${Date.now()}`, from: "me", text, time: "Now" };
    setThreads((current) =>
      current.map((thread) =>
        thread.id === active.id ? { ...thread, messages: [...thread.messages, message], lastTime: "Now" } : thread,
      ),
    );
    setDraft("");
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Messages</p>
        <h1 className="text-[30px] font-semibold tracking-[-.05em] text-white/90 sm:text-[40px]">Your conversations.</h1>
      </div>

      <div className="mt-8 grid gap-4 overflow-hidden rounded-[24px] border border-white/[.06] bg-[#121217] lg:grid-cols-[300px_1fr] lg:gap-0">
        {/* Thread list */}
        <div className={`border-white/[.06] lg:border-r ${active ? "hidden lg:block" : "block"}`}>
          <div className="border-b border-white/[.055] p-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.02] px-3 py-2">
              <Search className="size-3.5 text-white/28" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search messages"
                className="min-w-0 flex-1 bg-transparent text-[10px] text-white/72 outline-none placeholder:text-white/22"
              />
            </div>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {filtered.map((thread) => {
              const isActive = thread.id === selectedId;
              return (
                <button
                  key={thread.id}
                  onClick={() => openThread(thread.id)}
                  className={`flex w-full items-start gap-3 border-b border-white/[.04] px-4 py-3.5 text-left transition ${isActive ? "bg-violet-400/[.06]" : "hover:bg-white/[.02]"}`}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-400/10 text-violet-200">
                    <Building2 className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[10px] font-semibold text-white/62">{thread.business}</p>
                      <span className="shrink-0 text-[7px] text-white/22">{thread.lastTime}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[8px] text-white/26">{thread.context}</p>
                    <p className="mt-1 truncate text-[8px] text-white/34">
                      {thread.messages[thread.messages.length - 1]?.text}
                    </p>
                  </div>
                  {thread.unread > 0 ? (
                    <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-violet-500 text-[7px] font-semibold text-white">
                      {thread.unread}
                    </span>
                  ) : null}
                </button>
              );
            })}
            {filtered.length === 0 ? (
              <p className="px-4 py-8 text-center text-[9px] text-white/24">No conversations found.</p>
            ) : null}
          </div>
        </div>

        {/* Conversation */}
        <div className={`min-h-[60vh] flex-col ${active ? "flex" : "hidden lg:flex"}`}>
          {active ? (
            <>
              <div className="flex items-center gap-3 border-b border-white/[.055] p-4">
                <button onClick={() => setSelectedId(null)} className="grid size-8 place-items-center rounded-lg text-white/40 transition hover:bg-white/[.05] hover:text-white/75 lg:hidden">
                  <ArrowLeft className="size-4" />
                </button>
                <span className="grid size-9 place-items-center rounded-xl bg-violet-400/10 text-violet-200"><Building2 className="size-4" /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-white/68">{active.business}</p>
                  <p className="truncate text-[8px] text-white/26">{active.context}</p>
                </div>
                <Link href={`/businesses/${active.slug}`} className="hidden rounded-lg border border-white/[.08] px-3 py-1.5 text-[8px] font-semibold text-white/50 transition hover:text-white/80 sm:block">
                  View profile
                </Link>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                <p className="flex items-center justify-center gap-1.5 text-[7px] text-white/18">
                  <ShieldCheck className="size-2.5 text-emerald-300/60" /> Messages are private between you and the business.
                </p>
                {active.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 ${message.from === "me" ? "bg-violet-500 text-white" : "border border-white/[.07] bg-white/[.03] text-white/70"}`}>
                      <p className="text-[10px] leading-5">{message.text}</p>
                      <p className={`mt-1 text-[7px] ${message.from === "me" ? "text-white/60" : "text-white/24"}`}>{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[.055] p-3">
                <div className="flex items-center gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder={`Message ${active.business}…`}
                    className="min-w-0 flex-1 rounded-xl border border-white/[.075] bg-white/[.03] px-3.5 py-2.5 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:ring-4 focus:ring-violet-500/10"
                  />
                  <button
                    onClick={send}
                    disabled={!draft.trim()}
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white transition hover:-translate-y-px disabled:translate-y-0 disabled:opacity-35"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
                <p className="mt-2 text-[7px] text-white/16">Preview experience — replies are simulated.</p>
              </div>
            </>
          ) : (
            <div className="hidden flex-1 place-items-center lg:grid">
              <p className="text-[10px] text-white/26">Select a conversation to start.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
