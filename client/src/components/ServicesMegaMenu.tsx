import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { serviceGroups } from "@/lib/serviceCatalog";

export default function ServicesMegaMenu() {
  const [open, setOpen] = useState(false);
  return <div className="services-menu">
    <button className="services-menu-trigger" onClick={() => setOpen((value) => !value)} onMouseEnter={() => setOpen(true)} onFocus={() => setOpen(true)} aria-expanded={open}>
      Services <ChevronDown size={15} />
    </button>
    {open && <div className="services-mega-panel">
      <div className="services-mega-intro"><span className="eyebrow">What we do</span><h2>Technology expertise built around your next move.</h2><a href="/services" onClick={() => setOpen(false)}>Explore all services <ArrowUpRight size={16} /></a></div>
      <div className="services-mega-groups">{serviceGroups.map((serviceGroup) => <section key={serviceGroup.slug}><a className="services-mega-group-title" href={`/services/${serviceGroup.slug}`} onClick={() => setOpen(false)}>{serviceGroup.name}<ArrowUpRight size={14} /></a><div>{serviceGroup.items.map((item) => <a key={item.slug} href={`/services/${serviceGroup.slug}/${item.slug}`} onClick={() => setOpen(false)}>{item.name}</a>)}</div></section>)}</div>
    </div>}
  </div>;
}
