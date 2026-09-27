"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { contactSchema, type ContactValues } from "@/lib/contact";

const fieldClass = "w-full rounded-none border-0 border-b border-neutral-700 bg-transparent py-2 font-sans text-base leading-6 text-white outline-none transition-colors duration-150 placeholder:text-neutral-500 focus:border-white focus:outline-none md:text-sm md:leading-5";
const errorClass = "mt-1 block font-lekton text-[10px] leading-4 tracking-wider text-red-500 uppercase";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  async function submit(values: ContactValues) {
    setLoading(true);

    const id = toast.loading("Sending DM...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Message sent! I'll be in touch. 🚀", {
        id,
      });

      reset();
    } catch {
      toast.error("Failed to send message.", {
        id,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-6 font-sans"
      onSubmit={handleSubmit(submit)}
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="relative flex flex-col">
          <label className="sr-only" htmlFor="firstName">
            First name
          </label>

          <input
            className={fieldClass}
            id="firstName"
            placeholder="First name"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            {...register("firstName")}
          />

          {errors.firstName && (
            <span
              id="firstName-error"
              className={errorClass}
              role="alert"
            >
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="relative flex flex-col">
          <label className="sr-only" htmlFor="lastName">
            Last name
          </label>

          <input
            className={fieldClass}
            id="lastName"
            placeholder="Last name"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            {...register("lastName")}
          />

          {errors.lastName && (
            <span
              id="lastName-error"
              className={errorClass}
              role="alert"
            >
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className="relative flex flex-col">
        <label className="sr-only" htmlFor="projectType">
          Project type
        </label>

        <input
          className={fieldClass}
          id="projectType"
          placeholder="Project type (Landing Pages, SaaS)"
          aria-invalid={!!errors.projectType}
          aria-describedby={
            errors.projectType ? "projectType-error" : undefined
          }
          {...register("projectType")}
        />

        {errors.projectType && (
          <span
            id="projectType-error"
            className={errorClass}
            role="alert"
          >
            {errors.projectType.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col">
        <label className="sr-only" htmlFor="email">
          Your email
        </label>

        <input
          className={fieldClass}
          id="email"
          type="email"
          placeholder="Your email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />

        {errors.email && (
          <span id="email-error" className={errorClass} role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col">
        <label className="sr-only" htmlFor="projectDetails">
          Project details
        </label>

        <textarea
          className={`${fieldClass} min-h-auto resize-none`}
          id="projectDetails"
          placeholder="Tell me about your project..."
          rows={3}
          aria-invalid={!!errors.projectDetails}
          aria-describedby={
            errors.projectDetails ? "projectDetails-error" : undefined
          }
          {...register("projectDetails")}
        />

        {errors.projectDetails && (
          <span
            id="projectDetails-error"
            className={errorClass}
            role="alert"
          >
            {errors.projectDetails.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 w-full cursor-pointer rounded-lg border border-black bg-primary px-4 py-3 font-sans text-sm leading-5 font-bold text-black transition-[background-color,opacity] duration-150 hover:bg-[color-mix(in_srgb,#ff9d52_80%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white disabled:cursor-wait disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Sending..." : "Get in touch"}
      </button>
    </form>
  );
}
