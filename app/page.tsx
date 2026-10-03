import type { ReactNode } from "react";
import { Accessibility, ArrowRight, BookOpen, Github, Scale, Server, Shield } from "@/components/icons";
import { Screenshot, type SlotName } from "@/components/Screenshot";
import { ButtonLink, CheckList, CodeBlock, Eyebrow, Note, SectionHeading, Strong, TextLink } from "@/components/ui";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoItsFor />
      <ForPeople />
      <ForAdministrators />
      <Operations />
      <AccessibleAndOpen />
      <SelfHost />
      <WhatsNext />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-glow relative overflow-hidden border-b border-brand-border">
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:py-24">
        <div className="min-w-0">
          <a
            href={site.releaseNotesUrl}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-border-emphasis bg-brand-surface px-3 py-1 text-xs font-medium text-brand-muted hover:text-brand-text"
          >
            <span className="rounded-full bg-brand-primary-subtle px-2 py-0.5 text-brand-primary-subtle-text">{site.version}</span>
            <span>Open source, MIT licensed</span>
            <ArrowRight className="size-3.5 shrink-0" />
          </a>
          <p className="mt-6 text-base font-semibold text-brand-text">{site.name}</p>
          <h1 id="hero-title" className="mt-2 text-4xl font-semibold tracking-tight text-brand-text sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Self-hosted AI chat for your whole institution
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-muted">
            Open Chat Interface ({site.shortName}) puts many AI models behind one accessible chat interface. You run it
            on your own servers, under your own sign-in, budgets and policies.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.docsUrl}>
              <BookOpen className="size-4" />
              Read the docs
            </ButtonLink>
            <ButtonLink href={site.repoUrl} variant="secondary">
              <Github className="size-4" />
              View on GitHub
            </ButtonLink>
          </div>
          <p className="mt-6 max-w-xl text-sm text-brand-subtle">
            Built for universities, research organisations and companies that care about governance, accessibility and
            control of their data as much as about the newest model.
          </p>
        </div>
        <Screenshot slot="chat-answer-reasoning" priority caption={false} />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Who it's for */

const pillars: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <Shield className="size-5" />,
    title: "Governance that is enforced",
    body: "Budgets, per-role features and limits, retention and the audit log are enforced by the server, not just reported afterwards.",
  },
  {
    icon: <Server className="size-5" />,
    title: "Your sign-in, your data",
    body: "OIDC and SAML single sign-on, with roles mapped from your identity provider. Conversations, files and logs stay in your own database and storage; prompts go only to the model providers you connect.",
  },
  {
    icon: <Accessibility className="size-5" />,
    title: "Accessibility you can test",
    body: "The interface targets WCAG 2.2 AA, and automated accessibility checks run on desktop and mobile in continuous integration.",
  },
  {
    icon: <Scale className="size-5" />,
    title: "Open source, no strings",
    body: "MIT licensed, with no contributor licence agreement. Rebrand it with your own name, logo and accent colour.",
  },
];

