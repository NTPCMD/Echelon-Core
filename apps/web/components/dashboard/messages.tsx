"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Archive,
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronRight,
  Clock3,
  FileText,
  Inbox,
  Mail,
  MessageSquarePlus,
  MoreHorizontal,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { messages as messageSeed } from "./data";
import { consumeDashboardIntent } from "./actions";
import { EmptyState, PageHeader } from "./page";

type MessageDirection = "client" | "team";
type ConversationFilter = "All" | "Unread" | "Starred" | "Archived";
type Tone = "violet" | "blue" | "green" | "amber" | "rose";

type ChatMessage = {
  id: string;
  direction: MessageDirection;
  text: string;
  time: string;
  status?: "sent" | "read";
  attachment?: string;
};

type Conversation = {
  id: string;
  name: string;
  initials: string;
  preview: string;
  time: string;
  unread: number;
  online: boolean;
  starred: boolean;
  archived: boolean;
  company: string;
  email: string;
  phone: string;
  owner: string;
  lifetimeValue: string;
  engagements: number;
  customerSince: string;
  nextSession: string;
  responseSla: string;
  tone: Tone;
  tags: string[];
  messages: ChatMessage[];
};

const conversationDetails = [
  {
    company: "Northstar Capital",
    email: "olivia@northstarcapital.com",
    phone: "+61 412 884 201",
    owner: "Rav Singh",
    lifetimeValue: "$84,200",
    engagements: 12,
    customerSince: "March 2024",
    nextSession: "Phase two workshop · Tue 9:30 AM",
    responseSla: "Within 30 min",
    tone: "violet" as const,
    tags: ["Enterprise", "Strategy"],
    starred: true,
    messages: [
      {
        id: "om-1",
        direction: "client" as const,
        text: "Hi Rav — the product roadmap looks excellent. Can we lock in the phase two workshop for next week?",
        time: "9:12 AM",
      },
      {
        id: "om-2",
        direction: "team" as const,
        text: "Absolutely. I’ve held Tuesday at 9:30 AM for your leadership team and will send the workshop brief today.",
        time: "9:18 AM",
        status: "read" as const,
      },
      {
        id: "om-3",
        direction: "client" as const,
        text: "Perfect, thank you. The team is looking forward to it. The roadmap looks excellent. Ready for phase two.",
        time: "9:24 AM",
      },
    ],
  },
  {
    company: "Lumen Health",
    email: "isla@lumenhealth.com",
    phone: "+61 422 715 190",
    owner: "Rav Singh",
    lifetimeValue: "$62,400",
    engagements: 5,
    customerSince: "January 2025",
    nextSession: "Experience workshop · Tomorrow 10:00 AM",
    responseSla: "Within 1 hour",
    tone: "rose" as const,
    tags: ["High value", "Workshop"],
    starred: false,
    messages: [
      {
        id: "ih-1",
        direction: "team" as const,
        text: "The workshop agenda is ready. We have structured the morning around the patient onboarding journey.",
        time: "Yesterday",
        status: "read" as const,
      },
      {
        id: "ih-2",
        direction: "client" as const,
        text: "Could we add our COO to tomorrow’s workshop? She would like to join the prioritisation section.",
        time: "10:08 AM",
      },
    ],
  },
  {
    company: "Atlas Logistics",
    email: "noah@atlaslogistics.com",
    phone: "+61 433 082 614",
    owner: "Maya Chen",
    lifetimeValue: "$18,600",
    engagements: 3,
    customerSince: "May 2026",
    nextSession: "AI workflow audit · Thu 1:30 PM",
    responseSla: "Within 4 hours",
    tone: "blue" as const,
    tags: ["New", "AI audit"],
    starred: false,
    messages: [
      {
        id: "nw-1",
        direction: "team" as const,
        text: "I’ve attached the automation brief and current-state workflow map for your review.",
        time: "8:42 AM",
        attachment: "Atlas automation brief.pdf",
        status: "read" as const,
      },
      {
        id: "nw-2",
        direction: "client" as const,
        text: "Thanks for sending the automation brief. I’ll review this with operations before Thursday.",
        time: "9:06 AM",
      },
    ],
  },
  {
    company: "Form House",
    email: "ava@formhouse.co",
    phone: "+61 401 337 884",
    owner: "Sofia Reed",
    lifetimeValue: "$46,800",
    engagements: 8,
    customerSince: "August 2024",
    nextSession: "Brand review · Fri 11:00 AM",
    responseSla: "Within 1 day",
    tone: "green" as const,
    tags: ["Retainer", "Design"],
    starred: true,
    messages: [
      {
        id: "at-1",
        direction: "team" as const,
        text: "The final token library and component guidance are now in the shared workspace.",
        time: "Yesterday",
        status: "read" as const,
      },
      {
        id: "at-2",
        direction: "client" as const,
        text: "The team loves the new design system. It already feels easier to make consistent decisions.",
        time: "Yesterday",
      },
    ],
  },
];

