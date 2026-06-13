import { Label, mono, Theme, ThemeMode } from "../AjayPortfolio";

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
    <div className="ap3-toggle-wrap">
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
    </div>
  );
}

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
      aria-label="Main navigation"
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
      {}
      <span
        className="ap3-logo"
        aria-hidden="true"
        style={{ ...mono, fontWeight: 500, fontSize: "13px", color: t.ink }}
      >
        AP
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {!mob && (
          <div
            className="ap3-dot-wrap"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span
              className="ap3-dot"
              aria-hidden="true"
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

export default Nav;
