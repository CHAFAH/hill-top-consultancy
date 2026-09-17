import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { serviceGroups } from "@/lib/serviceCatalog";

export default function ServicesMegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenu = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const scheduleClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(false), 260); };
  return <div className="services-menu" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
    <button className="services-menu-trigger" onClick={() => setOpen((value) => !value)} onFocus={openMenu} aria-expanded={open}>
      Services <ChevronDown size={15} />
    </button>
    {open && <div className="services-mega-panel">
      <div className="services-mega-intro"><span className="eyebrow">What we do</span><h2>Technology expertise built around your next move.</h2><a href="/services">Explore all services <ArrowUpRight size={16} /></a></div>
      <div className="services-mega-groups">{serviceGroups.map((serviceGroup) => <section key={serviceGroup.slug}><a className="services-mega-group-title" href={`/services/${serviceGroup.slug}`}>{serviceGroup.name}<ArrowUpRight size={14} /></a><div>{serviceGroup.items.map((item) => <a key={item.slug} href={`/services/${serviceGroup.slug}/${item.slug}`}>{item.name}</a>)}</div></section>)}</div>
    </div>}
  </div>;
}
