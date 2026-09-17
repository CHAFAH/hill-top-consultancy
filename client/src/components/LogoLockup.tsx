export default function LogoLockup({ compact = false }: { compact?: boolean }) {
  return <img className={`hilltop-logo-image${compact ? " hilltop-logo-compact" : ""}`} src="/manus-storage/HILLTOPLOGO-transparent_cccab838.png" alt="Hill-Top Consultancy" />;
}
