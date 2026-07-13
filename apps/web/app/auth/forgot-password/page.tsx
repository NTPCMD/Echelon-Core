"use client";

import { Check, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthShell } from "../../../components/marketing/auth-shell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="A clear way back in."
      description="Enter the email connected to your Echelon account and we’ll send secure recovery instructions."
    >
      <div className="rounded-[26px] border border-white/[.07] bg-[#121217] p-6 shadow-[0_30px_100px_rgba(0,0,0,.38)] sm:p-8">
        {sent ? (
          <div className="py-8 text-center"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300"><Check className="size-6" /></span><h1 className="mt-6 text-[26px] font-semibold tracking-[-.04em] text-white/78">Check your inbox.</h1><p className="mx-auto mt-3 max-w-sm text-[9px] leading-5 text-white/24">If an Echelon account exists for {email}, recovery instructions are on the way.</p><Link href="/auth/login" className="mt-6 inline-flex h-10 items-center rounded-xl border border-white/[.08] px-4 text-[8px] font-semibold text-white/42">Return to sign in</Link></div>
        ) : (
          <form onSubmit={submit}><p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/70">Reset password</p><h1 className="mt-3 text-[28px] font-semibold tracking-[-.045em] text-white/82">Recover your account.</h1><p className="mt-2 text-[9px] text-white/22">Remembered it? <Link href="/auth/login" className="font-semibold text-violet-300">Back to sign in</Link></p><label className="mt-7 block text-[9px] font-medium text-white/34">Email<div className="relative mt-2"><Mail className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" required className="h-11 w-full rounded-xl border border-white/[.075] bg-white/[.03] pl-9 pr-3 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:ring-4 focus:ring-violet-500/10" /></div></label><button type="submit" disabled={!email.trim()} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 text-[10px] font-semibold text-white disabled:opacity-35"><Send className="size-3.5" />Send recovery link</button></form>
        )}
      </div>
    </AuthShell>
  );
}
