import React, { CSSProperties, useEffect, useRef, useState } from "react";

/* ─── Theme ──────────────────────────────────────────────────────────────── */
type ThemeMode = "light" | "dark";

interface Theme {
  bg: string;
  surface: string;
  surfaceHov: string;
  ink: string;
  inkMid: string;
  inkFaint: string;
  accent: string;
  accentDim: string;
  accentText: string;
  border: string;
  borderMid: string;
  toggleKnob: string;
  toggleBg: string;
}

const T: Record<ThemeMode, Theme> = {
  light: {
    bg: "#FFFFFF",
    surface: "#FAFAFA",
    surfaceHov: "#F2F2F2",
    ink: "#000000",
    inkMid: "#666666",
    inkFaint: "#999999",
    accent: "#0070F3",
    accentDim: "#E6F1FE",
    accentText: "#0058CC",
    border: "#EAEAEA",
    borderMid: "#D0D0D0",
    toggleKnob: "#000000",
    toggleBg: "#EAEAEA",
  },
  dark: {
    bg: "#000000",
    surface: "#0A0A0A",
    surfaceHov: "#141414",
    ink: "#FFFFFF",
    inkMid: "#A1A1A1",
    inkFaint: "#888888",
    accent: "#3291FF",
    accentDim: "#0C2D52",
    accentText: "#52A8FF",
    border: "#333333",
    borderMid: "#444444",
    toggleKnob: "#FFFFFF",
    toggleBg: "#333333",
  },
};

/* ─── Content ────────────────────────────────────────────────────────────── */
interface WorkItem {
  title: string;
  sub: string;
  period: string;
  detail: string;
  tags: string[];
}

const WORKS: WorkItem[] = [
  {
    title: "Astra Wealth",
    sub: "Groww · B2B wealth platform",
    period: "2024 — present",
    detail:
      "Built Groww's first B2B app from zero. Owned auth and portfolio modules end to end. Shipped MVP in 2 months. Architected a config-driven CMS via Strapi, a feature-flag framework, and astra-ui-sdk for B2B and B2B2C surfaces. 700+ test cases, 77% branch coverage.",
    tags: ["Next.js", "React Native", "RTK Query", "Strapi"],
  },
  {
    title: "No-code insurance platform",
    sub: "UniBlox · low-code delivery",
    period: "Nov 2023 — Apr 2024",
    detail:
      "Built two monorepos (B2B and B2B2C) from scratch. Reduced app load time by 20% and improved performance by 30%. Active contributor to architecture and coding standards across 14 microfrontends.",
    tags: ["Module Federation", "Monorepo", "Microfrontends"],
  },
  {
    title: "Digital asset management",
    sub: "Naehas Inc · enterprise SaaS",
    period: "Jan 2022 — Oct 2023",
    detail:
      "Migrated a monolith iframe app to a microfrontend architecture using module federation. Led the React to React TypeScript migration. Cut dev time by 40% and reduced bundle size 15–20% across 3 MFEs. Owned one MFE, co-owned the container and design system.",
    tags: ["TypeScript", "Module Federation", "Redux", "Saga"],
  },
  {
    title: "ReactPlay",
    sub: "Open source · community",
    period: "Feb 2023 — Nov 2023",
    detail:
      "Core open source contributor. Reviewed 40+ pull requests. Built interactive React demos used by thousands of learners. Named top performer in the Namaste React bootcamp among 100 engineers.",
    tags: ["React", "Open Source"],
  },
];

interface CraftItem {
  icon: string;
  name: string;
  desc: string;
}

const CRAFT: CraftItem[] = [
  {
    icon: "ti-layout-2",
    name: "Component systems",
    desc: "Design tokens first. I build libraries teams actually adopt, not ones that sit in a Storybook no one opens.",
  },
  {
    icon: "ti-bolt",
    name: "Web performance",
    desc: "CLS, TTI, and bundle budgets fixed before they become tickets. Client-side caching and service workers are default, not afterthoughts.",
  },
  {
    icon: "ti-sitemap",
    name: "Microfrontend architecture",
    desc: "Module federation and monorepos at scale. Migrated monoliths, designed containers 14 teams deployed into.",
  },
  {
    icon: "ti-test-pipe",
    name: "TDD & reliability",
    desc: "700+ test cases written on Astra Wealth alone. Critical financial flows don't ship without branch coverage.",
  },
  {
    icon: "ti-device-mobile",
    name: "React Native",
    desc: "Learnt and shipped in production on Astra Wealth. Set codebase standards for the mobile team from day one.",
  },
  {
    icon: "ti-code",
    name: "CI/CD & DX",
    desc: "GitHub Actions pipelines, coding standard enforcement, architectural reviews. Bad DX means everything downstream suffers.",
  },
];

