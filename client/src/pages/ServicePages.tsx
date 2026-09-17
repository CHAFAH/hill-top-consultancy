import { ArrowRight, ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { useRoute } from "wouter";
import { useState } from "react";
import { allServices, findService, serviceGroups } from "@/lib/serviceCatalog";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";
import SiteMegaMenu, { aboutItems, industryItems } from "@/components/SiteMegaMenu";

function ServiceHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <><header className="inner-header"><a className="wordmark hilltop-wordmark" href="/" aria-label="Hill-Top Consultancy home">Hill-Top Consultancy</a><nav className="desktop-nav inner-nav" aria-label="Primary navigation"><ServicesMegaMenu /><SiteMegaMenu label="About us" href="/about" intro="About Hill-Top" title="A partner built for lasting value." items={aboutItems} /><SiteMegaMenu label="Industries" href="/industries" intro="Industries we serve" title="Deep context. Better outcomes." items={industryItems} /><a href="/insights">Success stories</a><a href="/insights">Insights <ChevronDown size={15} /></a></nav><div className="inner-header-actions"><a className="contact-button inner-contact" href="/contact">Contact us</a><button className="icon-button inner-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={24} /></button></div></header>{menuOpen && <div className="inner-menu"><button className="inner-menu-close" onClick={() => setMenuOpen(false)}>×</button><p className="eyebrow">Hill-Top Consultancy</p>{[['Services','/services'],['Industries','/industries'],['About Hill-Top','/about'],['Insights','/insights'],['Contact','/contact']].map(([label, href]) => <a href={href} key={href}>{label}<ArrowUpRight size={20} /></a>)}</div>}</>;
}

function ServiceLayout({ children }: { children: React.ReactNode }) {
  return <div className="service-page"><ServiceHeader />{children}</div>;
}

export function ServicesIndex() {
  return <ServiceLayout><section className="service-page-hero"><div className="content-width"><span className="eyebrow light">Hill-Top Consultancy / services</span><h1>Technology expertise for the work ahead.</h1><p>From strategy and cloud foundations to data, AI, software, and security, we create practical paths from challenge to measurable progress.</p></div></section><section className="service-page-body content-width"><div className="service-page-kicker">What we do</div><h2>One consultancy. The right expertise for every stage.</h2><div className="service-category-grid">{serviceGroups.map((serviceGroup) => <article key={serviceGroup.slug}><span className="service-number">{String(serviceGroups.indexOf(serviceGroup) + 1).padStart(2, "0")}</span><h3>{serviceGroup.name}</h3><p>Placeholder category page for Hill-Top Consultancy services across {serviceGroup.items.slice(0, 3).map((item) => item.name).join(", ")} and more.</p><a href={`/services/${serviceGroup.slug}`}>Explore category <ArrowRight size={16} /></a></article>)}</div></section></ServiceLayout>;
}

export function ServiceGroupPage({ groupSlug }: { groupSlug: string }) {
  const serviceGroup = serviceGroups.find((group) => group.slug === groupSlug) ?? serviceGroups[0];
  return <ServiceLayout><section className="service-page-hero"><div className="content-width"><span className="eyebrow light">Hill-Top Consultancy / services</span><h1>{serviceGroup.name}</h1><p>A placeholder category page with the same editorial structure as the original site. We will replace this copy with Hill-Top Consultancy’s final positioning, case studies, and delivery approach.</p></div></section><section className="service-page-body content-width"><div className="service-page-kicker">{serviceGroup.name}</div><h2>Explore the capabilities in this category.</h2><div className="service-detail-grid">{serviceGroup.items.map((item) => <a className="service-detail-card" href={`/services/${serviceGroup.slug}/${item.slug}`} key={item.slug}><span>{item.name}</span><ArrowUpRight size={20} /></a>)}</div></section></ServiceLayout>;
}

export function ServiceDetailPage({ groupSlug, serviceSlug }: { groupSlug: string; serviceSlug: string }) {
  const service = findService(serviceSlug);
  const serviceGroup = serviceGroups.find((group) => group.slug === groupSlug);
  return <ServiceLayout><section className="service-page-hero"><div className="content-width"><span className="eyebrow light">Hill-Top Consultancy / {serviceGroup?.name ?? "services"}</span><h1>{service?.name ?? "Service capability"}</h1><p>This is a placeholder service page for Hill-Top Consultancy. We’ll add the final service narrative, outcomes, delivery model, technology stack, and contact CTA here.</p></div></section><section className="service-page-body content-width"><div className="service-placeholder-layout"><div><div className="service-page-kicker">Placeholder page</div><h2>Built around your context, not a one-size-fits-all package.</h2><p>Our specialists work with your team to understand the current state, identify the highest-value next step, and deliver a practical path to stronger outcomes.</p><a className="orange-cta" href="/contact">Talk to Hill-Top Consultancy <ArrowUpRight size={15} /></a></div><aside><span>Related capability</span><strong>{serviceGroup?.name ?? "Services"}</strong><a href={`/services/${serviceGroup?.slug ?? "ai-augmented-development-services"}`}>View category <ArrowRight size={16} /></a></aside></div></section></ServiceLayout>;
}

export function ServiceRouter() {
  const [, detailParams] = useRoute("/services/:groupSlug/:serviceSlug");
  const [, groupParams] = useRoute("/services/:groupSlug");
  if (detailParams) return <ServiceDetailPage groupSlug={detailParams.groupSlug} serviceSlug={detailParams.serviceSlug} />;
  if (groupParams) return <ServiceGroupPage groupSlug={groupParams.groupSlug} />;
  return <ServicesIndex />;
}

export const serviceCount = allServices.length;
