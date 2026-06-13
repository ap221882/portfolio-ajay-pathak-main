import { WORKS } from "@/config";
import useReveal from "@/hooks/useReveal";

import { Label, Theme } from "../AjayPortfolio";
import WorkRow from "../WorkRow/WorkRow";

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

export default SelectedWork;
