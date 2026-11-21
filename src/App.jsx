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

// ─── Google Font: Inter ───────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
document.head.appendChild(fontLink);

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
    sub: "MSEM student at Tufts with a CS and AI background. I've shipped fintech payment flows, deployed an AI agent, and taken product case studies from user interviews to wireframes.",
  },
  about: [
    "I'm a CS graduate specialising in AI/ML and an MSEM (Engineering Management) student at Tufts University. At Small Fare Services I worked in a 4-person team to ship Payblee, a fintech bill-payment platform.",
    "Recently I built and deployed TGI Content Copilot, an AI agent that drafts marketing copy from a graduate school's public web pages and checks every link, date and deadline in code before a person sees the draft.",
    "On the product side, I ran user interviews, wrote a full PRD, built a DAU metrics dashboard tracking 6 KPIs, and designed 5 lo-fi wireframes in Figma for a Zomato Scheduled Delivery redesign.",
    "I'm looking for Summer 2027 PM, TPM and Product Analyst internships where technical background and product thinking both matter.",
  ],
  location: "Based in Medford, MA",
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
      company: "Tufts Gordon Institute, Tufts University",
      role: "Marketing Intern",
      period: "Sep 2026 – Present",
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
};

// ─── Skill Tag ────────────────────────────────────────────────────────────────
const Tag = ({ label }) => (
  <span
    style={{ 
      border: `1px solid ${S.border}`, 
      color: S.navy, 
      background: S.surface, 
      fontFamily: "Inter, sans-serif",
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
    <div style={{ fontFamily: "Inter, sans-serif", background: S.bg, color: S.navy }}>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          borderBottom: scrolled ? `1px solid ${S.border}` : "1px solid transparent",
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          transition: "all 0.3s",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center justify-center rounded-full hover:opacity-80 transition-opacity"
            style={{ width: 44, height: 44 }}
          >
            <img
              src={profileImage}
              alt="Shiva Dhanush Reddy"
              className="h-full w-full rounded-full object-cover"
            />
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
                className="text-sm font-medium hover:opacity-100 transition-opacity"
              >
                {l}
              </button>
            ))}
            <a
              href={data.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: `1.5px solid ${S.accent}`,
                color: S.accent,
                fontFamily: "Inter, sans-serif",
              }}
              className="text-sm font-semibold px-4 py-1.5 rounded-md hover:opacity-80 transition-opacity"
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
                style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
                className="text-sm font-medium py-1 text-left"
              >
                {l}
              </button>
            ))}
            <a
              href={data.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: `1.5px solid ${S.accent}`, color: S.accent, fontFamily: "Inter, sans-serif" }}
              className="text-sm font-semibold px-4 py-1.5 rounded-md text-center mt-1"
            >
              Resume
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-6 pt-36 pb-24">
        <Reveal>
          <p
            style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
            className="text-sm font-semibold tracking-widest uppercase mb-6"
          >
            PM · TPM · Product Analyst · Summer 2027
          </p>
          <h1
            style={{ color: S.navy, fontFamily: "Inter, sans-serif", lineHeight: 1.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl"
          >
            {data.hero.headline}
          </h1>
          <p
            style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
            className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          >
            {data.hero.sub}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("work")}
              style={{ background: S.navy, color: "#fff", fontFamily: "Inter, sans-serif" }}
              className="px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              View My Work
            </button>
            <a
              href={data.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: `1.5px solid ${S.navy}`, color: S.navy, fontFamily: "Inter, sans-serif" }}
              className="px-6 py-3 rounded-md font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <FileText size={16} />
              Download Resume
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── WORK (Case Studies) ── */}
      <section id="work" style={{ background: S.surface }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <p
              style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase mb-2"
            >
              Case Studies
            </p>
            <h2
              style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
              className="text-3xl font-bold mb-12"
            >
              Work
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {data.caseStudies.map((cs, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  style={{ background: S.bg, border: `1px solid ${S.border}`, fontFamily: "Inter, sans-serif" }}
                  className="rounded-2xl p-7 flex flex-col h-full hover:shadow-md transition-shadow"
                >
                  <span
                    style={{ background: `${S.accent}12`, color: S.accent, fontFamily: "Inter, sans-serif" }}
                    className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full self-start mb-4"
                  >
                    {cs.type}
                  </span>
                  <h3
                    style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
                    className="text-xl font-bold mb-3"
                  >
                    {cs.title}
                  </h3>
                  <p
                    style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
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
                        style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
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
              style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase mb-2"
            >
              About
            </p>
            <h2
              style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
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
                    style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
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
                  style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
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
              style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase mb-2"
            >
              Education
            </p>
            <h2
              style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
              className="text-3xl font-bold mb-12"
            >
              Academic Background
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={50}>
              <div
                style={{ background: S.bg, border: `1px solid ${S.border}`, fontFamily: "Inter, sans-serif" }}
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
                        style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
                        className="text-xl font-bold mb-1"
                      >
                        Tufts University
                      </h3>
                      <p
                        style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
                        className="text-xs font-semibold mb-1 max-w-xs"
                      >
                        Master of Science in Engineering Management (MSEM)
                      </p>
                    </div>
                  </div>
                  <span
                    style={{ border: `1px solid ${S.border}`, color: S.textMuted, background: S.surface, fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}
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
                      style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
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
                style={{ background: S.bg, border: `1px solid ${S.border}`, fontFamily: "Inter, sans-serif" }}
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
                        style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
                        className="text-xl font-bold mb-1"
                      >
                        Malla Reddy University
                      </h3>
                      <p
                        style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
                        className="text-xs font-semibold mb-1 max-w-xs"
                      >
                        B.Tech in Computer Science and AI/ML
                      </p>
                    </div>
                  </div>
                  <span
                    style={{ border: `1px solid ${S.border}`, color: S.textMuted, background: S.surface, fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}
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
                      style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
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
      <section id="experience" style={{ background: S.surface }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <p
              style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase mb-2"
            >
              Experience
            </p>
            <h2
              style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
              className="text-3xl font-bold mb-12"
            >
              Where I've Worked
            </h2>
          </Reveal>

          <div className="space-y-6">
          {data.experience.map((job, j) => (
          <Reveal key={job.company} delay={50 + j * 80}>
            <div
              style={{ background: S.bg, border: `1px solid ${S.border}`, fontFamily: "Inter, sans-serif" }}
              className="rounded-2xl p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className={`${job.logoClass} w-auto rounded-md object-contain`}
                  />
                  <div>
                    <h3
                      style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
                      className="text-xl font-bold mb-1"
                    >
                      {job.company}
                    </h3>
                    <p
                      style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
                      className="text-sm font-semibold mb-1"
                    >
                      {job.role}
                    </p>
                    <p
                      style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
                      className="text-xs"
                    >
                      {job.product}
                    </p>
                  </div>
                </div>
                <span
                  style={{ border: `1px solid ${S.border}`, color: S.textMuted, background: S.surface, fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}
                  className="text-xs font-medium px-4 py-1.5 rounded-full self-start"
                >
                  {job.period}
                </span>
              </div>

              <ul className="space-y-3">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      style={{ background: S.accent, flexShrink: 0 }}
                      className="mt-2 w-1.5 h-1.5 rounded-full"
                    />
                    <p
                      style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
                      className="text-sm leading-relaxed"
                    >
                      {b}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
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
              style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase mb-2"
            >
              Skills
            </p>
            <h2
              style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
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
                    style={{ color: S.navy, fontFamily: "Inter, sans-serif", borderBottom: `1px solid ${S.border}` }}
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
              style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Let's Talk.
            </h2>
            <p
              style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
              className="text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
            >
              Open to Summer 2027 PM, TPM and Product Analyst internships. Based in Medford, MA.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`mailto:${data.email}`}
                style={{ background: S.navy, color: "#fff", fontFamily: "Inter, sans-serif" }}
                className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <Mail size={16} /> Email Me
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ border: `1.5px solid ${S.navy}`, color: S.navy, fontFamily: "Inter, sans-serif" }}
                className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href={data.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ border: `1.5px solid ${S.accent}`, color: S.accent, fontFamily: "Inter, sans-serif" }}
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
        style={{ borderTop: `1px solid ${S.border}`, background: S.surface, fontFamily: "Inter, sans-serif" }}
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