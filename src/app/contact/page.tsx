import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { buildOpenGraph } from "@/lib/site";

const description =
  "Contact Somto Okonkwo about a development or design project.";

export const metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: buildOpenGraph("Contact | Imaginbright", description, "/contact"),
};

export default function Contact() {
  return (
    <main id="main-content" className="mx-auto w-[min(1320px,calc(100%-96px))] py-16 max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)]">
      <section className="mx-auto w-full max-w-5xl">
        <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#111111] font-sans shadow-xl lg:flex-row">
          <div className="flex-1 p-6 md:p-10 lg:p-12">
            <header className="mb-8">
              <h1 className="mb-2 font-display text-2xl leading-8 font-semibold tracking-[-.02em] text-white">Send a DM</h1>
              <p className="font-sans text-sm leading-5 text-neutral-400">Have a project in mind? Let&apos;s get to work.</p>
            </header>

            <ContactForm />
          </div>

          <aside className="group relative hidden min-h-125 w-[40%] shrink-0 lg:block">
            <Image
              src="/optimized/contact.webp"
              alt="Somto in profile"
              fill
              sizes="(max-width: 1024px) 0px, 420px"
              className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
              priority
            />

            <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/20 to-transparent p-10">
              <div>
                <p className="font-sans text-lg leading-[1.45] font-medium text-white">
                  &ldquo;Turning complex ideas into seamless digital
                  experiences.&rdquo;
                </p>

                <div className="mt-3 flex flex-col gap-[.15rem]">
                  <strong className="font-lekton text-sm leading-5 font-bold tracking-[.1em] text-white">Somto</strong>
                  <span className="font-lekton text-xs leading-4 text-neutral-400">@imaginbright</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
