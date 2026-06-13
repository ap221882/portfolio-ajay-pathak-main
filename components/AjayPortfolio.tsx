import React, { CSSProperties, useEffect, useState } from "react";

import useBreakpoint from "@/hooks/useBreakpoint";
import useScrollProgress from "@/hooks/useScrollProgress";
import { useStyles } from "@/hooks/useStyles";

import Craft from "./Craft/Craft";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import Nav from "./Nav/Nav";
import ProgressBar from "./ProgressBar/ProgressBar";
import SelectedWork from "./SelectedWork/SelectedWork";
import Terminal from "./Terminal/Terminal";
import Timeline from "./Timeline/Timeline";

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
