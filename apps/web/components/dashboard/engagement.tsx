"use client";

import { motion } from "framer-motion";
import { Archive, CheckCheck, Mail, MoreHorizontal, Paperclip, Reply, Search, Send, Smile, Star } from "lucide-react";
import { useState } from "react";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { messages, reviews } from "./data";
import { PageHeader } from "./page";

export function ReviewsPage() {
  const [replied, setReplied] = useState<Record<string, boolean>>(() => Object.fromEntries(reviews.map((review) => [review.customer, review.replied])));
  return (
    <>
      <PageHeader eyebrow="Reputation" title="Reviews" description="Track client sentiment and turn feedback into stronger relationships." action={<Button variant="outline"><Star className="size-4" /> Request reviews</Button>} />
      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <Card><CardContent className="p-6 text-center"><p className="text-5xl font-semibold tracking-[-.065em] text-white/92">4.96</p><div className="mt-3 flex justify-center gap-1 text-amber-200">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-3.5 fill-current" />)}</div><p className="mt-2 text-[9px] text-white/25">386 verified client reviews</p><div className="mt-6 space-y-2">{[5, 4, 3, 2, 1].map((rating, index) => <div key={rating} className="flex items-center gap-2 text-[9px] text-white/25"><span className="w-3">{rating}</span><Star className="size-2.5 fill-amber-200 text-amber-200" /><div className="h-1.5 flex-1 rounded-full bg-white/[.055]"><div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-200" style={{ width: `${[92, 6, 1.5, .5, 0][index]}%` }} /></div><span className="w-7 text-right">{[355, 23, 6, 2, 0][index]}</span></div>)}</div></CardContent></Card>
          <Card><CardContent className="p-5"><p className="text-[11px] font-semibold text-white/68">Sentiment trend</p><div className="mt-5 flex h-24 items-end gap-1.5">{[52, 68, 58, 74, 70, 82, 78, 91, 86, 94, 90, 98].map((value, index) => <motion.div initial={{ height: 0 }} animate={{ height: `${value}%` }} transition={{ delay: index * .03 }} key={index} className="flex-1 rounded-t-[4px] bg-gradient-to-t from-violet-600/35 to-violet-300/75 opacity-75 hover:opacity-100" />)}</div><div className="mt-2 flex justify-between text-[8px] text-white/18"><span>12 weeks ago</span><span>Now</span></div></CardContent></Card>
        </div>
        <div className="space-y-3">
          {reviews.map((review, index) => <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} key={review.customer}><Card className="transition hover:border-white/[.1]"><CardContent className="p-5"><div className="flex items-start gap-3"><Avatar initials={review.initials} /><div className="flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-[11px] font-semibold text-white/72">{review.customer}</p><p className="mt-0.5 text-[8px] text-white/22">{review.service} · {review.time}</p></div><div className="flex gap-0.5 text-amber-200">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className={`size-3 ${star < review.rating ? "fill-current" : "text-white/10"}`} />)}</div></div><p className="mt-4 text-[12px] leading-6 text-white/42">{review.text}</p><div className="mt-4 flex items-center justify-between border-t border-white/[.055] pt-3">{replied[review.customer] ? <span className="flex items-center gap-1.5 text-[9px] font-medium text-emerald-300"><CheckCheck className="size-3.5" /> Response sent</span> : <Button variant="ghost" size="sm" onClick={() => setReplied((current) => ({ ...current, [review.customer]: true }))}><Reply className="size-3.5" /> Reply publicly</Button>}<Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-4" /></Button></div></div></div></CardContent></Card></motion.div>)}
        </div>
      </div>
    </>
  );
}

