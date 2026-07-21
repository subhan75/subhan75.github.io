export type Role = {
  company: string;
  title: string;
  location: string;
  dates: string;
  bullets: string[];
  metrics?: { value: number; suffix: string; label: string }[];
};

export const ROLES: Role[] = [
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
      "Researched advanced Retrieval-Augmented Generation techniques to build a CS-department specific chatbot over course and program data, under Professor Leilani Gilpin's AI Explainability & Accountability Lab. Explored Prolog-based symbolic reasoning as part of broader research into LLM explainability.",
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

export type Project = {
  title: string;
  tagline?: string;
  description: string;
  tech: string[];
  link?: string;
  linkLabel?: string;
  buttonLabel?: string;
  metrics?: string[];
  badge?: string;
};

export const ARTICULR: Project = {
  title: "Articulr",
  badge: "currently building",
  description:
    "A personal branding assistant on autopilot. Turns a professional's real experience into consistent personal-brand content that compounds over time — no blank page, no writing skills required, published in their own voice.",
  tech: ["LLMs", "Agents", "Next.js"],
  link: "https://www.articulr.com/",
  buttonLabel: "Join Waitlist",
};

export const FEATURED: Project[] = [
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

export const COMPACT: Project[] = [
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

export const SKILLS: { label: string; items: string[] }[] = [
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

export const ABOUT_TEXT =
  "Subhan Shaikh moved from Mumbai to California to build AI systems. IBM gave him his first real AI project. UC Santa Cruz gave him a 4.0 GPA and over a year of research in explainability and Vision-Language models. Gogentic.ai gave him a startup environment, a small AI team, an eight-week deadline, and an infrastructure cost problem he cut by 80%. CalHacks 2025 gave him three sponsor track wins. He knows where AI systems break, and how to make sure they don't.";

export const EDUCATION_TEXT =
  "MS, Computer Science — University of California, Santa Cruz (graduated 2026), GPA 4.0/4.0. Relevant coursework: Intro to AI, Machine Learning, Deep Learning, Projects in AI, Database Systems, Data Structures & Algorithms, Statistical Data Analysis. BE, Computer Science — University of Mumbai.";

export const ACHIEVEMENTS_TEXT =
  "CalHacks '25 — won 3 sponsor tracks at UC Berkeley's CalHacks 2025 (the world's largest collegiate hackathon) for Orbit.ai, a modular MCP-agnostic developer productivity agent with real-time workflow automation and natural-language voice command execution. 1st Place x2 — Intercollegiate Ideathon Circuit (Mumbai, India: Thakur College of Engineering & Technology and K.J. Somaiya College) for an AI-powered maternal wellness platform combining health assessments, personalized nutrition planning, ovulation tracking, and a community forum.";

export const CONTACT = {
  email: "subhan.shaikh.me@gmail.com",
  github: "https://github.com/subhan75",
  linkedin: "https://www.linkedin.com/in/subhan-shaikh75",
  status: "Currently open to SWE / AI / FDE engineering roles at ambitious teams.",
};

function formatProject(p: Project): string {
  const parts = [`- ${p.title}${p.tagline ? ` (${p.tagline})` : ""}: ${p.description}`];
  if (p.tech.length > 0) parts.push(`  Tech: ${p.tech.join(", ")}`);
  if (p.metrics) parts.push(`  Metrics: ${p.metrics.join(", ")}`);
  if (p.badge) parts.push(`  Note: ${p.badge}`);
  return parts.join("\n");
}

function formatRole(r: Role): string {
  const parts = [`- ${r.title} at ${r.company} (${r.location}, ${r.dates})`];
  for (const b of r.bullets) parts.push(`  - ${b}`);
  if (r.metrics) parts.push(`  Metrics: ${r.metrics.map((m) => `${m.value}${m.suffix} ${m.label}`).join(", ")}`);
  return parts.join("\n");
}

// Corpus is small enough (~2-3k tokens) to pass in full as context on every call instead of building a vector-search retrieval step.
export function buildResumeContext(): string {
  return [
    "ABOUT:",
    ABOUT_TEXT,
    "",
    "WORK & RESEARCH EXPERIENCE:",
    ROLES.map(formatRole).join("\n"),
    "",
    "FEATURED PROJECTS:",
    [ARTICULR, ...FEATURED].map(formatProject).join("\n"),
    "",
    "OTHER PROJECTS:",
    COMPACT.map(formatProject).join("\n"),
    "",
    "SKILLS:",
    SKILLS.map((g) => `- ${g.label}: ${g.items.join(", ")}`).join("\n"),
    "",
    "EDUCATION:",
    EDUCATION_TEXT,
    "",
    "ACHIEVEMENTS:",
    ACHIEVEMENTS_TEXT,
    "",
    "CURRENT STATUS & CONTACT:",
    `${CONTACT.status} Email: ${CONTACT.email}. GitHub: ${CONTACT.github}. LinkedIn: ${CONTACT.linkedin}.`,
  ].join("\n");
}
