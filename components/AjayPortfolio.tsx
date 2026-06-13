import { useEffect, useRef, useState } from "react";

/* ─── Theme ──────────────────────────────────────────────────────────────── */
const T = {
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
const WORKS = [
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

const CRAFT = [
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

const TIMELINE = [
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

function useReveal() {
  const ref = useRef(null);
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
    s.textContent = `
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      @keyframes ap3-blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes ap3-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
      @keyframes ap3-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
      .ap3-in{animation:ap3-in 0.5s cubic-bezier(0.16,1,0.3,1) both}
      .ap3-stagger{opacity:0;transform:translateY(22px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)}
      .ap3-stagger.ap3-visible{opacity:1;transform:none}
      .ap3-reveal{opacity:0;transform:translateY(28px);transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1),transform 0.8s cubic-bezier(0.16,1,0.3,1)}
      .ap3-reveal.ap3-visible{opacity:1;transform:none}
      .ap3-press{transition:transform 0.18s cubic-bezier(0.34,1.56,0.64,1),opacity 0.2s ease,background 0.2s ease,border-color 0.2s ease,color 0.2s ease}
      .ap3-press:hover{transform:translateY(-1px)}
      .ap3-press:active{transform:translateY(0) scale(0.97)}
      .ap3-link{position:relative;text-decoration:none}
      .ap3-link::after{content:"";position:absolute;left:0;right:100%;bottom:-1px;height:1px;background:currentColor;transition:right 0.3s cubic-bezier(0.16,1,0.3,1)}
      .ap3-link:hover::after{right:0}
      a:focus-visible,button:focus-visible{outline:2px solid #3B82F6;outline-offset:3px}
      @media (prefers-reduced-motion: reduce){
        .ap3-stagger,.ap3-reveal{transition:opacity 0.4s ease !important;transform:none !important}
        .ap3-in{animation:none !important;opacity:1}
        .ap3-press,.ap3-press:hover,.ap3-press:active{transform:none !important}
        *{animation-duration:0.01ms !important}
      }
    `;
    document.head.appendChild(s);
  }, []);
}

/* ─── Live clock (Asia/Kolkata) ─────────────────────────────────────────── */
function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(fmt.format(new Date()));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ─── Tiny helpers ───────────────────────────────────────────────────────── */
const mono = { fontFamily: "'IBM Plex Mono', monospace" };
const sans = { fontFamily: "'Inter', sans-serif" };

function Label({ children, t, style: extra = {} }) {
  return (
    <span
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

function Pill({ children, t }) {
  return (
    <span
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

/* ─── Scroll progress bar ────────────────────────────────────────────────── */
function ProgressBar({ progress, t }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "transparent",
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

/* ─── Toggle ─────────────────────────────────────────────────────────────── */
function Toggle({ mode, onToggle, t }) {
  const dark = mode === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label={"Switch to " + (dark ? "light" : "dark") + " mode"}
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
        transition: "background 0.3s",
      }}
    >
      <span
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: t.toggleKnob,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: dark ? "translateX(20px)" : "translateX(0)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <i
          className={dark ? "ti ti-moon" : "ti ti-sun"}
          style={{ fontSize: "9px", color: dark ? "#0A0A0A" : "#FFFFFF" }}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
function Nav({ mode, onToggle, t, mob }) {
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
      <span
        style={{
          ...mono,
          fontWeight: 500,
          fontSize: "13px",
          color: t.ink,
          letterSpacing: "-0.01em",
        }}
      >
        AP
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {!mob && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#22C55E",
                display: "inline-block",
                animation: "ap3-blink 2.5s ease-in-out infinite",
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

/* ─── Hero ───────────────────────────────────────────────────────────────── */
function Hero({ t, mob, tab }) {
  const ref = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const onMove = (e) => {
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

        <h1
          style={{
            ...sans,
            fontWeight: 800,
            fontSize: mob
              ? "clamp(48px, 16vw, 76px)"
              : "clamp(80px, 9vw, 132px)",
            color: t.ink,
            lineHeight: 0.98,
            letterSpacing: "-0.045em",
            marginBottom: "36px",
            animation: "ap3-rise 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s both",
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
          <a
            href="mailto:ajay.pathak.webdeveloper@gmail.com"
            className="ap3-press"
            style={{
              ...sans,
              fontWeight: 500,
              fontSize: "13px",
              color: t.bg,
              background: t.ink,
              padding: "12px 26px",
              borderRadius: "6px",
              textDecoration: "none",
              letterSpacing: "0.01em",
              display: "inline-block",
            }}
          >
            Email me
          </a>
          <a
            href="https://ajay-pathak.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ap3-press"
            style={{
              ...sans,
              fontWeight: 500,
              fontSize: "13px",
              color: t.ink,
              background: "transparent",
              border: "1px solid " + t.border,
              padding: "12px 26px",
              borderRadius: "6px",
              textDecoration: "none",
              letterSpacing: "0.01em",
              display: "inline-block",
            }}
          >
            ajay-pathak.com
          </a>
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

/* ─── Work ───────────────────────────────────────────────────────────────── */
function WorkRow({ item, t, mob, last }) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);

  return (
    <div style={{ borderBottom: last ? "none" : "1px solid " + t.border }}>
      <div
        onClick={() => setOpen((o) => !o)}
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
        <i
          className={"ti ti-chevron-down"}
          style={{
            fontSize: "14px",
            color: t.inkFaint,
            justifySelf: "end",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
          aria-hidden="true"
        />
      </div>

      {open && (
        <div
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
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              justifyContent: mob ? "flex-start" : "flex-end",
            }}
          >
            {item.tags.map((tg) => (
              <Pill key={tg} t={t}>
                {tg}
              </Pill>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Craft ──────────────────────────────────────────────────────────────── */
function CraftCard({ c, t }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: t.bg,
        padding: "30px 26px",
        position: "relative",
        minHeight: "118px",
      }}
    >
      <i
        className={"ti " + c.icon}
        style={{
          fontSize: "18px",
          color: t.ink,
          display: "block",
          marginBottom: "16px",
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
            marginTop: "0",
          }}
        >
          hover for detail
        </p>
      )}
    </div>
  );
}

function Craft({ t, mob }) {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
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
        <Label t={t}>Craft</Label>
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
function Timeline({ t, mob }) {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
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
        <Label t={t}>Where I've been</Label>
        <div style={{ flex: 1, height: "1px", background: t.border }} />
      </div>

      <div>
        {TIMELINE.map((item, i) => (
          <div
            key={item.co + i}
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
                <span
                  style={{
                    ...mono,
                    fontSize: "10px",
                    color: t.inkMid,
                    letterSpacing: "0.1em",
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
function Terminal({ t, mob }) {
  const clock = useClock();

  const lines = [
    { prompt: true, text: "cat about.json" },
    { prompt: false, text: "{" },
    { prompt: false, text: '  "name": "Ajay Pathak",', val: true },
    { prompt: false, text: '  "location": "Bengaluru, India",', val: true },
    {
      prompt: false,
      text: '  "local_time": "' + (clock || "--:--:--") + '",',
      val: true,
    },
    {
      prompt: false,
      text: '  "open_to": ["remote", "hybrid", "full-time"],',
      val: true,
    },
    {
      prompt: false,
      text: '  "currently_building": "Astra Wealth @ Groww",',
      val: true,
    },
    {
      prompt: false,
      text: '  "ai_workflow": "Claude Code + Cursor for scaffolding, manual review for prod",',
      val: true,
    },
    {
      prompt: false,
      text: '  "obsessed_with": "microfrontend DX and TDD"',
      val: true,
    },
    { prompt: false, text: "}" },
  ];

  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
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
        <Label t={t}>Terminal</Label>
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
        <div
          style={{
            display: "flex",
            gap: "6px",
            padding: "14px 18px",
            borderBottom: "1px solid " + t.border,
            alignItems: "center",
          }}
        >
          {[t.inkFaint, t.inkFaint, t.inkFaint].map((c, i) => (
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
        <div style={{ padding: "20px 24px" }}>
          {lines.map((ln, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                marginBottom: "2px",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(4px)",
                transition:
                  "opacity 0.4s ease " +
                  i * 0.05 +
                  "s, transform 0.4s ease " +
                  i * 0.05 +
                  "s",
              }}
            >
              {ln.prompt && (
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
              )}
              <span
                style={{
                  ...mono,
                  fontSize: "12px",
                  lineHeight: 1.8,
                  color: ln.prompt ? t.ink : ln.val ? t.inkMid : t.inkFaint,
                }}
              >
                {ln.text}
              </span>
              {i === lines.length - 1 && (
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
function Footer({ t, mob }) {
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
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ─── Selected work ──────────────────────────────────────────────────────── */
function SelectedWork({ t, mob }) {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
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
        <Label t={t}>Selected work</Label>
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

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function AjayPortfolio() {
  const [mode, setMode] = useState("dark");
  const t = T[mode];
  const { mob, tab } = useBreakpoint();
  const progress = useScrollProgress();
  useGlobals();

  return (
    <div
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
      <Hero t={t} mob={mob} tab={tab} />

      <SelectedWork t={t} mob={mob} />

      <Craft t={t} mob={mob} />
      <Timeline t={t} mob={mob} />
      <Terminal t={t} mob={mob} />
      <Footer t={t} mob={mob} />
    </div>
  );
}
