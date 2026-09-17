export default function LogoLockup({ compact = false, variant = "light" }: { compact?: boolean; variant?: "light" | "dark" }) {
  const src = variant === "dark"
    ? "/assets/hilltop-logo-dark-header.png"
    : "/assets/hilltop-logo-light-header.png";
  return <img className={`hilltop-logo-image${compact ? " hilltop-logo-compact" : ""}`} src={src} alt="Hill-Top Consultancy" />;
}
