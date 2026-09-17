export default function LogoLockup({ compact = false }: { compact?: boolean }) {
  return <img className={`hilltop-logo-image${compact ? " hilltop-logo-compact" : ""}`} src="/manus-storage/hilltoplogo-transparent-dark_5576fb0a.png" alt="Hill-Top Consultancy" />;
}
