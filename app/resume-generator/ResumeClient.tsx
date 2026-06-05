"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Eye,
  EyeOff,
  FileDown,
  FileUp,
  ImageIcon,
  Plus,
  RotateCcw,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import {
  trackCopyResult,
  trackDownloadResult,
  trackToolComplete,
} from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type WorkEntry = {
  company: string; role: string; dates: string; bullets: string;
  location: string; employmentType: string; isCurrent: boolean;
};
type EduEntry = {
  school: string; degree: string; year: string;
  location: string; gpa: string; coursework: string;
};
type ProjectEntry = {
  name: string; role: string; link: string;
  dates: string; description: string; technologies: string;
};
type CertEntry = { name: string; issuer: string; year: string; url: string };
type LangEntry = { language: string; level: string };
type VolunteerEntry = { organization: string; role: string; dates: string; description: string };
type AwardEntry = { title: string; organization: string; year: string; description: string };
type PublicationEntry = { title: string; publisher: string; year: string; link: string; description: string };
type ReferenceEntry = { name: string; roleCompany: string; contact: string; relationship: string };
type CustomSection = { title: string; content: string };
type SkillGroups = { technical: string; tools: string; soft: string; industry: string };
type SectionVisibility = {
  summary: boolean; experience: boolean; education: boolean; skills: boolean;
  projects: boolean; certifications: boolean; languages: boolean; volunteer: boolean;
  awards: boolean; publications: boolean; references: boolean; custom: boolean;
};

type ResumeState = {
  fullName: string; headline: string; email: string; phone: string;
  location: string; linkedin: string; website: string; github: string; workAuth: string;
  summary: string; targetRole: string; targetKeywords: string;
  tone: string; lengthPref: string; layoutVariant: string;
  includePhoto: boolean; photoDataUrl: string;
  work: WorkEntry[]; edu: EduEntry[]; skills: string; skillGroups: SkillGroups;
  projects: ProjectEntry[]; certs: CertEntry[]; langs: LangEntry[];
  volunteer: VolunteerEntry[]; awards: AwardEntry[]; publications: PublicationEntry[];
  references: ReferenceEntry[]; showReferences: boolean;
  custom: CustomSection; visibility: SectionVisibility;
};

// ─────────────────────────────────────────────────────────────────────────────
// Factories
// ─────────────────────────────────────────────────────────────────────────────

const emptyWork = (): WorkEntry => ({ company: "", role: "", dates: "", bullets: "", location: "", employmentType: "Full-time", isCurrent: false });
const emptyEdu = (): EduEntry => ({ school: "", degree: "", year: "", location: "", gpa: "", coursework: "" });
const emptyProject = (): ProjectEntry => ({ name: "", role: "", link: "", dates: "", description: "", technologies: "" });
const emptyCert = (): CertEntry => ({ name: "", issuer: "", year: "", url: "" });
const emptyLang = (): LangEntry => ({ language: "", level: "Professional" });
const emptyVolunteer = (): VolunteerEntry => ({ organization: "", role: "", dates: "", description: "" });
const emptyAward = (): AwardEntry => ({ title: "", organization: "", year: "", description: "" });
const emptyPublication = (): PublicationEntry => ({ title: "", publisher: "", year: "", link: "", description: "" });
const emptyReference = (): ReferenceEntry => ({ name: "", roleCompany: "", contact: "", relationship: "" });

const defaultVisibility = (): SectionVisibility => ({
  summary: true, experience: true, education: true, skills: true,
  projects: true, certifications: true, languages: true, volunteer: false,
  awards: true, publications: true, references: false, custom: false,
});

const defaultState = (): ResumeState => ({
  fullName: "", headline: "", email: "", phone: "", location: "",
  linkedin: "", website: "", github: "", workAuth: "",
  summary: "", targetRole: "", targetKeywords: "",
  tone: "Professional", lengthPref: "One page", layoutVariant: "Classic",
  includePhoto: false, photoDataUrl: "",
  work: [emptyWork()], edu: [emptyEdu()], skills: "",
  skillGroups: { technical: "", tools: "", soft: "", industry: "" },
  projects: [], certs: [], langs: [], volunteer: [], awards: [],
  publications: [], references: [], showReferences: false,
  custom: { title: "", content: "" }, visibility: defaultVisibility(),
});

// ─────────────────────────────────────────────────────────────────────────────
// Sample content
// ─────────────────────────────────────────────────────────────────────────────

