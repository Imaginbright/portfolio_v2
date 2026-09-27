"use client";
import { useState } from "react";
export default function NewsletterForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "submitted" | "error"
  >("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch(
        "https://imaginbrights-store.lemonsqueezy.com/email-subscribe/external",
        {
          method: "POST",
          body: new FormData(e.currentTarget),
          mode: "no-cors",
        },
      );
      setStatus("submitted");
    } catch {
      setStatus("error");
    }
  }
  const input =
    "w-full min-w-0 border border-[var(--border)] bg-[var(--surface-1)] p-3 text-sm";
  return (
    <section className="mt-[30px] border border-[var(--border)] bg-[var(--surface-2)] p-[25px]">
      <h3 className="font-panton text-2xl leading-[1.12] font-semibold tracking-[-.02em]">
        Join the Lab
      </h3>
      <p className="my-3 mb-5 text-[13px] leading-[1.6] text-[var(--text-secondary)]">
        Get my hardware deep dives directly in your inbox.
      </p>
      {status === "submitted" ? (
        <p
          className="my-3 mb-5 text-[13px] leading-[1.6] text-[var(--text-secondary)]"
          role="status"
        >
          Request submitted.
        </p>
      ) : (
        <form className="grid gap-3" onSubmit={submit}>
          <label className="sr-only" htmlFor="newsletter-name">
            Your Name
          </label>
          <input
            className={input}
            id="newsletter-name"
            name="name"
            placeholder="Your Name"
            required
            autoComplete="name"
          />
          <label className="sr-only" htmlFor="newsletter-email">
            Email
          </label>
          <input
            className={input}
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            autoComplete="email"
          />
          <button
            className="border-0 bg-[var(--text-primary)] p-[13px] text-[13px] text-[var(--background)] disabled:opacity-50"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Joining..." : "Subscribe for Free"}
          </button>
          {status === "error" && (
            <p
              className="my-3 mb-5 text-[13px] leading-[1.6] text-[var(--text-secondary)]"
              role="alert"
            >
              Unable to submit. Please try again.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
