import { mono, Theme } from "../AjayPortfolio";

function Footer({ t, mob }: { t: Theme; mob: boolean }) {
  return (
    <footer
      style={{
        padding: mob ? "28px 24px" : "32px 56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <span
        style={{
          ...mono,
          fontSize: "10px",
          color: t.inkFaint,
          letterSpacing: "0.08em",
        }}
      >
        Ajay Pathak · 2026 · Bengaluru
      </span>
      <nav aria-label="Social links">
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            {
              label: "email",
              href: "mailto:ajay.pathak.webdeveloper@gmail.com",

              ariaLabel: "Email Ajay Pathak",
            },
            {
              label: "linkedin",
              href: "https://linkedin.com/in/ajay-pathak-developer",
              ariaLabel: "Ajay Pathak on LinkedIn (opens in new tab)",
            },
            {
              label: "website",
              href: "https://ajay-pathak.com",
              ariaLabel: "Ajay Pathak's website (opens in new tab)",
            },
          ].map(({ label, href, ariaLabel }) => (
            <a
              key={label}
              href={href}
              aria-label={ariaLabel}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="ap3-press"
              style={{
                ...mono,
                fontSize: "10px",
                color: t.inkFaint,
                textDecoration: "none",
                letterSpacing: "0.08em",
                borderBottom: "1px solid " + t.border,
                paddingBottom: "1px",
                display: "inline-block",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
