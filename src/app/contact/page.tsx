import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { IconMail, IconPhone } from "@/components/icons";

export const metadata = {
  title: "Rental Inquiries",
  description: "Contact Jeanette Clavin about renting Rancho Alegria, Parcel 107, on Hollister Ranch.",
};

const EXPECT = [
  "A private, gated 113-acre parcel on Hollister Ranch's protected coastline.",
  "Availability, rates, and minimum-stay details shared directly by Jeanette.",
  "Full directions and gate access provided once your visit is confirmed.",
];

export default function ContactPage() {
  return (
    <div>
      <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden">
        <Photo
          slug="img-20150118-173149189"
          alt="Sunset over the Pacific from Rancho Alegria"
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 text-sand sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand/80">
            Rental Inquiries
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-6xl">Plan Your Stay</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
            Reach out directly
          </h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            Rancho Alegria is available to rent for those who want to
            experience Hollister Ranch firsthand. For availability and rates,
            contact Jeanette Clavin directly &mdash; by email or by phone.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="mailto:jeanetteclavin@yahoo.com"
              className="flex items-center gap-4 rounded-xl border border-cream-line bg-sand-deep/50 px-6 py-5 transition-colors hover:border-terracotta"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                <IconMail />
              </span>
              <span>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">Email</p>
                <p className="mt-1 font-serif text-xl font-bold text-ink">jeanetteclavin@yahoo.com</p>
              </span>
            </a>
            <a
              href="tel:+13107101516"
              className="flex items-center gap-4 rounded-xl border border-cream-line bg-sand-deep/50 px-6 py-5 transition-colors hover:border-terracotta"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                <IconPhone />
              </span>
              <span>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">Call or Text</p>
                <p className="mt-1 font-serif text-xl font-bold text-ink">310-710-1516</p>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">What to expect</h2>
          <ul className="mt-4 space-y-4">
            {EXPECT.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-ink/75">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </div>
  );
}
