"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { timeAgo, useAccountStore } from "../../store/account";
import { Reveal } from "../marketing/reveal";

interface StaticReview {
  author: string;
  initials: string;
  rating: number;
  text: string;
  time: string;
}

const seedReviews: StaticReview[] = [
  {
    author: "Sarah M.",
    initials: "SM",
    rating: 5,
    text: "Absolutely exceptional service. Clear communication, thoughtful care and a result that exceeded expectations.",
    time: "2 weeks ago",
  },
  {
    author: "James K.",
    initials: "JK",
    rating: 5,
    text: "Professional from booking through to completion. The whole experience felt calm and well considered.",
    time: "1 month ago",
  },
  {
    author: "Priya L.",
    initials: "PL",
    rating: 5,
    text: "Easy to book, on time and genuinely excellent. I have already recommended them to friends.",
    time: "1 month ago",
  },
];

/**
 * Reviews grid for a business page. Merges reviews the signed-in user has
 * submitted (persisted account store) on top of the static seed reviews, so
 * leaving a review actually shows up where you'd expect it.
 */
export function BusinessReviews({ slug }: { slug: string }) {
  const reviews = useAccountStore((state) => state.reviews);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mine: StaticReview[] = mounted
    ? reviews
        .filter((review) => review.slug === slug)
        .map((review) => ({
          author: "You",
          initials: "You",
          rating: review.rating,
          text: review.text || "Great experience — would book again.",
          time: timeAgo(review.at),
        }))
    : [];

  const all = [...mine, ...seedReviews].slice(0, 6);

  return (
    <div className="mt-6 grid gap-3 md:grid-cols-3">
      {all.map((review, reviewIndex) => {
        const isMine = review.author === "You";
        return (
          <Reveal key={`${review.author}-${reviewIndex}`} delay={reviewIndex * 0.045}>
            <article
              className={`h-full rounded-[20px] border p-5 ${
                isMine ? "border-violet-400/20 bg-gradient-to-br from-violet-500/[.07] to-[#121217]" : "border-white/[.055] bg-[#121217]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`grid size-8 place-items-center rounded-full text-[8px] font-semibold ${
                    isMine ? "bg-violet-400/20 text-violet-100" : "bg-violet-400/10 text-violet-200"
                  }`}
                >
                  {review.initials}
                </span>
                <div className="flex gap-0.5 text-amber-100">
                  {Array.from({ length: review.rating }).map((_, star) => (
                    <Star key={star} className="size-3 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-5 text-[10px] leading-5 text-white/34">“{review.text}”</p>
              <div className="mt-5 border-t border-white/[.05] pt-4">
                <p className="text-[9px] font-semibold text-white/45">
                  {review.author}
                  {isMine ? <span className="ml-2 rounded-full bg-violet-400/15 px-2 py-0.5 text-[7px] text-violet-200">Your review</span> : null}
                </p>
                <p className="mt-1 text-[7px] text-white/16">{review.time}</p>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
