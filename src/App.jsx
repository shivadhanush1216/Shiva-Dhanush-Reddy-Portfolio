import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Linkedin,
  FileText,
  ExternalLink,
  Send,
  Loader,
  Search,
  Menu,
  X,
  ChevronRight,
  MessageSquare,
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
  phone: "+91 92474 48076",
  linkedin: "https://linkedin.com/in/taduri-shiva-dhanush-reddy",
  resumePdf: "https://drive.google.com/file/d/1O8At4L1fqTdkyudqOIz-3gv-JPYogDOA/view?usp=drive_link",
  hero: {
    headline: "I turn User Research into Product Decisions.",
    sub: "MSIM Student @ Tufts. Product Analyst candidate with a fintech internship and two end-to-end PM case studies.",
  },
  about: [
    "I'm a CS graduate specialising in AI/ML,MSIM student at Tufts University. I worked in a 4-person team at Small Fare Services to ship Payblee, a fintech bill-payment platform.",
    "On the product side, I ran user interviews, wrote a full PRD, built a DAU metrics dashboard tracking 6 KPIs, and designed 5 lo-fi wireframes in Figma for a Zomato Scheduled Delivery redesign.",
    "I'm looking for Summer 2027 PM and Product Analyst internships where technical background and product thinking both matter.",
  ],
  // location: "Currently in Hyderabad. Moving to Medford, MA in August 2026.",
  caseStudies: [
    {
      title: "Zomato Scheduled Delivery Redesign",
      type: "End-to-End PM Case Study",
      desc: "Identified an 80% feature discovery failure through 5 user interviews. Built PRD, RICE prioritisation, DAU dashboard, and 5 Figma wireframes.",
      tools: ["User Research", "PRD", "RICE", "MoSCoW", "Figma", "Google Sheets"],
      link: "https://notion.so/351a8a7d1395816ea395efd972689ad3",
      cta: "View Case Study",
    },
    {
      title: "YouTube Music Product Teardown",
      type: "Product Analysis",
      desc: "Diagnosed 3 core UX failures backed by real user data. Root cause analysis and competitor-benchmarked fixes with success metrics.",
      tools: ["Product Analysis", "Competitive Research", "Root Cause Analysis"],
      link: "https://drive.google.com/file/d/1ZCvcxRnlu4GUR6cWHgXUJZE17EYu4wSq/view?usp=sharing",
      cta: "View Teardown",
    },
  ],
  experience: {
    company: "Small Fare Services Pvt. Ltd.",
    role: "Product and Frontend Developer Intern",
    period: "Jun 2025 – Sep 2025",
    product: "Payblee · Fintech bill-payment platform",
    bullets: [
      "Shipped 5 end-to-end user journeys (dashboard, credit score, loan repayment, insurance, wallet) by translating wireframes into React.js and Tailwind CSS.",
      "Reduced page load time by 35% by optimising component architecture and implementing async API calls with loading and error states.",
      "Increased user engagement by 30% by building personalised greeting system, real-time notifications, and multi-step payment flow.",
      "Cut future integration effort by 25% via PCI-DSS compliant component library with Razorpay/Cashfree SDK integration.",
    ],
  },
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
    Tools: ["Figma", "FigJam", "Notion", "Google Sheets", "Excel", "Jira", "Gamma"],
    Technical: ["React.js", "Tailwind CSS", "JavaScript", "Python", "SQL", "Git"],
  },
  aiContext: `
    Shiva Dhanush Reddy Taduri is a Product Analyst candidate targeting Summer 2027 PM and Product Analyst internships in the US market.

    EDUCATION:
    - Incoming MSIM (Master of Science, Innovation and Management) @ Tufts University, Medford MA — Aug 2026
    - B.Tech CS/AI-ML, Malla Reddy University, Hyderabad — GPA 8.56/10

    EXPERIENCE:
    - Product and Frontend Developer Intern at Small Fare Services Pvt. Ltd. (Jun–Sep 2025)
    - Shipped Payblee, a fintech bill-payment platform
    - 35% page load reduction, 30% engagement increase, 25% integration effort reduction

    PM CASE STUDIES:
    1. Zomato Scheduled Delivery Redesign (Feb–Apr 2026)
       - 5 primary user interviews using Mom Test principles
       - 80% feature discovery failure uncovered
       - RICE scoring + MoSCoW scoping
       - 6-KPI DAU dashboard (HEART + AARRR)
       - 5 Figma wireframes + FigJam user flow
       - Link: https://notion.so/351a8a7d1395816ea395efd972689ad3

    2. YouTube Music Product Teardown (Apr 2026)
       - 3 UX failures backed by sourced data (shuffle bug 500+ complaints, AI flooding 370+ Reddit upvotes, background play paywall)
       - Root cause: architecture misalignment (YouTube feature vs standalone product)
       - Benchmarked Spotify and Deezer
       - 3 fixes with success metrics (NPS, DAU, 30-day targets)
       - Link: https://drive.google.com/file/d/1ZCvcxRnlu4GUR6cWHgXUJZE17EYu4wSq/view?usp=sharing

    SKILLS — Product: User Research, PRD Writing, RICE, MoSCoW, HEART, AARRR, Wireframing, Product Teardown, Agile/Scrum
    SKILLS — Tools: Figma, FigJam, Notion, Google Sheets, Excel, Jira, Gamma
    SKILLS — Technical: React.js, Tailwind CSS, JavaScript, Python, SQL, Git

    CONTACT: shivadhanushreddythaduri@gmail.com | +91 92474 48076
    LinkedIn: linkedin.com/in/taduri-shiva-dhanush-reddy
    Location: Hyderabad now → Medford MA from Aug 2026
  `,
};

