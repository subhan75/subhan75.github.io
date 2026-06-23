import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Copy, Check, Download, Menu, X } from "lucide-react";
import profilePhoto from "@/assets/WhatsApp Image 2026-06-23 at 12.03.47 PM.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Subhan Shaikh — AI Engineer" },
      {
        name: "description",
        content:
          "Subhan Shaikh — AI Engineer building production LLM systems: RAG pipelines, multi-agent architectures, and evaluation infrastructure.",
      },
      { property: "og:title", content: "Subhan Shaikh — AI Engineer" },
      {
        property: "og:description",
        content:
          "MS Computer Science at UC Santa Cruz. CalHacks '25 winner. Building reliable AI systems in production.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const handler = () => {
      const y = window.scrollY + 120;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function CountUp({ value, suffix = "", duration = 1400 }: { value: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(value * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function NavBar({ active }: { active: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="text-base font-semibold tracking-tight text-foreground hover:text-primary transition">
          Subhan Shaikh
        </a>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`relative transition-colors ${active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:text-primary hover:bg-card/50 transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/60 bg-background/95 backdrop-blur-md">
          <ul className="px-6 py-4 space-y-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={handleNavClick}
                  className={`block py-2 text-base transition-colors ${active === n.id ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label mb-4">{children}</div>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag-token">{children}</span>;
}

const TERMINAL_LINES = [
  { prompt: "~", cmd: "whoami", out: "subhan — ai engineer" },
  { prompt: "~", cmd: "build --target agents", out: "compiled 3 pipelines · 0 errors" },
  { prompt: "~", cmd: "eval rag/v4 --suite prod", out: "pass 247/250 · p95 312ms" },
  { prompt: "~", cmd: "deploy --prod", out: "shipped ✓" },
];

function TerminalCard() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<"cmd" | "out" | "pause">("cmd");
  const [history, setHistory] = useState<{ prompt: string; cmd: string; out: string }[]>([]);

  useEffect(() => {
    const current = TERMINAL_LINES[lineIdx];
    if (phase === "cmd") {
      if (charIdx < current.cmd.length) {
        const t = setTimeout(() => setCharIdx(charIdx + 1), 55 + Math.random() * 40);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("out"), 320);
      return () => clearTimeout(t);
    }
    if (phase === "out") {
      const t = setTimeout(() => setPhase("pause"), 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setHistory((h) => [...h, current].slice(-3));
      const next = (lineIdx + 1) % TERMINAL_LINES.length;
      setLineIdx(next);
      setCharIdx(0);
      setPhase("cmd");
      if (next === 0) setHistory([]);
    }, 1100);
    return () => clearTimeout(t);
  }, [phase, charIdx, lineIdx]);

  const current = TERMINAL_LINES[lineIdx];
  const typedCmd = current.cmd.slice(0, charIdx);
  const showOut = phase === "out" || phase === "pause";

  return (
    <div className="w-full max-w-xl rounded-xl border border-border/70 bg-card/80 backdrop-blur-md shadow-2xl shadow-primary/5 overflow-hidden text-left">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/60 bg-background/40">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-[11px] font-mono text-muted-foreground tracking-wide">subhan@portfolio — zsh</span>
      </div>
      <div className="px-5 py-4 font-mono text-[13px] leading-6 h-[240px] overflow-hidden flex flex-col justify-end">
        {history.map((h, i) => (
          <div key={i} className="opacity-60">
            <div>
              <span className="text-primary">➜</span>{" "}
              <span className="text-foreground/80">{h.prompt}</span>{" "}
              <span className="text-foreground">{h.cmd}</span>
            </div>
            <div className="text-muted-foreground pl-4">{h.out}</div>
          </div>
        ))}
        <div>
          <span className="text-primary">➜</span>{" "}
          <span className="text-foreground/80">{current.prompt}</span>{" "}
          <span className="text-foreground">{typedCmd}</span>
          {phase === "cmd" && <span className="inline-block w-2 h-4 align-[-2px] bg-primary ml-0.5 animate-pulse" />}
        </div>
        {showOut && <div className="text-muted-foreground pl-4">{current.out}</div>}
      </div>
    </div>
  );
}

function HeroBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<{ x: number; y: number; strength: number }>({ x: -9999, y: -9999, strength: 0 });
  const targetStrengthRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPACING = 26;
    const RADIUS = 240;
    const BASE_ALPHA = 0.24;
    const PEAK_ALPHA = 0.95;
    const BASE_R = 1.15;
    const PEAK_R = 2.45;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cur = cursorRef.current;
      // ease strength toward target
      cur.strength += (targetStrengthRef.current - cur.strength) * 0.08;
      const strength = cur.strength;
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          let a = BASE_ALPHA;
          let r = BASE_R;
          if (strength > 0.01) {
            const dx = x - cur.x;
            const dy = y - cur.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < RADIUS) {
              const t = 1 - dist / RADIUS;
              const s = t * t * (3 - 2 * t) * strength; // smoothstep
              a = BASE_ALPHA + (PEAK_ALPHA - BASE_ALPHA) * s;
              r = BASE_R + (PEAK_R - BASE_R) * s;
            }
          }
          ctx.beginPath();
          ctx.fillStyle = `rgba(45, 212, 191, ${a})`;
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    resize();
    draw();

    let raf = 0;
    let running = false;
    const loop = () => {
      draw();
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0.01 },
    );
    io.observe(wrap);

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        targetStrengthRef.current = 0;
        return;
      }
      cursorRef.current.x = e.clientX - rect.left;
      cursorRef.current.y = e.clientY - rect.top;
      targetStrengthRef.current = 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 animate-breathe opacity-90"
        style={{
          background:
            "radial-gradient(58% 58% at 50% 24%, color-mix(in oklab, var(--primary) 42%, transparent), transparent 68%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-95" />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <HeroBackdrop />
      <div className="relative z-10 mx-auto max-w-3xl px-6 flex flex-col items-center text-center">
        <div className="section-label mb-6">AI Engineer</div>
        <h1 className="max-w-2xl mx-auto text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
          Building the layer between LLMs and real-world use.
        </h1>
        <p className="mt-6 max-w-2xl text-foreground/90 text-lg leading-relaxed">
          Anyone can prompt an LLM. I build the layer that makes it reliable, measurable, and worth deploying.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            View my work
          </a>
          <a
            href="/__l5e/assets-v1/21f63430-6ae7-43b0-9104-d74a28e95c5f/Subhan_Shaikh_AI_Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md border border-primary/60 px-5 py-3 text-sm font-medium text-primary hover:bg-primary/10 transition"
          >
            <Download size={16} /> Download résumé
          </a>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a href="https://github.com/subhan75" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border/80 bg-card/70 text-foreground/80 hover:text-primary hover:border-primary/50 hover:bg-card transition" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/subhan-shaikh75" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border/80 bg-card/70 text-foreground/80 hover:text-primary hover:border-primary/50 hover:bg-card transition" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="mailto:subhan.shaikh.me@gmail.com" className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border/80 bg-card/70 text-foreground/80 hover:text-primary hover:border-primary/50 hover:bg-card transition" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
        <div className="mt-14 w-full flex justify-center">
          <TerminalCard />
        </div>
      </div>
    </section>
  );
}


function About() {
  return (
    <section id="about" className="py-24 reveal">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>About</SectionLabel>
        <div className="grid md:grid-cols-[260px_1fr] gap-10 md:gap-14 items-start">
          <img
            src={profilePhoto}
            alt="Subhan Shaikh"
            className="mx-auto md:mx-0 w-48 h-48 md:w-60 md:h-60 rounded-full ring-2 ring-primary/50 ring-offset-4 ring-offset-background object-cover"
          />
          <div>
            <p className="text-lg leading-relaxed text-foreground/90">
              Mumbai to Santa Cruz is a long way to go to debug a retrieval pipeline. But that&rsquo;s roughly how it went.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">
              IBM gave me my first real AI project. UCSC gave me a <span className="text-primary font-mono">4.0</span> and over a year in Professor Leilani Gilpin&rsquo;s explainability lab — the kind of research that changes how you think about building, not just what you build. Gogentic gave me a startup environment, a small AI team, an eight-week deadline, and an infrastructure cost problem I cut by <span className="text-primary font-mono">80%</span>. CalHacks 2025 gave me three sponsor track wins.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">
              What I got out of all of it is harder to put on a resume. I know where these systems break, and I know how to make sure they don&rsquo;t.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type Role = {
  company: string;
  title: string;
  location: string;
  dates: string;
  bullets: string[];
  metrics?: { value: number; suffix: string; label: string }[];
};

const ROLES: Role[] = [
  {
    company: "Gogentic.ai",
    title: "Applied AI Engineer",
    location: "Remote",
    dates: "Jun 2025 – Nov 2025",
    bullets: [
      "Led the AI team to deliver a fully functional AI-driven backend MVP within an 8-week sprint, supporting on-schedule user testing with zero major production incidents.",
      "Reduced AI infrastructure costs by 80% by replacing third-party APIs with evaluated open-source models selected against task-specific quality benchmarks.",
      "Boosted backend service performance by 50% through custom inference workflows and strategic pipeline optimization.",
    ],
    metrics: [
      { value: 80, suffix: "%", label: "cost reduction" },
      { value: 50, suffix: "%", label: "perf boost" },
      { value: 8, suffix: "wk", label: "to MVP" },
    ],
  },
  {
    company: "Propel Flow",
    title: "AI Automation Intern",
    location: "San Francisco Bay Area",
    dates: "Jun 2025 – Aug 2025",
    bullets: [
      "Built AI-driven automation tools for community interaction analysis and response across LinkedIn, Slack, Facebook, and Reddit.",
      "Analyzed community interactions to surface customer pain points and shipped automated solutions to resolve them at scale.",
      "Collaborated cross-functionally to ship features that improved user engagement and service efficiency.",
    ],
  },
  {
    company: "UC Santa Cruz — AIEA Lab",
    title: "Graduate Researcher",
    location: "Santa Cruz, CA",
    dates: "Jan 2025 – Mar 2026",
    bullets: [
      "Researched integrating Prolog-based symbolic reasoning with LLMs to improve decision explainability and reduce hallucinations, in Prof. Leilani Gilpin's AI Explainability & Accountability Lab.",
      "Built a CS-department chatbot using advanced Retrieval-Augmented Generation over course and program data.",
    ],
  },
  {
    company: "UC Santa Cruz — Baskin Engineering",
    title: "Course Tutor, CSE 40 (Intro to ML)",
    location: "Santa Cruz, CA",
    dates: "Sep 2025 – Mar 2026",
    bullets: [
      "Tutored students in foundational machine learning, reinforcing core concepts and problem-solving over exam prep.",
    ],
  },
  {
    company: "IBM",
    title: "AI Intern",
    location: "Remote",
    dates: "Sep 2022 – Nov 2022",
    bullets: [
      "Built a sign-language recognition system end-to-end on the ASL dataset, achieving 90% classification accuracy across the full pipeline from preprocessing to deployment.",
      "Delivered a working prototype and documented findings for a stakeholder presentation.",
    ],
    metrics: [{ value: 90, suffix: "%", label: "accuracy" }],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-24 reveal">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Experience</SectionLabel>
        <div className="relative mt-10">
          {/* center / left vertical line */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent left-4 md:left-1/2 md:-translate-x-1/2"
          />
          <ol className="space-y-12 md:space-y-16">
            {ROLES.map((r, idx) => {
              const left = idx % 2 === 0;
              return (
                <li key={r.company + r.title} className="relative">
                  {/* node */}
                  <span
                    aria-hidden
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background shadow-[0_0_0_3px_rgba(45,212,191,0.25)]"
                  />
                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 ${
                      left ? "md:pr-12" : "md:pl-12 md:ml-auto"
                    }`}
                  >
                    <article className="rounded-xl border border-border bg-card/60 p-6 md:p-7 hover:border-primary/40 transition-colors">
                      <h3 className="text-xl font-semibold">
                        {r.title} <span className="text-muted-foreground">·</span>{" "}
                        <span className="text-primary">{r.company}</span>
                      </h3>
                      <div className="text-xs text-muted-foreground mt-1 tracking-wide">
                        {r.location} · {r.dates}
                      </div>
                      <ul className="mt-5 space-y-2.5 text-foreground/85 leading-relaxed">
                        {r.bullets.map((b, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-primary mt-2 shrink-0">─</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      {r.metrics && (
                        <div className="mt-6 grid grid-cols-3 gap-4 pt-5 border-t border-border/70">
                          {r.metrics.map((m) => (
                            <div key={m.label}>
                              <div className="metric-num">
                                <CountUp value={m.value} suffix={m.suffix} />
                              </div>
                              <div className="text-xs text-muted-foreground mt-1.5 tracking-wide">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

type Project = {
  title: string;
  tagline?: string;
  description: string;
  tech: string[];
  link?: string;
  linkLabel?: string;
  metrics?: string[];
  badge?: string;
};

const FEATURED: Project[] = [
  {
    title: "Orbit.ai",
    badge: "CalHacks 2025 Winner",
    description:
      "A modular, MCP-agnostic developer productivity agent with real-time workflow automation and natural-language voice command execution. Won three sponsor tracks at UC Berkeley's CalHacks 2025, the world's largest collegiate hackathon.",
    tech: ["Python", "MCP", "Multi-agent"],
    link: "https://github.com/subhan75/Orbit.ai",
  },
  {
    title: "RepairMate",
    tagline: "AI-Driven Home Device Diagnostics",
    description:
      "A multi-modal, multi-agent system that diagnoses household device faults from user-submitted video, fusing frame extraction, transcription, and Vision-Language model analysis into structured technician summaries. Automated prompt engineering with GEPA (a reflection-based optimizer) tuned against BERTScore. Applied model quantization for real-time on-device performance.",
    tech: ["Autogen", "OpenCV", "Whisper", "VLMs"],
    metrics: ["87% smaller model", "70% faster inference", "85% fault detection"],
  },
  {
    title: "Critique-Enhanced RAG",
    tagline: "Self-Refining Retrieval-Augmented Generation",
    description:
      "A self-critiquing RAG system that scores its own answers across four quality dimensions and conditionally refines those below threshold. Benchmarked three architectures (vanilla, LLM reranker, critique-refinement) across quality, cost, and latency.",
    tech: ["Python", "OpenAI API"],
    metrics: ["27% quality lift (150 SQuAD)", "refined 56% of answers"],
    link: "https://github.com/subhan75/Critique-Based-Retrieval-Augemented-Generation-RAG-",
  },
  {
    title: "Rolofy",
    tagline: "Digital Identity Platform (Live)",
    description:
      "A full-stack networking platform that replaces manual handle-swapping with a single scannable identity, letting people instantly exchange all their social and professional profiles at events. Solo-built and deployed end to end.",
    tech: ["Next.js", "FastAPI", "Supabase", "Vercel"],
    metrics: ["2k+ impressions", "40+ user profiles"],
    link: "https://rolofy.online",
    linkLabel: "rolofy.online",
  },
];

const COMPACT: Project[] = [
  {
    title: "Memora",
    description:
      "An AI mental-health support chatbot combining conversational memory, voice interaction, and sentiment analysis.",
    tech: [],
    link: "https://github.com/subhan75/Memora",
  },
  {
    title: "Content-Crew",
    description:
      "A multi-agent content generation system that collaboratively creates blog posts, images, and social content.",
    tech: [],
    link: "https://github.com/subhan75/Content-Crew",
  },
  {
    title: "AutoCents",
    description:
      "A car price prediction model that estimates a vehicle's current value from input parameters.",
    tech: [],
    link: "https://github.com/subhan75/AutoCents",
  },
];

function ProjectCard({ p, large = false }: { p: Project; large?: boolean }) {
  return (
    <article
      className={`group rounded-xl border border-border bg-card/60 p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_40px_-10px_rgba(45,212,191,0.25)] flex flex-col ${large ? "md:p-9" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {p.badge && (
            <div className="font-mono text-xs text-primary mb-2">★ {p.badge}</div>
          )}
          <h3 className={large ? "text-2xl font-semibold" : "text-lg font-semibold"}>
            {p.title}
            {p.tagline && (
              <span className="text-muted-foreground font-normal text-base"> — {p.tagline}</span>
            )}
          </h3>
        </div>
        {p.link ? (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition shrink-0"
            aria-label={`Open ${p.title}`}
          >
            <ArrowUpRight size={20} />
          </a>
        ) : (
          <span className="font-mono text-xs text-primary/80 shrink-0">Proprietary Lab Project</span>
        )}
      </div>
      <p className="mt-3 text-foreground/80 leading-relaxed text-[15px] flex-1">{p.description}</p>
      {p.metrics && (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-sm text-primary">
          {p.metrics.map((m) => (
            <span key={m}>· {m}</span>
          ))}
        </div>
      )}
      {p.tech.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
      {p.linkLabel && (
        <div className="mt-4 font-mono text-xs text-primary">→ {p.linkLabel}</div>
      )}
    </article>
  );
}

function Projects() {
  const articulr: Project = {
    title: "Articulr",
    badge: "currently building",
    description:
      "A personal branding assistant on autopilot. Turns a professional's real experience into consistent personal-brand content that compounds over time — no blank page, no writing skills required, published in their own voice.",
    tech: ["LLMs", "Agents", "Next.js"],
  };
  return (
    <section id="projects" className="py-24 reveal">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Featured Work</SectionLabel>

        <div className="mb-8">
          <ProjectCard p={articulr} large />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {FEATURED.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>

        <h3 className="mt-14 mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Other Projects</h3>
        <div className="grid md:grid-cols-3 gap-5">
          {COMPACT.map((p) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-border bg-card/60 p-5 hover:-translate-y-1 hover:border-primary/50 transition-all flex flex-col"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{p.title}</h4>
                <Github size={16} className="text-muted-foreground group-hover:text-primary transition" />
              </div>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{p.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="py-24 reveal">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Achievements</SectionLabel>
        <div className="rounded-xl border border-border bg-card/60 p-6 md:p-8">
          <div className="font-mono text-xs text-primary mb-2">★ CalHacks &rsquo;25</div>
          <h3 className="text-xl font-semibold">CalHacks &rsquo;25 — 3 Sponsor Tracks Won</h3>
          <p className="text-sm text-muted-foreground mt-1">UC Berkeley CalHacks 2025, the world&rsquo;s largest collegiate hackathon</p>
          <p className="mt-2 text-foreground/80 leading-relaxed">
            Built Orbit.ai, a modular MCP-agnostic developer productivity agent with real-time workflow automation and natural-language voice command execution. Won 3 sponsor tracks.
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-card/60 p-6 md:p-8">
          <div className="font-mono text-xs text-primary mb-2">★ Ideathon Circuit</div>
          <h3 className="text-xl font-semibold">1st Place &times; 2 — Intercollegiate Ideathon Circuit</h3>
          <p className="text-sm text-muted-foreground mt-1">Mumbai, India · Thakur College of Engineering &amp; Technology &amp; K.J. Somaiya College</p>
          <p className="mt-2 text-foreground/80 leading-relaxed">
            Won first place at two separate intercollegiate ideathons with a single idea — an AI-powered maternal wellness platform for expectant mothers in nuclear families, combining health assessments, personalized nutrition planning, ovulation tracking, and a culturally sensitive community forum. Two competitions, two first-place finishes.
          </p>
        </div>
      </div>
    </section>
  );
}

const SKILLS: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C", "SQL"] },
  {
    label: "AI / ML",
    items: [
      "RAG",
      "Multi-agent systems & orchestration",
      "MCP servers",
      "LLM fine-tuning",
      "Model evaluation",
      "Inference optimization",
      "Model quantization",
      "Prompt engineering",
      "Vector databases",
    ],
  },
  {
    label: "Frameworks & Libraries",
    items: ["PyTorch", "LangChain", "LangGraph", "LangSmith", "Autogen", "CrewAI", "Hugging Face", "FastAPI", "Next.js", "React"],
  },
  {
    label: "Infrastructure",
    items: ["PostgreSQL", "Supabase", "Docker", "GCP", "Vercel", "Git", "CI/CD", "REST APIs"],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-24 reveal">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Skills</SectionLabel>
        <div className="space-y-6">
          {SKILLS.map((g) => (
            <div key={g.label} className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-8 items-start">
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-primary pt-1.5">{g.label}</div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-24 reveal">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Education</SectionLabel>
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card/60 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
              <h3 className="text-xl font-semibold">University of California, Santa Cruz</h3>
              <span className="font-mono text-xs text-muted-foreground">Graduated 2026</span>
            </div>
            <div className="mt-1 text-foreground/85">
              MS, Computer Science <span className="text-muted-foreground">·</span>{" "}
              <span className="text-primary font-mono">GPA 4.0/4.0</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Relevant coursework: Intro to AI, Machine Learning, Deep Learning, Projects in AI,
              Database Systems, Data Structures &amp; Algorithms, Statistical Data Analysis.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
              <h3 className="text-xl font-semibold">University of Mumbai</h3>
              <span className="font-mono text-xs text-muted-foreground">Mumbai, India</span>
            </div>
            <div className="mt-1 text-foreground/85">BE, Computer Science</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "subhan.shaikh.me@gmail.com";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <section id="contact" className="py-24 reveal">
      <div className="mx-auto max-w-2xl px-6 flex flex-col items-center text-center">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
          Currently open to SWE/ AI/ FDE engineering roles at ambitious teams.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          If this resonates, LinkedIn is where to find me. GitHub is where to find the work.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            <Mail size={16} /> {email}
          </a>
          <button
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:border-primary/60 transition"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/subhan75"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:border-primary/50 hover:bg-card transition"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/subhan-shaikh75"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:border-primary/50 hover:bg-card transition"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>
      <footer className="mt-24 border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted-foreground text-center">
          © 2026 Subhan Shaikh. Built with care.
        </div>
      </footer>
    </section>
  );
}

function Portfolio() {
  useReveal();
  const active = useActiveSection();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <NavBar active={active} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Achievements />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
