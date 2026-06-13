import { Theme } from "../AjayPortfolio";

function ProgressBar({ progress, t }: { progress: number; t: Theme }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
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

export default ProgressBar;
