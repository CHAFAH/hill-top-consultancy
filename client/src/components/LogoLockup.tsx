export default function LogoLockup({ compact = false }: { compact?: boolean }) {
  return <img className={`hilltop-logo-image${compact ? " hilltop-logo-compact" : ""}`} src="/manus-storage/HILLTOPLOGO-lockup_f7dd82f3.png" alt="Hill-Top Consultancy" />;
}
