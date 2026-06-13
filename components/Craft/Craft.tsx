import { useState } from "react";

import { CRAFT } from "@/config";
import useReveal from "@/hooks/useReveal";

import { CraftItem, Label, mono, sans, Theme } from "../AjayPortfolio";

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

export default Craft;
