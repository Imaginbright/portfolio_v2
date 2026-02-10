"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const storeSlug = "imaginbrights-store";

    try {
      await fetch(
        `https://${storeSlug}.lemonsqueezy.com/email-subscribe/external`,
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        },
      );
      setStatus("success");
    } catch {
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="p-8 rounded-3xl border-2 border-primary/30 bg-primary/5 shadow-sharp text-center">
        <h4 className="font-cursive text-2xl text-primary mb-2">
          You&apos;re in!
        </h4>
        <p className="text-sm text-zinc-400 font-lekton">Welcome.</p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-3xl border-2 border-zinc-800 bg-card shadow-sharp shrink-0">
      <h4 className="font-cursive text-2xl text-primary mb-4">Join the Lab</h4>
      <p className="text-sm text-zinc-400 font-lekton mb-6">
        Get my hardware deep dives directly in your inbox.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ADDED NAME FIELD */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm font-lekton focus:outline-none focus:border-primary transition-colors text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm font-lekton focus:outline-none focus:border-primary transition-colors text-white"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-primary transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Joining..." : "Subscribe for Free"}
        </button>
      </form>
    </div>
  );
}
