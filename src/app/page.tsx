"use client"

import Link from "next/link"
import {
  Sparkles,
  Zap,
  Layout,
  Download,
  ChevronRight
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/60 border-b border-border/30">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              NovaCV<span className="text-primary">.</span>
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#templates" className="hover:text-foreground transition">Templates</a>
            <Link href="/login" className="hover:text-foreground font-semibold text-foreground">
              Sign In
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild className="rounded-full px-6 bg-gradient-to-r from-primary to-[var(--primary-dark)] hover:opacity-90 shadow-lg">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-40 pb-28 overflow-hidden">

        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 text-center">

          <Badge className="mb-6 bg-primary/20 hover:bg-primary/30 text-foreground border border-primary/30 px-4 py-1 rounded-full">
            ✨ AI Resume Builder
          </Badge>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.05]">
            Build a Resume That
            <span className="block bg-gradient-to-r from-primary to-[var(--primary-dark)] bg-clip-text">
              Gets You Hired
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create beautiful, ATS-friendly resumes with AI assistance,
            real-time preview, and instant PDF export.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="h-14 px-10 rounded-full text-lg font-semibold bg-gradient-to-r from-primary to-[var(--primary-dark)] shadow-xl">
              <Link href="/register">
                Start Building <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="h-14 px-8 rounded-full">
              <Link href="/login">View Templates</Link>
            </Button>
          </div>

          {/* SOCIAL PROOF
          <p className="mt-6 text-sm text-muted-foreground">
            Trusted by 5,000+ developers
          </p> */}

          {/* PREVIEW */}
          <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="absolute bg-black/30 w-full h-full z-10"></div>
            <div className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2000"
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>

            {/* Glow */}
            <div className="absolute -inset-4 bg-secondary blur-2xl -z-10 rounded-2xl" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground mb-16">
            Designed for modern professionals
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                icon: Zap,
                title: "Fast & Smart",
                desc: "Real-time editing with AI assistance"
              },
              {
                icon: Layout,
                title: "Modern Templates",
                desc: "ATS-friendly and recruiter-approved"
              },
              {
                icon: Download,
                title: "Export Instantly",
                desc: "Download pixel-perfect PDFs"
              }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-border/80 hover:shadow-xl transition group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Choose your perfect template
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select from our collection of professionally designed, ATS-friendly templates
              to make your resume stand out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Modern",
                image: "/thumbnails/modern.png",
                desc: "Clean, two-column layout with a professional sidebar."
              },
              {
                name: "Professional",
                image: "/thumbnails/jake.png",
                desc: "Classic single-column design perfect for traditional industries."
              },
              {
                name: "Executive",
                image: "/thumbnails/executive.png",
                desc: "Elegant and prestigious design for high-level professionals."
              }
            ].map((t, i) => (
              <div key={i} className="group relative bg-background rounded-2xl border border-border/80 overflow-hidden hover:shadow-2xl transition duration-500">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-fit scale-90 group-hover:scale-95 transition duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                    <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                      <Link href="/register">Use This Template</Link>
                    </Button>
                  </div>
                </div>
                <div className="px-4 py-6 -mt-8" >
                  <h3 className="font-bold text-xl mb-2">{t.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24 bg-foreground text-background text-center">
        <h2 className="text-4xl font-bold mb-6">
          Start building your future today
        </h2>

        <Button size="lg" asChild className="rounded-full bg-secondary text-primary px-10 h-14 font-bold hover:bg-secondary/80 cursor-pointer">
          <Link href="/register">Create Resume</Link>
        </Button>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} NovaCV — Built by Asif Raza
      </footer>

    </div>
  )
}