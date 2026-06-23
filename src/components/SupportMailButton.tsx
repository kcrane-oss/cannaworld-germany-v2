import { Mail } from "lucide-react";

const SUPPORT_EMAIL = "support@cannaworld-thailand.com";
const SUPPORT_SUBJECT = "CannaWorld Support Request";
const SUPPORT_BODY =
  "Hello CannaWorld Support,\n\nPlease describe your request here.\n\nAccount email:\nPage or module:\nUrgency:\n";

export default function SupportMailButton() {
  const href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(SUPPORT_SUBJECT)}&body=${encodeURIComponent(SUPPORT_BODY)}`;

  return (
    <a
      href={href}
      aria-label="Email CannaWorld support"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "16px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#0f766e",
        color: "white",
        borderRadius: "9999px",
        padding: "10px 16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.28)",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "14px",
      }}
    >
      <Mail aria-hidden="true" size={18} />
      <span style={{ whiteSpace: "nowrap" }}>Support</span>
    </a>
  );
}
