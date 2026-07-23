export default function ContactCTA({
  heading = "Questions about Rancho Alegria?",
  sub = "For more information or questions, contact us directly.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-cream-line bg-sand-deep/60 px-6 py-10 text-center sm:px-12">
      <h3 className="font-serif text-2xl font-bold text-ink sm:text-3xl">{heading}</h3>
      <p className="mx-auto mt-2 max-w-md text-ink/70">{sub}</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="mailto:jeanetteclavin@yahoo.com"
          className="w-full rounded-full bg-terracotta px-6 py-3 text-center text-sm font-semibold text-sand shadow-sm transition-colors hover:bg-terracotta-deep sm:w-auto"
        >
          Email jeanetteclavin@yahoo.com
        </a>
        <a
          href="tel:+13107101516"
          className="w-full rounded-full border border-ocean/30 px-6 py-3 text-center text-sm font-semibold text-ocean transition-colors hover:bg-ocean hover:text-sand sm:w-auto"
        >
          Call or text 310-710-1516
        </a>
      </div>
    </div>
  );
}
