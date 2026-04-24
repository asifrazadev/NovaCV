// templates/jake/index.tsx
import React from "react"
import { ResumeData } from "@/types/resume"
import { getTranslation } from "@/lib/i18n"

export interface PageContent {
    main: { id: string; itemIds?: string[] }[]
    sidebar: { id: string; itemIds?: string[] }[]
    showHeader: boolean
    showFooter: boolean
    isContinued?: boolean
}

export function JakeTemplate({ data, content }: { data: ResumeData; content?: PageContent }) {
    const { metadata, basics, sections } = data
    const { typography, design, language = "en" } = metadata

    const t = (key: string) => getTranslation(language, key)

    const defaultLayout = {
        main: ["summary", "experience", "education", "projects", "volunteer", "publications", "references"],
        sidebar: [],
    }

    const rawLayout = (metadata as any).layout
    const layout = {
        main: (rawLayout?.main && Array.isArray(rawLayout.main)) ? rawLayout.main : defaultLayout.main,
        sidebar: (rawLayout?.sidebar && Array.isArray(rawLayout.sidebar)) ? rawLayout.sidebar : defaultLayout.sidebar
    }

    const mainSections = content ? content.main : layout.main.map((id: string) => ({ id }))
    const sidebarSections = content ? content.sidebar : layout.sidebar.map((id: string) => ({ id }))
    const showHeader = content ? content.showHeader : true

    const formatDateRange = (item: {
        startDate?: string
        endDate?: string
        isCurrent?: boolean
        date?: string
    }) => {
        if (item.startDate) {
            const end = item.isCurrent ? t("present") : item.endDate || ""
            return `${item.startDate}${end ? ` – ${end}` : ""}`
        }
        return item.date || ""
    }

    // ── Shared primitives ────────────────────────────────────────────────────────

    const SectionHeading = ({ children }: { children: React.ReactNode }) => (
        <div className="mb-2">
            <h2
                className="text-[0.65em] font-bold uppercase tracking-[0.15em]"
                style={{ color: "var(--primary)" }}
            >
                {children}
            </h2>
            <div className="mt-0.5 h-px w-full" style={{ backgroundColor: "var(--primary)" }} />
        </div>
    )

    const ContinuedBadge = () => (
        <span className="text-[9px] opacity-40 lowercase font-normal ml-2 tracking-normal">
            {t("continued")}
        </span>
    )

    // ── Section renderer ─────────────────────────────────────────────────────────

    const renderSection = (sectionRef: { id: string; itemIds?: string[] }) => {
        const { id, itemIds } = sectionRef
        const isContinued =
            itemIds && itemIds.length > 0 && itemIds[0] !== (sections as any)[id]?.[0]?.id

        switch (id) {
            // ── Summary ────────────────────────────────────────────────────────────
            case "summary":
                return sections.summary?.content ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            {t("profile")} {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div
                            className="rich-text text-[0.82em] leading-relaxed opacity-80 mt-2"
                            dangerouslySetInnerHTML={{ __html: sections.summary.content }}
                        />
                    </section>
                ) : null

            // ── Experience ─────────────────────────────────────────────────────────
            case "experience": {
                const items = itemIds
                    ? sections.experience.filter((e) => itemIds.includes(e.id))
                    : sections.experience
                return items.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            {t("experience")} {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 space-y-3">
                            {items.map((exp, i) => (
                                <div key={i} data-item-id={exp.id} className="section-item">
                                    {/* Row 1: Company + Location */}
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[0.9em]">
                                            {exp.showLinkInTitle && exp.website ? (
                                                <a
                                                    href={exp.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                >
                                                    {exp.websiteLabel || exp.company}
                                                </a>
                                            ) : (
                                                exp.company
                                            )}
                                        </span>
                                        <span className="text-[0.75em] opacity-60 shrink-0 ml-2">
                                            {exp.location}
                                        </span>
                                    </div>

                                    {/* Row 2: Roles or single position */}
                                    {exp.roles?.length > 0 ? (
                                        exp.roles.map((role, ri) => (
                                            <div key={ri} className="flex justify-between items-baseline">
                                                <span className="text-[0.82em] italic">{role.title}</span>
                                                <span className="text-[0.75em] opacity-55 shrink-0 ml-2">
                                                    {formatDateRange(role)}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-[0.82em] italic">{exp.position}</span>
                                            <span className="text-[0.75em] opacity-55 shrink-0 ml-2">
                                                {formatDateRange(exp)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Description */}
                                    {exp.description && (
                                        <div
                                            className="mt-1 rich-text text-[0.8em] opacity-70 leading-snug"
                                            dangerouslySetInnerHTML={{ __html: exp.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            // ── Education ──────────────────────────────────────────────────────────
            case "education": {
                const items = itemIds
                    ? sections.education.filter((e) => itemIds.includes(e.id))
                    : sections.education
                return items.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            {t("education")} {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 space-y-2">
                            {items.map((edu, i) => (
                                <div key={i} data-item-id={edu.id} className="section-item">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[0.9em]">{edu.school}</span>
                                        <span className="text-[0.75em] opacity-55 shrink-0 ml-2">
                                            {formatDateRange(edu)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[0.82em] italic opacity-75">
                                            {[edu.degree, edu.areaOfStudy].filter(Boolean).join(", ")}
                                        </span>
                                        <span className="text-[0.75em] opacity-55 shrink-0 ml-2">
                                            {edu.location}
                                        </span>
                                    </div>
                                    {edu.description && (
                                        <div
                                            className="mt-1 rich-text text-[0.8em] opacity-65 leading-snug"
                                            dangerouslySetInnerHTML={{ __html: edu.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            // ── Projects ───────────────────────────────────────────────────────────
            case "projects": {
                const items = itemIds
                    ? sections.projects.filter((p) => itemIds.includes(p.id))
                    : sections.projects
                return items.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            {t("projects")} {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 space-y-2">
                            {items.map((proj, i) => (
                                <div key={i} data-item-id={proj.id} className="section-item">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[0.9em]">
                                            {proj.showLinkInTitle && proj.url ? (
                                                <a
                                                    href={proj.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                    style={{ color: "var(--primary)" }}
                                                >
                                                    {proj.websiteLabel || proj.name}
                                                </a>
                                            ) : (
                                                proj.name
                                            )}
                                        </span>
                                        <span className="text-[0.75em] opacity-55 shrink-0 ml-2">
                                            {formatDateRange(proj)}
                                        </span>
                                    </div>
                                    {proj.description && (
                                        <div
                                            className="mt-0.5 rich-text text-[0.8em] opacity-70 leading-snug"
                                            dangerouslySetInnerHTML={{ __html: proj.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            // ── Skills ─────────────────────────────────────────────────────────────
            case "skills": {
                const items = itemIds
                    ? sections.skills.filter((s) => itemIds.includes(s.id))
                    : sections.skills
                return items.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            {t("skills")} {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 space-y-0.5">
                            {items.map((s: any, i) => (
                                <div key={i} data-item-id={s.id} className="section-item text-[0.82em]">
                                    <span className="font-bold">{s.name}: </span>
                                    <span className="opacity-70">
                                        {Array.isArray(s.keywords) ? s.keywords.join(", ") : s.keywords}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            // ── Languages ──────────────────────────────────────────────────────────
            case "languages": {
                const items = itemIds
                    ? sections.languages.filter((l) => itemIds.includes(l.id))
                    : sections.languages
                return items.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            {t("languages")} {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 text-[0.82em] opacity-75">
                            {items.map((l: any, i) => (
                                <span key={i} data-item-id={l.id} className="section-item">
                                    {l.name}
                                    {l.level ? ` (${l.level >= 80 ? "Native" :
                                        l.level >= 60 ? "Fluent" :
                                            l.level >= 40 ? "Advanced" :
                                                l.level >= 20 ? "Intermediate" :
                                                    "Beginner"
                                        })` : ""}
                                    {i < items.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            // ── Volunteer ──────────────────────────────────────────────────────────
            case "volunteer": {
                const items = itemIds
                    ? sections.volunteer.filter((v) => itemIds.includes(v.id))
                    : sections.volunteer
                return items.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            {t("volunteer")} {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 space-y-2">
                            {items.map((vol, i) => (
                                <div key={i} data-item-id={vol.id} className="section-item">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[0.9em]">{vol.organization}</span>
                                        <span className="text-[0.75em] opacity-55 shrink-0 ml-2">
                                            {formatDateRange(vol)}
                                        </span>
                                    </div>
                                    <span className="text-[0.82em] italic opacity-75">{vol.position}</span>
                                    {vol.description && (
                                        <div
                                            className="mt-0.5 rich-text text-[0.8em] opacity-65 leading-snug"
                                            dangerouslySetInnerHTML={{ __html: vol.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            // ── Awards ─────────────────────────────────────────────────────────────
            case "awards": {
                const items = itemIds
                    ? sections.awards.filter((a) => itemIds.includes(a.id))
                    : sections.awards
                return items.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            {t("awards")} {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 space-y-1.5">
                            {items.map((a, i) => (
                                <div key={i} data-item-id={a.id} className="section-item">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[0.82em]">{a.title}</span>
                                        <span className="text-[0.75em] opacity-45 shrink-0 ml-2">{a.date}</span>
                                    </div>
                                    <span className="text-[0.78em] italic opacity-65">{a.awarder}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            // ── Certifications ─────────────────────────────────────────────────────
            case "certifications": {
                const items = itemIds
                    ? sections.certifications.filter((c) => itemIds.includes(c.id))
                    : sections.certifications
                return items.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            {t("certifications")} {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 space-y-1.5">
                            {items.map((c, i) => (
                                <div key={i} data-item-id={c.id} className="section-item">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[0.82em]">{c.name}</span>
                                        <span className="text-[0.75em] opacity-45 shrink-0 ml-2">{c.date}</span>
                                    </div>
                                    <span className="text-[0.78em] italic opacity-65">{c.issuer}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            // ── Publications ───────────────────────────────────────────────────────
            case "publications": {
                const items = itemIds
                    ? sections.publications?.filter((p) => itemIds.includes(p.id))
                    : sections.publications
                return items?.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            Publications {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 space-y-1.5">
                            {items.map((pub, i) => (
                                <div key={i} data-item-id={pub.id} className="section-item">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[0.82em]">{pub.name}</span>
                                        <span className="text-[0.75em] opacity-45 shrink-0 ml-2">{pub.date}</span>
                                    </div>
                                    <span className="text-[0.78em] italic opacity-65">{pub.publisher}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            // ── References ─────────────────────────────────────────────────────────
            case "references": {
                const items = itemIds
                    ? sections.references?.filter((r) => itemIds.includes(r.id))
                    : sections.references
                return items?.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            References {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 space-y-2">
                            {items.map((ref, i) => (
                                <div key={i} data-item-id={ref.id} className="section-item">
                                    <span className="font-bold text-[0.82em]">{ref.name}</span>
                                    {ref.description && (
                                        <div
                                            className="rich-text text-[0.78em] opacity-65 leading-snug"
                                            dangerouslySetInnerHTML={{ __html: ref.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            // ── Interests ───────────────────────────────────────────────────────────
            case "interests": {
                const items = itemIds
                    ? sections.interests.filter((i) => itemIds.includes(i.id))
                    : sections.interests
                return items.length > 0 ? (
                    <section key={id} data-section-id={id} className="section-block">
                        <SectionHeading>
                            {t("interests")} {isContinued && <ContinuedBadge />}
                        </SectionHeading>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.82em] opacity-75">
                            {items.map((i, idx) => (
                                <span key={idx} data-item-id={i.id} className="section-item">
                                    {i.name}{idx < items.length - 1 ? "," : ""}
                                </span>
                            ))}
                        </div>
                    </section>
                ) : null
            }

            default:
                return null
        }
    }

    return (
        <div
            className="jake-template min-h-full flex flex-col"
            style={{
                fontFamily: typography?.fontFamily ?? "Georgia, serif",
                fontSize: `${typography?.fontSize ?? 10}pt`,
                lineHeight: typography?.lineHeight ?? 1.4,
                color: typography?.color ?? "#000",
                "--primary": design?.primaryColor ?? "#000000",
            } as React.CSSProperties}
        >
            {/* ── Header ──────────────────────────────────────────────────────────── */}
            {showHeader && (
                <header className="text-center mb-4 pb-0">
                    <h1 className="text-[2em] font-bold tracking-tight leading-none">
                        {basics.name || "Your Name"}
                    </h1>

                    {/* Contact row — Jake's classic pipe-separated inline list */}
                    <div className="mt-1.5 flex flex-wrap justify-center items-center gap-x-1 text-[0.78em] opacity-70">
                        {basics.phone && (
                            <>
                                <span>{basics.phone}</span>
                                <span className="opacity-40">|</span>
                            </>
                        )}
                        {basics.email && (
                            <>
                                <a href={`mailto:${basics.email}`} className="hover:underline">
                                    {basics.email}
                                </a>
                                <span className="opacity-40">|</span>
                            </>
                        )}
                        {basics.location && (
                            <>
                                <span>{basics.location}</span>
                            </>
                        )}
                        {sections.profiles?.map((p, i) => (
                            <React.Fragment key={i}>
                                <span className="opacity-40">|</span>
                                <a
                                    href={p.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {p.username || p.network}
                                </a>
                            </React.Fragment>
                        ))}
                    </div>
                </header>
            )}

            {/* ── Body: single full-width column (Jake has no sidebar) ────────────── */}
            <div className="flex-1 space-y-4">
                {mainSections.map((ref: any) => (
                    <React.Fragment key={ref.id}>{renderSection(ref)}</React.Fragment>
                ))}

                {/* Sidebar sections fall through to main column if layout has sidebar */}
                {sidebarSections.length > 0 && (
                    <div className="space-y-4">
                        {sidebarSections.map((ref: any) => (
                            <React.Fragment key={ref.id}>{renderSection(ref)}</React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}