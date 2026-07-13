"use client";

import { motion } from "framer-motion";
import {
  ArrowDownUp,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageSquareReply,
  MoreHorizontal,
  Search,
  Send,
  Sparkles,
  Star,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { reviews as reviewSeed } from "./data";
import { EmptyState, PageHeader, SectionHeading } from "./page";

type ReviewSource = "Google" | "Clutch" | "Direct";
type ReviewFilter = "All" | "Needs response" | "Replied" | "5 star";

type Review = {
  id: string;
  customer: string;
  initials: string;
  rating: number;
  time: string;
  service: string;
  text: string;
  replied: boolean;
  response: string;
  source: ReviewSource;
  company: string;
  sentiment: number;
  helpful: number;
  verified: boolean;
};

const extendedReviews: Review[] = [
  ...reviewSeed.map((review, index) => ({
    ...review,
    id: `REV-${386 - index}`,
    response: review.replied
      ? "Thank you for the thoughtful feedback. It was a privilege to help your team build a clearer, more confident system."
      : "",
    source: (["Google", "Clutch", "Direct"] as ReviewSource[])[index] ?? "Direct",
    company: ["Northstar Capital", "Form House", "Meridian Group"][index] ?? "WS Labs client",
    sentiment: [99, 97, 98][index] ?? 95,
    helpful: [18, 12, 9][index] ?? 0,
    verified: true,
  })),
  {
    id: "REV-383",
    customer: "Noah Williams",
    initials: "NW",
    rating: 4,
    time: "5 days ago",
    service: "AI Workflow Audit",
    text: "The workshop surfaced clear operational wins and gave our team a practical sequence for implementation. A little more documentation would make it perfect.",
    replied: false,
    response: "",
    source: "Clutch",
    company: "Atlas Logistics",
    sentiment: 86,
    helpful: 7,
    verified: true,
  },
  {
    id: "REV-382",
    customer: "Ethan Walker",
    initials: "EW",
    rating: 5,
    time: "1 week ago",
    service: "Technical Advisory",
    text: "Daniel brings uncommon clarity to complex architecture decisions. The advice was pragmatic, commercially aware and immediately useful.",
    replied: true,
    response:
      "Thank you, Ethan. We appreciate the trust and look forward to supporting the next stage of the platform.",
    source: "Google",
    company: "Aperture Group",
    sentiment: 98,
    helpful: 14,
    verified: true,
  },
];

const sourceTone: Record<ReviewSource, string> = {
  Google: "border-sky-400/10 bg-sky-400/10 text-sky-200",
  Clutch: "border-orange-400/10 bg-orange-400/10 text-orange-200",
  Direct: "border-violet-400/10 bg-violet-400/10 text-violet-200",
};

const selectClass =
  "mt-2 h-10 w-full rounded-xl border border-white/[.075] bg-white/[.035] px-3 text-[11px] text-white/80 outline-none transition focus:border-violet-400/45 focus:ring-4 focus:ring-violet-500/10";

export function PremiumReviewsPage() {
  const [items, setItems] = useState<Review[]>(extendedReviews);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ReviewFilter>("All");
  const [source, setSource] = useState<"All sources" | ReviewSource>("All sources");
  const [newestFirst, setNewestFirst] = useState(true);
  const [page, setPage] = useState(1);
  const [replying, setReplying] = useState<Review | null>(null);
  const [reply, setReply] = useState("");
  const [requestOpen, setRequestOpen] = useState(false);
  const [request, setRequest] = useState({
    audience: "Completed engagements",
    channel: "Email",
    message:
      "Thank you for working with WS Labs. Your perspective helps us keep raising the standard—would you share a short review?",
  });
  const [toast, setToast] = useState("");

  const filtered = useMemo(
    () =>
      items.filter((review) => {
        const matchesSearch = `${review.customer} ${review.company} ${review.service} ${review.text}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesFilter =
          filter === "All" ||
          (filter === "Needs response" && !review.replied) ||
          (filter === "Replied" && review.replied) ||
          (filter === "5 star" && review.rating === 5);
        const matchesSource = source === "All sources" || review.source === source;
        return matchesSearch && matchesFilter && matchesSource;
      }).sort((left, right) => newestFirst ? right.id.localeCompare(left.id) : left.id.localeCompare(right.id)),
    [filter, items, newestFirst, search, source],
  );
  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleReviews = filtered.slice((page - 1) * pageSize, page * pageSize);

  const responseRate = Math.round(
    (items.filter((review) => review.replied).length / Math.max(items.length, 1)) * 100,
  );

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  useEffect(() => {
    setPage(1);
  }, [filter, newestFirst, search, source]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const openReply = (review: Review) => {
    setReplying(review);
    setReply(review.response);
  };

  const suggestReply = () => {
    if (!replying) return;
    setReply(
      replying.rating === 5
        ? `Thank you, ${replying.customer.split(" ")[0]}. We really appreciate your thoughtful feedback and the trust ${replying.company} placed in WS Labs. It was a pleasure helping your team move forward with greater clarity and confidence.`
        : `Thank you, ${replying.customer.split(" ")[0]}. We appreciate the generous feedback and the note on documentation. We are adding a more detailed implementation handover so your team has everything needed for the next step.`,
    );
  };

  const sendReply = () => {
    if (!replying || !reply.trim()) return;
    setItems((current) =>
      current.map((review) =>
        review.id === replying.id ? { ...review, replied: true, response: reply } : review,
      ),
    );
    setReplying(null);
    setReply("");
    announce("Public response posted");
  };

  const requestReviews = () => {
    setRequestOpen(false);
    announce("Review request campaign queued");
  };

  return (
    <>
      <PageHeader
        eyebrow="Reputation · 386 verified reviews"
        title="Reviews"
        description="Understand client sentiment, respond with care and turn advocacy into sustainable growth."
        action={
          <Button variant="outline" onClick={() => setRequestOpen(true)}>
            <Star className="size-4" />
            Request reviews
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          {
            label: "Average rating",
            value: "4.96",
            note: "+0.08 this quarter",
            icon: Star,
            color: "text-amber-100",
          },
          {
            label: "Response rate",
            value: `${responseRate}%`,
            note: "Target 95%",
            icon: MessageSquareReply,
            color: "text-violet-200",
          },
          {
            label: "Positive sentiment",
            value: "97.2%",
            note: "+2.1% in 90 days",
            icon: ThumbsUp,
            color: "text-emerald-200",
          },
          {
            label: "Review velocity",
            value: "24",
            note: "+7 vs last month",
            icon: TrendingUp,
            color: "text-sky-200",
          },
        ].map((metric) => (
          <Card
            key={metric.label}
            className="group transition hover:-translate-y-0.5 hover:border-white/[.1]"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-semibold uppercase tracking-[.13em] text-white/20">
                  {metric.label}
                </p>
                <metric.icon className="size-3.5 text-white/18 transition group-hover:text-violet-300/60" />
              </div>
              <p className={`mt-2 text-2xl font-semibold tracking-[-.04em] ${metric.color}`}>
                {metric.value}
              </p>
              <p className="mt-1 text-[9px] text-white/24">{metric.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[310px_1fr]">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-5xl font-semibold tracking-[-.065em] text-white/92">4.96</p>
              <div className="mt-3 flex justify-center gap-1 text-amber-200">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-[9px] text-white/25">Outstanding client experience</p>
              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <button
                    key={rating}
                    onClick={() => setFilter(rating === 5 ? "5 star" : "All")}
                    className="flex w-full items-center gap-2 rounded-lg px-1 py-0.5 text-[9px] text-white/25 transition hover:bg-white/[.025]"
                  >
                    <span className="w-3">{rating}</span>
                    <Star className="size-2.5 fill-amber-200 text-amber-200" />
                    <div className="h-1.5 flex-1 rounded-full bg-white/[.055]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${[92, 6, 1.5, 0.5, 0][index]}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-200"
                      />
                    </div>
                    <span className="w-7 text-right">{[355, 23, 6, 2, 0][index]}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionHeading title="Sentiment trend" description="12-week client confidence" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex h-24 items-end gap-1.5">
                {[52, 68, 58, 74, 70, 82, 78, 91, 86, 94, 90, 98].map((value, index) => (
                  <div key={index} className="group relative flex h-full flex-1 items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ delay: index * 0.03 }}
                      className="w-full rounded-t-[4px] bg-gradient-to-t from-violet-600/35 to-violet-300/75 opacity-70 transition group-hover:opacity-100"
                    />
                    <span className="absolute bottom-[calc(100%+5px)] left-1/2 hidden -translate-x-1/2 rounded-md border border-white/[.08] bg-[#1a1a20] px-1.5 py-1 text-[7px] text-white/55 group-hover:block">
                      {value}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[8px] text-white/18">
                <span>12 weeks ago</span>
                <span>Now</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-violet-400/12 bg-gradient-to-br from-violet-500/[.08] to-transparent">
            <CardContent className="p-5">
              <Sparkles className="size-4 text-violet-300" />
              <p className="mt-4 text-[11px] font-semibold text-white/65">What clients value</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Strategic clarity", "Taste", "Commercial thinking", "AI expertise"].map((theme) => (
                  <Badge key={theme} tone="purple">
                    {theme}
                  </Badge>
                ))}
              </div>
              <p className="mt-4 text-[9px] leading-4 text-white/27">
                Strategic clarity appears in 41% of reviews, making it WS Labs’ strongest reputation signal.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex flex-col gap-3 rounded-[18px] border border-white/[.06] bg-white/[.018] p-3 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reviews, clients or services…"
                className="h-9 pl-8 text-[10px]"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <div className="flex rounded-xl border border-white/[.06] bg-white/[.02] p-0.5">
                {(["All", "Needs response", "Replied", "5 star"] as ReviewFilter[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`whitespace-nowrap rounded-[9px] px-2.5 py-1.5 text-[8px] font-semibold transition ${
                      filter === item
                        ? "bg-white/[.08] text-white/72"
                        : "text-white/22 hover:text-white/50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <select
                value={source}
                onChange={(event) =>
                  setSource(event.target.value as "All sources" | ReviewSource)
                }
                aria-label="Review source"
                className="h-9 rounded-xl border border-white/[.07] bg-white/[.03] px-3 text-[8px] font-semibold text-white/42 outline-none"
              >
                <option>All sources</option>
                <option>Google</option>
                <option>Clutch</option>
                <option>Direct</option>
              </select>
              <Button
                variant="outline"
                size="icon"
                className="size-9"
                aria-label={newestFirst ? "Sort oldest first" : "Sort newest first"}
                onClick={() => {
                  setNewestFirst((value) => !value);
                  announce(newestFirst ? "Oldest reviews first" : "Newest reviews first");
                }}
              >
                <ArrowDownUp className="size-3.5" />
              </Button>
            </div>
          </div>

          {filtered.length ? (
            <div className="space-y-3">
              {visibleReviews.map((review, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.045 }}
                  key={review.id}
                >
                  <Card className="group transition hover:border-white/[.1]">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <Avatar initials={review.initials} />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-[11px] font-semibold text-white/72">
                                  {review.customer}
                                </p>
                                {review.verified ? <Badge tone="success">Verified</Badge> : null}
                              </div>
                              <p className="mt-1 text-[8px] text-white/22">
                                {review.company} · {review.service} · {review.time}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`rounded-full border px-2 py-1 text-[8px] font-semibold ${sourceTone[review.source]}`}
                              >
                                {review.source}
                              </span>
                              <div className="flex gap-0.5 text-amber-200">
                                {Array.from({ length: 5 }).map((_, star) => (
                                  <Star
                                    key={star}
                                    className={`size-3 ${
                                      star < review.rating ? "fill-current" : "text-white/10"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="mt-4 text-[12px] leading-6 text-white/42">{review.text}</p>

                          {review.replied ? (
                            <div className="mt-4 rounded-xl border border-white/[.055] bg-white/[.022] p-3">
                              <div className="flex items-center gap-2">
                                <CheckCheck className="size-3.5 text-emerald-300" />
                                <p className="text-[8px] font-semibold uppercase tracking-[.1em] text-white/22">
                                  WS Labs response
                                </p>
                              </div>
                              <p className="mt-2 text-[10px] leading-5 text-white/35">{review.response}</p>
                            </div>
                          ) : null}

                          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[.055] pt-3">
                            {review.replied ? (
                              <Button variant="ghost" size="sm" onClick={() => openReply(review)}>
                                <MessageSquareReply className="size-3.5" />
                                Edit response
                              </Button>
                            ) : (
                              <Button size="sm" onClick={() => openReply(review)}>
                                <MessageSquareReply className="size-3.5" />
                                Reply publicly
                              </Button>
                            )}
                            <span className="flex items-center gap-1.5 text-[8px] text-white/18">
                              <ThumbsUp className="size-3" /> {review.helpful} found this helpful
                            </span>
                            <span className="ml-auto rounded-full bg-emerald-400/[.07] px-2 py-1 text-[8px] font-semibold text-emerald-300">
                              {review.sentiment}% positive
                            </span>
                            <Button variant="ghost" size="icon" className="size-8" onClick={() => openReply(review)} aria-label={`Open actions for ${review.customer}`}>
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <div className="flex items-center justify-between px-1 py-2 text-[8px] text-white/20">
                <span>Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} reviews</span>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="size-8" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} aria-label="Previous review page">
                    <ChevronLeft className="size-3.5" />
                  </Button>
                  <Button variant="outline" size="icon" className="size-8" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} aria-label="Next review page">
                    <ChevronRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={Star}
              title="No reviews found"
              description="Try another search, source or response filter."
              action={
                <Button size="sm" onClick={() => setFilter("All")}>
                  Clear filters
                </Button>
              }
            />
          )}
        </div>
      </div>

      <Dialog
        open={Boolean(replying)}
        onClose={() => setReplying(null)}
        title={replying ? `Reply to ${replying.customer}` : "Reply to review"}
        {...(replying
          ? { description: `${replying.rating}-star ${replying.source} review · ${replying.service}` }
          : {})}
        footer={
          <>
            <Button variant="ghost" onClick={() => setReplying(null)}>
              Cancel
            </Button>
            <Button onClick={sendReply} disabled={!reply.trim()}>
              <Send className="size-3.5" />
              Post response
            </Button>
          </>
        }
      >
        {replying ? (
          <div>
            <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-4">
              <div className="flex gap-0.5 text-amber-200">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star
                    key={star}
                    className={`size-3 ${star < replying.rating ? "fill-current" : "text-white/10"}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-[10px] leading-5 text-white/38">{replying.text}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <label className="text-[10px] font-medium text-white/42">Public response</label>
              <button
                type="button"
                onClick={suggestReply}
                className="flex items-center gap-1.5 text-[8px] font-semibold text-violet-300 transition hover:text-violet-200"
              >
                <Sparkles className="size-3" />
                Draft with AI
              </button>
            </div>
            <textarea
              autoFocus
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              rows={7}
              placeholder="Write a thoughtful public response…"
              className="mt-2 w-full resize-none rounded-xl border border-white/[.075] bg-white/[.035] p-3 text-[11px] leading-5 text-white/72 outline-none transition placeholder:text-white/20 focus:border-violet-400/45 focus:ring-4 focus:ring-violet-500/10"
            />
            <div className="mt-3 flex items-center justify-between text-[8px] text-white/18">
              <span>Your response will appear publicly on {replying.source}.</span>
              <span>{reply.length} characters</span>
            </div>
          </div>
        ) : null}
      </Dialog>

      <Dialog
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        title="Request client reviews"
        description="Invite recent clients to share their WS Labs experience."
        footer={
          <>
            <Button variant="ghost" onClick={() => setRequestOpen(false)}>
              Cancel
            </Button>
            <Button onClick={requestReviews}>
              <Mail className="size-3.5" />
              Queue requests
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-[10px] font-medium text-white/42">
              Audience
              <select
                value={request.audience}
                onChange={(event) => setRequest({ ...request, audience: event.target.value })}
                className={selectClass}
              >
                <option>Completed engagements</option>
                <option>High-value customers</option>
                <option>Customers without a review</option>
              </select>
            </label>
            <label className="text-[10px] font-medium text-white/42">
              Channel
              <select
                value={request.channel}
                onChange={(event) => setRequest({ ...request, channel: event.target.value })}
                className={selectClass}
              >
                <option>Email</option>
                <option>SMS</option>
                <option>Email + SMS</option>
              </select>
            </label>
          </div>
          <label className="block text-[10px] font-medium text-white/42">
            Message
            <textarea
              value={request.message}
              onChange={(event) => setRequest({ ...request, message: event.target.value })}
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-white/[.075] bg-white/[.035] p-3 text-[11px] leading-5 text-white/72 outline-none focus:border-violet-400/45 focus:ring-4 focus:ring-violet-500/10"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-3">
              <p className="text-[8px] text-white/18">Eligible customers</p>
              <p className="mt-1.5 text-lg font-semibold text-white/68">42</p>
            </div>
            <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-3">
              <p className="text-[8px] text-white/18">Predicted responses</p>
              <p className="mt-1.5 text-lg font-semibold text-emerald-200">18–24</p>
            </div>
          </div>
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
