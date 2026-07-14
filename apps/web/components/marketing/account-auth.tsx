"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import {
  ArrowRight,
  Building2,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import {
  buildAuthContinuationUrl,
  buildAuthEntryUrl,
  destinationForMode,
  type AccountMode,
  type AuthEntry,
} from "../../lib/auth-intent";

const fieldClass =
  "h-11 w-full rounded-xl border border-white/[.075] bg-white/[.03] pl-9 pr-3 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:bg-white/[.045] focus:ring-4 focus:ring-violet-500/10";

const clerkAppearance = {
  variables: {
    colorPrimary: "#7c6cf8",
    colorBackground: "#121217",
    colorForeground: "rgba(255,255,255,.82)",
    colorMutedForeground: "rgba(255,255,255,.35)",
    colorInput: "rgba(255,255,255,.035)",
    colorInputForeground: "rgba(255,255,255,.82)",
    borderRadius: "0.9rem",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "w-full border border-white/[.07] bg-[#121217] shadow-[0_30px_100px_rgba(0,0,0,.38)]",
    socialButtonsBlockButton__apple: "hidden",
    socialButtonsIconButton__apple: "hidden",
  },
};

function AccountModeSelector({
  mode,
  onChange,
  entry,
}: {
  mode: AccountMode;
  onChange: (mode: AccountMode) => void;
  entry: AuthEntry;
}) {
  const options = [
    { value: "consumer" as const, icon: Users, label: entry === "register" ? "I need services" : "Personal account" },
    { value: "business" as const, icon: Building2, label: entry === "register" ? "I run a business" : "Business workspace" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/[.065] bg-white/[.018] p-1">
      {options.map((option) => {
        const active = mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`flex h-10 items-center justify-center gap-2 rounded-lg text-[8px] font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-violet-400/45 ${
              active ? "bg-violet-400/12 text-violet-200" : "text-white/22 hover:bg-white/[.025] hover:text-white/45"
            }`}
          >
            <option.icon className="size-3.5" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function ContextNote({ mode }: { mode: AccountMode }) {
  return (
    <div className="mb-4 mt-3 flex items-start gap-2.5 rounded-xl border border-violet-400/10 bg-violet-400/[.035] px-3 py-2.5">
      <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-violet-300" />
      <p className="text-[7px] leading-4 text-white/24">
        {mode === "business"
          ? "Use the same email as your personal account. Echelon will open or create a separate business workspace after authentication."
          : "Your bookings, saved places and profile stay personal, even if this email also manages a business."}
      </p>
    </div>
  );
}

interface AccountAccessProps {
  clerkEnabled: boolean;
  initialMode: AccountMode;
  requestedReturnTo: string;
}

export function LoginExperience({ clerkEnabled, initialMode, requestedReturnTo }: AccountAccessProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<AccountMode>(initialMode);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = useMemo(
    () => destinationForMode(mode, requestedReturnTo, "login"),
    [mode, requestedReturnTo],
  );
  const continuationUrl = buildAuthContinuationUrl(mode, returnTo);
  const registerUrl = buildAuthEntryUrl("register", mode, returnTo);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: mode === "business" ? "BUSINESS" : "CUSTOMER" }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      router.push(returnTo);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <p className="text-[9px] font-medium text-white/34">Continue to</p>
      <div className="mt-2">
        <AccountModeSelector mode={mode} onChange={setMode} entry="login" />
      </div>
      <ContextNote mode={mode} />

      {clerkEnabled ? (
        <SignIn
          routing="hash"
          signUpUrl={registerUrl}
          forceRedirectUrl={continuationUrl}
          fallbackRedirectUrl={continuationUrl}
          appearance={clerkAppearance}
        />
      ) : (
        <form onSubmit={submit} className="rounded-[26px] border border-white/[.07] bg-[#121217] p-6 shadow-[0_30px_100px_rgba(0,0,0,.38)] sm:p-8">
          <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/70">Account access</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-[-.045em] text-white/82">Welcome back.</h2>
          <p className="mt-2 text-[9px] text-white/22">New to Echelon? <Link href={registerUrl} className="font-semibold text-violet-300">Create an account</Link></p>

          {error ? <p className="mt-5 rounded-xl border border-rose-400/10 bg-rose-400/[.045] p-3 text-[8px] text-rose-200">{error}</p> : null}

          <div className="mt-6 space-y-4">
            <label className="block text-[9px] font-medium text-white/34">
              Email
              <div className="relative mt-2"><Mail className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" required className={fieldClass} /></div>
            </label>
            <label className="block text-[9px] font-medium text-white/34">
              Password
              <div className="relative mt-2"><LockKeyhole className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" required className={fieldClass} /></div>
            </label>
          </div>

          <div className="mt-3 text-right"><Link href="/auth/forgot-password" className="text-[8px] text-white/22 transition hover:text-violet-300">Forgot password?</Link></div>

          <button type="submit" disabled={loading} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#7c6cf8] to-[#6354dd] text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)] disabled:opacity-45">
            {loading ? <Loader2 className="size-3.5 animate-spin" /> : null}{loading ? "Signing in…" : `Continue to ${mode === "business" ? "business" : "personal"}`}{!loading ? <ArrowRight className="size-3.5" /> : null}
          </button>
        </form>
      )}
    </div>
  );
}

export function RegisterExperience({ clerkEnabled, initialMode, requestedReturnTo }: AccountAccessProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<AccountMode>(initialMode);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = useMemo(
    () => destinationForMode(mode, requestedReturnTo, "register"),
    [mode, requestedReturnTo],
  );
  const continuationUrl = buildAuthContinuationUrl(mode, returnTo);
  const loginUrl = buildAuthEntryUrl("login", mode, returnTo);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: mode === "business" ? "BUSINESS" : "CUSTOMER" }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Registration failed");
        return;
      }
      router.push(returnTo);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <p className="text-[9px] font-medium text-white/34">Create access for</p>
      <div className="mt-2">
        <AccountModeSelector mode={mode} onChange={setMode} entry="register" />
      </div>
      <ContextNote mode={mode} />

      {clerkEnabled ? (
        <SignUp
          routing="hash"
          signInUrl={loginUrl}
          forceRedirectUrl={continuationUrl}
          fallbackRedirectUrl={continuationUrl}
          appearance={clerkAppearance}
        />
      ) : (
        <form onSubmit={submit} className="rounded-[26px] border border-white/[.07] bg-[#121217] p-6 shadow-[0_30px_100px_rgba(0,0,0,.38)] sm:p-8">
          <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/70">Create your account</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-[-.045em] text-white/82">Begin with Echelon.</h2>
          <p className="mt-2 text-[9px] text-white/22">Already have an account? <Link href={loginUrl} className="font-semibold text-violet-300">Sign in with the same email</Link></p>

          {error ? <p className="mt-4 rounded-xl border border-rose-400/10 bg-rose-400/[.045] p-3 text-[8px] text-rose-200">{error}</p> : null}

          <div className="mt-5 space-y-4">
            <label className="block text-[9px] font-medium text-white/34">Full name<div className="relative mt-2"><UserRound className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" /><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required className={fieldClass} /></div></label>
            <label className="block text-[9px] font-medium text-white/34">Email<div className="relative mt-2"><Mail className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" required className={fieldClass} /></div></label>
            <label className="block text-[9px] font-medium text-white/34">Password<div className="relative mt-2"><LockKeyhole className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" required className={fieldClass} /></div></label>
          </div>

          <button type="submit" disabled={loading} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#7c6cf8] to-[#6354dd] text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)] disabled:opacity-45">
            {loading ? <Loader2 className="size-3.5 animate-spin" /> : null}{loading ? "Creating account…" : "Create account"}{!loading ? <ArrowRight className="size-3.5" /> : null}
          </button>
          <p className="mt-4 text-center text-[7px] leading-4 text-white/15">By creating an account, you agree to Echelon’s <Link href="/terms" className="text-white/28">Terms</Link> and <Link href="/privacy" className="text-white/28">Privacy Policy</Link>.</p>
        </form>
      )}
    </div>
  );
}
