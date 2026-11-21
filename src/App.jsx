import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Linkedin,
  FileText,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
// import profileImage from "./assets/profileImage.png";
import profileImage from "./assets/img.jpeg";
import portrait from "./assets/portrait-cutout.webp";

// ─── Google Font: Inter ───────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
document.head.appendChild(fontLink);
const generalSans = document.createElement("link");
generalSans.rel = "stylesheet";
generalSans.href = "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap";
document.head.appendChild(generalSans);

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
// Primary text / sections: #0A192F (dark navy)
// Accent: #C0392B (deep red)
// Background: #FFFFFF (white)
// Subtle surface: #F7F8FA
// Border: #E2E6EA

// ─── Portfolio Data ───────────────────────────────────────────────────────────
const data = {
  name: "Shiva Dhanush Reddy Taduri",
  short: "SDR",
  email: "shivadhanushreddythaduri@gmail.com",
  linkedin: "https://www.linkedin.com/in/taduri-shiva-dhanush-reddy",
  github: "https://github.com/shivadhanush1216",
  resumePdf: "https://drive.google.com/file/d/1O8At4L1fqTdkyudqOIz-3gv-JPYogDOA/view?usp=drive_link",
  hero: {
    headline: "I turn User Research into Product Decisions.",
    sub: "A product-minded engineer and MSEM student at Tufts, turning user research into product decisions and shipping AI products end to end. Open to Summer 2027 internships.",
  },
  about: [
    "I'm a CS graduate specialising in AI/ML and an MSEM (Engineering Management) student at Tufts University. At Small Fare Services I worked in a 4-person team to ship Payblee, a fintech bill-payment platform.",
    "Recently I built and deployed TGI Content Copilot, an AI agent that drafts marketing copy from a graduate school's public web pages and checks every link, date and deadline in code before a person sees the draft.",
    "On the product side, I ran user interviews, wrote a full PRD, built a DAU metrics dashboard tracking 6 KPIs, and designed 5 lo-fi wireframes in Figma for a Zomato Scheduled Delivery redesign.",
    "I'm looking for Summer 2027 PM, TPM and Product Analyst internships where technical background and product thinking both matter.",
  ],
  location: "Based in Medford, MA",
  stats: [
    { value: "4", label: ["Product & AI", "projects"] },
    { value: "2", label: ["Internships in", "fintech & marketing"] },
  ],
  caseStudies: [
    {
      title: "TGI Content Copilot",
      type: "AI Product · Live",
      desc: "Built and deployed an agentic RAG app that drafts Instagram, Reel and email copy from Tufts Gordon Institute's public pages. Rule-based guardrails verify facts in code, backed by 46 unit tests and a 23-brief evaluation harness.",
      tools: ["LangGraph", "RAG", "Gemini", "FastAPI", "ChromaDB", "PostgreSQL"],
      links: [
        { label: "Live App", href: "https://tgi-content-copilot.onrender.com" },
        { label: "View Code", href: "https://github.com/shivadhanush1216/content-copilot" },
      ],
    },
    {
      title: "Zomato Scheduled Delivery Redesign",
      type: "End-to-End PM Case Study",
      desc: "Found that 4 of 5 frequent users I interviewed had never discovered Scheduled Delivery. Built a PRD with 7 user stories, RICE prioritisation, a DAU dashboard, and 5 Figma wireframes.",
      tools: ["User Research", "PRD", "RICE", "MoSCoW", "Figma", "Google Sheets"],
      links: [
        { label: "View Case Study", href: "https://app.notion.com/p/Zomato-Scheduled-Delivery-Redesign-PM-Case-Study-351a8a7d1395816ea395efd972689ad3" },
      ],
    },
    {
      title: "YouTube Music Product Teardown",
      type: "Product Analysis",
      desc: "Diagnosed 3 core UX failures backed by real user data. Root cause analysis and competitor-benchmarked fixes with success metrics.",
      tools: ["Product Analysis", "Competitive Research", "Root Cause Analysis"],
      links: [
        { label: "View Teardown", href: "https://drive.google.com/file/d/1ZCvcxRnlu4GUR6cWHgXUJZE17EYu4wSq/view?usp=sharing" },
      ],
    },
    {
      title: "Retail Demand Forecasting",
      type: "ML Dashboard · Live",
      desc: "Built and deployed a dashboard where a store planner compares 4 forecasting models for any of 45 stores and tests what-if scenarios before committing to an inventory plan.",
      tools: ["Python", "Prophet", "ARIMA", "XGBoost", "LSTM", "Streamlit"],
      links: [
        { label: "Live Demo", href: "https://walmartdemandforecasting.streamlit.app/" },
      ],
    },
  ],
  experience: [
    {
      company: "Tufts Gordon Institute",
      role: "Marketing Intern",
      period: "Sep 2026 – Present",
      location: "Medford, MA",
      product: "Digital marketing and student outreach for graduate programs",
      logo: "/Tufts_University_logo.png",
      logoClass: "h-8",
      bullets: [
        "Shot and edited an Instagram Reel for TGI's graduate programs that reached 5,000+ views, and created Instagram posts and blog articles.",
        "Analyzed and optimized TGI program pages for search, and documented the findings and changes for the team.",
      ],
    },
    {
      company: "Small Fare Services Pvt. Ltd.",
      role: "Frontend Developer Intern",
      period: "Jun 2025 – Sep 2025",
      location: "Remote",
      product: "Payblee · Fintech bill-payment platform",
      logo: "/smallfare_logo.jpg",
      logoClass: "h-16",
      bullets: [
        "Shipped 5 end-to-end user journeys (dashboard, credit score, loan repayment, insurance, wallet) by translating wireframes into React.js and Tailwind CSS, iterating daily with the product lead.",
        "Reduced page load time by 35% by optimising component architecture and implementing async API calls with loading and error states.",
        "Increased user engagement by 30% by building a personalised greeting system, real-time notifications, and a multi-step payment flow.",
        "Cut future integration effort by 25% with a reusable component library, session management, and Razorpay/Cashfree SDK integration, following payment card security standards.",
      ],
    },
  ],
  skills: {
    Product: [
      "User Research",
      "PRD Writing",
      "RICE",
      "MoSCoW",
      "HEART",
      "AARRR",
      "Wireframing",
      "Product Teardown",
      "Agile/Scrum",
    ],
    "AI & Data": ["RAG", "LangGraph", "ChromaDB", "Gemini API", "LLM Evaluation", "Python (pandas)", "SQL"],
    Technical: ["React.js", "Tailwind CSS", "JavaScript", "FastAPI", "PostgreSQL", "REST APIs", "Git"],
    Tools: ["Figma", "FigJam", "Notion", "Google Sheets", "Excel", "Jira", "Gamma"],
  },
};

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  );
};