export function MessagesPage() {
  const [selected, setSelected] = useState(messages[0]?.name ?? "");
  const [draft, setDraft] = useState("");
  const current = messages.find((message) => message.name === selected) ?? messages[0];
  return (
    <>
      <PageHeader eyebrow="Inbox" title="Messages" description="Keep every client conversation organised and easy to action." />
      <Card className="h-[calc(100vh-210px)] min-h-[620px] overflow-hidden">
        <div className="grid h-full grid-rows-[220px_minmax(0,1fr)] md:grid-cols-[300px_1fr] md:grid-rows-1 xl:grid-cols-[340px_1fr_260px]">
          <aside className="overflow-y-auto border-b border-white/[.055] md:border-b-0 md:border-r">
            <div className="sticky top-0 z-10 border-b border-white/[.055] bg-[#121217]/95 p-3 backdrop-blur-xl"><div className="relative"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/20" /><Input className="h-9 pl-8" placeholder="Search conversations…" /></div></div>
            <div className="p-2">{messages.map((message) => <button key={message.name} onClick={() => setSelected(message.name)} className={`flex w-full gap-3 rounded-xl p-3 text-left transition ${selected === message.name ? "bg-violet-400/[.09]" : "hover:bg-white/[.025]"}`}><span className="relative"><Avatar initials={message.initials} />{message.online ? <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#121217] bg-emerald-400" /> : null}</span><div className="min-w-0 flex-1"><div className="flex items-center justify-between"><p className="truncate text-[10px] font-semibold text-white/68">{message.name}</p><span className="text-[8px] text-white/18">{message.time}</span></div><div className="mt-1 flex items-center gap-2"><p className="truncate text-[9px] text-white/26">{message.preview}</p>{message.unread ? <span className="ml-auto grid size-4 shrink-0 place-items-center rounded-full bg-violet-500 text-[8px] font-bold text-white">{message.unread}</span> : null}</div></div></button>)}</div>
          </aside>
          <section className="flex min-h-0 min-w-0 flex-col">
            <div className="flex h-[65px] shrink-0 items-center gap-3 border-b border-white/[.055] px-4"><Avatar initials={current?.initials ?? ""} /><div><p className="text-[10px] font-semibold text-white/68">{current?.name}</p><p className="text-[8px] text-emerald-300">Online now</p></div><div className="ml-auto flex gap-1"><Button variant="ghost" size="icon"><Archive className="size-4" /></Button><Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button></div></div>
            <div className="flex-1 space-y-4 overflow-y-auto bg-black/10 p-4 sm:p-6"><p className="text-center text-[8px] font-medium text-white/18">Today</p><div className="flex gap-2.5"><Avatar initials={current?.initials ?? ""} className="size-7" /><div className="max-w-[75%] rounded-2xl rounded-tl-md border border-white/[.06] bg-white/[.035] px-4 py-3 text-[10px] leading-5 text-white/42">Hi Rav — the product roadmap looks excellent. Can we lock in the phase two workshop for next week?</div></div><div className="flex justify-end"><div className="max-w-[75%] rounded-2xl rounded-br-md border border-violet-400/15 bg-gradient-to-br from-violet-500 to-indigo-600 px-4 py-3 text-[10px] leading-5 text-white shadow-[0_12px_30px_rgba(92,75,210,.2)]">Absolutely. I’ve held Tuesday at 9:30 AM for your leadership team and will send the workshop brief today.</div></div><div className="flex gap-2.5"><Avatar initials={current?.initials ?? ""} className="size-7" /><div className="max-w-[75%] rounded-2xl rounded-tl-md border border-white/[.06] bg-white/[.035] px-4 py-3 text-[10px] leading-5 text-white/42">Perfect, thank you. The team is looking forward to it.</div></div></div>
            <div className="shrink-0 border-t border-white/[.055] p-3"><div className="flex items-end gap-2 rounded-xl border border-white/[.07] bg-white/[.025] p-2 focus-within:border-violet-400/30"><Button variant="ghost" size="icon" className="size-8"><Paperclip className="size-4" /></Button><textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={1} placeholder="Write a message…" className="max-h-24 min-h-8 flex-1 resize-none border-0 !bg-transparent py-1.5 text-[10px] outline-none placeholder:text-white/18" /><Button variant="ghost" size="icon" className="size-8"><Smile className="size-4" /></Button><Button size="icon" className="size-8" disabled={!draft.trim()} onClick={() => setDraft("")}><Send className="size-3.5" /></Button></div></div>
          </section>
          <aside className="hidden border-l border-white/[.055] p-5 xl:block"><div className="text-center"><Avatar initials={current?.initials ?? ""} className="size-14 text-sm" /><p className="mt-3 text-xs font-semibold text-white/72">{current?.name}</p><p className="mt-1 text-[9px] text-white/22">olivia@northstarcapital.com</p></div><div className="mt-6 space-y-3 border-t border-white/[.055] pt-5 text-[10px]"><div className="flex justify-between"><span className="text-white/25">Customer since</span><span className="font-medium text-white/58">March 2024</span></div><div className="flex justify-between"><span className="text-white/25">Engagements</span><span className="font-medium text-white/58">12</span></div><div className="flex justify-between"><span className="text-white/25">Lifetime value</span><span className="font-medium text-white/58">$84,200</span></div></div><div className="mt-6 rounded-xl border border-white/[.055] bg-white/[.025] p-3"><p className="text-[8px] font-semibold uppercase tracking-wider text-white/20">Next session</p><p className="mt-2 text-[10px] font-semibold text-white/62">Phase two workshop</p><p className="mt-1 text-[9px] text-white/24">Tuesday · 9:30 AM</p></div><Button variant="outline" className="mt-4 w-full"><Mail className="size-4" /> View customer</Button></aside>
        </div>
      </Card>
    </>
  );
}
