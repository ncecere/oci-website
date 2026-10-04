# oci-website

The landing page for [Open Chat Interface (OCI)](https://github.com/ncecere/open-chat-interface), a self-hosted, open-source (MIT), multi-model AI chat application for institutions: many models behind one accessible interface, under the institution's own sign-in, budgets, retention and audit log. The site is served at https://oci.bitop.dev; the documentation lives in its own repository and site, https://docs.oci.bitop.dev.

It's one long page plus a 404 page, with no pricing, sign-up, forms, cookies, tracking or third-party requests. The text describes OCI **v0.10.1** and is checked against that release's README, ROADMAP ("Who OCI is for", "What OCI does well"), CHANGELOG and the user and administrator guides in `docs/`. `lib/site.ts` holds the version, the release day (the footer and sitemap show it) and the release links.

**Naming.** "OCI" is also Oracle Cloud Infrastructure and the Open Container Initiative, so the page leads with "Open Chat Interface" (title, hero, metadata) and uses "OCI" only as a short form after it. The text names no competing products, and examples use generic names (Example University, "Chat model"). `scripts/postbuild.mjs` fails the build if the page uses a forbidden name.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with `output: "export"`: `next build` writes plain static files to `out/`.
- React 19, TypeScript 5.9, [Tailwind CSS](https://tailwindcss.com) 4.
- Inter Variable, self-hosted from `@fontsource-variable/inter`.
- Node 22 and npm; every version is pinned in `package-lock.json`.
- nginx (alpine, pinned by digest) in the container.

## Brand tokens: `app/brand.css`

`app/brand.css` holds OCI's colours (dark by default, and light), radii, shadows and font stacks, taken from the app's theme (`apps/web/src/styles/tokens.css` in the OCI repository), and maps them to Tailwind v4 theme variables (`bg-brand-surface`, `text-brand-muted`, `bg-brand-primary`, `text-brand-link`, `rounded-card`, `shadow-brand-2` and so on). The docs site ([oci-docs](https://github.com/ncecere/oci-docs), `app/brand.css`) uses **the same file, byte for byte**, so the two sites look like one product. Never edit it here alone: change it in both repositories together and check with

```sh
cmp app/brand.css ../oci-docs/app/brand.css
```

Components and `app/globals.css` use only the Tailwind names (in CSS through `--theme(--color-brand-…)`), never the raw token variables, so a new `brand.css` drops in without other changes. The theme follows the system (`prefers-color-scheme`); `data-theme="dark|light"` or `class="dark|light"` can force one.

## Logo, favicon and Open Graph card

The logo is "Turns": a question in a blue bubble and the answer as two lines, on a dark tile. Its source, exports and usage rules are in `../oci-assets/logo/` (`logo/turns/`, `logo/README.md`).

- `components/logo.tsx` is the only place the site draws the logo (header and footer): the mark as inline SVG (`mark-small.svg`, 28 px, `aria-hidden`) beside the name as live text. oci-docs draws it identically; change both together.
- `npm run og` (`scripts/og-image.mjs`) copies `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png` and `icon-512.png` unchanged from `../oci-assets/logo/turns/` (set `LOGO_DIR` to read from elsewhere) and draws `public/og.png` (1200x630: the mark and name, the headline and, once that slot is filled, the hero chat screenshot) in the brand colours. Rerun it when the logo or the screenshot changes and commit the results.

## Screenshots

The page has 12 named screenshot slots, listed in `lib/slots.json` with their alt text and captions. A slot without an image shows a clearly marked placeholder with the expected file name.

```sh
npm run images   # copy the screenshots that exist into public/images as WebP, record their sizes
npm run og       # rebuild the Open Graph card and icons
```

Commit the results (`public/images/`, `lib/screenshots.json`, `public/og.png`, icons). Screenshots come from the fictional Example University set in `../oci-assets/screenshots/` (see its `MANIFEST.md`); set `SCREENSHOTS_DIR` to read from another directory. For each slot the script looks for `file` (or the slot's own name) and, if that's missing, the slot's `interimFile`, recording `"interim": true` in `lib/screenshots.json`. When the final set arrives, check each slot's alt text and caption against its image.

### Current set

All twelve slots use the Example University set captured on 2026-10-03 (OCI v0.10.0 and v0.10.1; see `../oci-assets/screenshots/MANIFEST.md`). Where a slot shows the same view as a docs-site capture, `file` in `lib/slots.json` names that capture rather than keeping a second copy:

| Slot | File |
|---|---|
| `chat-answer-reasoning` | `chat-answer-reasoning.png` (the hero, website only; `public/og.png` is drawn from it) |
| `phone-chat` | `phone-chat-home.png` (390x844 at 2x) |
| `projects-sidebar` | `sidebar-projects.png` |
| `settings-customization` | `settings-customization.png` |
| `admin-overview-setup` | `admin-overview.png` |
| `admin-model-catalog` | `admin-models.png` |
| `admin-roles-access` | `admin-roles.png` |
| `usage-budgets` | `admin-usage-budgets.png` |
| `admin-usage-overview` | `admin-usage-overview.png` (the Overview tab; the docs use the Spend tab) |
| `admin-audit-log` | `admin-audit-log.png` |
| `admin-compliance` | `admin-compliance.png` |
| `artifact-panel` | `artifact-panel-docked.png` |

No slot uses an interim image or a placeholder. The hero and `artifact-panel` were captured on OCI v0.10.1, which gathers a reply's reasoning and tool steps into one block; after replacing either, run `npm run images` and `npm run og`.

## Local development

```sh
npm ci
npm run dev      # http://localhost:3000
```

## Build

```sh
npm run typecheck
npm run build    # static export to out/, then scripts/postbuild.mjs
```

`scripts/postbuild.mjs` hashes the inline scripts Next.js writes into the HTML and puts them in the Content-Security-Policy (`build/security-headers.conf`), so `script-src` needs no `'unsafe-inline'`. It fails the build if the output loads a script, style sheet, font, image or frame from another origin, or if the page text uses a forbidden name.

To run the production image locally, read-only like in a cluster:

```sh
npm run docker   # builds the image and serves it on http://127.0.0.1:8080
```

## Container image and deployment

`.github/workflows/publish.yaml` builds the site on every pull request and push. On `main` it also builds and pushes a multi-arch (linux/amd64, linux/arm64) image, with every action pinned by commit SHA:

- `ghcr.io/ncecere/oci-website:<full commit SHA>`
- `ghcr.io/ncecere/oci-website:latest`

The image is nginx serving `out/`:

- runs as user 101, listens on port **8080**, and answers `GET /healthz` with `ok`;
- works with a read-only root filesystem: the pid file and temp paths are under `/tmp`, so mount an `emptyDir` (or tmpfs) there;
- sends security headers (CSP, `nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy, COOP);
- caches hashed assets under `/_next/static/` for a year (`immutable`), other assets for an hour, and revalidates pages on every request.

Deployment lives outside this repository. New GHCR packages start private; make the package public, or pull it with a registry credential.

Dependabot opens one grouped pull request a week each for npm, GitHub Actions and the Docker base images.

## Licence

- **Code:** MIT, see [`LICENSE`](LICENSE).
- **Website text:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), see [`LICENSE-CONTENT`](LICENSE-CONTENT).
- Screenshots are of the fictional Example University demo instance, from `oci-assets`. Inter is under the SIL Open Font License 1.1.
