export default function LogoLockup({ compact = false, variant = "light" }: { compact?: boolean; variant?: "light" | "dark" }) {
  const src = variant === "dark"
    ? "/manus-storage/HILLTOPLOGO-transparent_cccab838.png"
    : "/manus-storage/hilltoplogo-transparent-dark_5576fb0a.png";
  return <img className={`hilltop-logo-image${compact ? " hilltop-logo-compact" : ""}`} src={src} alt="Hill-Top Consultancy" />;
}
