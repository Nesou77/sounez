"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Download, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("resume-generator")!;

type WorkEntry = { company: string; role: string; dates: string; bullets: string };
type EduEntry = { school: string; degree: string; year: string };

const emptyWork = (): WorkEntry => ({ company: "", role: "", dates: "", bullets: "" });
const emptyEdu = (): EduEntry => ({ school: "", degree: "", year: "" });

export function ResumeClient() {
  // Personal
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  // Summary
  const [summary, setSummary] = useState("");
  // Work
  const [work, setWork] = useState<WorkEntry[]>([emptyWork()]);
  // Education
  const [edu, setEdu] = useState<EduEntry[]>([emptyEdu()]);
  // Skills
  const [skills, setSkills] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);

  const updateWork = (i: number, field: keyof WorkEntry, val: string) =>
    setWork((prev) => prev.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)));

  const updateEdu = (i: number, field: keyof EduEntry, val: string) =>
    setEdu((prev) => prev.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)));

  const skillList = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Inject print CSS once
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "resume-print-css";
    style.textContent = `
      @media print {
        body > * { display: none !important; }
        #resume-print-target { display: block !important; position: fixed; inset: 0; z-index: 9999; background: white; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.getElementById("resume-print-css")?.remove();
    };
  }, []);

  const handlePrint = () => {
    const el = previewRef.current;
    if (!el) return;
    const printDiv = document.createElement("div");
    printDiv.id = "resume-print-target";
    printDiv.style.display = "none";
    printDiv.innerHTML = el.innerHTML;
    document.body.appendChild(printDiv);
    window.print();
    document.body.removeChild(printDiv);
    toast.success("Print dialog opened", { description: "Set margins to None for best results." });
  };

  const handleCopyHtml = () => {
    if (!previewRef.current) return;
    navigator.clipboard.writeText(previewRef.current.innerHTML);
    toast.success("HTML copied to clipboard");
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Fill in your details and export a clean, professional resume as PDF — no account, no watermark."
      features={[
        { title: "Live preview", desc: "See your resume update as you type." },
        { title: "PDF export", desc: "Print to PDF directly from your browser." },
        { title: "Copy as HTML", desc: "Paste the HTML anywhere and style it yourself." },
      ]}
      howTo={[
        "Fill in your personal info, experience and education.",
        "Check the live preview on the right.",
        "Click Download PDF to save your resume.",
      ]}
      faqs={[
        {
          q: "Is my data saved anywhere?",
          a: "No. Everything stays in your browser. Nothing is uploaded to any server.",
        },
        {
          q: "Can I edit the PDF after downloading?",
          a: "PDF is a fixed format. Use 'Copy HTML' if you want an editable version.",
        },
        {
          q: "What if the PDF looks wrong?",
          a: "In the print dialog, set margins to 'None' or 'Minimum' and enable 'Background graphics' for best results.",
        },
      ]}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* ── FORM ── */}
        <div className="space-y-6 text-sm">
          {/* Personal */}
          <section>
            <h2 className="mb-3 font-semibold text-base">Personal info</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { id: "r-name", label: "Full name", val: fullName, set: setFullName, placeholder: "Jane Smith" },
                { id: "r-email", label: "Email", val: email, set: setEmail, placeholder: "jane@example.com" },
                { id: "r-phone", label: "Phone", val: phone, set: setPhone, placeholder: "+1 555 000 0000" },
                { id: "r-location", label: "Location", val: location, set: setLocation, placeholder: "New York, NY" },
              ].map(({ id, label, val, set, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="mb-1 block font-medium">{label}</label>
                  <input
                    id={id}
                    type="text"
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="r-linkedin" className="mb-1 block font-medium">LinkedIn URL <span className="font-normal text-muted-foreground">(optional)</span></label>
                <input
                  id="r-linkedin"
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/janesmith"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </section>

          {/* Summary */}
          <section>
            <h2 className="mb-3 font-semibold text-base">Summary</h2>
            <textarea
              id="r-summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              placeholder="A brief professional summary…"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </section>

          {/* Work Experience */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">Work experience</h2>
              <button
                onClick={() => setWork((p) => [...p, emptyWork()])}
                className="flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium transition hover:bg-muted"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {work.map((w, i) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-medium">Company</label>
                      <input
                        type="text"
                        value={w.company}
                        onChange={(e) => updateWork(i, "company", e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-medium">Role</label>
                      <input
                        type="text"
                        value={w.role}
                        onChange={(e) => updateWork(i, "role", e.target.value)}
                        placeholder="Software Engineer"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block font-medium">Dates</label>
                      <input
                        type="text"
                        value={w.dates}
                        onChange={(e) => updateWork(i, "dates", e.target.value)}
                        placeholder="Jan 2022 – Present"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block font-medium">Bullet points <span className="font-normal text-muted-foreground">(one per line)</span></label>
                      <textarea
                        value={w.bullets}
                        onChange={(e) => updateWork(i, "bullets", e.target.value)}
                        rows={3}
                        placeholder="Built X that improved Y by Z%"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  {work.length > 1 && (
                    <button
                      onClick={() => setWork((p) => p.filter((_, idx) => idx !== i))}
                      className="flex items-center gap-1 text-xs text-destructive hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-base">Education</h2>
              <button
                onClick={() => setEdu((p) => [...p, emptyEdu()])}
                className="flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium transition hover:bg-muted"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {edu.map((e, i) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block font-medium">School</label>
                      <input
                        type="text"
                        value={e.school}
                        onChange={(ev) => updateEdu(i, "school", ev.target.value)}
                        placeholder="MIT"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-medium">Degree</label>
                      <input
                        type="text"
                        value={e.degree}
                        onChange={(ev) => updateEdu(i, "degree", ev.target.value)}
                        placeholder="B.Sc. Computer Science"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-medium">Year</label>
                      <input
                        type="text"
                        value={e.year}
                        onChange={(ev) => updateEdu(i, "year", ev.target.value)}
                        placeholder="2020"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  {edu.length > 1 && (
                    <button
                      onClick={() => setEdu((p) => p.filter((_, idx) => idx !== i))}
                      className="flex items-center gap-1 text-xs text-destructive hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="mb-3 font-semibold text-base">Skills</h2>
            <input
              id="r-skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, TypeScript, Node.js, Figma"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </section>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <button
              onClick={handleCopyHtml}
              className="flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-muted active:scale-95"
            >
              <Copy className="h-4 w-4" />
              Copy HTML
            </button>
          </div>
        </div>

        {/* ── PREVIEW ── */}
        <div className="sticky top-6 self-start">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live preview</p>
          <div
            ref={previewRef}
            className="rounded-2xl border border-border bg-white p-8 shadow-soft text-[#111] font-[Inter,sans-serif] text-sm leading-relaxed min-h-[600px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {/* Header */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{fullName || "Your Name"}</h1>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500">
                {email && <span>{email}</span>}
                {phone && <span>{phone}</span>}
                {location && <span>{location}</span>}
                {linkedin && (
                  <a href={linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {linkedin.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            </div>

            {/* Summary */}
            {summary && (
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Summary</h2>
                <p className="text-sm text-gray-700">{summary}</p>
              </div>
            )}

            {/* Work */}
            {work.some((w) => w.company || w.role) && (
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Experience</h2>
                <div className="space-y-3">
                  {work.filter((w) => w.company || w.role).map((w, i) => (
                    <div key={i}>
                      <div className="flex items-baseline justify-between">
                        <span className="font-semibold text-gray-900">{w.role || "Role"}</span>
                        <span className="text-xs text-gray-400">{w.dates}</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">{w.company}</div>
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
            )}

            {/* Education */}
            {edu.some((e) => e.school || e.degree) && (
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Education</h2>
                <div className="space-y-2">
                  {edu.filter((e) => e.school || e.degree).map((e, i) => (
                    <div key={i} className="flex items-baseline justify-between">
                      <div>
                        <span className="font-semibold text-gray-900">{e.degree || "Degree"}</span>
                        {e.school && <span className="text-xs text-gray-500 ml-2">— {e.school}</span>}
                      </div>
                      <span className="text-xs text-gray-400">{e.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skillList.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skillList.map((s, i) => (
                    <span key={i} className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageShell>
  );
}