const EXAMPLE_STATE: ResumeState = {
  fullName: "Alex Morgan",
  headline: "Frontend Developer",
  email: "alex.morgan@email.com",
  phone: "+1 415 555 0182",
  location: "San Francisco, CA",
  linkedin: "https://linkedin.com/in/alexmorgan-dev",
  website: "https://alexmorgan.dev",
  github: "https://github.com/alexmorgan-dev",
  workAuth: "",
  summary:
    "Frontend developer with 3 years of experience building internal tools and customer-facing web apps. I enjoy working on products where design and code overlap, and I tend to focus on keeping things simple and maintainable. I work across the stack when needed but spend most of my time on the frontend.",
  targetRole: "Senior Frontend Developer",
  targetKeywords: "React, TypeScript, Next.js, REST API, PostgreSQL, Agile, CI/CD, AWS",
  tone: "Professional",
  lengthPref: "One page",
  layoutVariant: "Classic",
  includePhoto: false,
  photoDataUrl: "",
  work: [
    {
      company: "Relay Software",
      role: "Frontend Developer",
      dates: "Mar 2022 - Present",
      bullets:
        "Built an internal support dashboard that reduced average ticket response time from 18 minutes to 11 minutes.\nReplaced a legacy jQuery reporting page with a React + Recharts app; load time dropped from 8s to under 1s.\nWorked with the designer to clean up the onboarding flow, cutting drop-off at step 2 by around 30%.",
      location: "San Francisco, CA",
      employmentType: "Full-time",
      isCurrent: true,
    },
    {
      company: "Brightleaf Agency",
      role: "Junior Web Developer",
      dates: "Jun 2021 - Feb 2022",
      bullets:
        "Developed client landing pages and campaign microsites using Next.js and Tailwind CSS.\nSet up a shared component library used across 6 client projects.\nHandled weekly deployments and coordinated with the QA team on pre-launch checks.",
      location: "Remote",
      employmentType: "Full-time",
      isCurrent: false,
    },
  ],
  edu: [
    {
      school: "University of California, Davis",
      degree: "B.Sc. Computer Science",
      year: "2021",
      location: "Davis, CA",
      gpa: "3.7 / 4.0",
      coursework: "Web Technologies, Human-Computer Interaction, Databases",
    },
  ],
  skills: "React, TypeScript, Next.js, Node.js, PostgreSQL, Figma, GitHub",
  skillGroups: {
    technical: "React, TypeScript, Next.js, Node.js, REST API, PostgreSQL",
    tools: "Figma, GitHub, Vercel, Linear, Notion",
    soft: "Code reviews, async communication, cross-functional collaboration",
    industry: "SaaS, internal tools, customer portals",
  },
  projects: [
    {
      name: "Open Requests Board",
      role: "Solo developer",
      link: "https://github.com/alexmorgan-dev/open-requests",
      dates: "2023",
      description:
        "A lightweight kanban board for tracking support requests, built to replace a spreadsheet the team was using. Used by 12 people daily.",
      technologies: "React, TypeScript, SQLite, Express",
    },
    {
      name: "Weekly Metrics Digest",
      role: "Developer",
      link: "",
      dates: "2022",
      description:
        "Automated a weekly email digest of key product metrics. Previously someone spent about 4 hours every Friday pulling this manually.",
      technologies: "Node.js, Cron, SendGrid, PostgreSQL",
    },
  ],
  certs: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2023", url: "" },
  ],
  langs: [
    { language: "English", level: "Native" },
    { language: "Spanish", level: "Intermediate" },
  ],
  volunteer: [
    {
      organization: "Code for Good SF",
      role: "Volunteer Developer",
      dates: "2022 - 2023",
      description: "Helped a local nonprofit migrate their donation tracking from a spreadsheet to a simple web app.",
    },
  ],
  awards: [
    {
      title: "Hackathon 2nd Place",
      organization: "TechCrunch Disrupt",
      year: "2022",
      description: "Built a tool to visualize public transit delay patterns using open MTA data.",
    },
  ],
  publications: [],
  references: [
    { name: "Sarah Chen", roleCompany: "Engineering Manager, Relay Software", contact: "sarah.chen@relay.io", relationship: "Direct manager" },
  ],
  showReferences: false,
  custom: { title: "", content: "" },
  visibility: {
    summary: true, experience: true, education: true, skills: true,
    projects: true, certifications: true, languages: true, volunteer: true,
    awards: true, publications: false, references: false, custom: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const LS_KEY = "sounez.resumeGenerator.v2";
const LANG_LEVELS = ["Native", "Fluent", "Professional", "Intermediate", "Basic"];
const EMP_TYPES = ["Full-time", "Part-time", "Freelance", "Internship", "Contract"];
const TONES = ["Professional", "Student", "Technical", "Creative"];
const LENGTHS = ["One page", "Detailed"];
// VARIANTS used for layout rendering only — template labels are inline in the select

// ─────────────────────────────────────────────────────────────────────────────
// Reusable field wrapper
// ─────────────────────────────────────────────────────────────────────────────

function Field({ id, label, optional, children }: { id?: string; label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-medium">
        {label}{optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm";
const selectCls = "w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm";
const addBtnCls = "flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium transition hover:bg-muted";
const removeBtnCls = "flex items-center gap-1 text-xs text-destructive hover:underline";

// ─────────────────────────────────────────────────────────────────────────────
// Plain text builder
// ─────────────────────────────────────────────────────────────────────────────

function buildPlainText(s: ResumeState): string {
  const lines: string[] = [];
  const sep = "─".repeat(40);

  lines.push(s.fullName || "Your Name");
  if (s.headline) lines.push(s.headline);
  const contact = [s.email, s.phone, s.location, s.linkedin, s.website, s.github].filter(Boolean).join(" | ");
  if (contact) lines.push(contact);
  lines.push("");

  if (s.summary && s.visibility.summary) {
    lines.push("SUMMARY"); lines.push(sep); lines.push(s.summary); lines.push("");
  }

  if (s.work.some((w) => w.company || w.role) && s.visibility.experience) {
    lines.push("EXPERIENCE"); lines.push(sep);
    s.work.filter((w) => w.company || w.role).forEach((w) => {
      lines.push(`${w.role}${w.company ? ` — ${w.company}` : ""}`);
      const meta = [w.dates, w.location, w.employmentType].filter(Boolean).join(" | ");
      if (meta) lines.push(meta);
      if (w.bullets) w.bullets.split("\n").filter(Boolean).forEach((b) => lines.push(`• ${b}`));
      lines.push("");
    });
  }

  if (s.edu.some((e) => e.school || e.degree) && s.visibility.education) {
    lines.push("EDUCATION"); lines.push(sep);
    s.edu.filter((e) => e.school || e.degree).forEach((e) => {
      lines.push(`${e.degree}${e.school ? ` — ${e.school}` : ""}`);
      if (e.year || e.location) lines.push([e.year, e.location].filter(Boolean).join(" | "));
      if (e.gpa) lines.push(`GPA: ${e.gpa}`);
      if (e.coursework) lines.push(`Coursework: ${e.coursework}`);
      lines.push("");
    });
  }

  if (s.visibility.skills) {
    const all = [s.skills, s.skillGroups.technical, s.skillGroups.tools, s.skillGroups.soft, s.skillGroups.industry].filter(Boolean).join(", ");
    if (all) { lines.push("SKILLS"); lines.push(sep); lines.push(all); lines.push(""); }
  }

  if (s.projects.some((p) => p.name) && s.visibility.projects) {
    lines.push("PROJECTS"); lines.push(sep);
    s.projects.filter((p) => p.name).forEach((p) => {
      lines.push(`${p.name}${p.role ? ` (${p.role})` : ""}${p.dates ? ` — ${p.dates}` : ""}`);
      if (p.link) lines.push(p.link);
      if (p.description) lines.push(p.description);
      if (p.technologies) lines.push(`Technologies: ${p.technologies}`);
      lines.push("");
    });
  }

  if (s.certs.some((c) => c.name) && s.visibility.certifications) {
    lines.push("CERTIFICATIONS"); lines.push(sep);
    s.certs.filter((c) => c.name).forEach((c) => lines.push(`${c.name}${c.issuer ? ` — ${c.issuer}` : ""}${c.year ? ` (${c.year})` : ""}`));
    lines.push("");
  }

  if (s.langs.some((l) => l.language) && s.visibility.languages) {
    lines.push("LANGUAGES"); lines.push(sep);
    lines.push(s.langs.filter((l) => l.language).map((l) => `${l.language} — ${l.level}`).join(", "));
    lines.push("");
  }

  if (s.volunteer.some((v) => v.organization) && s.visibility.volunteer) {
    lines.push("VOLUNTEER"); lines.push(sep);
    s.volunteer.filter((v) => v.organization).forEach((v) => {
      lines.push(`${v.role}${v.organization ? ` — ${v.organization}` : ""}${v.dates ? ` (${v.dates})` : ""}`);
      if (v.description) v.description.split("\n").filter(Boolean).forEach((b) => lines.push(`• ${b}`));
      lines.push("");
    });
  }

  if (s.awards.some((a) => a.title) && s.visibility.awards) {
    lines.push("AWARDS"); lines.push(sep);
    s.awards.filter((a) => a.title).forEach((a) => {
      lines.push(`${a.title}${a.organization ? ` — ${a.organization}` : ""}${a.year ? ` (${a.year})` : ""}`);
      if (a.description) lines.push(a.description);
    });
    lines.push("");
  }

  if (s.publications.some((p) => p.title || p.publisher) && s.visibility.publications) {
    lines.push("PUBLICATIONS"); lines.push(sep);
    s.publications.filter((p) => p.title || p.publisher).forEach((p) => {
      lines.push(`${p.title}${p.publisher ? ` — ${p.publisher}` : ""}${p.year ? ` (${p.year})` : ""}`);
      if (p.link) lines.push(p.link);
      if (p.description) lines.push(p.description);
    });
    lines.push("");
  }

  if (s.visibility.references) {
    if (!s.showReferences) {
      lines.push("References available upon request.");
    } else if (s.references.some((r) => r.name)) {
      lines.push("REFERENCES"); lines.push(sep);
      s.references.filter((r) => r.name).forEach((r) => {
        lines.push(`${r.name}${r.roleCompany ? ` — ${r.roleCompany}` : ""}`);
        if (r.contact) lines.push(r.contact);
        if (r.relationship) lines.push(r.relationship);
        lines.push("");
      });
    }
  }

  if (s.custom.title && s.custom.content && s.visibility.custom) {
    lines.push(s.custom.title.toUpperCase()); lines.push(sep);
    s.custom.content.split("\n").filter(Boolean).forEach((l) => lines.push(`• ${l}`));
    lines.push("");
  }

  return lines.join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// Checklist
// ─────────────────────────────────────────────────────────────────────────────

function buildChecklist(s: ResumeState): { label: string; ok: boolean }[] {
  const actionWords = /^(built|developed|designed|led|managed|created|improved|reduced|increased|shipped|launched|wrote|refactored|migrated|implemented|collaborated|worked|set up|handled|replaced|helped|automated|coordinated)/i;
  const bulletsText = s.work.map((w) => w.bullets).join("\n");
  const bulletLines = bulletsText.split("\n").filter(Boolean);
  const hasMeasurable = /\d+\s*(%|hours|days|minutes|users|requests|clients|projects|ms|seconds|percent)/i.test(bulletsText);
  const allSkillCount =
    s.skills.split(",").filter((x) => x.trim()).length +
    s.skillGroups.technical.split(",").filter((x) => x.trim()).length +
    s.skillGroups.tools.split(",").filter((x) => x.trim()).length;
  const hasEntry =
    s.work.some((w) => w.company || w.role) ||
    s.projects.some((p) => p.name) ||
    s.edu.some((e) => e.school || e.degree);

  return [
    { label: "Name added", ok: s.fullName.trim().length > 0 },
    { label: "Email or phone added", ok: !!(s.email.trim() || s.phone.trim()) },
    { label: "Summary written (20+ characters)", ok: s.summary.trim().length > 20 },
    { label: "At least one experience, project, or education entry", ok: hasEntry },
    { label: "At least five skills added", ok: allSkillCount >= 5 },
    { label: "Bullet points start with action verbs", ok: bulletLines.some((l) => actionWords.test(l.trim())) },
    { label: "At least one measurable result included", ok: hasMeasurable },
    {
      label: "No empty required section shown in preview",
      ok: !(
        (s.visibility.experience && !s.work.some((w) => w.company || w.role)) ||
        (s.visibility.education && !s.edu.some((e) => e.school || e.degree))
      ),
    },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyword analysis
// ─────────────────────────────────────────────────────────────────────────────

function buildKeywordAnalysis(s: ResumeState): { matched: string[]; missing: string[] } {
  const rawKws = s.targetKeywords.split(",").map((k) => k.trim()).filter(Boolean);
  if (rawKws.length === 0) return { matched: [], missing: [] };

  const resumeText = [
    s.fullName, s.headline, s.summary, s.skills,
    s.skillGroups.technical, s.skillGroups.tools, s.skillGroups.soft, s.skillGroups.industry,
    ...s.work.map((w) => `${w.role} ${w.company} ${w.bullets}`),
    ...s.edu.map((e) => `${e.degree} ${e.school} ${e.coursework}`),
    ...s.projects.map((p) => `${p.name} ${p.description} ${p.technologies}`),
    ...s.certs.map((c) => `${c.name} ${c.issuer}`),
    ...s.langs.map((l) => l.language),
  ].join(" ").toLowerCase();

  const matched: string[] = [];
  const missing: string[] = [];
  for (const kw of rawKws) {
    (resumeText.includes(kw.toLowerCase()) ? matched : missing).push(kw);
  }
  return { matched, missing };
}

// ─────────────────────────────────────────────────────────────────────────────
// Preview section heading (template-aware)
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeading({ label, variant }: { label: string; variant: string }) {
  if (variant === "Modern") {
    return <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 border-b border-blue-200 pb-0.5 mb-2">{label}</h2>;
  }
  if (variant === "Compact") {
    return <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{label}</h2>;
  }
  if (variant === "Creative") {
    return <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-800 pb-0.5 mb-2">{label}</h2>;
  }
  if (variant === "Student") {
    return <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600 border-l-2 border-gray-400 pl-2 mb-2">{label}</h2>;
  }
  return <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{label}</h2>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export function ResumeClient({ tool }: { tool: Tool }) {
  const [state, setState] = useState<ResumeState>(defaultState);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [showSections, setShowSections] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  useToolView(tool);

  const set = useCallback(
    <K extends keyof ResumeState>(key: K, val: ResumeState[K]) =>
      setState((prev) => ({ ...prev, [key]: val })),
    []
  );

  const updateWork = (i: number, field: keyof WorkEntry, val: string | boolean) =>
    setState((prev) => ({ ...prev, work: prev.work.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)) }));

  const updateEdu = (i: number, field: keyof EduEntry, val: string) =>
    setState((prev) => ({ ...prev, edu: prev.edu.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)) }));

  const updateProject = (i: number, field: keyof ProjectEntry, val: string) =>
    setState((prev) => ({ ...prev, projects: prev.projects.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)) }));

  const updateCert = (i: number, field: keyof CertEntry, val: string) =>
    setState((prev) => ({ ...prev, certs: prev.certs.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)) }));

  const updateLang = (i: number, field: keyof LangEntry, val: string) =>
    setState((prev) => ({ ...prev, langs: prev.langs.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)) }));

  const updateVolunteer = (i: number, field: keyof VolunteerEntry, val: string) =>
    setState((prev) => ({ ...prev, volunteer: prev.volunteer.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)) }));

  const updateAward = (i: number, field: keyof AwardEntry, val: string) =>
    setState((prev) => ({ ...prev, awards: prev.awards.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)) }));

  const updatePublication = (i: number, field: keyof PublicationEntry, val: string) =>
    setState((prev) => ({ ...prev, publications: prev.publications.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)) }));

  const updateReference = (i: number, field: keyof ReferenceEntry, val: string) =>
    setState((prev) => ({ ...prev, references: prev.references.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)) }));

  const toggleVisibility = (key: keyof SectionVisibility) =>
    setState((prev) => ({ ...prev, visibility: { ...prev.visibility, [key]: !prev.visibility[key] } }));

  // ── localStorage ──────────────────────────────────────────────────────────

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ResumeState>;
        setState((prev) => ({
          ...prev, ...parsed,
          visibility: { ...defaultVisibility(), ...(parsed.visibility ?? {}) },
        }));
        setSavedAt(new Date().toLocaleTimeString());
      }
    } catch { /* corrupt — ignore */ }
  }, []);

  const handleSave = useCallback(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
      setSavedAt(new Date().toLocaleTimeString());
      toast.success("Saved to browser storage");
    } catch { toast.error("Could not save — storage might be full."); }
  }, [state]);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(state));
        setSavedAt(new Date().toLocaleTimeString());
      } catch { /* ignore */ }
    }, 1500);
    return () => clearTimeout(t);
  }, [state]);

  const handleClear = () => {
    if (!window.confirm("Clear all resume data? This cannot be undone.")) return;
    localStorage.removeItem(LS_KEY);
    setState(defaultState());
    setSavedAt(null);
    toast.success("Resume cleared");
  };

  const handleLoadExample = () => {
    setState(EXAMPLE_STATE);
    toast.success("Example profile loaded");
  };

  // ── Photo upload ──────────────────────────────────────────────────────────

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Use an image under 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      const img = document.createElement("img");
      img.onload = () => {
        const maxDim = 280;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        set("photoDataUrl", canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // ── Print CSS ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "resume-print-css";
    style.textContent = `
      @media print {
        @page { size: A4; margin: 14mm 16mm; }
        body > * { display: none !important; }
        #resume-print-target {
          display: block !important; position: fixed; inset: 0;
          z-index: 9999; background: white; color: black;
          font-family: Inter, sans-serif; font-size: 11pt;
        }
        #resume-print-target h2 { page-break-after: avoid; }
        #resume-print-target > div > div { page-break-inside: avoid; }
        #resume-print-target a { color: #1d4ed8; text-decoration: none; }
        #resume-print-target * { background: white !important; color: black !important; border-color: #ddd !important; box-shadow: none !important; }
        #resume-print-target h1 { color: black !important; }
        #resume-print-target .skill-tag { border: 1px solid #ccc !important; background: #f9f9f9 !important; color: black !important; }
        #resume-print-target img { display: block; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.getElementById("resume-print-css")?.remove(); };
  }, []);

  const handlePrint = () => {
    if (!previewRef.current) return;
    const printDiv = document.createElement("div");
    printDiv.id = "resume-print-target";
    printDiv.style.display = "none";
    printDiv.innerHTML = previewRef.current.innerHTML;
    document.body.appendChild(printDiv);
    window.print();
    document.body.removeChild(printDiv);
    toast.success("Print dialog opened", { description: "Set margins to None for best results." });
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "resume_pdf" });
    trackDownloadResult({ tool_slug: tool.slug, result_type: "resume", file_type: "pdf" });
  };

  const handleCopyHtml = () => {
    if (!previewRef.current) return;
    navigator.clipboard.writeText(previewRef.current.innerHTML);
    toast.success("HTML copied to clipboard");
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "resume_html" });
    trackCopyResult({ tool_slug: tool.slug, result_type: "resume_html" });
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(buildPlainText(state));
    toast.success("Plain text copied to clipboard");
    trackCopyResult({ tool_slug: tool.slug, result_type: "resume_text" });
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Resume data exported");
    trackDownloadResult({ tool_slug: tool.slug, result_type: "resume_data", file_type: "json" });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as Partial<ResumeState>;
        if (typeof parsed !== "object" || !parsed) throw new Error("invalid");
        setState((prev) => ({
          ...prev, ...parsed,
          visibility: { ...defaultVisibility(), ...(parsed.visibility ?? {}) },
        }));
        toast.success("Resume data imported");
      } catch { toast.error("Could not import — file may be invalid or from a different version."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // ── Computed values ───────────────────────────────────────────────────────

  const checklist = buildChecklist(state);
  const checkScore = checklist.filter((c) => c.ok).length;
  const kwAnalysis = buildKeywordAnalysis(state);
  const kwTotal = kwAnalysis.matched.length + kwAnalysis.missing.length;
  const generalSkills = state.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const hasGroupedSkills = !!(state.skillGroups.technical || state.skillGroups.tools || state.skillGroups.soft || state.skillGroups.industry);
  const variant = state.layoutVariant;
  const sc = variant === "Compact" ? "mb-2" : "mb-4"; // section spacing
  const showPhoto = state.includePhoto && !!state.photoDataUrl && (variant === "Modern" || variant === "Creative");

  // ── Preview section render helpers ───────────────────────────────────────

  const renderSummary = () =>
    state.summary && state.visibility.summary ? (
      <div className={sc}>
        <SectionHeading label="Summary" variant={variant} />
        <p className="text-sm text-gray-700">{state.summary}</p>
      </div>
    ) : null;

  const renderExperience = () =>
    state.work.some((w) => w.company || w.role) && state.visibility.experience ? (
      <div className={sc}>
        <SectionHeading label="Experience" variant={variant} />
        <div className={variant === "Compact" ? "space-y-2" : "space-y-3"}>
          {state.work.filter((w) => w.company || w.role).map((w, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-gray-900">{w.role || "Role"}</span>
                <span className="text-xs text-gray-400">{w.dates}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1">
                {w.company && <span>{w.company}</span>}
                {w.location && <span>· {w.location}</span>}
                {w.employmentType && w.employmentType !== "Full-time" && (
                  <span className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px]">{w.employmentType}</span>
                )}
              </div>
              {w.bullets && (
                <ul className="list-disc list-inside space-y-0.5">
                  {w.bullets.split("\n").filter(Boolean).map((b, j) => (
                    <li key={j} className="text-xs text-gray-700">{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderEducation = () =>
    state.edu.some((e) => e.school || e.degree) && state.visibility.education ? (
      <div className={sc}>
        <SectionHeading label="Education" variant={variant} />
        <div className="space-y-2">
          {state.edu.filter((e) => e.school || e.degree).map((e, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-gray-900">{e.degree || "Degree"}</span>
                <span className="text-xs text-gray-400">{e.year}</span>
              </div>
              <div className="text-xs text-gray-500">{e.school}{e.location && ` · ${e.location}`}</div>
              {e.gpa && <div className="text-xs text-gray-500">GPA: {e.gpa}</div>}
              {e.coursework && <div className="text-xs text-gray-500">Coursework: {e.coursework}</div>}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderSkills = () =>
    state.visibility.skills && (generalSkills.length > 0 || hasGroupedSkills) ? (
      <div className={sc}>
        <SectionHeading label="Skills" variant={variant} />
        {hasGroupedSkills ? (
          <div className="space-y-1">
            {([
              { key: "technical" as const, label: "Technical" },
              { key: "tools" as const, label: "Tools" },
              { key: "soft" as const, label: "Soft skills" },
              { key: "industry" as const, label: "Industry" },
            ]).map(({ key, label }) => {
              const items = state.skillGroups[key].split(",").map((s) => s.trim()).filter(Boolean);
              if (items.length === 0) return null;
              return (
                <div key={key} className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-xs font-semibold text-gray-600 min-w-[70px]">{label}:</span>
                  <span className="text-xs text-gray-700">{items.join(", ")}</span>
                </div>
              );
            })}
            {generalSkills.length > 0 && !hasGroupedSkills && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {generalSkills.map((s, i) => (
                  <span key={i} className="skill-tag rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">{s}</span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {generalSkills.map((s, i) => (
              <span key={i} className="skill-tag rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">{s}</span>
            ))}
          </div>
        )}
      </div>
    ) : null;

  const renderProjects = () =>
    state.projects.some((p) => p.name) && state.visibility.projects ? (
      <div className={sc}>
        <SectionHeading label="Projects" variant={variant} />
        <div className={variant === "Compact" ? "space-y-2" : "space-y-3"}>
          {state.projects.filter((p) => p.name).map((p, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-gray-900">
                  {p.link ? <a href={p.link} className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">{p.name}</a> : p.name}
                  {p.role && <span className="font-normal text-gray-500 ml-1 text-xs">({p.role})</span>}
                </span>
                {p.dates && <span className="text-xs text-gray-400">{p.dates}</span>}
              </div>
              {p.description && <p className="text-xs text-gray-700 mt-0.5">{p.description}</p>}
              {p.technologies && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {p.technologies.split(",").map((t) => t.trim()).filter(Boolean).map((t, j) => (
                    <span key={j} className="skill-tag rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] text-gray-600">{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderCerts = () =>
    state.certs.some((c) => c.name) && state.visibility.certifications ? (
      <div className={sc}>
        <SectionHeading label="Certifications" variant={variant} />
        <div className="space-y-1">
          {state.certs.filter((c) => c.name).map((c, i) => (
            <div key={i} className="flex items-baseline justify-between">
              <span className="text-sm text-gray-800">
                {c.url ? <a href={c.url} className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">{c.name}</a> : c.name}
                {c.issuer && <span className="text-xs text-gray-500 ml-1">— {c.issuer}</span>}
              </span>
              {c.year && <span className="text-xs text-gray-400">{c.year}</span>}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderLanguages = () =>
    state.langs.some((l) => l.language) && state.visibility.languages ? (
      <div className={sc}>
        <SectionHeading label="Languages" variant={variant} />
        <p className="text-xs text-gray-700">
          {state.langs.filter((l) => l.language).map((l) => `${l.language} — ${l.level}`).join(" · ")}
        </p>
      </div>
    ) : null;

  const renderVolunteer = () =>
    state.volunteer.some((v) => v.organization) && state.visibility.volunteer ? (
      <div className={sc}>
        <SectionHeading label="Volunteer" variant={variant} />
        <div className="space-y-2">
          {state.volunteer.filter((v) => v.organization).map((v, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold text-gray-800">{v.role} — {v.organization}</span>
                {v.dates && <span className="text-xs text-gray-400">{v.dates}</span>}
              </div>
              {v.description && (
                <ul className="list-disc list-inside">
                  {v.description.split("\n").filter(Boolean).map((b, j) => (
                    <li key={j} className="text-xs text-gray-700">{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderAwards = () =>
    state.awards.some((a) => a.title) && state.visibility.awards ? (
      <div className={sc}>
        <SectionHeading label="Awards" variant={variant} />
        <div className="space-y-1">
          {state.awards.filter((a) => a.title).map((a, i) => (
            <div key={i} className="flex items-baseline justify-between">
              <span className="text-xs text-gray-800 font-medium">
                {a.title}
                {a.organization && <span className="font-normal text-gray-500 ml-1">— {a.organization}</span>}
              </span>
              {a.year && <span className="text-xs text-gray-400">{a.year}</span>}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderPublications = () =>
    state.publications.some((p) => p.title || p.publisher) && state.visibility.publications ? (
      <div className={sc}>
        <SectionHeading label="Publications" variant={variant} />
        <div className="space-y-1">
          {state.publications.filter((p) => p.title || p.publisher).map((p, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-gray-800">
                  {p.link ? <a href={p.link} className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">{p.title}</a> : p.title}
                  {p.publisher && <span className="font-normal text-gray-500 ml-1">— {p.publisher}</span>}
                </span>
                {p.year && <span className="text-xs text-gray-400">{p.year}</span>}
              </div>
              {p.description && <p className="text-xs text-gray-600">{p.description}</p>}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderReferences = () =>
    state.visibility.references ? (
      <div className={sc}>
        {state.showReferences && state.references.some((r) => r.name) ? (
          <>
            <SectionHeading label="References" variant={variant} />
            <div className="space-y-2">
              {state.references.filter((r) => r.name).map((r, i) => (
                <div key={i}>
                  <span className="text-xs font-semibold text-gray-800">{r.name}</span>
                  {r.roleCompany && <span className="text-xs text-gray-500 ml-1">— {r.roleCompany}</span>}
                  <div className="text-xs text-gray-500">{[r.contact, r.relationship].filter(Boolean).join(" · ")}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          state.references.length > 0 && (
            <p className="text-xs text-gray-500 italic">References available upon request.</p>
          )
        )}
      </div>
    ) : null;

  const renderCustom = () =>
    state.custom.title && state.custom.content && state.visibility.custom ? (
      <div className={sc}>
        <SectionHeading label={state.custom.title.toUpperCase()} variant={variant} />
        <ul className="list-disc list-inside space-y-0.5">
          {state.custom.content.split("\n").filter(Boolean).map((line, i) => (
            <li key={i} className="text-xs text-gray-700">{line}</li>
          ))}
        </ul>
      </div>
    ) : null;

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <ToolPageShell
      tool={tool}
      intro="A free ATS-friendly resume builder for 2026. Fill in your details and export a clean professional resume as PDF, HTML, or plain text — no account needed, nothing uploaded to any server."
      features={[
        { title: "ATS-ready templates", desc: "Classic, Compact, Modern, Creative, and Student layouts — all clean and readable by applicant tracking systems." },
        { title: "Live preview", desc: "See your resume update as you type. Switch templates instantly." },
        { title: "PDF export", desc: "Print to PDF via your browser. Works on Chrome, Firefox, and Edge — no library required." },
        { title: "Export & import JSON", desc: "Save a full backup of your resume data and reload it any time." },
        { title: "Keyword match checker", desc: "Paste keywords from a job description and see which ones appear in your resume." },
        { title: "Optional photo", desc: "Add a profile photo for Modern or Creative templates. Hidden by default — most ATS systems don't need one." },
        { title: "Copy as HTML or plain text", desc: "Paste your resume directly into a web form or text document." },
        { title: "Stays in your browser", desc: "Data is stored in localStorage only. Nothing leaves your device." },
      ]}
      howTo={[
        "Start with your name, headline, email, and location.",
        "Add work experience with concrete, result-focused bullet points.",
        "Fill in education, skills, and any projects or certifications.",
        "Paste keywords from the job posting into the keyword checker to see what you might be missing.",
        "Choose a template, check the preview, and export as PDF or copy the text.",
      ]}
      faqs={[
        {
          q: "Is this a free resume builder?",
          a: "Yes, fully free. No account, no paywall, no watermark on the PDF.",
        },
        {
          q: "Is my data saved anywhere?",
          a: "No. Everything is stored in your browser's localStorage only. Nothing is uploaded. Use Export data to keep a JSON backup you can reload anytime.",
        },
        {
          q: "Is this resume template ATS-friendly?",
          a: "The Classic template is designed to be ATS-compatible — single column, no tables, no images. Modern and Creative templates add visual elements that may not parse well in some ATS systems.",
        },
        {
          q: "Should I include a photo?",
          a: "In the US and UK, most recruiters do not expect a photo and some ATS systems discard resumes with photos. In Germany, France, and some other countries, a professional photo is common. The photo option is off by default for this reason.",
        },
        {
          q: "What does the keyword checker do?",
          a: "It checks whether the keywords you paste appear anywhere in your resume text. Keywords should fit naturally — do not paste a block of keywords at the bottom just to game the system.",
        },
        {
          q: "What if the PDF layout looks wrong?",
          a: "In the print dialog, set margins to None and enable Background graphics. Use the Compact template if your content overflows a single page.",
        },
        {
          q: "Can I export and import my resume data?",
          a: "Yes. Use Export data to download a JSON file with everything you have entered. Import data loads it back — useful if you switch browsers or devices.",
        },
      ]}
      examples={[
        { title: "Frontend developer, 3 years", desc: "React, TypeScript, Next.js. Experience with internal tools and customer-facing portals. ATS Classic template." },
        { title: "Career switcher", desc: "Strong summary that highlights transferable skills from a previous field, with a skills-first layout." },
        { title: "Student / recent graduate", desc: "Student template puts education and projects first. One work entry plus volunteer experience." },
        { title: "Creative or portfolio role", desc: "Creative template with an optional photo, clean typography, and a publications or portfolio section." },
      ]}
      mistakes={[
        "Listing technologies you cannot discuss in an interview.",
        "Closing the tab without exporting — localStorage is cleared when you clear browser data.",
        "Using a two-page layout when a one-pager is expected for early-career roles.",
        "Stuffing keywords at the bottom of your resume — they need to appear naturally in your experience.",
        "Copying the example content verbatim instead of writing your own.",
      ]}
      privacyNote="All resume data is stored in your browser only. Sounez does not collect, upload, or store your CV or personal details on any server."
      whenNotToUse="Do not use this tool to fabricate degrees, employers, or certifications. Review every line before sending your resume."
    >
      <div className="grid gap-8 lg:grid-cols-2">

        {/* ════════════════════════════════════════════════════════ FORM ══ */}
        <div className="space-y-6 text-sm">

          {/* ── Personal info ─────────────────────────────────────────── */}
          <section>
            <h2 className="mb-3 font-semibold text-base">Personal info</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="r-name" label="Full name">
                <input id="r-name" type="text" value={state.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Alex Morgan" className={inputCls} />
              </Field>
              <Field id="r-headline" label="Professional title" optional>
                <input id="r-headline" type="text" value={state.headline} onChange={(e) => set("headline", e.target.value)} placeholder="Frontend Developer" className={inputCls} />
              </Field>
              <Field id="r-email" label="Email">
                <input id="r-email" type="email" value={state.email} onChange={(e) => set("email", e.target.value)} placeholder="alex@example.com" className={inputCls} />
              </Field>
              <Field id="r-phone" label="Phone">
                <input id="r-phone" type="text" value={state.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 555 000 0000" className={inputCls} />
              </Field>
              <Field id="r-location" label="City / country">
                <input id="r-location" type="text" value={state.location} onChange={(e) => set("location", e.target.value)} placeholder="San Francisco, CA" className={inputCls} />
              </Field>
              <Field id="r-workauth" label="Work authorization" optional>
                <input id="r-workauth" type="text" value={state.workAuth} onChange={(e) => set("workAuth", e.target.value)} placeholder="Authorized to work in the US" className={inputCls} />
              </Field>
              <Field id="r-linkedin" label="LinkedIn" optional>
                <input id="r-linkedin" type="url" value={state.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/you" className={inputCls} />
              </Field>
              <Field id="r-website" label="Portfolio / website" optional>
                <input id="r-website" type="url" value={state.website} onChange={(e) => set("website", e.target.value)} placeholder="https://yoursite.com" className={inputCls} />
              </Field>
              <div className="sm:col-span-2">
                <Field id="r-github" label="GitHub" optional>
                  <input id="r-github" type="url" value={state.github} onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/you" className={inputCls} />
                </Field>
              </div>
            </div>
          </section>

          {/* ── Resume settings ───────────────────────────────────────── */}
          <section>
            <h2 className="mb-3 font-semibold text-base">Resume settings</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field id="r-target" label="Target job title" optional>
                  <input id="r-target" type="text" value={state.targetRole} onChange={(e) => set("targetRole", e.target.value)} placeholder="Senior Frontend Developer" className={inputCls} />
                  <p className="mt-1 text-xs text-muted-foreground">Shown in the preview header if no professional title is set.</p>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="r-target-kw" label="Target keywords" optional>
                  <input
                    id="r-target-kw"
                    type="text"
                    value={state.targetKeywords}
                    onChange={(e) => set("targetKeywords", e.target.value)}
                    placeholder="REST API, PostgreSQL, Agile, CI/CD, AWS"
                    className={inputCls}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Paste keywords from the job description. The keyword checker below shows which ones appear in your resume.</p>
                </Field>
              </div>
              <Field id="r-tone" label="Tone">
                <select id="r-tone" value={state.tone} onChange={(e) => set("tone", e.target.value)} className={selectCls}>
                  {TONES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field id="r-length" label="Length preference">
                <select id="r-length" value={state.lengthPref} onChange={(e) => set("lengthPref", e.target.value)} className={selectCls}>
                  {LENGTHS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field id="r-variant" label="Template">
                  <select id="r-variant" value={state.layoutVariant} onChange={(e) => set("layoutVariant", e.target.value)} className={selectCls}>
                    <option value="Classic">Classic — ATS-friendly, single column, no photo</option>
                    <option value="Compact">Compact — tight spacing, good for one-pagers</option>
                    <option value="Modern">Modern — clean layout, optional photo</option>
                    <option value="Creative">Creative — bolder headings, optional photo</option>
                    <option value="Student">Student — education and projects first</option>
                  </select>
                </Field>
              </div>

              {/* ── Photo ─────────────────────────────────────────── */}
              <div className="sm:col-span-2">
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between mb-1">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-sm">
                      <input
                        type="checkbox"
                        id="r-include-photo"
                        checked={state.includePhoto}
                        onChange={(e) => set("includePhoto", e.target.checked)}
                        className="h-4 w-4 rounded"
                      />
                      Include photo
                    </label>
                    {state.photoDataUrl && (
                      <button type="button" onClick={() => set("photoDataUrl", "")} className={removeBtnCls}>
                        <X className="h-3.5 w-3.5" /> Remove photo
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Most ATS systems and recruiters in the US and UK do not expect a photo. Use one only if it is standard in your region or industry (e.g. parts of Europe, creative roles). Shown only in Modern and Creative templates.
                  </p>
                  {state.includePhoto && (
                    <div className="flex items-center gap-3 flex-wrap">
                      {state.photoDataUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={state.photoDataUrl} alt="Profile preview" className="h-16 w-16 rounded-full object-cover border border-border flex-shrink-0" />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center border border-border flex-shrink-0">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <button type="button" onClick={() => photoInputRef.current?.click()} className={addBtnCls}>
                        <ImageIcon className="h-3.5 w-3.5" />
                        {state.photoDataUrl ? "Change photo" : "Upload photo"}
                      </button>
                      <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── Summary ───────────────────────────────────────────────── */}
          <section>
            <h2 className="mb-3 font-semibold text-base">Professional summary</h2>
            <textarea
              id="r-summary"
              value={state.summary}
              onChange={(e) => set("summary", e.target.value)}
              rows={3}
              placeholder="Two or three sentences about your background and what you are looking for. Avoid phrases like 'results-driven professional' — describe what you actually do."
              className={inputCls}
            />
          </section>

          {/* ── Skills ────────────────────────────────────────────────── */}
          <section>
            <h2 className="mb-3 font-semibold text-base">Skills</h2>
            <Field id="r-skills" label="General skills">
              <input id="r-skills" type="text" value={state.skills} onChange={(e) => set("skills", e.target.value)} placeholder="React, TypeScript, Node.js, Figma" className={inputCls} />
            </Field>
            <p className="mt-2 mb-3 text-xs text-muted-foreground">Add grouped categories below for a cleaner breakdown in the preview. Leave blank if not needed.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {([
                { key: "technical" as const, label: "Technical skills", placeholder: "React, TypeScript, REST API, PostgreSQL" },
                { key: "tools" as const, label: "Tools", placeholder: "Figma, GitHub, Vercel, Linear" },
                { key: "soft" as const, label: "Soft skills", placeholder: "Code reviews, async communication" },
                { key: "industry" as const, label: "Industry knowledge", placeholder: "SaaS, internal tools, e-commerce" },
              ]).map(({ key, label, placeholder }) => (
                <Field key={key} label={label} optional>
                  <input
                    type="text"
                    value={state.skillGroups[key]}
                    onChange={(e) => setState((prev) => ({ ...prev, skillGroups: { ...prev.skillGroups, [key]: e.target.value } }))}
                    placeholder={placeholder}
                    className={inputCls}
                  />
                </Field>
              ))}
            </div>
          </section>

          {/* ── Work experience ───────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">Work experience</h2>
              <button type="button" onClick={() => setState((p) => ({ ...p, work: [...p.work, emptyWork()] }))} className={addBtnCls}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {state.work.map((w, i) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Job title">
                      <input type="text" value={w.role} onChange={(e) => updateWork(i, "role", e.target.value)} placeholder="Frontend Developer" className={inputCls} />
                    </Field>
                    <Field label="Company">
                      <input type="text" value={w.company} onChange={(e) => updateWork(i, "company", e.target.value)} placeholder="Acme Corp" className={inputCls} />
                    </Field>
                    <Field label="Location" optional>
                      <input type="text" value={w.location} onChange={(e) => updateWork(i, "location", e.target.value)} placeholder="New York, NY · Remote" className={inputCls} />
                    </Field>
                    <Field label="Employment type">
                      <select value={w.employmentType} onChange={(e) => updateWork(i, "employmentType", e.target.value)} className={selectCls}>
                        {EMP_TYPES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Dates">
                      <input type="text" value={w.dates} onChange={(e) => updateWork(i, "dates", e.target.value)} placeholder={w.isCurrent ? "Jan 2023 - Present" : "Jan 2022 - Dec 2023"} className={inputCls} />
                    </Field>
                    <div className="flex items-center gap-2 pt-5">
                      <input
                        type="checkbox" id={`r-current-${i}`}
                        checked={w.isCurrent}
                        onChange={(e) => updateWork(i, "isCurrent", e.target.checked)}
                        className="h-4 w-4 rounded"
                      />
                      <label htmlFor={`r-current-${i}`} className="text-sm">Current role</label>
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Achievements / bullet points" optional>
                        <textarea
                          value={w.bullets}
                          onChange={(e) => updateWork(i, "bullets", e.target.value)}
                          rows={3}
                          placeholder={"Built a dashboard that cut response time from 18 min to 11 min.\nReduced manual reporting by around 4 hours per week.\nWorked with the designer to improve the onboarding flow."}
                          className={inputCls}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">One bullet per line. Start with an action verb. Include numbers where you can.</p>
                      </Field>
                    </div>
                  </div>
                  {state.work.length > 1 && (
                    <button type="button" onClick={() => setState((p) => ({ ...p, work: p.work.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Projects ──────────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">Projects</h2>
              <button type="button" onClick={() => setState((p) => ({ ...p, projects: [...p.projects, emptyProject()] }))} className={addBtnCls}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            {state.projects.length === 0 && <p className="text-xs text-muted-foreground">No projects yet. Click Add to include side projects, open source work, or portfolio pieces.</p>}
            <div className="space-y-4">
              {state.projects.map((p, i) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Project name">
                      <input type="text" value={p.name} onChange={(e) => updateProject(i, "name", e.target.value)} placeholder="Open Requests Board" className={inputCls} />
                    </Field>
                    <Field label="Your role" optional>
                      <input type="text" value={p.role} onChange={(e) => updateProject(i, "role", e.target.value)} placeholder="Solo developer" className={inputCls} />
                    </Field>
                    <Field label="Dates" optional>
                      <input type="text" value={p.dates} onChange={(e) => updateProject(i, "dates", e.target.value)} placeholder="2023" className={inputCls} />
                    </Field>
                    <Field label="Link" optional>
                      <input type="url" value={p.link} onChange={(e) => updateProject(i, "link", e.target.value)} placeholder="https://github.com/you/project" className={inputCls} />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Description" optional>
                        <textarea value={p.description} onChange={(e) => updateProject(i, "description", e.target.value)} rows={2} placeholder="What the project does and what it achieved. Keep it short and concrete." className={inputCls} />
                      </Field>
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Technologies" optional>
                        <input type="text" value={p.technologies} onChange={(e) => updateProject(i, "technologies", e.target.value)} placeholder="React, TypeScript, SQLite" className={inputCls} />
                      </Field>
                    </div>
                  </div>
                  <button type="button" onClick={() => setState((prev) => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Education ─────────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">Education</h2>
              <button type="button" onClick={() => setState((p) => ({ ...p, edu: [...p.edu, emptyEdu()] }))} className={addBtnCls}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {state.edu.map((e, i) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Degree">
                      <input type="text" value={e.degree} onChange={(ev) => updateEdu(i, "degree", ev.target.value)} placeholder="B.Sc. Computer Science" className={inputCls} />
                    </Field>
                    <Field label="School">
                      <input type="text" value={e.school} onChange={(ev) => updateEdu(i, "school", ev.target.value)} placeholder="University of California" className={inputCls} />
                    </Field>
                    <Field label="Graduation year">
                      <input type="text" value={e.year} onChange={(ev) => updateEdu(i, "year", ev.target.value)} placeholder="2021" className={inputCls} />
                    </Field>
                    <Field label="Location" optional>
                      <input type="text" value={e.location} onChange={(ev) => updateEdu(i, "location", ev.target.value)} placeholder="Berkeley, CA" className={inputCls} />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="GPA / honors" optional>
                        <input type="text" value={e.gpa} onChange={(ev) => updateEdu(i, "gpa", ev.target.value)} placeholder="3.8 / 4.0 — Dean's List" className={inputCls} />
                      </Field>
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Relevant coursework" optional>
                        <input type="text" value={e.coursework} onChange={(ev) => updateEdu(i, "coursework", ev.target.value)} placeholder="Web Technologies, Databases, HCI" className={inputCls} />
                      </Field>
                    </div>
                  </div>
                  {state.edu.length > 1 && (
                    <button type="button" onClick={() => setState((p) => ({ ...p, edu: p.edu.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Certifications ────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">Certifications</h2>
              <button type="button" onClick={() => setState((p) => ({ ...p, certs: [...p.certs, emptyCert()] }))} className={addBtnCls}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            {state.certs.length === 0 && <p className="text-xs text-muted-foreground">No certifications yet.</p>}
            <div className="space-y-4">
              {state.certs.map((c, i) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Certification name">
                      <input type="text" value={c.name} onChange={(e) => updateCert(i, "name", e.target.value)} placeholder="AWS Certified Cloud Practitioner" className={inputCls} />
                    </Field>
                    <Field label="Issuer">
                      <input type="text" value={c.issuer} onChange={(e) => updateCert(i, "issuer", e.target.value)} placeholder="Amazon Web Services" className={inputCls} />
                    </Field>
                    <Field label="Year" optional>
                      <input type="text" value={c.year} onChange={(e) => updateCert(i, "year", e.target.value)} placeholder="2023" className={inputCls} />
                    </Field>
                    <Field label="Credential URL" optional>
                      <input type="url" value={c.url} onChange={(e) => updateCert(i, "url", e.target.value)} placeholder="https://credential.net/..." className={inputCls} />
                    </Field>
                  </div>
                  <button type="button" onClick={() => setState((prev) => ({ ...prev, certs: prev.certs.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Languages ─────────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">Languages</h2>
              <button type="button" onClick={() => setState((p) => ({ ...p, langs: [...p.langs, emptyLang()] }))} className={addBtnCls}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            {state.langs.length === 0 && <p className="text-xs text-muted-foreground">No languages yet.</p>}
            <div className="space-y-3">
              {state.langs.map((l, i) => (
                <div key={i} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Field label="Language">
                      <input type="text" value={l.language} onChange={(e) => updateLang(i, "language", e.target.value)} placeholder="French" className={inputCls} />
                    </Field>
                  </div>
                  <div className="w-36">
                    <Field label="Level">
                      <select value={l.level} onChange={(e) => updateLang(i, "level", e.target.value)} className={selectCls}>
                        {LANG_LEVELS.map((lv) => <option key={lv}>{lv}</option>)}
                      </select>
                    </Field>
                  </div>
                  <button type="button" onClick={() => setState((prev) => ({ ...prev, langs: prev.langs.filter((_, idx) => idx !== i) }))} className={`${removeBtnCls} pb-2`}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Volunteer ─────────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">Volunteer experience</h2>
              <button type="button" onClick={() => setState((p) => ({ ...p, volunteer: [...p.volunteer, emptyVolunteer()] }))} className={addBtnCls}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            {state.volunteer.length === 0 && <p className="text-xs text-muted-foreground">No volunteer entries yet.</p>}
            <div className="space-y-4">
              {state.volunteer.map((v, i) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Organization">
                      <input type="text" value={v.organization} onChange={(e) => updateVolunteer(i, "organization", e.target.value)} placeholder="Code for Good" className={inputCls} />
                    </Field>
                    <Field label="Role">
                      <input type="text" value={v.role} onChange={(e) => updateVolunteer(i, "role", e.target.value)} placeholder="Volunteer Developer" className={inputCls} />
                    </Field>
                    <Field label="Dates" optional>
                      <input type="text" value={v.dates} onChange={(e) => updateVolunteer(i, "dates", e.target.value)} placeholder="2022 - 2023" className={inputCls} />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Description" optional>
                        <textarea value={v.description} onChange={(e) => updateVolunteer(i, "description", e.target.value)} rows={2} placeholder="What you did and what it achieved." className={inputCls} />
                      </Field>
                    </div>
                  </div>
                  <button type="button" onClick={() => setState((prev) => ({ ...prev, volunteer: prev.volunteer.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Awards ────────────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">Awards &amp; achievements</h2>
              <button type="button" onClick={() => setState((p) => ({ ...p, awards: [...p.awards, emptyAward()] }))} className={addBtnCls}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            {state.awards.length === 0 && <p className="text-xs text-muted-foreground">No awards yet.</p>}
            <div className="space-y-4">
              {state.awards.map((a, i) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Title">
                      <input type="text" value={a.title} onChange={(e) => updateAward(i, "title", e.target.value)} placeholder="Hackathon 2nd Place" className={inputCls} />
                    </Field>
                    <Field label="Organization" optional>
                      <input type="text" value={a.organization} onChange={(e) => updateAward(i, "organization", e.target.value)} placeholder="TechCrunch Disrupt" className={inputCls} />
                    </Field>
                    <Field label="Year" optional>
                      <input type="text" value={a.year} onChange={(e) => updateAward(i, "year", e.target.value)} placeholder="2022" className={inputCls} />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Description" optional>
                        <input type="text" value={a.description} onChange={(e) => updateAward(i, "description", e.target.value)} placeholder="Built a public transit delay visualizer using open MTA data." className={inputCls} />
                      </Field>
                    </div>
                  </div>
                  <button type="button" onClick={() => setState((prev) => ({ ...prev, awards: prev.awards.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Publications ──────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">Publications &amp; portfolio items</h2>
              <button type="button" onClick={() => setState((p) => ({ ...p, publications: [...p.publications, emptyPublication()] }))} className={addBtnCls}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            {state.publications.length === 0 && <p className="text-xs text-muted-foreground">No publications yet.</p>}
            <div className="space-y-4">
              {state.publications.map((pub, i) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Title">
                      <input type="text" value={pub.title} onChange={(e) => updatePublication(i, "title", e.target.value)} placeholder="How we cut deploy time by 60%" className={inputCls} />
                    </Field>
                    <Field label="Publisher / platform" optional>
                      <input type="text" value={pub.publisher} onChange={(e) => updatePublication(i, "publisher", e.target.value)} placeholder="Medium, company blog, etc." className={inputCls} />
                    </Field>
                    <Field label="Year" optional>
                      <input type="text" value={pub.year} onChange={(e) => updatePublication(i, "year", e.target.value)} placeholder="2023" className={inputCls} />
                    </Field>
                    <Field label="Link" optional>
                      <input type="url" value={pub.link} onChange={(e) => updatePublication(i, "link", e.target.value)} placeholder="https://..." className={inputCls} />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Description" optional>
                        <input type="text" value={pub.description} onChange={(e) => updatePublication(i, "description", e.target.value)} placeholder="Brief description." className={inputCls} />
                      </Field>
                    </div>
                  </div>
                  <button type="button" onClick={() => setState((prev) => ({ ...prev, publications: prev.publications.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── References ────────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">References</h2>
              <button type="button" onClick={() => setState((p) => ({ ...p, references: [...p.references, emptyReference()] }))} className={addBtnCls}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="mb-3 flex items-center gap-2">
              <input type="checkbox" id="r-show-refs" checked={state.showReferences} onChange={(e) => set("showReferences", e.target.checked)} className="h-4 w-4 rounded" />
              <label htmlFor="r-show-refs" className="text-sm">Show references in preview (hidden by default)</label>
            </div>
            {state.references.length === 0 && (
              <p className="text-xs text-muted-foreground">No references yet. With &quot;Show references&quot; off, the preview will say &quot;References available upon request.&quot;</p>
            )}
            <div className="space-y-4">
              {state.references.map((r, i) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Name">
                      <input type="text" value={r.name} onChange={(e) => updateReference(i, "name", e.target.value)} placeholder="Sarah Chen" className={inputCls} />
                    </Field>
                    <Field label="Role / company">
                      <input type="text" value={r.roleCompany} onChange={(e) => updateReference(i, "roleCompany", e.target.value)} placeholder="Engineering Manager, Relay Software" className={inputCls} />
                    </Field>
                    <Field label="Email or phone">
                      <input type="text" value={r.contact} onChange={(e) => updateReference(i, "contact", e.target.value)} placeholder="sarah@example.com" className={inputCls} />
                    </Field>
                    <Field label="Relationship" optional>
                      <input type="text" value={r.relationship} onChange={(e) => updateReference(i, "relationship", e.target.value)} placeholder="Direct manager" className={inputCls} />
                    </Field>
                  </div>
                  <button type="button" onClick={() => setState((prev) => ({ ...prev, references: prev.references.filter((_, idx) => idx !== i) }))} className={removeBtnCls}>
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Custom section ────────────────────────────────────────── */}
          <section>
            <h2 className="mb-3 font-semibold text-base">Custom section</h2>
            <div className="space-y-3">
              <Field id="r-custom-title" label="Section title">
                <input id="r-custom-title" type="text" value={state.custom.title} onChange={(e) => setState((p) => ({ ...p, custom: { ...p.custom, title: e.target.value } }))} placeholder="Interests, Side work, etc." className={inputCls} />
              </Field>
              <Field id="r-custom-content" label="Content" optional>
                <textarea
                  id="r-custom-content"
                  value={state.custom.content}
                  onChange={(e) => setState((p) => ({ ...p, custom: { ...p.custom, content: e.target.value } }))}
                  rows={3}
                  placeholder={"One item per line.\nEach line becomes a bullet in the preview."}
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* ── Section visibility ────────────────────────────────────── */}
          <section>
            <button type="button" onClick={() => setShowSections((v) => !v)} className="mb-2 flex items-center gap-1.5 font-semibold text-base">
              {showSections ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Section visibility
            </button>
            {showSections && (
              <div className="rounded-xl border border-border bg-muted/30 p-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {([
                  { key: "summary", label: "Summary" },
                  { key: "experience", label: "Experience" },
                  { key: "education", label: "Education" },
                  { key: "skills", label: "Skills" },
                  { key: "projects", label: "Projects" },
                  { key: "certifications", label: "Certifications" },
                  { key: "languages", label: "Languages" },
                  { key: "volunteer", label: "Volunteer" },
                  { key: "awards", label: "Awards" },
                  { key: "publications", label: "Publications" },
                  { key: "references", label: "References" },
                  { key: "custom", label: "Custom section" },
                ] as { key: keyof SectionVisibility; label: string }[]).map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="checkbox" checked={state.visibility[key]} onChange={() => toggleVisibility(key)} className="h-3.5 w-3.5 rounded" />
                    {label}
                    {state.visibility[key] ? <Eye className="h-3 w-3 text-muted-foreground" /> : <EyeOff className="h-3 w-3 text-muted-foreground" />}
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* ── Resume checklist ──────────────────────────────────────── */}
          <section className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-sm">Resume checklist</h2>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${checkScore >= 6 ? "bg-green-100 text-green-700" : checkScore >= 4 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                {checkScore} / {checklist.length}
              </span>
            </div>
            <ul className="space-y-1 mb-3">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-start gap-2 text-xs">
                  <span className={item.ok ? "text-green-600 mt-px" : "text-muted-foreground mt-px"}>{item.ok ? "✓" : "○"}</span>
                  <span className={item.ok ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">A stronger resume usually has clear contact details, recent work, and a few concrete results with numbers.</p>
          </section>

          {/* ── Keyword match ─────────────────────────────────────────── */}
          {kwTotal > 0 && (
            <section className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-sm flex items-center gap-1.5">
                  <Search className="h-3.5 w-3.5" />
                  Keyword match
                </h2>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${kwAnalysis.matched.length / kwTotal >= 0.8 ? "bg-green-100 text-green-700" : kwAnalysis.matched.length / kwTotal >= 0.5 ? "bg-yellow-100 text-yellow-700" : "bg-orange-100 text-orange-700"}`}>
                  {kwAnalysis.matched.length} / {kwTotal} found
                </span>
              </div>
              {kwAnalysis.matched.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1.5">Found in your resume:</p>
                  <div className="flex flex-wrap gap-1">
                    {kwAnalysis.matched.map((kw) => (
                      <span key={kw} className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-xs text-green-700">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              {kwAnalysis.missing.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1.5">Not yet in your resume:</p>
                  <div className="flex flex-wrap gap-1">
                    {kwAnalysis.missing.map((kw) => (
                      <span key={kw} className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs text-amber-700">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">These keywords should appear naturally — through your experience and skills, not just listed at the bottom of the page.</p>
            </section>
          )}

          {/* ── Actions ───────────────────────────────────────────────── */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
              <button type="button" onClick={handleCopyHtml} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-muted active:scale-95">
                <Copy className="h-4 w-4" /> Copy HTML
              </button>
              <button type="button" onClick={handleCopyText} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-muted active:scale-95">
                <Copy className="h-4 w-4" /> Copy text
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={handleExport} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium transition hover:bg-muted active:scale-95">
                <FileDown className="h-4 w-4" /> Export data
              </button>
              <button type="button" onClick={() => importRef.current?.click()} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium transition hover:bg-muted active:scale-95">
                <FileUp className="h-4 w-4" /> Import data
              </button>
              <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
              <button type="button" onClick={handleSave} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium transition hover:bg-muted active:scale-95">
                <Save className="h-4 w-4" /> Save now
              </button>
              <button type="button" onClick={handleLoadExample} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium transition hover:bg-muted active:scale-95">
                Load example
              </button>
              <button type="button" onClick={handleClear} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-destructive transition hover:bg-muted active:scale-95">
                <RotateCcw className="h-4 w-4" /> Clear resume
              </button>
            </div>
            {savedAt && <p className="text-xs text-muted-foreground">Saved locally at {savedAt}</p>}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════ PREVIEW ══ */}
        <div className="sticky top-6 self-start">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live preview</p>
            <p className="text-xs text-muted-foreground">{variant}</p>
          </div>
          <div
            ref={previewRef}
            className={`rounded-2xl border border-border bg-white shadow-soft text-[#111] text-sm leading-relaxed min-h-[600px] ${variant === "Compact" ? "p-5" : "p-8"}`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {/* ── Header ──────────────────────────────────────────────── */}
            <div className={`border-b border-gray-200 ${variant === "Compact" ? "pb-2 mb-2" : "pb-4 mb-4"} ${showPhoto ? "flex items-start gap-4" : ""}`}>
              <div className={showPhoto ? "flex-1 min-w-0" : ""}>
                <h1 className={`font-bold text-gray-900 ${variant === "Compact" ? "text-xl" : "text-2xl"}`}>
                  {state.fullName || "Your Name"}
                </h1>
                {(state.headline || state.targetRole) && (
                  <p className={`text-sm mt-0.5 ${variant === "Modern" ? "text-blue-700" : variant === "Creative" ? "text-gray-600 font-medium" : "text-gray-600"}`}>
                    {state.headline || state.targetRole}
                  </p>
                )}
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500">
                  {state.email && <span>{state.email}</span>}
                  {state.phone && <span>{state.phone}</span>}
                  {state.location && <span>{state.location}</span>}
                  {state.workAuth && <span>{state.workAuth}</span>}
                  {state.linkedin && <a href={state.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{state.linkedin.replace(/^https?:\/\//, "")}</a>}
                  {state.website && <a href={state.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{state.website.replace(/^https?:\/\//, "")}</a>}
                  {state.github && <a href={state.github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{state.github.replace(/^https?:\/\//, "")}</a>}
                </div>
              </div>
              {showPhoto && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={state.photoDataUrl}
                  alt="Profile"
                  className={`flex-shrink-0 object-cover border border-gray-200 ${variant === "Creative" ? "w-20 h-20 rounded-lg" : "w-20 h-20 rounded-full"}`}
                />
              )}
            </div>

            {/* ── Sections (order depends on template) ────────────────── */}
            {variant === "Student" ? (
              <>
                {renderEducation()}
                {renderSummary()}
                {renderProjects()}
                {renderSkills()}
                {renderExperience()}
                {renderCerts()}
                {renderLanguages()}
                {renderVolunteer()}
                {renderAwards()}
                {renderPublications()}
                {renderReferences()}
                {renderCustom()}
              </>
            ) : (
              <>
                {renderSummary()}
                {renderSkills()}
                {renderExperience()}
                {renderProjects()}
                {renderEducation()}
                {renderCerts()}
                {renderLanguages()}
                {renderVolunteer()}
                {renderAwards()}
                {renderPublications()}
                {renderReferences()}
                {renderCustom()}
              </>
            )}
          </div>
        </div>

      </div>
    </ToolPageShell>
  );
}
