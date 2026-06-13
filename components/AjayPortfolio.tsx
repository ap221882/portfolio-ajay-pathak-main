import React, { CSSProperties, useEffect, useState } from "react";

import { CRAFT, TIMELINE, WORKS } from "@/config";
import useBreakpoint from "@/hooks/useBreakpoint";
import useReveal from "@/hooks/useReveal";
import useScrollProgress from "@/hooks/useScrollProgress";
import { useStyles } from "@/hooks/useStyles";

import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import Nav from "./Nav/Nav";
import ProgressBar from "./ProgressBar/ProgressBar";
import Terminal from "./Terminal/Terminal";
import WorkRow from "./WorkRow/WorkRow";

export type ThemeMode = "light" | "dark";

export interface Theme {
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
    inkMid: "#4B5563",
    inkFaint: "#5F6368",
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

export interface CraftItem {
  icon: string;
  name: string;
  desc: string;
}

export interface TimelineItem {
  period: string;
  co: string;
  role: string;
  note: string;
}

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

export const mono: CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
export const sans: CSSProperties = { fontFamily: "'Inter', sans-serif" };

interface LabelProps {
  children: React.ReactNode;
  t: Theme;
  style?: CSSProperties;
  section?: boolean;
}
export function Label({
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
export function Pill({ children, t }: PillProps) {
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

function Toast({ msg, mode }: { msg: string | null; mode: ThemeMode }) {
  return (
    <div
      className={"ap3-toast " + mode + (msg ? " ap3-toast-show" : "")}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {msg}
    </div>
  );
}

function SelectedWork({ t, mob }: { t: Theme; mob: boolean }) {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref as any}
      aria-labelledby="section-work"
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
        {}
        <h2
          id="section-work"
          style={{ margin: 0, padding: 0, display: "contents" }}
        >
          <Label t={t} section>
            Selected work
          </Label>
        </h2>
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

function CraftCard({ c, t, tab }: { c: CraftItem; t: Theme; tab: boolean }) {
  const [hov, setHov] = useState(false);
  const panelId = "craft-detail-" + c.name.toLowerCase().replace(/\W+/g, "-");
  const prompt = tab ? "Tap for details" : "Hover for details";

  const toggleOpen = () => {
    if (tab) {
      setHov((open) => !open);
      return;
    }
    setHov(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setHov((open) => !open);
    }
  };

  return (
    <div
      className="ap3-craft-card"
      role="button"
      tabIndex={0}
      aria-expanded={hov}
      aria-controls={panelId}
      onClick={toggleOpen}
      onKeyDown={handleKeyDown}
      onFocus={() => !tab && setHov(true)}
      onBlur={() => setHov(false)}
      onMouseEnter={() => !tab && setHov(true)}
      onMouseLeave={() => !tab && setHov(false)}
      style={{ background: t.bg, padding: "30px 26px", minHeight: "118px" }}
    >
      {}
      <i
        className={"ti " + c.icon}
        aria-hidden="true"
        style={{
          fontSize: "18px",
          color: hov ? t.accent : t.ink,
          display: "block",
          marginBottom: "16px",
          transition: "color 0.2s ease",
        }}
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
        id={panelId}
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
          aria-hidden="true"
          style={{
            ...mono,
            fontSize: "10px",
            color: t.inkFaint,
            letterSpacing: "0.08em",
          }}
        >
          {prompt}
        </p>
      )}
    </div>
  );
}

function Craft({ t, mob, tab }: { t: Theme; mob: boolean; tab: boolean }) {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref as any}
      aria-labelledby="section-craft"
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
        <h2
          id="section-craft"
          style={{ margin: 0, padding: 0, display: "contents" }}
        >
          <Label t={t} section>
            Craft
          </Label>
        </h2>
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
          <CraftCard key={c.name} c={c} t={t} tab={tab} />
        ))}
      </div>
    </section>
  );
}

function Timeline({ t, mob }: { t: Theme; mob: boolean }) {
  const [ref, visible] = useReveal();
  const [hovIdx, setHovIdx] = useState<number | null>(null);
  return (
    <section
      ref={ref as any}
      aria-labelledby="section-timeline"
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
        <h2
          id="section-timeline"
          style={{ margin: 0, padding: 0, display: "contents" }}
        >
          <Label t={t} section>
            Where I've been
          </Label>
        </h2>
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
                {}
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

export default function AjayPortfolio() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<ThemeMode>("dark");
  const t = T[mode];
  const { mob, tab } = useBreakpoint();
  const progress = useScrollProgress();
  const toastMsg = useToastManager();
  useStyles();

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        setMode(stored);
      }
    } catch {
    } finally {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem("theme", mode);
    } catch {}
  }, [mode, mounted]);

  return (
    <div
      className={mode}
      style={{
        background: t.bg,
        color: t.ink,
        minHeight: "100vh",
        transition: mounted ? "background 0.35s, color 0.35s" : "none",
      }}
    >
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        <ProgressBar progress={progress} t={t} />
        <Nav
          mode={mode}
          onToggle={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
          t={t}
          mob={mob}
        />
        <main>
          <Hero t={t} mob={mob} tab={tab} showToast={showToast} />
          <SelectedWork t={t} mob={mob} />
          <Craft t={t} mob={mob} tab={tab} />
          <Timeline t={t} mob={mob} />
          <Terminal t={t} mob={mob} />
        </main>
        <Footer t={t} mob={mob} />
        <Toast msg={toastMsg} mode={mode} />
      </div>
    </div>
  );
}
