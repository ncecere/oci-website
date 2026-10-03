const tag = "https://github.com/ncecere/open-chat-interface/blob/v0.10.0";

export const site = {
  name: "Open Chat Interface",
  // The short form, used only after the full name has been given ("OCI" is also
  // Oracle Cloud Infrastructure and the Open Container Initiative).
  shortName: "OCI",
  url: "https://oci.bitop.dev",
  title: "Open Chat Interface: self-hosted, multi-model AI chat for institutions",
  description:
    "Open Chat Interface (OCI) is a self-hosted, open-source (MIT) AI chat application for institutions: many models behind one interface, under your own sign-in, budgets, retention and audit log.",
  docsUrl: "https://docs.oci.bitop.dev",
  repoUrl: "https://github.com/ncecere/open-chat-interface",
  version: "v0.10.0",
  // The release day of `version` (the footer and the sitemap show it).
  releaseDate: "2026-10-03",
  releaseNotesUrl: "https://docs.oci.bitop.dev/docs/releases/v0-10-0",
  changelogUrl: `${tag}/CHANGELOG.md`,
  licenseUrl: `${tag}/LICENSE`,
  securityUrl: `${tag}/SECURITY.md`,
  roadmapUrl: `${tag}/ROADMAP.md`,
  composeUrl: `${tag}/docker/compose.yaml`,
  operationsUrl: `${tag}/docs/OPERATIONS.md`,
  websiteRepoUrl: "https://github.com/ncecere/oci-website",
} as const;