const initialConversations: Conversation[] = messageSeed.map((message, index) => ({
  ...message,
  id: `conversation-${index + 1}`,
  archived: false,
  ...conversationDetails[index],
})) as Conversation[];

export function PremiumMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ConversationFilter>("All");
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [customerProfileOpen, setCustomerProfileOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [newConversation, setNewConversation] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const router = useRouter();

  const filtered = useMemo(
    () =>
      conversations.filter((conversation) => {
        const matchesSearch = `${conversation.name} ${conversation.company} ${conversation.email}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesFilter =
          (filter === "All" && !conversation.archived) ||
          (filter === "Unread" && !conversation.archived && conversation.unread > 0) ||
          (filter === "Starred" && !conversation.archived && conversation.starred) ||
          (filter === "Archived" && conversation.archived);
        return matchesSearch && matchesFilter;
      }),
    [conversations, filter, search],
  );

  const current = conversations.find((conversation) => conversation.id === selectedId) ?? null;
  const unreadTotal = conversations.reduce((sum, conversation) => sum + conversation.unread, 0);

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  useEffect(() => {
    const parameters = consumeDashboardIntent("message");
    if (!parameters) return;
    setNewConversation((current) => ({
      ...current,
      name: parameters.get("name") ?? current.name,
      email: parameters.get("email") ?? current.email,
      company: parameters.get("company") ?? current.company,
    }));
    setNewOpen(true);
  }, []);

  const selectConversation = (id: string) => {
    setSelectedId(id);
    setMobileChatOpen(true);
    setAiOpen(false);
    setConversations((items) =>
      items.map((conversation) => (conversation.id === id ? { ...conversation, unread: 0 } : conversation)),
    );
  };

  const sendMessage = () => {
    if (!draft.trim() || !current || isSending) return;
    const text = draft.trim();
    const conversationId = current.id;
    setDraft("");
    setIsSending(true);
    setAiOpen(false);
    window.setTimeout(() => {
      setConversations((items) =>
        items.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                preview: text,
                time: "Now",
                messages: [
                  ...conversation.messages,
                  {
                    id: `${conversationId}-${Date.now()}`,
                    direction: "team",
                    text,
                    time: "Now",
                    status: "sent",
                  },
                ],
              }
            : conversation,
        ),
      );
      setIsSending(false);
    }, 350);
  };

  const toggleStar = () => {
    if (!current) return;
    setConversations((items) =>
      items.map((conversation) =>
        conversation.id === current.id
          ? { ...conversation, starred: !conversation.starred }
          : conversation,
      ),
    );
  };

  const archiveCurrent = () => {
    if (!current) return;
    const next = conversations.find(
      (conversation) => conversation.id !== current.id && !conversation.archived,
    );
    setConversations((items) =>
      items.map((conversation) =>
        conversation.id === current.id ? { ...conversation, archived: true } : conversation,
      ),
    );
    setSelectedId(next?.id ?? "");
    setMobileChatOpen(false);
    announce("Conversation archived");
  };

  const markUnread = () => {
    if (!current) return;
    setConversations((items) =>
      items.map((conversation) =>
        conversation.id === current.id ? { ...conversation, unread: 1 } : conversation,
      ),
    );
    announce("Conversation marked unread");
  };

  const createConversation = () => {
    if (!newConversation.name.trim() || !newConversation.message.trim()) return;
    const conversation: Conversation = {
      id: `conversation-${Date.now()}`,
      name: newConversation.name,
      initials: newConversation.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      preview: newConversation.message,
      time: "Now",
      unread: 0,
      online: false,
      starred: false,
      archived: false,
      company: newConversation.company || "New relationship",
      email: newConversation.email || "Email not provided",
      phone: "Not provided",
      owner: "Rav Singh",
      lifetimeValue: "$0",
      engagements: 0,
      customerSince: "June 2026",
      nextSession: "No session scheduled",
      responseSla: "New conversation",
      tone: "amber",
      tags: ["New"],
      messages: [
        {
          id: `message-${Date.now()}`,
          direction: "team",
          text: newConversation.message,
          time: "Now",
          status: "sent",
        },
      ],
    };
    setConversations((items) => [conversation, ...items]);
    setSelectedId(conversation.id);
    setMobileChatOpen(true);
    setNewOpen(false);
    setNewConversation({ name: "", email: "", company: "", message: "" });
    announce("Conversation started");
  };

  const aiSuggestions = [
    "Absolutely — I’ll update the invite and send the revised workshop brief shortly.",
    "Thanks for the update. I’ve reserved the time and will confirm the final agenda today.",
    "That works well. I’ll make the adjustment and share the next steps with your team.",
  ];

  return (
    <>
      <PageHeader
        eyebrow={`Inbox · ${unreadTotal} unread`}
        title="Messages"
        description="Keep every client conversation organised, responsive and connected to the work."
        action={
          <Button onClick={() => setNewOpen(true)}>
            <MessageSquarePlus className="size-4" />
            New message
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Unread", value: unreadTotal.toString(), note: "Across 2 clients", color: "text-violet-200" },
          { label: "Avg. response", value: "18m", note: "12m faster this month", color: "text-emerald-200" },
          { label: "Open threads", value: "14", note: "3 need follow-up", color: "text-sky-200" },
          { label: "SLA health", value: "98%", note: "All priority clients on time", color: "text-amber-100" },
        ].map((metric) => (
          <Card key={metric.label} className="transition hover:-translate-y-0.5 hover:border-white/[.1]">
            <CardContent className="p-4">
              <p className="text-[8px] font-semibold uppercase tracking-[.13em] text-white/20">
                {metric.label}
              </p>
              <p className={`mt-2 text-2xl font-semibold tracking-[-.04em] ${metric.color}`}>
                {metric.value}
              </p>
              <p className="mt-1 text-[9px] text-white/24">{metric.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="h-[calc(100vh-300px)] min-h-[660px] overflow-hidden">
        <div className="grid h-full md:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)_260px]">
          <aside
            className={`${mobileChatOpen ? "hidden" : "flex"} min-h-0 flex-col border-r border-white/[.055] md:flex`}
          >
            <div className="shrink-0 border-b border-white/[.055] bg-[#121217]/95 p-3 backdrop-blur-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/20" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="h-9 pl-8 text-[10px]"
                  placeholder="Search conversations…"
                />
              </div>
              <div className="mt-2 flex gap-1 overflow-x-auto">
                {(["All", "Unread", "Starred", "Archived"] as ConversationFilter[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-lg px-2.5 py-1.5 text-[8px] font-semibold transition ${
                      filter === item
                        ? "bg-white/[.08] text-white/65"
                        : "text-white/20 hover:text-white/45"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-2">
              {filtered.length ? (
                filtered.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => selectConversation(conversation.id)}
                    className={`group flex w-full gap-3 rounded-xl p-3 text-left transition ${
                      selectedId === conversation.id
                        ? "bg-violet-400/[.09] shadow-[inset_0_0_0_1px_rgba(139,124,248,.08)]"
                        : "hover:bg-white/[.025]"
                    }`}
                  >
                    <span className="relative">
                      <Avatar initials={conversation.initials} tone={conversation.tone} />
                      {conversation.online ? (
                        <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#121217] bg-emerald-400" />
                      ) : null}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          className={`truncate text-[10px] ${
                            conversation.unread
                              ? "font-semibold text-white/78"
                              : "font-medium text-white/54"
                          }`}
                        >
                          {conversation.name}
                        </p>
                        {conversation.starred ? (
                          <Star className="size-2.5 fill-amber-200 text-amber-200" />
                        ) : null}
                        <span className="ml-auto text-[8px] text-white/18">{conversation.time}</span>
                      </div>
                      <p className="mt-0.5 truncate text-[8px] text-white/18">{conversation.company}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <p className="truncate text-[9px] text-white/27">{conversation.preview}</p>
                        {conversation.unread ? (
                          <span className="ml-auto grid size-4 shrink-0 place-items-center rounded-full bg-violet-500 text-[8px] font-bold text-white">
                            {conversation.unread}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-3">
                  <EmptyState
                    icon={Inbox}
                    title="No conversations"
                    description="Try another search or inbox filter."
                  />
                </div>
              )}
            </div>

            <div className="shrink-0 border-t border-white/[.055] p-3">
              <button
                onClick={() => setNewOpen(true)}
                className="flex w-full items-center gap-3 rounded-xl border border-dashed border-white/[.075] p-3 text-left transition hover:border-violet-400/20 hover:bg-violet-400/[.04]"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-violet-400/10 text-violet-300">
                  <MessageSquarePlus className="size-3.5" />
                </span>
                <span>
                  <span className="block text-[9px] font-semibold text-white/48">Start conversation</span>
                  <span className="mt-0.5 block text-[8px] text-white/18">Message a client or lead</span>
                </span>
              </button>
            </div>
          </aside>

          <section
            className={`${mobileChatOpen ? "flex" : "hidden"} min-h-0 min-w-0 flex-col md:flex`}
          >
            {current ? (
              <>
                <div className="flex h-[65px] shrink-0 items-center gap-3 border-b border-white/[.055] px-3 sm:px-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 md:hidden"
                    onClick={() => setMobileChatOpen(false)}
                    aria-label="Back to conversations"
                  >
                    <ArrowLeft className="size-4" />
                  </Button>
                  <Avatar initials={current.initials} tone={current.tone} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[10px] font-semibold text-white/68">{current.name}</p>
                      {current.online ? (
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                      ) : null}
                    </div>
                    <p className={`mt-0.5 text-[8px] ${current.online ? "text-emerald-300" : "text-white/20"}`}>
                      {current.online ? "Online now" : current.company}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden size-8 sm:inline-flex"
                      onClick={toggleStar}
                      aria-label={current.starred ? "Remove star" : "Star conversation"}
                    >
                      <Star
                        className={`size-4 ${
                          current.starred ? "fill-amber-200 text-amber-200" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden size-8 sm:inline-flex"
                      onClick={markUnread}
                      aria-label="Mark unread"
                    >
                      <Mail className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={archiveCurrent}
                      aria-label="Archive conversation"
                    >
                      <Archive className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" aria-label="More actions" onClick={() => setCustomerProfileOpen(true)}>
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="relative min-h-0 flex-1 overflow-y-auto bg-black/10 p-4 sm:p-6">
                  <div className="mx-auto max-w-3xl space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="h-px flex-1 bg-white/[.045]" />
                      <span className="text-[8px] font-medium text-white/16">Today</span>
                      <span className="h-px flex-1 bg-white/[.045]" />
                    </div>

                    <AnimatePresence initial={false}>
                      {current.messages.map((message) =>
                        message.direction === "client" ? (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-end gap-2.5"
                          >
                            <Avatar
                              initials={current.initials}
                              tone={current.tone}
                              className="size-7 text-[9px]"
                            />
                            <div className="max-w-[82%] sm:max-w-[72%]">
                              <div className="rounded-2xl rounded-bl-md border border-white/[.06] bg-white/[.035] px-4 py-3 text-[10px] leading-5 text-white/44">
                                {message.text}
                              </div>
                              <p className="mt-1 pl-1 text-[7px] text-white/15">{message.time}</p>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-end"
                          >
                            <div className="max-w-[82%] sm:max-w-[72%]">
                              <div className="rounded-2xl rounded-br-md border border-violet-400/15 bg-gradient-to-br from-violet-500 to-indigo-600 px-4 py-3 text-[10px] leading-5 text-white shadow-[0_12px_30px_rgba(92,75,210,.2)]">
                                {message.text}
                                {message.attachment ? (
                                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 p-2.5">
                                    <FileText className="size-4 text-white/65" />
                                    <span className="truncate text-[8px] font-medium text-white/70">
                                      {message.attachment}
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                              <div className="mt-1 flex items-center justify-end gap-1 pr-1 text-[7px] text-white/15">
                                <span>{message.time}</span>
                                {message.status === "read" ? (
                                  <CheckCheck className="size-2.5 text-violet-300/60" />
                                ) : (
                                  <Check className="size-2.5" />
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ),
                      )}
                    </AnimatePresence>

                    {isSending ? (
                      <div className="flex justify-end">
                        <div className="flex gap-1 rounded-xl bg-violet-500/20 px-3 py-2">
                          {[0, 1, 2].map((dot) => (
                            <motion.span
                              key={dot}
                              animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                              transition={{ repeat: Infinity, duration: 0.8, delay: dot * 0.12 }}
                              className="size-1 rounded-full bg-violet-200"
                            />
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="relative shrink-0 border-t border-white/[.055] p-3">
                  <AnimatePresence>
                    {aiOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute bottom-[calc(100%+8px)] left-3 right-3 rounded-2xl border border-violet-400/12 bg-[#15151b]/98 p-3 shadow-2xl backdrop-blur-xl"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <p className="flex items-center gap-2 text-[9px] font-semibold text-violet-200">
                            <Sparkles className="size-3.5" />
                            Suggested replies
                          </p>
                          <button
                            onClick={() => setAiOpen(false)}
                            className="text-[8px] text-white/22 hover:text-white/55"
                          >
                            Close
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {aiSuggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              onClick={() => {
                                setDraft(suggestion);
                                setAiOpen(false);
                              }}
                              className="w-full rounded-xl border border-white/[.045] bg-white/[.018] p-2.5 text-left text-[9px] leading-4 text-white/38 transition hover:border-violet-400/15 hover:bg-violet-400/[.04] hover:text-white/58"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div className="flex items-end gap-1.5 rounded-xl border border-white/[.07] bg-white/[.025] p-2 transition focus-within:border-violet-400/30 focus-within:bg-white/[.035]">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                      onClick={() => announce("Attachment picker opened")}
                      aria-label="Attach file"
                    >
                      <Paperclip className="size-4" />
                    </Button>
                    <textarea
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          sendMessage();
                        }
                      }}
                      rows={1}
                      placeholder="Write a message…"
                      className="max-h-28 min-h-8 flex-1 resize-none border-0 bg-transparent py-1.5 text-[10px] text-white/65 outline-none placeholder:text-white/18"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden size-8 shrink-0 sm:inline-flex"
                      onClick={() => setDraft((value) => `${value}${value ? " " : ""}✨`)}
                      aria-label="Add emoji"
                    >
                      <Smile className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`size-8 shrink-0 ${aiOpen ? "bg-violet-400/10 text-violet-200" : ""}`}
                      onClick={() => setAiOpen((value) => !value)}
                      aria-label="AI reply suggestions"
                    >
                      <Sparkles className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="size-8 shrink-0"
                      disabled={!draft.trim() || isSending}
                      onClick={sendMessage}
                      aria-label="Send message"
                    >
                      <Send className="size-3.5" />
                    </Button>
                  </div>
                  <p className="mt-1.5 hidden px-1 text-[7px] text-white/14 sm:block">
                    Enter to send · Shift + Enter for a new line
                  </p>
                </div>
              </>
            ) : (
              <div className="grid h-full place-items-center p-6">
                <EmptyState
                  icon={Inbox}
                  title="Select a conversation"
                  description="Choose a client thread or start a new message."
                  action={
                    <Button size="sm" onClick={() => setNewOpen(true)}>
                      New message
                    </Button>
                  }
                />
              </div>
            )}
          </section>

          <aside className="hidden min-h-0 overflow-y-auto border-l border-white/[.055] xl:block">
            {current ? (
              <div className="p-5">
                <div className="text-center">
                  <Avatar initials={current.initials} tone={current.tone} className="size-14 text-sm" />
                  <p className="mt-3 text-xs font-semibold text-white/72">{current.name}</p>
                  <p className="mt-1 text-[9px] text-white/22">{current.company}</p>
                  <div className="mt-3 flex justify-center gap-1.5">
                    {current.tags.map((tag) => (
                      <Badge key={tag} tone="purple">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t border-white/[.055] pt-5 text-[10px]">
                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5 text-white/18" />
                    <span className="truncate text-[9px] text-white/35">{current.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 text-white/18" />
                    <span className="text-[9px] text-white/35">{current.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserRound className="size-3.5 text-white/18" />
                    <span className="text-[9px] text-white/35">Owner · {current.owner}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-3">
                    <p className="text-[8px] text-white/18">Lifetime value</p>
                    <p className="mt-1 text-[10px] font-semibold text-white/58">
                      {current.lifetimeValue}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-3">
                    <p className="text-[8px] text-white/18">Engagements</p>
                    <p className="mt-1 text-[10px] font-semibold text-white/58">
                      {current.engagements}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-violet-400/10 bg-violet-400/[.045] p-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-3.5 text-violet-300" />
                    <p className="text-[8px] font-semibold uppercase tracking-[.1em] text-white/20">
                      Next session
                    </p>
                  </div>
                  <p className="mt-2 text-[10px] font-semibold leading-4 text-white/55">
                    {current.nextSession}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[.055] bg-white/[.018] p-3">
                  <div>
                    <p className="text-[8px] text-white/18">Response expectation</p>
                    <p className="mt-1 text-[9px] font-medium text-emerald-300">{current.responseSla}</p>
                  </div>
                  <Clock3 className="size-3.5 text-white/18" />
                </div>

                <button onClick={() => setCustomerProfileOpen(true)} className="mt-4 flex w-full items-center justify-between rounded-xl border border-white/[.055] px-3 py-2.5 text-left transition hover:bg-white/[.025]">
                  <span className="text-[9px] font-medium text-white/42">View customer profile</span>
                  <ChevronRight className="size-3.5 text-white/18" />
                </button>
              </div>
            ) : null}
          </aside>
        </div>
      </Card>

      <Dialog
        open={customerProfileOpen}
        onClose={() => setCustomerProfileOpen(false)}
        title={current?.name ?? "Customer profile"}
        {...(current ? { description: `${current.company} · ${current.email}` } : {})}
        footer={current ? <><Button variant="outline" onClick={() => { void navigator.clipboard.writeText(current.email); announce("Email copied"); }}><Mail className="size-3.5" /> Copy email</Button><Button onClick={() => { setCustomerProfileOpen(false); router.push(`/business-dashboard/bookings?create=booking&customer=${encodeURIComponent(current.name)}`); }}><CalendarDays className="size-3.5" /> New booking</Button></> : null}
      >
        {current ? <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/[.055] bg-white/[.022] p-4"><p className="text-[8px] uppercase tracking-[.12em] text-white/18">Lifetime value</p><p className="mt-2 text-lg font-semibold text-violet-200">{current.lifetimeValue}</p></div><div className="rounded-xl border border-white/[.055] bg-white/[.022] p-4"><p className="text-[8px] uppercase tracking-[.12em] text-white/18">Engagements</p><p className="mt-2 text-lg font-semibold text-white/62">{current.engagements}</p></div><div className="rounded-xl border border-white/[.055] bg-white/[.022] p-4 sm:col-span-2"><p className="text-[8px] uppercase tracking-[.12em] text-white/18">Next session</p><p className="mt-2 text-[10px] font-medium text-white/48">{current.nextSession}</p><p className="mt-2 text-[9px] text-white/22">Owner · {current.owner} · Customer since {current.customerSince}</p></div></div> : null}
      </Dialog>

      <Dialog
        open={newOpen}
        onClose={() => setNewOpen(false)}
        title="New conversation"
        description="Start a direct client conversation from Echelon."
        footer={
          <>
            <Button variant="ghost" onClick={() => setNewOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={createConversation}
              disabled={!newConversation.name.trim() || !newConversation.message.trim()}
            >
              <Send className="size-3.5" />
              Send message
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-[10px] font-medium text-white/42">
            Customer
            <Input
              autoFocus
              value={newConversation.name}
              onChange={(event) =>
                setNewConversation({ ...newConversation, name: event.target.value })
              }
              placeholder="Customer name"
              className="mt-2"
            />
          </label>
          <label className="text-[10px] font-medium text-white/42">
            Company
            <Input
              value={newConversation.company}
              onChange={(event) =>
                setNewConversation({ ...newConversation, company: event.target.value })
              }
              placeholder="Company"
              className="mt-2"
            />
          </label>
          <label className="text-[10px] font-medium text-white/42 sm:col-span-2">
            Email
            <Input
              type="email"
              value={newConversation.email}
              onChange={(event) =>
                setNewConversation({ ...newConversation, email: event.target.value })
              }
              placeholder="name@company.com"
              className="mt-2"
            />
          </label>
          <label className="text-[10px] font-medium text-white/42 sm:col-span-2">
            Message
            <textarea
              value={newConversation.message}
              onChange={(event) =>
                setNewConversation({ ...newConversation, message: event.target.value })
              }
              rows={6}
              placeholder="Write your first message…"
              className="mt-2 w-full resize-none rounded-xl border border-white/[.075] bg-white/[.035] p-3 text-[11px] leading-5 text-white/72 outline-none transition placeholder:text-white/20 focus:border-violet-400/45 focus:ring-4 focus:ring-violet-500/10"
            />
          </label>
        </div>
      </Dialog>

      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-[#15191a] px-4 py-3 text-[10px] font-medium text-emerald-200 shadow-2xl"
        >
          <Check className="size-3.5" />
          {toast}
        </motion.div>
      ) : null}
    </>
  );
}
