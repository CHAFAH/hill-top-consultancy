import { ArrowRight, ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import LogoLockup from "@/components/LogoLockup";
import SiteFooter from "@/components/SiteFooter";
import GlobalSearch from "@/components/GlobalSearch";
import { useState } from "react";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";
import SiteMegaMenu, { aboutItems, industryItems } from "@/components/SiteMegaMenu";

const pageData = {
  services: {
    eyebrow: "Hill-Top Consultancy / services",
    title: "Cloud foundations that make delivery feel lighter.",
    intro: "We help teams modernise platforms, strengthen delivery, and create the operating clarity needed to move from project-by-project work to dependable engineering.",
    cards: [
      ["Cloud migration", "Plan and execute secure migrations across AWS, Azure, and Google Cloud without losing momentum."],
      ["DevOps enablement", "Build repeatable delivery workflows, infrastructure as code, and engineering standards your team can own."],
      ["Kubernetes platforms", "Design resilient container platforms with the observability, security, and developer experience to match."],
      ["Security foundations", "Make cloud security practical with threat modelling, guardrails, identity, and continuous improvement."],
      ["AWS Well-Architected", "Review workloads against the six pillars and turn findings into an actionable roadmap."],
      ["Website development", "Create high-performing digital experiences with clear content, maintainable code, and measurable outcomes."],
    ],
  },
  about: {
    eyebrow: "Hill-Top Consultancy / about",
    title: "A senior consultancy for teams that care how the work gets done.",
    intro: "Hill-Top Consultancy is built around a simple belief: strong technology decisions create room for people to do their best work.",
    cards: [
      ["Practical by default", "We focus on the smallest valuable step that improves reliability, delivery speed, or decision quality."],
      ["Senior from day one", "You work directly with experienced practitioners who can explain trade-offs clearly and stay close to outcomes."],
      ["Designed to transfer", "Our goal is to leave your team with better systems, better habits, and the confidence to keep improving."],
    ],
  },
  insights: {
    eyebrow: "Hill-Top Consultancy / insights",
    title: "Clear thinking for complex cloud and delivery decisions.",
    intro: "A small library of practical notes for leaders and engineering teams navigating modern platforms, security, and sustainable delivery.",
    cards: [
      ["The cloud maturity checklist", "The signals that tell you whether a platform is ready to support the next stage of growth."],
      ["Kubernetes without the theatre", "How to decide whether Kubernetes is the right operational investment for your team."],
      ["Security as an enabler", "A practical way to move security conversations from late-stage blockers to shared design decisions."],
    ],
  },
  industries: {
    eyebrow: "Hill-Top Consultancy / industries",
    title: "Technology decisions shaped around the work your industry demands.",
    intro: "From regulated services to fast-moving product teams, we help organisations build platforms that respect their operating reality and create room for growth.",
    cards: [
      ["Financial services", "Build resilient, secure platforms for sensitive data, customer trust, and reliable digital operations."],
      ["Manufacturing", "Connect modern cloud foundations to the systems, plants, and workflows that keep production moving."],
      ["Retail and e-commerce", "Improve speed and resilience across customer journeys, commerce platforms, and operational data."],
      ["Logistics", "Create dependable visibility and automation across complex, distributed supply-chain environments."],
      ["Professional services", "Turn internal systems and delivery workflows into a foundation for better client outcomes."],
      ["Public and regulated", "Balance modernisation with governance, security, accessibility, and long-term accountability."],
    ],
  },
  contact: {
    eyebrow: "Hill-Top Consultancy / contact",
    title: "Bring us the challenge that needs a clearer next step.",
    intro: "Tell us what you are trying to change. We will come back with a focused first conversation, relevant experience, and a practical way to start.",
    cards: [
      ["Email", "info@hilltopconsultancy.com"],
      ["Phone", "+45 23 11 79 08"],
      ["Office", "Sylen 3, 2. sal, 2630 Taastrup, Denmark"],
      ["CVR", "44814544"],
    ],
  },
} as const;

type PageKey = keyof typeof pageData;

function PageHeader({ onMenu }: { onMenu: () => void }) {
  return <header className="inner-header"><a className="wordmark hilltop-wordmark" href="/" aria-label="Hill-Top Consultancy home"><LogoLockup variant="dark" /></a><nav className="desktop-nav inner-nav" aria-label="Primary navigation"><ServicesMegaMenu /><SiteMegaMenu label="About us" href="/about" intro="About Hill-Top" title="A partner built for lasting value." items={aboutItems} /><SiteMegaMenu label="Industries" href="/industries" intro="Industries we serve" title="Deep context. Better outcomes." items={industryItems} /><a href="/success-stories">Success stories</a><a href="/insights">Insights <ChevronDown size={15} /></a></nav><div className="inner-header-actions"><GlobalSearch /><a className="contact-button inner-contact" href="/contact">Contact us</a><button className="icon-button inner-menu-button" onClick={onMenu} aria-label="Open navigation"><Menu size={24} /></button></div></header>;
}

export default function InnerPage({ page }: { page: PageKey }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const content = pageData[page];
  return <div className="inner-page">
    <PageHeader onMenu={() => setMenuOpen(true)} />
    {menuOpen && <div className="inner-menu"><button className="inner-menu-close" onClick={() => setMenuOpen(false)}>×</button><p className="eyebrow">Hill-Top Consultancy</p>{[['Services','/services'],['Industries','/industries'],['About Hill-Top','/about'],['Insights','/insights'],['Contact','/contact']].map(([label, href]) => <a href={href} key={href}>{label}<ArrowUpRight size={20} /></a>)}</div>}
    <main>
      <section className="inner-hero"><div className="content-width"><p className="eyebrow light">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.intro}</p></div></section>
      <section className="inner-content content-width"><div className="inner-grid">{content.cards.map(([title, copy], index) => <article key={title}><span className="inner-card-number">0{index + 1}</span><h2>{title}</h2><p>{copy}</p><a href={page === 'contact' ? 'mailto:info@hilltopconsultancy.com' : '/contact'}>Start a conversation <ArrowRight size={16} /></a></article>)}</div></section>
      <section className="inner-cta"><div className="content-width"><p className="eyebrow">Hill-Top Consultancy</p><h2>Make the next step easier to see.</h2><a className="orange-cta" href="/contact">Talk to us <ArrowUpRight size={15} /></a></div></section>
    </main>
    <SiteFooter />
  </div>;
}
