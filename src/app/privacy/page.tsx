import type { Metadata } from "next";
import Link from "next/link";
import { buildOpenGraph } from "@/lib/site";

const description =
  "How I handle information collected through Imaginbright, including analytics, contact forms, newsletter subscriptions, and advertising.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: buildOpenGraph(
    "Privacy Policy | Imaginbright",
    description,
    "/privacy",
  ),
};

const heading =
  "mt-10 font-panton text-2xl leading-[1.2] font-bold tracking-[-.015em]";
const link =
  "underline decoration-[#707076] underline-offset-4 hover:text-white";

export default function Privacy() {
  return (
    <main
      id="main-content"
      className="mx-auto w-[min(780px,calc(100%-96px))] py-[54px] font-manrope max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)] max-md:py-[35px]"
    >
      <article className="text-[17px] leading-[1.8] text-[#d1d1d6] max-md:text-base">
        <header className="border-b border-[var(--border)] pb-8">
          <p className="font-lekton text-xs tracking-[.1em] uppercase text-[var(--text-secondary)]">
            Imaginbright
          </p>
          <h1 className="mt-3 font-panton text-[clamp(40px,5vw,62px)] leading-[1.05] font-black tracking-[-.025em] text-[var(--text-primary)]">
            Privacy Policy
          </h1>
          <p className="mt-4 font-lekton text-xs text-[var(--text-secondary)]">
            Last updated: September 27, 2026
          </p>
        </header>

        <p className="mt-8">
          I run Imaginbright, and this page explains what information may be
          collected when you use the site, contact me, subscribe to the
          newsletter, or visit a third-party service linked from here.
        </p>

        <h2 className={heading}>Website analytics and hosting</h2>
        <p className="mt-4">
          I use Vercel to host this website and Vercel Web Analytics to get a
          basic idea of how people use it. That includes things like which pages
          are visited, referrers, general location, browser, operating system,
          and device type.
        </p>
        <p className="mt-4">
          Vercel says its Web Analytics does not use third-party cookies and
          does not connect analytics data to a specific person or IP address.
          Like most hosting providers, Vercel may still process standard server
          information such as IP addresses for security, reliability, and
          troubleshooting.
        </p>
        <p className="mt-4">
          You can read Vercel&apos;s{" "}
          <a
            className={link}
            href="https://vercel.com/docs/analytics/privacy-policy"
            rel="noreferrer"
            target="_blank"
          >
            Web Analytics privacy information
          </a>{" "}
          and{" "}
          <a
            className={link}
            href="https://vercel.com/legal/privacy-notice"
            rel="noreferrer"
            target="_blank"
          >
            privacy notice
          </a>
          .
        </p>

        <h2 className={heading}>Contact form</h2>
        <p className="mt-4">
          If you send me a message through the contact form, I receive the
          information you choose to provide, including your name, email address,
          project type, and project details.
        </p>
        <p className="mt-4">
          I use that information only to read and respond to your message. The
          form is handled through Resend, and the message may stay in my email
          inbox for as long as I reasonably need it for the conversation.
        </p>
        <p className="mt-4">
          You can read Resend&apos;s{" "}
          <a
            className={link}
            href="https://resend.com/legal/privacy-policy"
            rel="noreferrer"
            target="_blank"
          >
            privacy policy
          </a>
          .
        </p>

        <h2 className={heading}>Newsletter subscriptions</h2>
        <p className="mt-4">
          If you subscribe to the newsletter, the name and email address you
          enter are sent to Lemon Squeezy, which handles the subscription.
        </p>
        <p className="mt-4">
          Lemon Squeezy manages that information under its own{" "}
          <a
            className={link}
            href="https://www.lemonsqueezy.com/privacy"
            rel="noreferrer"
            target="_blank"
          >
            privacy policy
          </a>
          . You can unsubscribe at any time using the link included in
          newsletter emails.
        </p>

        <h2 className={heading}>Google advertising</h2>
        <p className="mt-4">
          I plan to use Google AdSense on this site, but AdSense advertising is
          not currently active.
        </p>
        <p className="mt-4">
          If I enable it, Google and other advertising partners may use cookies,
          web beacons, IP addresses, or similar technologies to serve and
          measure ads. Depending on your location and consent choices,
          advertising cookies may also be used to show ads based on previous
          visits to this or other websites.
        </p>
        <p className="mt-4">
          You can read more about how Google uses information from partner
          websites in Google&apos;s{" "}
          <a
            className={link}
            href="https://policies.google.com/technologies/partner-sites"
            rel="noreferrer"
            target="_blank"
          >
            partner sites notice
          </a>{" "}
          and manage personalized advertising through{" "}
          <a
            className={link}
            href="https://myadcenter.google.com/"
            rel="noreferrer"
            target="_blank"
          >
            My Ad Center
          </a>
          .
        </p>
        <p className="mt-4">
          Where consent is required, I&apos;ll use an appropriate
          Google-certified consent platform before enabling advertising cookies
          or personalized ads.
        </p>

        <h2 className={heading}>External links</h2>
        <p className="mt-4">
          I link to other websites and services, including social platforms,
          YouTube, project websites, and Lemon Squeezy.
        </p>
        <p className="mt-4">
          Once you leave Imaginbright, those websites handle your information
          according to their own privacy policies. I don&apos;t control how
          third-party websites collect or use data.
        </p>

        <h2 className={heading}>Your choices</h2>
        <p className="mt-4">
          You don&apos;t have to use the contact form or subscribe to the
          newsletter. You can also use your browser settings to manage cookies
          and use the Google advertising controls linked above.
        </p>
        <p className="mt-4">
          If you have a question about information you&apos;ve submitted through
          this site, you can reach me through the{" "}
          <Link className={link} href="/contact">
            contact page
          </Link>
          .
        </p>

        <h2 className={heading}>Changes to this policy</h2>
        <p className="mt-4">
          I may update this page if the services I use or the way the site
          handles data changes. The date at the top of the page shows when I
          last updated it.
        </p>
      </article>
    </main>
  );
}
