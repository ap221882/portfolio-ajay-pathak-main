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
        Ajay Pathak — Frontend Engineer, Groww · Bengaluru, India
      </span>
      <nav aria-label="Social links">
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            {
              label: "email",
              href: "mailto:ajay.pathak.webdeveloper@gmail.com",
              ariaLabel: "Email Ajay Pathak",
              rel: undefined,
            },
            {
              label: "linkedin",
              href: "https://www.linkedin.com/in/ajay-pathak-developer",
              ariaLabel: "Ajay Pathak on LinkedIn (opens in new tab)",
              rel: "noopener noreferrer me",
            },
            {
              label: "github",
              href: "https://github.com/ap221882",
              ariaLabel: "Ajay Pathak on GitHub (opens in new tab)",
              rel: "noopener noreferrer me",
            },
            {
              label: "x",
              href: "https://x.com/Pathkbndhu_navo",
              ariaLabel: "Ajay Pathak on X (opens in new tab)",
              rel: "noopener noreferrer me",
            },
            {
              label: "website",
              href: "https://ajay-pathak.com",
              ariaLabel: "Ajay Pathak's website (opens in new tab)",
              rel: "noopener noreferrer me",
            },
          ].map(({ label, href, ariaLabel, rel }) => (
            <a
              key={label}
              href={href}
              aria-label={ariaLabel}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={rel}
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
