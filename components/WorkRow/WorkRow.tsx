import { useEffect, useState } from "react";

import { mono, Pill, sans, Theme } from "../AjayPortfolio";

export interface WorkItem {
  title: string;
  sub: string;
  period: string;
  detail: string;
  tags: string[];
}

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
        onFocus={() => setHov(true)}
        onBlur={() => setHov(false)}
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
          {}
          <h3
            style={{
              ...sans,
              fontWeight: 600,
              fontSize: mob ? "17px" : "20px",
              color: t.ink,
              letterSpacing: "-0.015em",
              margin: 0,
            }}
          >
            {item.title}
            {}
            <span
              aria-hidden="true"
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
          </h3>
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
        {}
        <i
          className={"ti ti-chevron-down" + (open ? " ap3-chevron-open" : "")}
          aria-hidden="true"
          style={{
            fontSize: "14px",
            color: t.inkFaint,
            justifySelf: "end",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition:
              "transform 0.3s cubic-bezier(0.16,1,0.3,1), color 0.2s ease",
          }}
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
          {}
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

export default WorkRow;
