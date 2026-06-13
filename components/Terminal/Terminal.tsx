import { useEffect, useState } from "react";

import useReveal from "@/hooks/useReveal";

import { Label, mono, Theme } from "../AjayPortfolio";

const CMD = "cat about.json";

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

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function Terminal({ t, mob }: { t: Theme; mob: boolean }) {
  const clock = useClock();
  const [ref, visible] = useReveal();
  const [typed, setTyped] = useState(0);

  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!visible) {
      setTyped(reducedMotion ? CMD.length : 0);
      return;
    }
    if (reducedMotion) {
      setTyped(CMD.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(i);
      if (i >= CMD.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [visible, reducedMotion]);

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

  const srData: { term: string; def: string }[] = [
    { term: "Name", def: "Ajay Pathak" },
    { term: "Location", def: "Bengaluru, India" },
    { term: "Local time", def: clock || "--:--:--" },
    { term: "Open to", def: "remote, hybrid, full-time" },
    { term: "Currently building", def: "Astra Wealth @ Groww" },
    {
      term: "AI workflow",
      def: "Claude Code + Cursor for scaffolding, manual review for prod",
    },
    { term: "Obsessed with", def: "microfrontend DX and TDD" },
  ];

  return (
    <section
      ref={ref as any}
      aria-labelledby="section-terminal"
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
          id="section-terminal"
          style={{ margin: 0, padding: 0, display: "contents" }}
        >
          <Label t={t} section>
            Terminal
          </Label>
        </h2>
        <div style={{ flex: 1, height: "1px", background: t.border }} />
      </div>

      {}
      <dl
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          margin: "-1px",
          padding: 0,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {srData.map(({ term, def }) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{def}</dd>
          </div>
        ))}
      </dl>

      {}
      <div
        aria-hidden="true"
        style={{
          background: t.surface,
          border: "1px solid " + t.border,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {}
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
        {}
        <div
          style={{
            padding: "20px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="ap3-scanline" />
          {}
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
          {}
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
                    marginTop: "4px",
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

export default Terminal;
