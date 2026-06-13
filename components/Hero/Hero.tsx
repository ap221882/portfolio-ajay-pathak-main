import { useRef, useState } from "react";

import { Label, Pill, sans, Theme } from "../AjayPortfolio";

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

function CTAButton({
  href,
  t,
  primary,
  children,
  ariaLabel,
  showToast,
}: {
  href: string;
  t: Theme;
  primary?: boolean;
  children: React.ReactNode;
  showToast: (str: string) => void;
  ariaLabel?: string;
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
      aria-label={ariaLabel}
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

function Hero({
  t,
  mob,
  tab,
  showToast,
}: {
  t: Theme;
  mob: boolean;
  tab: boolean;
  showToast: (str: string) => void;
}) {
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
        {}
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
            ariaLabel="Email Ajay Pathak"
            showToast={showToast}
          >
            Email me
          </CTAButton>
          <CTAButton
            href="https://ajay-pathak.com"
            t={t}
            ariaLabel="Visit ajay-pathak.com (opens in new tab)"
            showToast={showToast}
          >
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

export default Hero;
