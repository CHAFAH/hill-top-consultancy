import { ArrowUpRight, Clock3, Search, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { allServices, slugify } from "@/lib/serviceCatalog";
import { insights } from "@/lib/insightSearchData";

type SearchResult = { title: string; type: string; href: string; description: string; keywords?: string };
const RECENT_KEY = "hilltop-recent-searches";
const popularSearches = ["Cloud migration", "AI agents", "DevOps", "Data security", "Kubernetes"];
const synonyms: Record<string, string[]> = {
  ai: ["artificial intelligence", "machine learning", "generative ai", "agent"],
  cloud: ["aws", "azure", "google cloud", "migration", "infrastructure"],
  devops: ["delivery", "ci/cd", "platform", "automation", "kubernetes"],
  security: ["governance", "compliance", "penetration", "devsecops", "sovereignty"],
  data: ["analytics", "warehouse", "lake", "power bi", "migration"],
  software: ["application", "engineering", "product", "modernization"],
  kubernets: ["kubernetes", "container", "platform", "devops"],
  k8s: ["kubernetes", "container", "platform"],
};

const staticResults: SearchResult[] = [
  { title: "Kubernetes platform engineering", type: "Capability", href: "/services/cloud-solutions-and-consulting/cloud-infrastructure-management", description: "Kubernetes, container platforms, DevOps automation, and reliable infrastructure operations." },
  { title: "Industries", type: "Overview", href: "/industries", description: "Industry-led technology solutions for finance, healthcare, retail, manufacturing, and more." },
  { title: "Success stories", type: "Case studies", href: "/success-stories", description: "Delivery stories showing measurable outcomes across AI, cloud, and software engineering." },
  { title: "About Hill-Top", type: "Company", href: "/about", description: "Our company overview, leadership, partnerships, clients, careers, and impact.", keywords: "Hill Top Consultancy company overview about us" },
  { title: "Prince CHAFAH Sani — CEO & Founder", type: "Leadership", href: "/about/leadership-team", description: "Meet Prince CHAFAH Sani, CEO and Founder of Hill-Top Consultancy.", keywords: "Sani Prince Chafah CEO founder leadership LinkedIn GitHub" },
  { title: "Hill-Top Consultancy contact", type: "Contact", href: "/contact", description: "Contact Hill-Top Consultancy by email, phone, or inquiry form.", keywords: "Sani contact email phone location Denmark CVR 44814544" },
  { title: "Careers at Hill-Top Consultancy", type: "Careers", href: "/careers", description: "Explore open roles and join the Hill-Top Consultancy team.", keywords: "jobs hiring work employment careers" },
];

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const distance = (a: string, b: string) => {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0]; row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const current = row[j];
      row[j] = a[i - 1] === b[j - 1] ? previous : Math.min(previous + 1, row[j] + 1, row[j - 1] + 1);
      previous = current;
    }
  }
  return row[b.length];
};
const matchesQuery = (text: string, query: string) => {
  const words = normalize(query).split(" ").filter(Boolean);
  const haystack = normalize(text);
  return words.every((word) => {
    if (haystack.includes(word)) return true;
    const expanded = synonyms[word] ?? [];
    if (expanded.some((term) => haystack.includes(normalize(term)))) return true;
    return haystack.split(" ").some((candidate) => candidate.length > 3 && distance(word, candidate) <= Math.max(1, Math.floor(word.length / 4)));
  });
};

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const services = useMemo<SearchResult[]>(() => allServices.map((service) => ({ title: service.name, type: "Service", href: `/services/${slugify(service.group)}/${service.slug}`, description: "Explore detailed capabilities, deliverables, outcomes, and our approach." })), []);
  const searchable = useMemo<SearchResult[]>(() => [...insights, ...services, ...staticResults], [services]);
  const results = useMemo(() => query.trim() ? searchable.filter((item) => matchesQuery(`${item.title} ${item.type} ${item.description} ${item.keywords ?? ""}`, query)).slice(0, 8) : staticResults.slice(0, 4), [query, searchable]);

  useEffect(() => {
    try { setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]")); } catch { setRecent([]); }
    if (open) window.setTimeout(() => inputRef.current?.focus(), 0);
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const chooseSuggestion = (value: string) => { setQuery(value); window.setTimeout(() => inputRef.current?.focus(), 0); };
  const navigate = (href: string, searchTerm = query) => {
    const term = searchTerm.trim();
    if (term) { const next = [term, ...recent.filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(0, 5); localStorage.setItem(RECENT_KEY, JSON.stringify(next)); setRecent(next); }
    setOpen(false); setQuery(""); window.location.href = href;
  };
  return <>
    <button className="icon-button global-search-trigger" aria-label="Search the site" aria-expanded={open} onClick={() => setOpen(true)}><Search size={20} /></button>
    {open && <div className="global-search-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setOpen(false); }}>
      <section className="global-search-dialog" role="dialog" aria-modal="true" aria-label="Search Hill-Top Consultancy">
        <div className="global-search-head"><span className="eyebrow">Search Hill-Top Consultancy</span><button className="icon-button" aria-label="Close search" onClick={() => setOpen(false)}><X size={21} /></button></div>
        <div className="global-search-input"><Search size={20} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services, industries, insights..." aria-label="Search services, industries, and insights" /></div>
        {!query && <div className="global-search-suggestions"><div><span className="search-suggestion-label"><Sparkles size={14} /> Popular searches</span><div className="search-chips">{popularSearches.map((item) => <button key={item} onClick={() => chooseSuggestion(item)}>{item}</button>)}</div></div>{recent.length > 0 && <div><span className="search-suggestion-label"><Clock3 size={14} /> Recent searches</span><div className="search-chips">{recent.map((item) => <button key={item} onClick={() => chooseSuggestion(item)}>{item}</button>)}</div></div>}</div>}
        <div className="global-search-results">{results.length > 0 ? results.map((result) => <button className="global-search-result" key={`${result.type}-${result.href}`} onClick={() => navigate(result.href)}><span><small>{result.type}</small><strong>{result.title}</strong><em>{result.description}</em></span><ArrowUpRight size={18} /></button>) : <p className="global-search-empty">No close matches yet. Try “cloud”, “AI”, “security”, or “DevOps”.</p>}</div>
      </section>
    </div>}
  </>;
}
