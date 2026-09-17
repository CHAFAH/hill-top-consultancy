import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MenuItem = { name: string; href: string };
type SiteMegaMenuProps = { label: string; href: string; intro: string; title: string; items: MenuItem[] };

export default function SiteMegaMenu({ label, href, intro, title, items }: SiteMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuKey = label.toLowerCase().replace(/\s+/g, "-");
  useEffect(() => {
    const closeWhenAnotherMenuOpens = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== menuKey) setOpen(false);
    };
    const closeWhenOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("mega-menu-open", closeWhenAnotherMenuOpens);
    document.addEventListener("pointerdown", closeWhenOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => { window.removeEventListener("mega-menu-open", closeWhenAnotherMenuOpens); document.removeEventListener("pointerdown", closeWhenOutside); document.removeEventListener("keydown", closeOnEscape); };
  }, [menuKey]);
  const openMenu = () => { window.dispatchEvent(new CustomEvent("mega-menu-open", { detail: menuKey })); setOpen(true); };
  return <div className="services-menu" ref={menuRef}>
    <button className="services-menu-trigger" onClick={() => { if (!open) openMenu(); else setOpen(false); }} onMouseEnter={openMenu} onFocus={openMenu} aria-expanded={open}>{label} <ChevronDown size={15} /></button>
    {open && <div className="simple-mega-panel"><div className="services-mega-intro"><span className="eyebrow">{intro}</span><h2>{title}</h2><a href={href} onClick={() => setOpen(false)}>View overview <ArrowUpRight size={16} /></a></div><div className="simple-mega-items">{items.map((item) => <a href={item.href} onClick={() => setOpen(false)} key={item.href}>{item.name}<ArrowUpRight size={15} /></a>)}</div></div>}
  </div>;
}

export const industryItems: MenuItem[] = ["Finance", "Retail", "Healthcare", "Manufacturing", "Telecom", "Energy & Utilities", "Logistics & Supply Chain", "Automotive", "Agritech", "Game Development"].map((name) => ({ name, href: `/industries/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` }));
export const aboutItems: MenuItem[] = ["Company Overview", "Leadership Team", "Industry Recognitions", "Partnerships", "Clients", "Careers", "News", "Events", "Our impact", "Press kit"].map((name) => ({ name, href: `/about/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` }));
