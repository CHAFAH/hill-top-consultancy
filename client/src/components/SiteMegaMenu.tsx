import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";

type MenuItem = { name: string; href: string };
type SiteMegaMenuProps = { label: string; href: string; intro: string; title: string; items: MenuItem[] };

export default function SiteMegaMenu({ label, href, intro, title, items }: SiteMegaMenuProps) {
  const [open, setOpen] = useState(false);
  return <div className="services-menu">
    <button className="services-menu-trigger" onClick={() => setOpen((value) => !value)} onMouseEnter={() => setOpen(true)} onFocus={() => setOpen(true)} aria-expanded={open}>{label} <ChevronDown size={15} /></button>
    {open && <div className="simple-mega-panel"><div className="services-mega-intro"><span className="eyebrow">{intro}</span><h2>{title}</h2><a href={href}>View overview <ArrowUpRight size={16} /></a></div><div className="simple-mega-items">{items.map((item) => <a href={item.href} key={item.href}>{item.name}<ArrowUpRight size={15} /></a>)}</div></div>}
  </div>;
}

export const industryItems: MenuItem[] = ["Finance", "Retail", "Healthcare", "Manufacturing", "Telecom", "Energy & Utilities", "Logistics & Supply Chain", "Automotive", "Agritech", "Game Development"].map((name) => ({ name, href: `/industries#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` }));
export const aboutItems: MenuItem[] = ["Company Overview", "Leadership Team", "Industry Recognitions", "Partnerships", "Clients", "Careers", "News", "Events", "Our impact", "Press kit"].map((name) => ({ name, href: `/about/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` }));