// ─── Inline Styles (CSS-in-JS for tokens not covered by Tailwind purge) ──────
const S = {
  accent: "#C0392B",
  navy: "#0A192F",
  navyLight: "#1a2f4a",
  bg: "#ffffff",
  surface: "#F7F8FA",
  border: "#E2E6EA",
  textMuted: "#5A6A7A",
  heroBg: "#E8EDF3",
  ink: "#121821",
  body: "#1F2A37",
  dotFill: "#D3DCE6",
  dash: "#C3CDD8",
};

// ─── Skill Tag ────────────────────────────────────────────────────────────────
const Tag = ({ label }) => (
  <span
    style={{ 
      border: `1px solid ${S.border}`, 
      color: S.navy, 
      background: S.surface, 
      fontFamily: "'General Sans', Inter, sans-serif",
      transition: "all 0.3s ease"
    }}
    className="inline-block text-xs font-medium px-3 py-1 rounded-full cursor-pointer hover:border-current hover:bg-opacity-80"
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = S.accent;
      e.currentTarget.style.color = S.accent;
      e.currentTarget.style.backgroundColor = `${S.accent}12`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = S.border;
      e.currentTarget.style.color = S.navy;
      e.currentTarget.style.backgroundColor = S.surface;
    }}
  >
    {label}
  </span>
);

