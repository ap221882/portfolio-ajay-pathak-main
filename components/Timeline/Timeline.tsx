import { useState } from "react";

import { TIMELINE } from "@/config";
import useReveal from "@/hooks/useReveal";

import { Label, mono, sans, Theme } from "../AjayPortfolio";

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

export default Timeline;
