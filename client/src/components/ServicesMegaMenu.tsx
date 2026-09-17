import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { serviceGroups } from "@/lib/serviceCatalog";

export default function ServicesMegaMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closeWhenAnotherMenuOpens = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== "services") setOpen(false);
    };
    const closeWhenOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("mega-menu-open", closeWhenAnotherMenuOpens);
    document.addEventListener("pointerdown", closeWhenOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => { window.removeEventListener("mega-menu-open", closeWhenAnotherMenuOpens); document.removeEventListener("pointerdown", closeWhenOutside); document.removeEventListener("keydown", closeOnEscape); };
  }, []);
  const openMenu = () => { window.dispatchEvent(new CustomEvent("mega-menu-open", { detail: "services" })); setOpen(true); };
  const moveBetweenMenus = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-mega-menu-trigger]"));
    const current = triggers.indexOf(event.currentTarget);
    const next = event.key === "ArrowRight" ? (current + 1) % triggers.length : (current - 1 + triggers.length) % triggers.length;
    triggers[next]?.focus();
  };
  return <div className="services-menu" ref={menuRef}>
    <button className="services-menu-trigger" data-mega-menu-trigger="services" onKeyDown={moveBetweenMenus} onClick={() => { if (!open) openMenu(); else setOpen(false); }} onMouseEnter={openMenu} onFocus={openMenu} aria-expanded={open} aria-controls="mega-panel-services">
      Services <ChevronDown size={15} />
    </button>
    <div id="mega-panel-services" className={`services-mega-panel ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
      <div className="services-mega-intro"><span className="eyebrow">What we do</span><h2>Technology expertise built around your next move.</h2><a href="/services" onClick={() => setOpen(false)}>Explore all services <ArrowUpRight size={16} /></a></div>
      <div className="services-mega-groups">{serviceGroups.map((serviceGroup) => <section key={serviceGroup.slug}><a className="services-mega-group-title" href={`/services/${serviceGroup.slug}`} onClick={() => setOpen(false)}>{serviceGroup.name}<ArrowUpRight size={14} /></a><div>{serviceGroup.items.map((item) => <a key={item.slug} href={`/services/${serviceGroup.slug}/${item.slug}`} onClick={() => setOpen(false)}>{item.name}</a>)}</div></section>)}</div>
    </div>
  </div>;
}