// ─── Hero visual: cut-out portrait, shape behind, two stats ─────────────────
const Squiggle = ({ d, w, h, style }) => (
  <svg aria-hidden="true" width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={style}>
    <path d={d} stroke={S.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Stat = ({ stat, align = "left" }) => (
  <div style={{ textAlign: align }}>
    <p style={{ color: S.navy, fontSize: "2.25rem", lineHeight: 1, fontWeight: 600, letterSpacing: "-0.01em" }}>{stat.value}</p>
    <p style={{ color: S.navy, fontSize: "1.125rem", lineHeight: 1.45, marginTop: 8 }}>
      {stat.label[0]}<br />{stat.label[1]}
    </p>
  </div>
);

const HeroVisual = () => (
  <div className="relative mx-auto" style={{ maxWidth: 920 }}>
    <div className="relative mx-auto" style={{ height: "clamp(360px, 44vw, 540px)" }}>
      {/* shape behind the portrait */}
      <svg
        aria-hidden="true"
        viewBox="0 0 520 440"
        className="absolute bottom-0 left-1/2"
        style={{ height: "100%", width: "auto", transform: "translateX(-44%)" }}
      >
        <path d="M110 340 L360 62" stroke={S.navy} strokeWidth="112" strokeLinecap="round" fill="none" />
        <path d="M262 232 L398 232" stroke={S.navy} strokeWidth="112" strokeLinecap="round" fill="none" />
      </svg>
      <img
        src={portrait}
        alt="Shiva Dhanush Reddy Taduri"
        width="512"
        height="980"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none"
        style={{ height: "100%", width: "auto", objectFit: "contain", objectPosition: "top" }}
      />

      {/* stats, desktop */}
      <div className="absolute hidden md:block" style={{ left: "8%", bottom: "16%" }}>
        <Stat stat={data.stats[0]} />
        <Squiggle w={96} h={36} d="M3 10 C 32 0, 66 4, 92 30" style={{ position: "absolute", left: "100%", top: "62%", marginLeft: 4 }} />
      </div>
      <div className="absolute hidden md:block" style={{ right: "0%", bottom: "36%" }}>
        <Stat stat={data.stats[1]} align="center" />
        <Squiggle
          w={170}
          h={86}
          d="M160 6 C 130 24, 104 36, 78 40 C 48 44, 44 16, 64 16 C 86 16, 82 54, 46 70 C 32 76, 18 79, 4 80"
          style={{ position: "absolute", right: "30%", top: "100%", marginTop: 10 }}
        />
      </div>
    </div>

    {/* stats, phone */}
    <div className="md:hidden grid grid-cols-2 gap-6 py-8">
      <Stat stat={data.stats[0]} />
      <Stat stat={data.stats[1]} />
    </div>
  </div>
);

// ─── Experience timeline item ─────────────────────────────────────────────────
const ExperienceItem = ({ job, last }) => {
  const [open, setOpen] = useState(false);
  const hasMore = job.bullets.length > 2;
  const shown = open || !hasMore ? job.bullets : job.bullets.slice(0, 2);
  const font = "'General Sans', Inter, sans-serif";
  return (
    <div className="relative pl-14 md:pl-[4.5rem]" style={{ paddingBottom: last ? 0 : 64 }}>
      {!last && (
        <span aria-hidden="true" className="absolute" style={{ left: 17, top: 44, bottom: 0, borderLeft: `1.5px dashed ${S.dash}` }} />
      )}
      <span
        aria-hidden="true"
        className="absolute flex items-center justify-center rounded-full"
        style={{ left: 0, top: 4, width: 36, height: 36, border: `1px solid ${S.border}`, background: S.bg }}
      >
        <span className="rounded-full" style={{ width: 20, height: 20, background: S.dotFill }} />
      </span>

      <h3 style={{ color: S.ink, fontFamily: font, fontSize: "clamp(1.5rem, 2.6vw, 2rem)", lineHeight: 1.2, fontWeight: 500 }}>
        {job.company}
      </h3>
      <p className="mt-2 text-sm flex flex-wrap items-center gap-x-3 gap-y-1" style={{ color: S.textMuted, fontFamily: font }}>
        <span className="font-semibold">{job.role}</span>
        <span aria-hidden="true">•</span>
        <span>{job.location}</span>
        <span aria-hidden="true">•</span>
        <span>{job.period}</span>
      </p>

      <ul className="mt-6 space-y-6">
        {shown.map((b, i) => (
          <li key={i} className="flex gap-3" style={{ color: S.body, fontFamily: font, fontSize: "1.0625rem", lineHeight: 1.65 }}>
            <span aria-hidden="true" style={{ color: S.ink, fontSize: "0.75rem", lineHeight: "1.8rem" }}>●</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="mt-6 hover:underline underline-offset-4"
          style={{ color: S.ink, fontFamily: font, fontSize: "1.0625rem" }}
        >
          {open ? "Hide" : "Read more..."}
        </button>
      )}
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = ["Work", "About", "Experience", "Skills", "Contact"];

  return (
    <div style={{ fontFamily: "'General Sans', Inter, sans-serif", background: S.bg, color: S.navy }}>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          borderBottom: scrolled ? `1px solid ${S.border}` : "1px solid transparent",
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          transition: "all 0.3s",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
        className="fixed top-0 left-0 right-0 z-50"
        aria-label="Main"
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-left hover:opacity-80 transition-opacity"
            style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif", fontWeight: 600, fontSize: "1.125rem", lineHeight: 0.95, letterSpacing: "-0.01em" }}
            aria-label="Back to top"
          >
            Shiva<br />Dhanush.
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
                className="text-[15px] font-medium hover:opacity-70 transition-opacity"
              >
                {l}
              </button>
            ))}
            <a
              href={data.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: S.navy,
                color: "#fff",
                fontFamily: "'General Sans', Inter, sans-serif",
              }}
              className="text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Resume
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: S.navy }}
            className="md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{ borderTop: `1px solid ${S.border}`, background: S.bg }}
            className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-3"
          >
            {navLinks.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
                className="text-sm font-medium py-1 text-left"
              >
                {l}
              </button>
            ))}
            <a
              href={data.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: `1.5px solid ${S.accent}`, color: S.accent, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-sm font-semibold px-4 py-1.5 rounded-md text-center mt-1"
            >
              Resume
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: S.heroBg }} className="overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-32 md:pt-44">
          <div className="grid md:grid-cols-2 gap-6 md:gap-14 items-start">
            <Reveal>
              <p style={{ color: S.navy }} className="text-lg mb-3">Hey there,</p>
              <h1
                style={{ color: S.navy, fontSize: "clamp(2.75rem, 5.6vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 600 }}
              >
                I&rsquo;m Shiva<br />Dhanush
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <div className="md:pt-11">
                <p style={{ color: S.body }} className="text-lg leading-relaxed max-w-xl">
                  {data.hero.sub}
                </p>
                <button
                  onClick={() => scrollTo("work")}
                  style={{ color: S.navy }}
                  className="group mt-6 inline-flex items-center gap-2 text-lg font-semibold"
                >
                  See My Work
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </button>
              </div>
            </Reveal>
          </div>
          <div className="mt-10 md:mt-8">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ── WORK (Case Studies) ── */}
      <section id="work" style={{ background: S.surface }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <p
              style={{ color: S.accent, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase mb-2"
            >
              Case Studies
            </p>
            <h2
              style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-3xl font-bold mb-12"
            >
              Work
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {data.caseStudies.map((cs, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  style={{ background: S.bg, border: `1px solid ${S.border}`, fontFamily: "'General Sans', Inter, sans-serif" }}
                  className="rounded-2xl p-7 flex flex-col h-full hover:shadow-md transition-shadow"
                >
                  <span
                    style={{ background: `${S.accent}12`, color: S.accent, fontFamily: "'General Sans', Inter, sans-serif" }}
                    className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full self-start mb-4"
                  >
                    {cs.type}
                  </span>
                  <h3
                    style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
                    className="text-xl font-bold mb-3"
                  >
                    {cs.title}
                  </h3>
                  <p
                    style={{ color: S.textMuted, fontFamily: "'General Sans', Inter, sans-serif" }}
                    className="text-sm leading-relaxed mb-5 flex-1"
                  >
                    {cs.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cs.tools.map((t) => <Tag key={t} label={t} />)}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {cs.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: S.accent, fontFamily: "'General Sans', Inter, sans-serif" }}
                        className="text-sm font-semibold flex items-center gap-1 hover:opacity-70 transition-opacity"
                      >
                        {l.label} <ExternalLink size={13} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: S.bg }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <p
              style={{ color: S.accent, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase mb-2"
            >
              About
            </p>
            <h2
              style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-3xl font-bold mb-12"
            >
              Background
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-[1fr_280px] gap-12 items-start">
            <Reveal delay={50}>
              <div className="space-y-5">
                {data.about.map((p, i) => (
                  <p
                    key={i}
                    style={{ color: S.textMuted, fontFamily: "'General Sans', Inter, sans-serif" }}
                    className="text-base leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="flex flex-col items-center gap-3">
                <div
                  style={{ background: S.surface }}
                  className="w-64 h-64 rounded-full flex items-center justify-center overflow-hidden md:w-72 md:h-72"
                >
                  <img
                    src={profileImage}
                    alt="Shiva Dhanush Reddy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.innerHTML = `<span style="font-size:3rem;font-weight:800;color:#0A192F;font-family:Inter,sans-serif">SDR</span>`;
                    }}
                  />
                </div>
                <p
                  style={{ color: S.textMuted, fontFamily: "'General Sans', Inter, sans-serif" }}
                  className="text-xs text-center leading-relaxed mt-2"
                >
                  {data.location}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={{ background: S.surface }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <p
              style={{ color: S.accent, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase mb-2"
            >
              Education
            </p>
            <h2
              style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-3xl font-bold mb-12"
            >
              Academic Background
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={50}>
              <div
                style={{ background: S.bg, border: `1px solid ${S.border}`, fontFamily: "'General Sans', Inter, sans-serif" }}
                className="rounded-2xl p-8 md:p-10 h-full flex flex-col"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="/Tufts_University_logo.png"
                      alt="Tufts University logo"
                      className="h-8 w-auto rounded-md object-contain"
                    />
                    <div>
                      <h3
                        style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
                        className="text-xl font-bold mb-1"
                      >
                        Tufts University
                      </h3>
                      <p
                        style={{ color: S.accent, fontFamily: "'General Sans', Inter, sans-serif" }}
                        className="text-xs font-semibold mb-1 max-w-xs"
                      >
                        Master of Science in Engineering Management (MSEM)
                      </p>
                    </div>
                  </div>
                  <span
                    style={{ border: `1px solid ${S.border}`, color: S.textMuted, background: S.surface, fontFamily: "'General Sans', Inter, sans-serif", whiteSpace: "nowrap" }}
                    className="text-xs font-medium px-4 py-1.5 rounded-full self-start"
                  >
                    Aug 2026 – May 2028
                  </span>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span
                      style={{ background: S.accent, flexShrink: 0 }}
                      className="mt-2 w-1.5 h-1.5 rounded-full"
                    />
                    <p
                      style={{ color: S.textMuted, fontFamily: "'General Sans', Inter, sans-serif" }}
                      className="text-sm leading-relaxed"
                    >
                      Graduate program that combines engineering, product and business leadership.
                    </p>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div
                style={{ background: S.bg, border: `1px solid ${S.border}`, fontFamily: "'General Sans', Inter, sans-serif" }}
                className="rounded-2xl p-8 md:p-10 h-full flex flex-col"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="/MRU.png"
                      alt="Malla Reddy University logo"
                      className="h-8 w-auto rounded-md object-contain"
                    />
                    <div>
                      <h3
                        style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
                        className="text-xl font-bold mb-1"
                      >
                        Malla Reddy University
                      </h3>
                      <p
                        style={{ color: S.accent, fontFamily: "'General Sans', Inter, sans-serif" }}
                        className="text-xs font-semibold mb-1 max-w-xs"
                      >
                        B.Tech in Computer Science and AI/ML
                      </p>
                    </div>
                  </div>
                  <span
                    style={{ border: `1px solid ${S.border}`, color: S.textMuted, background: S.surface, fontFamily: "'General Sans', Inter, sans-serif", whiteSpace: "nowrap" }}
                    className="text-xs font-medium px-4 py-1.5 rounded-full self-start"
                  >
                    2022 – 2026
                  </span>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span
                      style={{ background: S.accent, flexShrink: 0 }}
                      className="mt-2 w-1.5 h-1.5 rounded-full"
                    />
                    <p
                      style={{ color: S.textMuted, fontFamily: "'General Sans', Inter, sans-serif" }}
                      className="text-sm leading-relaxed"
                    >
                      Developed a strong technical foundation in AI/ML, full-stack development, and product-oriented engineering.
                    </p>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ background: S.bg }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 md:gap-8">
          <Reveal>
            <h2
              className="md:sticky md:top-28"
              style={{ color: S.ink, fontSize: "clamp(2.25rem, 4.2vw, 3rem)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              My work<br />experience
            </h2>
          </Reveal>
          <div className="min-w-0">
            {data.experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 80}>
                <ExperienceItem job={job} last={i === data.experience.length - 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ background: S.bg }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <p
              style={{ color: S.accent, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase mb-2"
            >
              Skills
            </p>
            <h2
              style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-3xl font-bold mb-12"
            >
              Capabilities
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10">
            {Object.entries(data.skills).map(([group, items], i) => (
              <Reveal key={group} delay={i * 80}>
                <div>
                  <p
                    style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif", borderBottom: `1px solid ${S.border}` }}
                    className="text-xs font-semibold tracking-widest uppercase pb-3 mb-4"
                  >
                    {group}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => <Tag key={s} label={s} />)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: S.bg }}>
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <Reveal>
            <h2
              style={{ color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Let's Talk.
            </h2>
            <p
              style={{ color: S.textMuted, fontFamily: "'General Sans', Inter, sans-serif" }}
              className="text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
            >
              Open to Summer 2027 PM, TPM and Product Analyst internships. Based in Medford, MA.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`mailto:${data.email}`}
                style={{ background: S.navy, color: "#fff", fontFamily: "'General Sans', Inter, sans-serif" }}
                className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <Mail size={16} /> Email Me
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ border: `1.5px solid ${S.navy}`, color: S.navy, fontFamily: "'General Sans', Inter, sans-serif" }}
                className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href={data.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ border: `1.5px solid ${S.accent}`, color: S.accent, fontFamily: "'General Sans', Inter, sans-serif" }}
                className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm hover:opacity-80 transition-opacity"
              >
                <FileText size={16} /> Download Resume
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{ borderTop: `1px solid ${S.border}`, background: S.surface, fontFamily: "'General Sans', Inter, sans-serif" }}
        className="py-6 text-center"
      >
        <p style={{ color: S.textMuted }} className="text-xs">
          Shiva Dhanush Reddy Taduri
        </p>
      </footer>

    </div>
  );
};

export default App;