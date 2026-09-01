export type DesktopLink = {
  label: string;
  href: string;
};

export type FileIcon = "heart" | "w" | "capitol" | "z" | "court" | "check";

export type DesktopFileId =
  | "love-warranty"
  | "warrantyos"
  | "govscape"
  | "zebi"
  | "wilbolaw"
  | "taskbox";

export type DesktopFile = {
  id: DesktopFileId;
  title: string;
  kind: string;
  color: string;
  icon: FileIcon;
  text: string;
  links: DesktopLink[];
  caseStudy?: string;
};

/** Files on the desktop. HatSafe stays off until the copy is honest. */
export const DESKTOP_FILES: DesktopFile[] = [
  {
    id: "love-warranty",
    title: "Love Warranty",
    kind: "Company",
    color: "#e08a3c",
    icon: "heart",
    text: "The warranty company. Vehicle warranty for dealers and customers. Not the software — that is WarrantyOS.",
    links: [{ label: "lovewarranty.co.uk", href: "https://lovewarranty.co.uk" }],
    caseStudy: "/work/love-warranty",
  },
  {
    id: "warrantyos",
    title: "WarrantyOS",
    kind: "Software",
    color: "#3d7ec9",
    icon: "w",
    text: "The software that runs the warranty operation. Staff CRM and claims support are live. Dealer self-service is still in development.",
    links: [{ label: "portal.warrantyos.app", href: "https://portal.warrantyos.app" }],
    caseStudy: "/work/warrantyos",
  },
  {
    id: "govscape",
    title: "Govscape",
    kind: "Software",
    color: "#4f8f5b",
    icon: "capitol",
    text: "AI governance and financial exposure platform — turns governance gaps into measurable financial outcomes.",
    links: [{ label: "govscape.app", href: "https://govscape.app" }],
    caseStudy: "/work/govscape",
  },
  {
    id: "zebi",
    title: "Zebi",
    kind: "Software",
    color: "#c4b08a",
    icon: "z",
    text: "A task and knowledge operating system for teams that build — structured workflows, documents, and agent coordination in one workspace.",
    links: [{ label: "zebi.app", href: "https://zebi.app" }],
    caseStudy: "/work/zebi",
  },
  {
    id: "wilbolaw",
    title: "WilboLaw",
    kind: "Software",
    color: "#8a8d93",
    icon: "court",
    text: "A defence-side AI review layer for California workers' compensation attorneys analysing QME and PQME reports.",
    links: [{ label: "wilbolaw.com", href: "https://wilbolaw.com" }],
    caseStudy: "/work/wilbolaw",
  },
  {
    id: "taskbox",
    title: "Taskbox",
    kind: "Software",
    color: "#e3c04a",
    icon: "check",
    text: "An AI-native operating system for small teams: inboxes, SOPs, handovers, retros.",
    links: [
      {
        label: "hello@benjaminbrown.co",
        href: "mailto:hello@benjaminbrown.co?subject=Taskbox",
      },
    ],
    caseStudy: "/work/taskbox",
  },
];

export const PHONE_DISPLAY = "+1 (949) 867-0232";
export const PHONE_E164 = "+19498670232";
export const PHONE_SMS = "sms:+19498670232";
export const WHATSAPP_URL = "https://wa.me/19498670232";
export const MAIL_TO = "hello@benjaminbrown.co";

export const COSTA_MESA = {
  name: "Costa Mesa",
  coords: "33.6411° N, 117.9189° W",
};
