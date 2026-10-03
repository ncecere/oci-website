// Builds the brand images:
//   public/og.png             the Open Graph card (1200x630): the logo, the
//                             headline and, when that slot is filled, the
//                             hero chat screenshot; colours from app/brand.css
//   public/favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png,
//   icon-512.png              copied unchanged from the logo's exports in
//                             oci-assets (logo/turns/), when that folder is
//                             present; LOGO_DIR overrides its location
// Run locally (`npm run og`) after `npm run images` and commit the results;
// CI never reads oci-assets.
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

// Colours come from the shared brand file: the first (default, dark) value of
// each token, so the card follows brand.css without copying it.
const brand = readFileSync(join(root, "app", "brand.css"), "utf8");
function token(name, fallback) {
  const m = brand.match(new RegExp(`--[a-z]+-${name}:\\s*(#[0-9a-fA-F]{3,8})\\b`));
  return m ? m[1] : fallback;
}
const bg = token("bg", "#0f0f0f");
const text = token("text", "#fafafa");
const muted = token("text-muted", "#bebebe");
const border = token("border-emphasis", "#404040");

const font = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

// Icons: the logo's own exports, byte for byte.
const logoDir = resolve(process.env.LOGO_DIR ?? join(root, "..", "oci-assets", "logo", "turns"));
const icons = [
  ["favicon.ico", "favicon.ico"],
  ["favicon.svg", "favicon.svg"],
  ["png/apple-touch-icon.png", "apple-touch-icon.png"],
  ["png/icon-192.png", "icon-192.png"],
  ["png/icon-512.png", "icon-512.png"],
];
const haveLogo = icons.every(([from]) => existsSync(join(logoDir, from)));
if (haveLogo) for (const [from, to] of icons) copyFileSync(join(logoDir, from), join(pub, to));
else console.warn(`${logoDir} not found: icons left as they are`);

// The mark ("Turns"), as in oci-assets logo/turns/mark.svg, on its 64 grid.
const mark = `
  <rect width="64" height="64" rx="14" fill="#171717"/>
  <path d="M32.5 11H44.5A7.5 7.5 0 0 1 52 18.5V29.5H32.5A7.5 7.5 0 0 1 25 22V18.5A7.5 7.5 0 0 1 32.5 11Z" fill="#51a2ff"/>
  <path d="M15.25 40H48.75M15.25 51H34.75" fill="none" stroke="#fafafa" stroke-width="6.5" stroke-linecap="round"/>`;

// Open Graph card.
const W = 1200;
const H = 630;
const shot = join(pub, "images", "chat-answer-reasoning.webp");
const hasShot = existsSync(shot);
const headline = hasShot
  ? ["Self-hosted AI chat", "for your whole", "institution."]
  : ["Self-hosted AI chat for", "your whole institution."];

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="0.15" cy="0" r="1">
      <stop offset="0" stop-color="${border}" stop-opacity="0.7"/>
      <stop offset="0.6" stop-color="${border}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g transform="translate(80 86) scale(0.875)">${mark}</g>
  <text x="152" y="128" font-family="${font}" font-size="40" font-weight="600" fill="${text}" letter-spacing="-0.5">Open Chat Interface</text>
  <text font-family="${font}" font-weight="600" fill="${text}" font-size="${hasShot ? 50 : 64}" letter-spacing="-1.5">
    ${headline.map((line, i) => `<tspan x="80" y="${280 + i * (hasShot ? 62 : 78)}">${line}</tspan>`).join("")}
  </text>
  <text x="80" y="${H - 70}" font-family="${font}" font-size="26" fill="${muted}">Open source (MIT) · Many models, one interface · Your sign-in and policies</text>
</svg>`;

const layers = [];
if (hasShot) {
  const shotWidth = 520;
  const { data, info } = await sharp(shot).resize({ width: shotWidth }).png().toBuffer({ resolveWithObject: true });
  const height = Math.min(info.height, H - 160);
  const cropped = await sharp(data).extract({ left: 0, top: 0, width: info.width, height }).toBuffer();
  const mask = Buffer.from(
    `<svg width="${info.width}" height="${height}"><rect width="${info.width}" height="${height}" rx="16" fill="#fff"/></svg>`,
  );
  const rounded = await sharp(cropped).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  layers.push({ input: rounded, left: W - shotWidth - 60, top: 60 });
}

await sharp(Buffer.from(svg)).composite(layers).png({ compressionLevel: 9, palette: false }).toFile(join(pub, "og.png"));
console.log(
  `wrote public/og.png${hasShot ? " (with the chat screenshot)" : ""}${haveLogo ? `; copied ${icons.map(([, to]) => to).join(", ")} from ${logoDir}` : ""}`,
);
