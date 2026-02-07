"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Button from "@/components/buttons/Button";
import Link from "next/link";
import { navigation } from "@/constants/nav";

const formSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  projectType: z.string().min(2, "Required"),
  projectDetails: z.string().min(10, "Please provide more details"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const toastId = toast.loading("Sending DM...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success("Message sent! I'll be in touch. 🚀", { id: toastId });
        reset();
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Failed to send message.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // FIX: text-base (16px) prevents iOS auto-zoom; md:text-sm keeps it small on desktop
  const inputClasses =
    "w-full bg-transparent border-b border-neutral-700 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors font-lekton text-base md:text-sm";

  const errorClasses =
    "text-[10px] text-red-500 mt-1 uppercase tracking-wider block";

  return (
    <section className="w-full flex flex-col items-center justify-center p-4 md:p-6">
      <div className="max-w-5xl w-full flex flex-col">
        {/* Navigation */}
        <nav className="flex items-center pb-8 pt-4 w-full">
          <div className="flex w-full justify-between items-center">
            <Link href="/" aria-label="Home">
              <p className="text-5xl font-heavy text-white">亮</p>
            </Link>
            <div className="hidden sm:flex items-center">
              {navigation.map((link, id) => (
                <Link
                  key={id}
                  href={link.url}
                  className="ml-[30px] font-lekton text-[24px] font-bold text-white hover:text-neutral-400 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* The Form Card */}
        <div className="w-full bg-[#111111] rounded-2xl overflow-hidden flex flex-col lg:flex-row border border-neutral-800 shadow-xl">
          <div className="flex-1 p-6 md:p-10 lg:p-12">
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Send a DM</h2>
              <p className="text-neutral-400 text-sm">
                Have a project in mind? Let&apos;s get to work.
              </p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    {...register("firstName")}
                    placeholder="First name"
                    className={inputClasses}
                  />
                  {errors.firstName && (
                    <span className={errorClasses}>
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    {...register("lastName")}
                    placeholder="Last name"
                    className={inputClasses}
                  />
                  {errors.lastName && (
                    <span className={errorClasses}>
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <input
                  {...register("projectType")}
                  placeholder="Project type"
                  className={inputClasses}
                />
                {errors.projectType && (
                  <span className={errorClasses}>
                    {errors.projectType.message}
                  </span>
                )}
              </div>

              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Your email"
                  className={inputClasses}
                />
                {errors.email && (
                  <span className={errorClasses}>{errors.email.message}</span>
                )}
              </div>

              <div>
                <textarea
                  {...register("projectDetails")}
                  placeholder="Tell me about your project..."
                  rows={3}
                  className={`${inputClasses} resize-none`}
                />
                {errors.projectDetails && (
                  <span className={errorClasses}>
                    {errors.projectDetails.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-black border border-black font-bold py-3 rounded-lg hover:bg-primary/80 transition-all text-sm mt-4 cursor-pointer"
              >
                {isLoading ? "Sending..." : "Get in touch"}
              </Button>
            </form>
          </div>

          <div className="hidden lg:block w-[40%] relative min-h-[500px]">
            <Image
              src="/images/contact.png"
              alt="Contact Visual"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
            <div className="absolute inset-0 p-10 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/20 to-transparent">
              <div className="space-y-3">
                <p className="text-lg text-white font-medium leading-tight">
                  &ldquo;Turning complex ideas into seamless digital
                  experiences.&rdquo;
                </p>
                <div>
                  <p className="text-sm text-white font-bold tracking-widest">
                    Somto
                  </p>
                  <p className="text-xs text-neutral-400">@imaginbright</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