function WhoItsFor() {
  return (
    <section aria-labelledby="who-its-for" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="who-its-for" eyebrow="Who it's for" title="AI chat for many people, on your terms">
          <p>
            {site.shortName} is for institutions that offer AI chat to many people under their own identity provider,
            budget and policies. People pick from the models you approve; administrators decide who gets what, how
            much, and for how long it is kept.
          </p>
        </SectionHeading>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <li key={p.title} className="rounded-card border border-brand-border bg-brand-surface p-6">
              <span className="flex size-9 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-primary-subtle-text">
                {p.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-brand-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Features */

function Feature({
  id,
  eyebrow,
  title,
  lead,
  bullets,
  media,
  note,
  reverse = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: ReactNode;
  bullets: ReactNode[];
  media: ReactNode;
  note?: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-brand-border py-20 sm:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={`min-w-0 ${reverse ? "lg:order-2" : ""}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 id={id} className="mt-2 text-2xl font-semibold tracking-tight text-brand-text sm:text-3xl">
            {title}
          </h3>
          <div className="mt-4 space-y-3 text-lg leading-relaxed text-brand-muted">{lead}</div>
          <CheckList items={bullets} />
          {note ? <Note>{note}</Note> : null}
        </div>
        <div className={`min-w-0 space-y-8 ${reverse ? "lg:order-1" : ""}`}>{media}</div>
      </div>
    </section>
  );
}

function Shots({ slots }: { slots: SlotName[] }) {
  return (
    <>
      {slots.map((slot) => (
        <Screenshot key={slot} slot={slot} />
      ))}
    </>
  );
}

function Card({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <article aria-labelledby={id} className="flex min-w-0 flex-col rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h4 id={id} className="mt-2 text-xl font-semibold tracking-tight text-brand-text">
        {title}
      </h4>
      <div className="mt-4 space-y-3 leading-relaxed text-brand-muted">{children}</div>
    </article>
  );
}

function GroupIntro({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="border-t border-brand-border bg-brand-surface-sunken py-16">
      <div className="container-page">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title}>
          {children}
        </SectionHeading>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- For people */

function ForPeople() {
  return (
    <div id="people" className="scroll-mt-16">
      <GroupIntro id="people" eyebrow="For people" title="What people get">
        <p>
          One place to work with every model your institution offers, with the features people now expect from AI
          chat. Each of them can be switched on or off by administrators, for everyone or per role.
        </p>
      </GroupIntro>

      <Feature
        id="feature-conversations"
        eyebrow="Conversations"
        title="Any approved model, one interface"
        lead={
          <p>
            Pick a model for each conversation; everything else works the same whichever you choose. Replies stream as
            they are written, and a model&apos;s reasoning shows live in a short window, then folds away.
          </p>
        }
        bullets={[
          <>
            <Strong>Your own defaults:</Strong> a default model and reasoning level (Instant, Low, Medium, High) that
            follow you to every device, within what your role allows.
          </>,
          <>
            <Strong>Edit, retry and fork</Strong> without losing anything: retried replies stay one click away, and
            editing or forking starts a new conversation and keeps the original.
          </>,
          <>
            <Strong>Attachments</Strong> (images and documents), <Strong>web search</Strong> with cited sources, and{" "}
            <Strong>temporary chats</Strong> that stay out of your history and expire.
          </>,
          <>
            <Strong>Search</Strong> finds a conversation by its title or by what was said in it, and opens it at the
            matching message. Rename conversations, and jump around with keyboard shortcuts.
          </>,
          <>
            <Strong>Long conversations</Strong> are summarised in the background instead of cut off. Nothing is deleted,
            nothing waits for a summary, and a summary you asked for that fails says why.
          </>,
        ]}
        media={<Shots slots={["phone-chat"]} />}
      />

      <Feature
        id="feature-projects"
        eyebrow="Projects"
        title="Group work under shared instructions and files"
        reverse
        lead={
          <p>
            A project holds instructions and up to 20 files, added to every conversation in it. Its conversations live
            under it in the sidebar.
          </p>
        }
        bullets={[
          <>
            When a project&apos;s files don&apos;t fit, each message gets the <Strong>passages that best match it</Strong>,
            labelled with file name, instead of leaving files out.
          </>,
          <>
            With an embeddings model configured, search is <Strong>meaning-based</Strong> as well as keyword-based, with
            optional reranking. Unrelated questions add no passages.
          </>,
          <>
            Replies show <Strong>which passages they used</Strong>, and you can leave chosen files out of a message.
          </>,
          <>Each project expands to its five most recent conversations, with the rest one click away.</>,
        ]}
        media={<Shots slots={["projects-sidebar"]} />}
      />

      <Feature
        id="feature-artifacts"
        eyebrow="Artifacts"
        title="Pages, diagrams and documents, written live"
        lead={
          <p>
            HTML pages, SVG images, Mermaid diagrams and documents from replies are kept as versioned artifacts. While a
            model writes one, you watch it arrive; on wide screens it opens in a panel beside the conversation that you
            can resize.
          </p>
        }
        bullets={[
          <>
            <Strong>Versions, source and full screen</Strong>, with copy and download. Markdown documents can be edited
            directly.
          </>,
          <>
            HTML and SVG run in a <Strong>sandboxed frame with no network access</Strong>, also on share links.
          </>,
          <>
            <Strong>Export</Strong> a reply or a document as DOCX, PDF, XLSX or PPTX. PDFs carry the fonts they need for
            every common script, including Chinese, Japanese, Korean, Arabic and Hebrew.
          </>,
        ]}
        media={<Shots slots={["artifact-panel"]} />}
      />

      <Feature
        id="feature-tools"
        eyebrow="Tools and connectors"
        title="Tools that ask before they change anything"
        reverse
        lead={
          <p>
            Models that support tool calling can search the web and use connected services during a reply. A tool that
            changes something elsewhere waits for you to choose <Strong>Approve</Strong> or <Strong>Deny</Strong>.
          </p>
        }
        bullets={[
          <>
            <Strong>MCP connectors:</Strong> administrators add remote MCP servers and enable their tools one by one,
            per role.
          </>,
          <>
            People <Strong>connect their own accounts</Strong>, so the connected system applies their own permissions.
          </>,
          <>Every tool call is audited with metadata only, never its inputs or results.</>,
        ]}
        media={
          <div className="rounded-card border border-brand-border bg-brand-surface p-6">
            <p className="text-sm font-semibold text-brand-text">A tool that changes something waits for you</p>
            <div className="mt-4 rounded-control border border-brand-border-emphasis bg-brand-surface-sunken p-4">
              <p className="font-mono text-xs text-brand-subtle">create_event · Example University calendar</p>
              <p className="mt-2 text-sm text-brand-text">Add &ldquo;Thesis committee meeting&rdquo; on Tuesday at 10:00?</p>
              <div className="mt-4 flex gap-2" aria-hidden="true">
                <span className="inline-flex min-h-8 items-center rounded-control bg-brand-primary px-3 text-xs font-medium text-brand-primary-contrast">
                  Approve
                </span>
                <span className="inline-flex min-h-8 items-center rounded-control border border-brand-border-strong px-3 text-xs font-medium text-brand-text">
                  Deny
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-brand-muted">
              An illustration. Read-only tools, such as web search, run without asking; write tools always ask.
            </p>
          </div>
        }
      />

      <Feature
        id="feature-yours"
        eyebrow="Memory, sharing and export"
        title="Personal, and under your control"
        lead={<p>Settings let people shape replies to how they work, and see and take what is theirs.</p>}
        bullets={[
          <>
            <Strong>Memory</Strong> is opt-in at three levels: the instance, the role and the person. Notes are visible,
            editable and exported, and never used in temporary chats.
          </>,
          <>
            <Strong>Share links</Strong> publish a read-only view of a conversation, live or as a snapshot, with an
            optional expiry. Reasoning and attachments stay private, and one page lists every link you have made, to
            revoke any of them at once.
          </>,
          <>
            <Strong>Export everything</Strong> as a zip of Markdown, JSON, attached files and memory notes, and import
            conversation history exported from ChatGPT or Claude.
          </>,
          <>
            <Strong>Devices:</Strong> see where you are signed in, and sign out one device or all the others.
          </>,
          <>
            <Strong>Delete your own account</Strong>, where your institution allows it for your role.
          </>,
        ]}
        media={<Shots slots={["settings-customization"]} />}
      />
    </div>
  );
}

/* --------------------------------------------------- For administrators */

function ForAdministrators() {
  return (
    <div id="administrators" className="scroll-mt-16">
      <GroupIntro id="administrators" eyebrow="For administrators" title="What administrators get">
        <p>
          An administration area organised by task, with guided setup. Almost everything is configured there and stored
          in the database; environment variables cover only connection strings, secrets and the first administrator.
        </p>
      </GroupIntro>

      <Feature
        id="feature-setup-roles"
        eyebrow="Setup and roles"
        title="Guided setup, and one page per role"
        lead={
          <p>
            The setup checklist on the Overview lists what is still missing, in order, and links to each page. Roles
            &amp; access then shows everything one role is held to.
          </p>
        }
        bullets={[
          <>
            <Strong>Per-role features:</Strong> web search, attachments, share links, temporary chats, branching,
            projects, memory, artifacts, self-service account deletion, tools and reasoning levels. The server enforces
            them, not just the interface.
          </>,
          <>
            <Strong>Rate limits</Strong> (concurrent replies, messages and uploads per minute) and a{" "}
            <Strong>storage allowance</Strong> (total size, number of files, largest file) per role.
          </>,
          <>
            <Strong>Models:</Strong> connect OpenAI, Anthropic, Google or any OpenAI-compatible server, then choose which
            models join the catalog, which roles see each one, and each model&apos;s context window and output limit.
          </>,
          <>
            An <Strong>auditor</Strong> role can open every administration page and change nothing.
          </>,
          <>
            <Strong>Web search</Strong> through a provider you choose, with a fallback provider for when it is slow or
            down.
          </>,
        ]}
        media={<Shots slots={["admin-overview-setup", "admin-roles-access"]} />}
      />

      <Feature
        id="feature-budgets"
        eyebrow="Usage budgets"
        title="Budgets in messages, tokens or cost"
        reverse
        lead={
          <p>
            A budget caps consumption and applies to one or more roles; a role can carry several, and every one is
            enforced. Each person gets the full amount on their own.
          </p>
        }
        bullets={[
          <>
            <Strong>Rolling</Strong> windows (such as the last 24 hours) or <Strong>calendar</Strong> windows that reset
            daily, weekly or monthly in a timezone you choose.
          </>,
          <>
            <Strong>Scope a budget to models</Strong>, to be generous with an inexpensive model and strict with an
            expensive one. Cost uses per-model prices from the catalog.
          </>,
          <>
            People are warned at 80% and 95%. Administrators can grant one person more, with an expiry.
          </>,
          <>
            Each reply reserves its share before it starts and settles afterwards, so requests sent at the same time
            count against each other. Usage is kept, anonymised, after an account is deleted, so reports stay accurate.
          </>,
        ]}
        note={
          <>
            Cost tracking needs the provider to report token usage. Budgets are estimates, not a hard cap on a provider
            bill; use provider-side spending controls where you need one.
          </>
        }
        media={<Shots slots={["usage-budgets", "admin-usage-overview"]} />}
      />

      <Feature
        id="feature-records"
        eyebrow="Retention, audit and compliance"
        title="Records your compliance office can rely on"
        lead={
          <p>
            Decide how long conversations, usage history, memory and audit entries are kept, and keep a structured
            record of who did what.
          </p>
        }
        bullets={[
          <>
            The <Strong>audit log</Strong> records administrative actions and sign-ins, failures included, with each
            setting&apos;s value before and after. Secrets are never logged. Export to CSV.
          </>,
          <>
            Access-control and security events are <Strong>kept regardless of audit retention</Strong>.
          </>,
          <>
            <Strong>Compliance export:</Strong> audit events, every deletion among them, and optionally conversation
            content, written hourly or daily to S3-compatible storage as verified JSON Lines, exactly once per event.
          </>,
          <>
            <Strong>Legal hold</Strong> covers every deletion: no retention job, purge or deletion removes a named
            person&apos;s records until the hold is lifted.
          </>,
          <>Scheduled usage reports by email, and a versioned acceptable-use policy people accept before they start.</>,
        ]}
        note={<>A legal hold does not pause backup retention: old backups are still deleted on schedule.</>}
        media={<Shots slots={["admin-audit-log", "admin-compliance"]} />}
      />

      <section aria-labelledby="feature-identity-branding" className="border-t border-brand-border py-20 sm:py-24">
        <div className="container-page">
          <h3 id="feature-identity-branding" className="sr-only">
            Single sign-on, models and branding
          </h3>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card id="feature-sso" eyebrow="Single sign-on" title="OIDC and SAML, with roles from your directory">
              <p>
                Connect OIDC or SAML identity providers natively. Accounts are created at first sign-in, optionally limited
                to the email domains you allow.
              </p>
              <p>
                <Strong>Claim-to-role mapping</Strong> grants a role when a claim, such as a group, carries a value, and
                is recalculated at every sign-in. Turn on <Strong>Require a matching role</Strong> and people who match
                no rule are refused with a message you write.
              </p>
              <p>Local email and password accounts, invitations and email verification are there when you need them.</p>
            </Card>
            <Card id="feature-branding" eyebrow="Branding" title="Your name, your logo, your colours">
              <p>
                Set the instance name and short name, upload a logo, choose an accent colour (neutral, blue, violet or
                emerald) and the default theme, and write a message for the sign-in page.
              </p>
              <p>
                Branding applies everywhere people meet it: the sign-in pages, the sidebar, browser tabs and their icon,
                share pages, verification and password-reset emails, diagram colours and exported files.
              </p>
              <p>Announcements show a banner to everybody, for maintenance windows or news.</p>
            </Card>
          </div>
          <div className="mx-auto mt-14 max-w-4xl">
            <Screenshot slot="admin-model-catalog" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------- Operations */

const scaleExample = `# once, before the rollout
docker compose run --rm migrate

# then start the replicas
RUN_MIGRATIONS=false docker compose up -d \\
  --no-build --scale api=3`;

function Operations() {
  return (
    <section id="operations" aria-labelledby="operations-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <SectionHeading id="operations-title" eyebrow="Reliability and operations" title="One stack, built to keep running">
            <p>
              Beside its own API and web containers, {site.shortName} needs PostgreSQL, plus Redis and S3-compatible
              storage as you grow. No other database or search service.
            </p>
          </SectionHeading>
          <CheckList
            items={[
              <>
                <Strong>Migrations run once, under a lock.</Strong> The API applies them on boot behind a PostgreSQL
                advisory lock, so replicas can start together; or give schema changes their own job.
              </>,
              <>
                <Strong>Replies survive reloads.</Strong> A reply keeps streaming through a disconnect or a page reload,
                can be stopped, and is reconciled against what was actually saved.
              </>,
              <>
                <Strong>Automated backups:</Strong> scheduled <code>pg_dump</code> to S3 with incremental, checksummed
                copies of attachment files, verified by reading them back, with daily and weekly retention and a script
                to restore the files.
              </>,
              <>
                <Strong>Metrics and traces:</Strong> a Prometheus endpoint behind a token, and OpenTelemetry traces. No
                conversation content in either.
              </>,
              <>
                <Strong>Webhooks</Strong> post selected audit events to your HTTPS endpoints, signed with HMAC-SHA256 and
                retried, with a delivery log.
              </>,
              <>
                <Strong>System health</Strong> shows whether each dependency answers, plus background jobs and storage.
              </>,
            ]}
          />
          <Note>
            Instances that set up backups before v0.10 keep listing attachments without copying them until an
            administrator turns copying on, since the first copy can be as large as all attachment storage.
          </Note>
        </div>
        <div className="min-w-0 space-y-6">
          <CodeBlock label="Scale the API: migrate once, then start replicas">{scaleExample}</CodeBlock>
          <div className="rounded-card border border-brand-border bg-brand-surface p-6">
            <p className="text-sm font-semibold text-brand-text">Before you run more than one replica</p>
            <ul className="mt-3 space-y-2 text-sm text-brand-muted">
              <li>Use S3-compatible storage, so every replica sees every attachment.</li>
              <li>Connect Redis, so rate limits and stream recovery work across replicas.</li>
              <li>No sticky sessions are needed: sessions are signed cookies and streams resume through Redis.</li>
            </ul>
            <p className="mt-4 text-sm">
              <TextLink href={site.operationsUrl}>Production operations guide</TextLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------- Accessibility and open source */

function AccessibleAndOpen() {
  return (
    <section aria-labelledby="accessible-open" className="border-t border-brand-border py-20 sm:py-24">
      <div className="container-page">
        <h2 id="accessible-open" className="sr-only">
          Accessibility and open source
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <article id="accessibility" aria-labelledby="accessibility-title" className="min-w-0 scroll-mt-20 rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
            <Eyebrow>Accessibility</Eyebrow>
            <h3 id="accessibility-title" className="mt-2 text-2xl font-semibold tracking-tight text-brand-text">
              WCAG 2.2 AA, tested in CI
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-brand-muted">
              <p>
                The interface targets WCAG 2.2 Level AA. An automated scan tagged for 2.2 AA runs across sign-in, chat,
                settings, administration, share pages and dialogs, on desktop and mobile viewports.
              </p>
              <p>
                Automation covers only about a third of the success criteria, so the tests also encode a manual keyboard
                pass: a skip link as the first tab stop, a visible focus indicator on every control, and dialogs that
                return focus to whatever opened them.
              </p>
              <p>Colours are chosen for contrast first, including destructive buttons.</p>
            </div>
            <Note>A published accessibility conformance report, backed by a manual audit, is on the roadmap.</Note>
          </article>
          <article id="open-source" aria-labelledby="open-source-title" className="min-w-0 scroll-mt-20 rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
            <Eyebrow>Open source</Eyebrow>
            <h3 id="open-source-title" className="mt-2 text-2xl font-semibold tracking-tight text-brand-text">
              MIT licensed, no CLA, white-label
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-brand-muted">
              <p>
                {site.shortName} is released under the MIT licence, and there is no contributor licence agreement to
                sign before you contribute.
              </p>
              <p>
                Rebrand it with your own name and logo, run it for as many people as you like, and change the code if
                you need to.
              </p>
              <p>
                It is built with React, Hono, PostgreSQL and Redis, and every change is checked by lint, type checks,
                unit and integration tests, and browser tests.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.repoUrl} variant="secondary">
                <Github className="size-4" />
                Source on GitHub
              </ButtonLink>
              <ButtonLink href={site.licenseUrl} variant="ghost">
                Read the licence
              </ButtonLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Self-host */

const quickStart = `git clone https://github.com/ncecere/open-chat-interface.git
cd open-chat-interface/docker
cat > .env <<EOF
POSTGRES_PASSWORD=$(openssl rand -hex 24)
AUTH_SECRET=$(openssl rand -base64 48)
ENCRYPTION_KEY=$(openssl rand -base64 48)
APP_URL=http://localhost:8080
INITIAL_ADMIN_EMAIL=admin@example.edu
EOF
docker compose up -d --build
docker compose logs api     # shows the one-time admin password`;

const requirements = [
  "PostgreSQL 17 (pgvector optional, for meaning-based project search)",
  "Redis: recommended, and needed for more than one API replica",
  "S3-compatible storage, for more than one API replica, backups and compliance export",
  "A model provider: OpenAI, Anthropic, Google, or an OpenAI-compatible gateway",
  "Optionally an OIDC or SAML identity provider, and SMTP for email",
];

function SelfHost() {
  return (
    <section id="self-host" aria-labelledby="self-host-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="self-host-title" eyebrow="How it works" title="Self-host in minutes">
          <p>
            The Compose file in the repository starts the web and API containers with PostgreSQL and Redis. All you need
            is Docker.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0">
            <CodeBlock label="Build and start Open Chat Interface with Docker Compose">{quickStart}</CodeBlock>
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-brand-muted marker:text-brand-subtle">
              <li>
                The API applies migrations and default settings on first boot, and creates the first administrator from{" "}
                <code>INITIAL_ADMIN_EMAIL</code>.
              </li>
              <li>
                Open <code>http://localhost:8080</code>, sign in, and open <Strong>Admin</Strong>. The setup checklist
                walks you through the rest.
              </li>
              <li>
                Add a provider and enable at least one model under <Strong>Models → Providers &amp; Models</Strong>, and
                choose the default. No model is available to anyone until you enable one.
              </li>
            </ol>
          </div>
          <div className="rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-brand-text">Running it for real</h3>
            <p className="mt-2 text-sm text-brand-muted">Point the same containers at your own services:</p>
            <ul className="mt-4 space-y-2 text-sm text-brand-muted">
              {requirements.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-text" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.docsUrl}>
                Self-hosting docs
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={site.composeUrl} variant="secondary">
                Compose file on GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- What's next */

function WhatsNext() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-title" className="scroll-mt-16 border-t border-brand-border py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="roadmap-title" eyebrow="What's next" title="Where Open Chat Interface is going">
          <p>The roadmap is a plan, not a promise: an item ships only when it has a design, tests and documentation.</p>
        </SectionHeading>
        <dl className="mt-10 grid gap-4 md:grid-cols-3">
          <StatusCard title="Now: v0.11, always on">
            The plan: upgrades from the previous minor release with no downtime on large deployments, surviving a
            database failover partway through, and tested rather than promised. A Helm chart, connection pooling and
            arm64 images are planned alongside.
          </StatusCard>
          <StatusCard title="Later: v1.0 and beyond">
            Planned after that: assistants, code execution, deep research, image generation, voice, groups and finer
            roles, and multi-factor authentication for local accounts.
          </StatusCard>
          <StatusCard title="Today: pre-1.0">
            {site.version} is the current release. Expect changes between minor releases: take a backup and read the
            upgrade notes before you upgrade.
          </StatusCard>
        </dl>
        <p className="mt-8 text-brand-muted">
          Read the <TextLink href={site.releaseNotesUrl}>{site.version} release notes</TextLink>, the{" "}
          <TextLink href={site.changelogUrl}>changelog</TextLink> and the <TextLink href={site.roadmapUrl}>roadmap</TextLink>.
        </p>
      </div>
    </section>
  );
}

function StatusCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-card border border-brand-border bg-brand-surface p-6">
      <dt className="font-semibold text-brand-text">{title}</dt>
      <dd className="mt-2 text-sm leading-relaxed text-brand-muted">{children}</dd>
    </div>
  );
}
