"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CUSTOMER" | "BUSINESS">("CUSTOMER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Registration failed"); return; }
      router.push(role === "BUSINESS" ? "/business-dashboard" : "/dashboard");
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
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-black/50 dark:text-white/40">
            Already have one?{" "}
            <Link href="/auth/login" className="font-semibold text-brand hover:underline">
              Log in
            </Link>
          </p>

          {/* Role picker */}
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-black/10 p-1 dark:border-white/10">
            {(["CUSTOMER", "BUSINESS"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                  role === r ? "bg-ink text-white dark:bg-white dark:text-ink" : "text-black/50 dark:text-white/40"
                }`}
              >
                {r === "CUSTOMER" ? "Book services" : "List my business"}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="mt-4 grid gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              className="w-full rounded-2xl border border-black/10 bg-transparent p-4 outline-none focus:border-brand dark:border-white/10"
            />
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
              placeholder="Password (min 8 chars)"
              required
              className="w-full rounded-2xl border border-black/10 bg-transparent p-4 outline-none focus:border-brand dark:border-white/10"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand p-4 font-semibold text-white disabled:opacity-60"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-black/30 dark:text-white/20">
          <Link href="/">← Back to Echelon</Link>
        </p>
      </div>
    </main>
  );
}
