"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Login failed"); return; }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <b className="text-2xl tracking-tight">Echelon</b>
        </div>
        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-black/50 dark:text-white/40">
            No account?{" "}
            <Link href="/auth/register" className="font-semibold text-brand hover:underline">
              Sign up free
            </Link>
          </p>

          {error && (
            <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="mt-6 grid gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full rounded-2xl border border-black/10 bg-transparent p-4 outline-none focus:border-brand dark:border-white/10"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-2xl border border-black/10 bg-transparent p-4 outline-none focus:border-brand dark:border-white/10"
            />
          </div>

          <div className="mt-2 text-right">
            <Link href="/auth/forgot-password" className="text-xs text-black/40 hover:text-brand dark:text-white/30">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink p-4 font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-ink"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-black/30 dark:text-white/20">
          <Link href="/">← Back to Echelon</Link>
        </p>
      </div>
    </main>
  );
}
