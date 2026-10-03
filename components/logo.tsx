import { site } from "@/lib/site";

/*
 * The Open Chat Interface logo, "Turns": a question in a blue bubble and the
 * answer as two lines, on a dark tile. The mark is inline SVG (no request, no
 * font), copied from mark-small.svg in oci-assets (logo/turns/), the drawing
 * for 20 to 47 px; the name beside it is live text. oci-docs draws the same
 * mark at the same size. This is the only place the site draws the logo
 * (header and footer).
 */

/** The mark: decorative here, because the name is always next to it. */
export function Mark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={`shrink-0 ${className}`}>
      <rect width="64" height="64" rx="14" fill="#171717" />
      <path d="M32.5 11H44.5A7.5 7.5 0 0 1 52 18.5V29.5H32.5A7.5 7.5 0 0 1 25 22V18.5A7.5 7.5 0 0 1 32.5 11Z" fill="#51a2ff" />
      <path d="M15.75 40H48.25M15.75 51H34.25" fill="none" stroke="#fafafa" strokeWidth="7.5" strokeLinecap="round" />
    </svg>
  );
}

/** The mark and the name, as a link to the top of the page. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`inline-flex items-center gap-2.5 rounded-md font-semibold text-brand-text ${className}`}>
      <Mark />
      <Wordmark />
    </a>
  );
}

/** The wordmark itself: the product's full name, set in Inter. */
export function Wordmark({ className = "text-[1.05rem]" }: { className?: string }) {
  return <span className={`tracking-tight whitespace-nowrap ${className}`}>{site.name}</span>;
}
