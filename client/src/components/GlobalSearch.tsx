import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { allServices, slugify } from "@/lib/serviceCatalog";
import { insights } from "@/lib/insightSearchData";

type SearchResult = { title: string; type: string; href: string; description: string };

const staticResults: SearchResult[] = [
  { title: "Industries", type: "Overview", href: "/industries", description: "Industry-led technology solutions for finance, healthcare, retail, manufacturing, and more." },
  { title: "Success stories", type: "Case studies", href: "/success-stories", description: "Delivery stories showing measurable outcomes across AI, cloud, and software engineering." },
  { title: "About Hill-Top", type: "Company", href: "/about", description: "Our company overview, leadership, partnerships, clients, careers, and impact." },
  { title: "Contact Hill-Top Consultancy", type: "Contact", href: "/contact", description: "Start a conversation about your cloud, DevOps, AI, or software delivery challenge." },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const services = allServices.map((service) => ({ title: service.name, type: "Service", href: `/services/${slugify(service.group)}/${service.slug}`, description: "Explore detailed capabilities, deliverables, outcomes, and our approach." }));
    const searchable = [...insights, ...services, ...staticResults];
    const normalized = query.trim().toLowerCase();
    return normalized ? searchable.filter((item) => `${item.title} ${item.type} ${item.description}`.toLowerCase().includes(normalized)).slice(0, 8) : staticResults.slice(0, 4);
  }, [query]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 0);
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const navigate = (href: string) => { setOpen(false); setQuery(""); window.location.href = href; };
  return <>
    <button className="icon-button global-search-trigger" aria-label="Search the site" aria-expanded={open} onClick={() => setOpen(true)}><Search size={20} /></button>
    {open && <div className="global-search-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setOpen(false); }}>
      <section className="global-search-dialog" role="dialog" aria-modal="true" aria-label="Search Hill-Top Consultancy">
        <div className="global-search-head"><span className="eyebrow">Search Hill-Top Consultancy</span><button className="icon-button" aria-label="Close search" onClick={() => setOpen(false)}><X size={21} /></button></div>
        <div className="global-search-input"><Search size={20} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services, industries, insights..." aria-label="Search services, industries, and insights" /></div>
        <div className="global-search-results">{results.length > 0 ? results.map((result) => <button className="global-search-result" key={`${result.type}-${result.href}`} onClick={() => navigate(result.href)}><span><small>{result.type}</small><strong>{result.title}</strong><em>{result.description}</em></span><ArrowUpRight size={18} /></button>) : <p className="global-search-empty">No matching pages yet. Try “cloud”, “AI”, “security”, or “DevOps”.</p>}</div>
      </section>
    </div>}
  </>;
}