interface TimelineItem {
  period: string;
  co: string;
  role: string;
  note: string;
}

const TIMELINE: TimelineItem[] = [
  {
    period: "2024 — present",
    co: "Groww",
    role: "Software Engineer 2",
    note: "Astra Wealth (B2B) and Groww MF web/app. Repository gatekeeper, HLD/LLD author, React Native contributor.",
  },
  {
    period: "Nov 2023 — Apr 2024",
    co: "UniBlox",
    role: "Frontend Engineer",
    note: "No-code insurance platform. Two monorepos, 14 MFEs, 30% performance uplift.",
  },
  {
    period: "Feb — Oct 2023",
    co: "Naehas Inc",
    role: "Software Engineer",
    note: "MFE migration lead. 40% dev-time reduction. Client-side caching, service workers.",
  },
  {
    period: "Jan 2022 — Feb 2023",
    co: "Naehas Inc",
    role: "Associate Software Engineer",
    note: "Built the DAM tool UI MFE. First touch with module federation and TypeScript migration.",
  },
];

/* ─── Global styles ──────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  @keyframes ap3-blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes ap3-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  @keyframes ap3-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
  @keyframes ap3-ripple{0%{transform:scale(0);opacity:0.5}100%{transform:scale(4);opacity:0}}
  @keyframes ap3-scanline{0%{top:-20%}100%{top:110%}}
  @keyframes ap3-dot-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.5)}}
  @keyframes ap3-shimmer{0%{background-position:200% center}100%{background-position:-200% center}}

  /* reveal / stagger */
  .ap3-in{animation:ap3-in 0.5s cubic-bezier(0.16,1,0.3,1) both}
  .ap3-stagger{opacity:0;transform:translateY(22px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)}
  .ap3-stagger.ap3-visible{opacity:1;transform:none}
  .ap3-reveal{opacity:0;transform:translateY(28px);transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1),transform 0.8s cubic-bezier(0.16,1,0.3,1)}
  .ap3-reveal.ap3-visible{opacity:1;transform:none}

  /* press */
  .ap3-press{transition:transform 0.18s cubic-bezier(0.34,1.56,0.64,1),opacity 0.2s ease,background 0.2s ease,border-color 0.2s ease,color 0.2s ease}
  .ap3-press:hover{transform:translateY(-1px)}
  .ap3-press:active{transform:translateY(0) scale(0.97)}

  /* underline link */
  .ap3-link{position:relative;text-decoration:none}
  .ap3-link::after{content:"";position:absolute;left:0;right:100%;bottom:-1px;height:1px;background:currentColor;transition:right 0.3s cubic-bezier(0.16,1,0.3,1)}
  .ap3-link:hover::after{right:0}

  a:focus-visible,button:focus-visible,[role="button"]:focus-visible{outline:2px solid #3B82F6;outline-offset:3px}

  /* pill hover tint — theme-aware via parent class */
  .ap3-pill{transition:background 0.2s ease,border-color 0.2s ease,color 0.2s ease;cursor:default}
  .light .ap3-pill:hover{background:#F0F7FF;border-color:#A8CEFF;color:#0058CC}
  .dark  .ap3-pill:hover{background:#0C2D52;border-color:#3291FF;color:#52A8FF}

  /* craft card left-border reveal */
  .ap3-craft-card{position:relative;overflow:hidden}
  .ap3-craft-card::before{content:"";position:absolute;inset:0;border-left:2px solid transparent;transition:border-color 0.25s ease;pointer-events:none}
  .light .ap3-craft-card:hover::before{border-color:#0070F3}
  .dark  .ap3-craft-card:hover::before{border-color:#3291FF}

  /* work row bottom accent sweep */
  .ap3-work-row{position:relative}
  .ap3-work-row::after{content:"";position:absolute;bottom:0;left:0;width:0;height:2px;transition:width 0.35s cubic-bezier(0.16,1,0.3,1);pointer-events:none}
  .light .ap3-work-row::after{background:#0070F3}
  .dark  .ap3-work-row::after{background:#3291FF}
  .ap3-work-row:hover::after{width:100%}

  /* work chevron accent when open */
  .ap3-chevron-open{color:#3291FF !important}
  .light .ap3-chevron-open{color:#0070F3 !important}

  /* toggle track accent when dark */
  .ap3-toggle{transition:background 0.35s ease,border-color 0.35s ease}
  .light .ap3-toggle-on{background:#0070F3 !important;border-color:#0070F3 !important}
  .dark  .ap3-toggle-on{background:#3291FF !important;border-color:#3291FF !important}

  /* timeline row hover bg */
  .ap3-tl-row{transition:background 0.2s ease;border-radius:6px;margin:0 -12px;padding-left:12px;padding-right:12px}
  .light .ap3-tl-row:hover{background:#F5F5F5}
  .dark  .ap3-tl-row:hover{background:#0A0A0A}

  /* tag spring-pop */
  .ap3-tag-pop{transform:scale(0.85);opacity:0;transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),opacity 0.25s ease;display:inline-block}
  .ap3-tag-pop.ap3-tag-on{transform:scale(1);opacity:1}

  /* ripple inside buttons */
  .ap3-ripple-host{position:relative;overflow:hidden}
  .ap3-ripple-el{position:absolute;border-radius:50%;width:60px;height:60px;margin:-30px 0 0 -30px;background:rgba(255,255,255,0.25);animation:ap3-ripple 0.55s linear;pointer-events:none}

  /* "AP" logo magnetic spacing */
  .ap3-logo{transition:letter-spacing 0.3s cubic-bezier(0.34,1.56,0.64,1);cursor:default}
  .ap3-logo:hover{letter-spacing:0.18em}

  /* status dot pulse-on-hover */
  .ap3-dot{animation:ap3-blink 2.5s ease-in-out infinite}
  .ap3-dot-wrap:hover .ap3-dot{animation:ap3-dot-pulse 0.6s ease infinite}

  /* terminal scanline */
  .ap3-scanline{position:absolute;left:0;right:0;height:20px;pointer-events:none;opacity:0.04;background:linear-gradient(transparent,rgba(255,255,255,0.8),transparent);animation:ap3-scanline 4s linear infinite}

  /* section label underline */
  .ap3-sec-label{position:relative;display:inline-block}
  .ap3-sec-label::after{content:"";position:absolute;left:0;bottom:-2px;width:0;height:1px;background:currentColor;transition:width 0.4s cubic-bezier(0.16,1,0.3,1)}
  .ap3-reveal.ap3-visible .ap3-sec-label::after{width:100%}

  /* name one-shot shimmer */
  .ap3-name{animation:ap3-rise 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s both}

  /* toast */
  .ap3-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(8px);padding:10px 20px;border-radius:6px;font-size:12px;letter-spacing:0.06em;font-family:'IBM Plex Mono',monospace;pointer-events:none;z-index:9999;white-space:nowrap;opacity:0;transition:opacity 0.25s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)}
  .ap3-toast.ap3-toast-show{opacity:1;transform:translateX(-50%) translateY(0)}
  .light .ap3-toast{background:#000;color:#fff}
  .dark  .ap3-toast{background:#fff;color:#000}

  @media (prefers-reduced-motion:reduce){
    .ap3-stagger,.ap3-reveal{transition:opacity 0.4s ease !important;transform:none !important}
    .ap3-in,.ap3-name{animation:none !important;opacity:1;-webkit-text-fill-color:inherit;color:inherit}
    .ap3-press,.ap3-press:hover,.ap3-press:active{transform:none !important}
    .ap3-logo:hover{letter-spacing:inherit !important}
    .ap3-work-row::after,.ap3-sec-label::after{transition:none !important}
    .ap3-tag-pop{transition:none !important}
    .ap3-scanline,.ap3-dot{animation:none !important}
    *{animation-duration:0.01ms !important}
  }
`;

/* ─── Hooks ──────────────────────────────────────────────────────────────── */
function useBreakpoint() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { mob: w < 600, tab: w < 920 };
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);
  return p;
}

function useReveal(): [React.RefObject<HTMLElement>, boolean] {
  const ref = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useGlobals() {
  useEffect(() => {
    if (document.getElementById("ap3-g")) return;
    const l1 = document.createElement("link");
    l1.rel = "stylesheet";
    l1.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(l1);
    const l2 = document.createElement("link");
    l2.rel = "stylesheet";
    l2.href =
      "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css";
    document.head.appendChild(l2);
    const s = document.createElement("style");
    s.id = "ap3-g";
    s.textContent = GLOBAL_CSS;
    document.head.appendChild(s);
  }, []);
}

/* ─── Toast ──────────────────────────────────────────────────────────────── */
let _showToast: ((msg: string) => void) | null = null;

function useToastManager() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    _showToast = setMsg;
    return () => {
      _showToast = null;
    };
  }, []);
  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 2200);
    return () => clearTimeout(id);
  }, [msg]);
  return msg;
}

function showToast(m: string) {
  _showToast?.(m);
}

/* ─── Tiny helpers ───────────────────────────────────────────────────────── */
const mono: CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
const sans: CSSProperties = { fontFamily: "'Inter', sans-serif" };

function addRipple(e: React.MouseEvent, ref: React.RefObject<HTMLElement>) {
  const btn = ref.current;
  if (!btn) return;
  const r = btn.getBoundingClientRect();
  const el = document.createElement("span");
  el.className = "ap3-ripple-el";
  el.style.top = e.clientY - r.top + "px";
  el.style.left = e.clientX - r.left + "px";
  btn.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

interface LabelProps {
  children: React.ReactNode;
  t: Theme;
  style?: CSSProperties;
  section?: boolean;
}
function Label({
  children,
  t,
  style: extra = {},
  section = false,
}: LabelProps) {
  return (
    <span
      className={section ? "ap3-sec-label" : ""}
      style={{
        ...mono,
        fontSize: "10px",
        letterSpacing: "0.18em",
        color: t.inkFaint,
        textTransform: "uppercase",
        ...extra,
      }}
    >
      {children}
    </span>
  );
}

interface PillProps {
  children: React.ReactNode;
  t: Theme;
}
function Pill({ children, t }: PillProps) {
  return (
    <span
      className="ap3-pill"
      style={{
        ...mono,
        fontSize: "10px",
        color: t.inkMid,
        background: "transparent",
        border: "1px solid " + t.border,
        padding: "4px 10px",
        borderRadius: "4px",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/* ─── Progress bar ───────────────────────────────────────────────────────── */
function ProgressBar({ progress, t }: { progress: number; t: Theme }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 200,
      }}
    >
      <div
        style={{
          height: "100%",
          width: progress * 100 + "%",
          background: t.ink,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}

/* ─── Toast display ──────────────────────────────────────────────────────── */
function Toast({ msg, mode }: { msg: string | null; mode: ThemeMode }) {
  return (
    <div
      className={"ap3-toast " + mode + (msg ? " ap3-toast-show" : "")}
      role="status"
      aria-live="polite"
    >
      {msg}
    </div>
  );
}

/* ─── Toggle ─────────────────────────────────────────────────────────────── */
function Toggle({
  mode,
  onToggle,
  t,
}: {
  mode: ThemeMode;
  onToggle: () => void;
  t: Theme;
}) {
  const dark = mode === "dark";
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={dark}
      aria-label={"Switch to " + (dark ? "light" : "dark") + " mode"}
      className={"ap3-toggle" + (dark ? " ap3-toggle-on" : "")}
      style={{
        width: "44px",
        height: "24px",
        borderRadius: "12px",
        border: "1px solid " + t.borderMid,
        background: t.toggleBg,
        cursor: "pointer",
        position: "relative",
        padding: "3px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: dark ? "#fff" : t.toggleKnob,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: dark ? "translateX(20px)" : "translateX(0)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <i
          className={dark ? "ti ti-moon" : "ti ti-sun"}
          style={{ fontSize: "9px", color: dark ? "#3291FF" : "#FFFFFF" }}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
function Nav({
  mode,
  onToggle,
  t,
  mob,
}: {
  mode: ThemeMode;
  onToggle: () => void;
  t: Theme;
  mob: boolean;
}) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: mob ? "18px 24px" : "20px 56px",
        borderBottom: "1px solid " + t.border,
        background: t.bg,
        position: "sticky",
        top: 0,
        zIndex: 99,
      }}
    >
      {/* Magnetic logo */}
      <span
        className="ap3-logo"
        style={{ ...mono, fontWeight: 500, fontSize: "13px", color: t.ink }}
      >
        AP
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {!mob && (
          /* Status dot pulses faster on hover */
          <div
            className="ap3-dot-wrap"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span
              className="ap3-dot"
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#22C55E",
                display: "inline-block",
              }}
            />
            <Label t={t} style={{ color: t.inkMid, letterSpacing: "0.12em" }}>
              open to work
            </Label>
          </div>
        )}
        <Toggle mode={mode} onToggle={onToggle} t={t} />
      </div>
    </nav>
  );
}

/* ─── CTA button with ripple + clipboard ────────────────────────────────── */
function CTAButton({
  href,
  t,
  primary,
  children,
}: {
  href: string;
  t: Theme;
  primary?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<any>(null);
  const isEmail = href.startsWith("mailto:");

  const handleClick = (e: React.MouseEvent) => {
    addRipple(e, ref);
    if (isEmail) {
      e.preventDefault();
      navigator.clipboard
        .writeText(href.replace("mailto:", ""))
        .then(() => showToast("email copied ✓"))
        .catch(() => {
          window.location.href = href;
        });
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      target={isEmail ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="ap3-press ap3-ripple-host"
      style={{
        ...sans,
        fontWeight: 500,
        fontSize: "13px",
        color: primary ? t.bg : t.ink,
        background: primary ? t.ink : "transparent",
        padding: "12px 26px",
        borderRadius: "6px",
        textDecoration: "none",
        letterSpacing: "0.01em",
        display: "inline-block",
        border: primary ? "none" : "1px solid " + t.border,
      }}
    >
      {children}
    </a>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
function Hero({ t, mob, tab }: { t: Theme; mob: boolean; tab: boolean }) {
  const ref = useRef<any>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      active: true,
    });
  };

  return (
    <section
      aria-labelledby="hero-heading"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, active: false }))}
      style={{
        padding: mob ? "64px 24px 56px" : "100px 56px 88px",
        borderBottom: "1px solid " + t.border,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!mob && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(420px circle at " +
              glow.x +
              "% " +
              glow.y +
              "%, " +
              t.accentDim +
              ", transparent 70%)",
            opacity: glow.active ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      )}
      <div style={{ position: "relative" }}>
        <Label
          t={t}
          style={{
            display: "block",
            marginBottom: "28px",
            animation: "ap3-rise 0.7s cubic-bezier(0.16,1,0.3,1) 0s both",
          }}
        >
          Frontend engineer · Bengaluru · 4 YOE
        </Label>
        {/* One-shot shimmer sweep on name */}
        <h1
          id="hero-heading"
          className="ap3-name"
          style={{
            ...sans,
            fontWeight: 800,
            fontSize: mob ? "clamp(48px,16vw,76px)" : "clamp(80px,9vw,132px)",
            color: t.ink,
            lineHeight: 0.98,
            letterSpacing: "-0.045em",
            marginBottom: "36px",
          }}
        >
          Ajay Pathak
        </h1>
        <p
          style={{
            ...sans,
            fontWeight: 400,
            fontSize: mob ? "15px" : "17px",
            color: t.inkMid,
            lineHeight: 1.75,
            maxWidth: "560px",
            marginBottom: "44px",
            animation: "ap3-rise 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s both",
          }}
        >
          I build interfaces that survive production — React, Next.js, and
          microfrontend systems at companies where{" "}
          <span style={{ color: t.ink }}>the frontend is the product.</span>{" "}
          Currently shipping <span style={{ color: t.ink }}>Astra Wealth</span>{" "}
          at Groww.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            animation: "ap3-rise 0.8s cubic-bezier(0.16,1,0.3,1) 0.28s both",
          }}
        >
          <CTAButton
            href="mailto:ajay.pathak.webdeveloper@gmail.com"
            t={t}
            primary
          >
            Email me
          </CTAButton>
          <CTAButton href="https://ajay-pathak.com" t={t}>
            ajay-pathak.com
          </CTAButton>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginTop: "60px",
          paddingTop: "28px",
          borderTop: "1px solid " + t.border,
          alignItems: "center",
          position: "relative",
          animation: "ap3-rise 0.8s cubic-bezier(0.16,1,0.3,1) 0.36s both",
        }}
      >
        <Label t={t}>Stack</Label>
        {[
          "React",
          "Next.js",
          "TypeScript",
          "React Native",
          "Microfrontends",
          "RTK Query",
          "Module Federation",
        ].map((s) => (
          <Pill key={s} t={t}>
            {s}
          </Pill>
        ))}
      </div>
    </section>
  );
}

/* ─── Work row ───────────────────────────────────────────────────────────── */
function WorkRow({
  item,
  t,
  mob,
  last,
}: {
  item: WorkItem;
  t: Theme;
  mob: boolean;
  last: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);
  const [tagsOn, setTagsOn] = useState(false);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => setTagsOn(true), 60);
      return () => clearTimeout(id);
    }
    setTagsOn(false);
  }, [open]);

  const panelId = "work-panel-" + item.title.toLowerCase().replace(/\W+/g, "-");
  const headerId =
    "work-trigger-" + item.title.toLowerCase().replace(/\W+/g, "-");

  const toggleOpen = () => setOpen((o) => !o);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen();
    }
  };

  return (
    <div
      className="ap3-work-row"
      style={{ borderBottom: last ? "none" : "1px solid " + t.border }}
    >
      <div
        id={headerId}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr auto" : "1fr 160px auto",
          gap: "16px",
          alignItems: "center",
          padding: mob ? "24px 0" : "28px 0",
          cursor: "pointer",
          transform: hov ? "translateX(8px)" : "translateX(0)",
          transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div>
          <p
            style={{
              ...sans,
              fontWeight: 600,
              fontSize: mob ? "17px" : "20px",
              color: t.ink,
              letterSpacing: "-0.015em",
            }}
          >
            {item.title}
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: t.accent,
                marginLeft: "10px",
                verticalAlign: "middle",
                opacity: hov ? 1 : 0,
                transition: "opacity 0.25s",
              }}
            />
          </p>
          <p
            style={{
              ...mono,
              fontSize: "11px",
              color: t.inkFaint,
              marginTop: "5px",
              letterSpacing: "0.04em",
            }}
          >
            {item.sub}
          </p>
        </div>
        {!mob && (
          <span
            style={{
              ...mono,
              fontSize: "11px",
              color: t.inkFaint,
              letterSpacing: "0.06em",
            }}
          >
            {item.period}
          </span>
        )}
        {/* Chevron turns accent when open */}
        <i
          className={"ti ti-chevron-down" + (open ? " ap3-chevron-open" : "")}
          style={{
            fontSize: "14px",
            color: t.inkFaint,
            justifySelf: "end",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition:
              "transform 0.3s cubic-bezier(0.16,1,0.3,1), color 0.2s ease",
          }}
          aria-hidden="true"
        />
      </div>
      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          className="ap3-in"
          style={{
            paddingBottom: "30px",
            display: "grid",
            gridTemplateColumns: mob ? "1fr" : "1fr auto",
            gap: "20px",
            alignItems: "start",
          }}
        >
          <p
            style={{
              ...sans,
              fontWeight: 400,
              fontSize: "14px",
              color: t.inkMid,
              lineHeight: 1.8,
            }}
          >
            {item.detail}
          </p>
          {/* Tags spring-pop in staggered */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              justifyContent: mob ? "flex-start" : "flex-end",
            }}
          >
            {item.tags.map((tg, i) => (
              <span
                key={tg}
                className={"ap3-tag-pop" + (tagsOn ? " ap3-tag-on" : "")}
                style={{ transitionDelay: tagsOn ? i * 0.06 + "s" : "0s" }}
              >
                <Pill t={t}>{tg}</Pill>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Selected work ──────────────────────────────────────────────────────── */
function SelectedWork({ t, mob }: { t: Theme; mob: boolean }) {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref as any}
      className={"ap3-reveal" + (visible ? " ap3-visible" : "")}
      style={{
        padding: mob ? "56px 24px" : "80px 56px",
        borderBottom: "1px solid " + t.border,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "8px",
        }}
      >
        <Label t={t} section>
          Selected work
        </Label>
        <div style={{ flex: 1, height: "1px", background: t.border }} />
      </div>
      <div>
        {WORKS.map((item, i) => (
          <div
            key={item.title}
            className={"ap3-stagger" + (visible ? " ap3-visible" : "")}
            style={{ transitionDelay: visible ? i * 0.08 + "s" : "0s" }}
          >
            <WorkRow
              item={item}
              t={t}
              mob={mob}
              last={i === WORKS.length - 1}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Craft card ─────────────────────────────────────────────────────────── */
function CraftCard({ c, t }: { c: CraftItem; t: Theme }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="ap3-craft-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: t.bg, padding: "30px 26px", minHeight: "118px" }}
    >
      <i
        className={"ti " + c.icon}
        style={{
          fontSize: "18px",
          color: hov ? t.accent : t.ink,
          display: "block",
          marginBottom: "16px",
          transition: "color 0.2s ease",
        }}
        aria-hidden="true"
      />
      <p
        style={{
          ...sans,
          fontWeight: 600,
          fontSize: "14px",
          color: t.ink,
          marginBottom: "8px",
        }}
      >
        {c.name}
      </p>
      <p
        style={{
          ...sans,
          fontWeight: 400,
          fontSize: "12.5px",
          color: t.inkMid,
          lineHeight: 1.75,
          maxHeight: hov ? "200px" : "0px",
          opacity: hov ? 1 : 0,
          overflow: "hidden",
          transition:
            "max-height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
        }}
      >
        {c.desc}
      </p>
      {!hov && (
        <p
          style={{
            ...mono,
            fontSize: "10px",
            color: t.inkFaint,
            letterSpacing: "0.08em",
          }}
        >
          hover for detail
        </p>
      )}
    </div>
  );
}

/* ─── Craft ──────────────────────────────────────────────────────────────── */
function Craft({ t, mob }: { t: Theme; mob: boolean }) {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref as any}
      className={"ap3-reveal" + (visible ? " ap3-visible" : "")}
      style={{
        padding: mob ? "56px 24px" : "80px 56px",
        borderBottom: "1px solid " + t.border,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "44px",
        }}
      >
        <Label t={t} section>
          Craft
        </Label>
        <div style={{ flex: 1, height: "1px", background: t.border }} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)",
          gap: "1px",
          background: t.border,
          border: "1px solid " + t.border,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {CRAFT.map((c) => (
          <CraftCard key={c.name} c={c} t={t} />
        ))}
      </div>
    </section>
  );
}

/* ─── Timeline ───────────────────────────────────────────────────────────── */
function Timeline({ t, mob }: { t: Theme; mob: boolean }) {
  const [ref, visible] = useReveal();
  const [hovIdx, setHovIdx] = useState<number | null>(null);
  return (
    <section
      ref={ref as any}
      className={"ap3-reveal" + (visible ? " ap3-visible" : "")}
      style={{
        padding: mob ? "56px 24px" : "80px 56px",
        borderBottom: "1px solid " + t.border,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "44px",
        }}
      >
        <Label t={t} section>
          Where I've been
        </Label>
        <div style={{ flex: 1, height: "1px", background: t.border }} />
      </div>
      <div>
        {TIMELINE.map((item, i) => (
          <div
            key={item.co + i}
            className="ap3-tl-row"
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
            style={{
              display: "grid",
              gridTemplateColumns: mob ? "1fr" : "150px 1fr",
              gap: mob ? "6px" : "0",
              padding: "28px 0",
              borderBottom:
                i < TIMELINE.length - 1 ? "1px solid " + t.border : "none",
            }}
          >
            <div style={{ paddingRight: "24px" }}>
              <span
                style={{
                  ...mono,
                  fontSize: "10px",
                  color: t.inkFaint,
                  letterSpacing: "0.08em",
                  lineHeight: 1.8,
                }}
              >
                {item.period}
              </span>
            </div>
            <div
              style={{
                paddingLeft: mob ? "0" : "32px",
                borderLeft: mob ? "none" : "1px solid " + t.border,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  marginBottom: "6px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    ...sans,
                    fontWeight: 600,
                    fontSize: "15px",
                    color: t.ink,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.co}
                </span>
                {/* Role string accents on hover */}
                <span
                  style={{
                    ...mono,
                    fontSize: "10px",
                    color: hovIdx === i ? t.accent : t.inkMid,
                    letterSpacing: "0.1em",
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.role}
                </span>
              </div>
              <p
                style={{
                  ...sans,
                  fontWeight: 400,
                  fontSize: "13px",
                  color: t.inkMid,
                  lineHeight: 1.75,
                }}
              >
                {item.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Terminal ───────────────────────────────────────────────────────────── */
const CMD = "cat about.json";

function Terminal({ t, mob }: { t: Theme; mob: boolean }) {
  const clock = useClock();
  const [ref, visible] = useReveal();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!visible) {
      setTyped(0);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(i);
      if (i >= CMD.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [visible]);

  const done = typed >= CMD.length;

  const dataLines = [
    { text: "{", val: false },
    { text: '  "name": "Ajay Pathak",', val: true },
    { text: '  "location": "Bengaluru, India",', val: true },
    { text: '  "local_time": "' + (clock || "--:--:--") + '",', val: true },
    { text: '  "open_to": ["remote", "hybrid", "full-time"],', val: true },
    { text: '  "currently_building": "Astra Wealth @ Groww",', val: true },
    {
      text: '  "ai_workflow": "Claude Code + Cursor for scaffolding, manual review for prod",',
      val: true,
    },
    { text: '  "obsessed_with": "microfrontend DX and TDD"', val: true },
    { text: "}", val: false },
  ];

  return (
    <section
      ref={ref as any}
      className={"ap3-reveal" + (visible ? " ap3-visible" : "")}
      style={{
        padding: mob ? "56px 24px" : "80px 56px",
        borderBottom: "1px solid " + t.border,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "44px",
        }}
      >
        <Label t={t} section>
          Terminal
        </Label>
        <div style={{ flex: 1, height: "1px", background: t.border }} />
      </div>
      <div
        style={{
          background: t.surface,
          border: "1px solid " + t.border,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* macOS traffic light dots */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            padding: "14px 18px",
            borderBottom: "1px solid " + t.border,
            alignItems: "center",
          }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <span
              key={i}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: c,
                display: "inline-block",
              }}
            />
          ))}
        </div>
        {/* Scanline shimmer + typewriter body */}
        <div
          style={{
            padding: "20px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="ap3-scanline" aria-hidden="true" />
          {/* Prompt line — types in */}
          <div style={{ display: "flex", marginBottom: "2px" }}>
            <span
              style={{
                ...mono,
                fontSize: "12px",
                color: t.ink,
                marginRight: "8px",
                lineHeight: 1.8,
              }}
            >
              ajay@portfolio:~$
            </span>
            <span
              style={{
                ...mono,
                fontSize: "12px",
                lineHeight: 1.8,
                color: t.ink,
              }}
            >
              {CMD.slice(0, typed)}
            </span>
            {!done && (
              <span
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "14px",
                  background: t.ink,
                  marginLeft: "4px",
                  verticalAlign: "middle",
                  animation: "ap3-blink 1s step-end infinite",
                }}
              />
            )}
          </div>
          {/* Data lines — reveal only after typing done */}
          {dataLines.map((ln, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                marginBottom: "2px",
                opacity: done ? (visible ? 1 : 0) : 0,
                transform: done && visible ? "none" : "translateY(4px)",
                transition:
                  "opacity 0.4s ease " +
                  i * 0.05 +
                  "s, transform 0.4s ease " +
                  i * 0.05 +
                  "s",
              }}
            >
              <span
                style={{
                  ...mono,
                  fontSize: "12px",
                  lineHeight: 1.8,
                  color: ln.val ? t.inkMid : t.inkFaint,
                }}
              >
                {ln.text}
              </span>
              {i === dataLines.length - 1 && done && (
                <span
                  style={{
                    display: "inline-block",
                    width: "7px",
                    height: "14px",
                    background: t.ink,
                    marginLeft: "4px",
                    verticalAlign: "middle",
                    animation: "ap3-blink 1s step-end infinite",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer({ t, mob }: { t: Theme; mob: boolean }) {
  return (
    <footer
      style={{
        padding: mob ? "28px 24px" : "32px 56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <span
        style={{
          ...mono,
          fontSize: "10px",
          color: t.inkFaint,
          letterSpacing: "0.08em",
        }}
      >
        Ajay Pathak · 2026 · Bengaluru
      </span>
      <div style={{ display: "flex", gap: "24px" }}>
        {[
          { label: "email", href: "mailto:ajay.pathak.webdeveloper@gmail.com" },
          {
            label: "linkedin",
            href: "https://linkedin.com/in/ajay-pathakdeveloper",
          },
          { label: "website", href: "https://ajay-pathak.com" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="ap3-press"
            style={{
              ...mono,
              fontSize: "10px",
              color: t.inkFaint,
              textDecoration: "none",
              letterSpacing: "0.08em",
              borderBottom: "1px solid " + t.border,
              paddingBottom: "1px",
              display: "inline-block",
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function AjayPortfolio() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "dark";
    try {
      return window.localStorage.getItem("theme") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  const t = T[mode];
  const { mob, tab } = useBreakpoint();
  const progress = useScrollProgress();
  const toastMsg = useToastManager();
  useGlobals();

  useEffect(() => {
    try {
      window.localStorage.setItem("theme", mode);
    } catch {
      // Ignore storage failures in private or restricted browser contexts.
    }
  }, [mode]);

  return (
    <div
      className={mode}
      style={{
        background: t.bg,
        color: t.ink,
        minHeight: "100vh",
        transition: "background 0.35s, color 0.35s",
      }}
    >
      <ProgressBar progress={progress} t={t} />
      <Nav
        mode={mode}
        onToggle={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
        t={t}
        mob={mob}
      />
      <main>
        <Hero t={t} mob={mob} tab={tab} />
        <SelectedWork t={t} mob={mob} />
        <Craft t={t} mob={mob} />
        <Timeline t={t} mob={mob} />
        <Terminal t={t} mob={mob} />
      </main>
      <Footer t={t} mob={mob} />
      <Toast msg={toastMsg} mode={mode} />
    </div>
  );
}