// ─── Gemini API ───────────────────────────────────────────────────────────────
const apiKey = ""; // injected by environment

const callGemini = async (prompt) => {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    if (!res.ok) throw new Error("API error");
    const d = await res.json();
    return d.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch {
    return "Connection error. Please check your API key and try again.";
  }
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

// ─── AI Chat Panel ────────────────────────────────────────────────────────────
const AIChat = () => {
  const [q, setQ] = useState("");
  const [resp, setResp] = useState("");
  const [loading, setLoading] = useState("");

  const ask = async () => {
    if (!q.trim()) return;
    setLoading(true);
    const r = await callGemini(
      `You are a portfolio assistant for Shiva Dhanush Reddy Taduri, a Product Analyst candidate.
      Answer questions about his background, PM case studies, internship, and skills.
      Keep answers concise, professional, and PM-focused. Do not make up facts.
      Context: ${data.aiContext}
      User question: "${q}"`
    );
    setResp(r);
    setLoading(false);
  };

  return (
    <div
      style={{ border: `1px solid ${S.border}`, background: S.bg, fontFamily: "Inter, sans-serif" }}
      className="rounded-2xl p-6 flex flex-col h-full min-h-[340px]"
    >
      <div
        style={{ color: S.navy }}
        className="flex items-center gap-2 mb-4 font-semibold text-sm uppercase tracking-wider"
      >
        <MessageSquare size={16} style={{ color: S.accent }} />
        Ask About Me
      </div>
      <div className="flex-1 mb-4 overflow-y-auto space-y-3">
        {!resp && !loading && (
          <p style={{ color: S.textMuted }} className="text-sm mt-6 text-center">
            Ask about Shiva's PM case studies, internship, skills, or Tufts MSIM.
          </p>
        )}
        {q && resp && (
          <div className="flex justify-end">
            <span
              style={{ background: S.navy, color: "#fff" }}
              className="px-3 py-2 rounded-2xl rounded-tr-sm text-sm max-w-xs"
            >
              {q}
            </span>
          </div>
        )}
        {loading && <Loader size={16} className="animate-spin" style={{ color: S.accent }} />}
        {resp && (
          <div className="flex justify-start">
            <span
              style={{ background: S.surface, color: S.navy, border: `1px solid ${S.border}` }}
              className="px-3 py-2 rounded-2xl rounded-tl-sm text-sm max-w-sm"
            >
              {resp}
            </span>
          </div>
        )}
      </div>
      <div className="relative">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Ask anything..."
          style={{ border: `1px solid ${S.border}`, color: S.navy, background: S.surface, fontFamily: "Inter, sans-serif" }}
          className="w-full py-2 pl-4 pr-10 text-sm rounded-full focus:outline-none"
        />
        <button onClick={ask} className="absolute right-3 top-1/2 -translate-y-1/2">
          <Send size={14} style={{ color: S.accent }} />
        </button>
      </div>
    </div>
  );
};

// ─── Job Fit Check Panel ──────────────────────────────────────────────────────
const JobFitCheck = () => {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    const r = await callGemini(
      `You are a senior recruiter reviewing a Product Analyst / PM internship candidate.
      Candidate profile: ${data.aiContext}
      Job description: "${jd}"
      Provide a structured fit analysis in 3 sections:
      1. Fit: List 2-3 strongest matches between the candidate and role (be specific, cite his actual experience)
      2. Gaps: List 1-2 areas where the candidate may need to develop
      3. Verdict: One-sentence summary and a fit score out of 10
      Keep it professional and concise. Format as plain text with clear section headers.`
    );
    setResult(r);
    setLoading(false);
  };

  return (
    <div
      style={{ border: `1px solid ${S.border}`, background: S.bg, fontFamily: "Inter, sans-serif" }}
      className="rounded-2xl p-6 flex flex-col h-full min-h-[340px]"
    >
      <div
        style={{ color: S.navy }}
        className="flex items-center gap-2 mb-4 font-semibold text-sm uppercase tracking-wider"
      >
        <Search size={16} style={{ color: S.accent }} />
        Job Fit Check
      </div>
      {!result ? (
        <div className="flex flex-col flex-1">
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste a job description here..."
            style={{ border: `1px solid ${S.border}`, color: S.navy, background: S.surface, fontFamily: "Inter, sans-serif", resize: "none" }}
            className="flex-1 p-3 mb-3 text-sm rounded-xl focus:outline-none min-h-[160px]"
          />
          <button
            onClick={analyze}
            disabled={loading}
            style={{ background: S.navy, color: "#fff", fontFamily: "Inter, sans-serif" }}
            className="w-full py-2 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            {loading ? <Loader size={16} className="animate-spin" /> : "Analyse Fit"}
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <pre
            style={{ color: S.navy, fontFamily: "Inter, sans-serif", whiteSpace: "pre-wrap", fontSize: "0.82rem", lineHeight: "1.6" }}
          >
            {result}
          </pre>
          <button
            onClick={() => { setResult(""); setJd(""); }}
            style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
            className="mt-4 text-xs hover:underline"
          >
            Check another role →
          </button>
        </div>
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
            Product Analyst · PM Candidate · Summer 2027
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
              download
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
                  <a
                    href={cs.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
                    className="text-sm font-semibold flex items-center gap-1 hover:opacity-70 transition-opacity self-start"
                  >
                    {cs.cta} <ExternalLink size={13} />
                  </a>
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
                      src="/public\Tufts_University_logo.png"
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
                        Master of Science in Innovation and Management
                      </p>
                    </div>
                  </div>
                  <span
                    style={{ border: `1px solid ${S.border}`, color: S.textMuted, background: S.surface, fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}
                    className="text-xs font-medium px-4 py-1.5 rounded-full self-start"
                  >
                    Aug 2026
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
                      Incoming MSIM student with a focus on product strategy, analytics, and cross-functional leadership.
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
                        B.Tech in Computer Science and AI/ML . GPA 8.56/10                        
                      </p>
                    </div>
                  </div>
                  <span
                    style={{ border: `1px solid ${S.border}`, color: S.textMuted, background: S.surface, fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}
                    className="text-xs font-medium px-4 py-1.5 rounded-full self-start"
                  >
                    2022-2026
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

          <Reveal delay={50}>
            <div
              style={{ background: S.bg, border: `1px solid ${S.border}`, fontFamily: "Inter, sans-serif" }}
              className="rounded-2xl p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/smallfare_logo.jpg"
                    alt="Small Fare Services logo"
                    className="h-16 w-auto rounded-md object-contain"
                  />
                  <div>
                    <h3
                      style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
                      className="text-xl font-bold mb-1"
                    >
                      {data.experience.company}
                    </h3>
                    <p
                      style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
                      className="text-sm font-semibold mb-1"
                    >
                      {data.experience.role}
                    </p>
                    <p
                      style={{ color: S.textMuted, fontFamily: "Inter, sans-serif" }}
                      className="text-xs"
                    >
                      {data.experience.product}
                    </p>
                  </div>
                </div>
                <span
                  style={{ border: `1px solid ${S.border}`, color: S.textMuted, background: S.surface, fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}
                  className="text-xs font-medium px-4 py-1.5 rounded-full self-start"
                >
                  {data.experience.period}
                </span>
              </div>

              <ul className="space-y-3">
                {data.experience.bullets.map((b, i) => (
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

      {/* ── AI PLAYGROUND ── */}
      <section id="play" style={{ background: S.surface }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <div className="flex items-center justify-between mb-2">
              <p
                style={{ color: S.accent, fontFamily: "Inter, sans-serif" }}
                className="text-xs font-semibold tracking-widest uppercase"
              >
                AI Playground
              </p>
              <span
                style={{ background: `${S.accent}12`, color: S.accent, fontFamily: "Inter, sans-serif" }}
                className="text-xs font-medium px-3 py-1 rounded-full"
              >
                Powered by Gemini
              </span>
            </div>
            <h2
              style={{ color: S.navy, fontFamily: "Inter, sans-serif" }}
              className="text-3xl font-bold mb-12"
            >
              Explore My Profile
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={80}><AIChat /></Reveal>
            <Reveal delay={160}><JobFitCheck /></Reveal>
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
              Open to Summer 2027 PM and Product Analyst internships. Based in Medford, MA from August 2026.
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
                href={`https://${data.linkedin}`}
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