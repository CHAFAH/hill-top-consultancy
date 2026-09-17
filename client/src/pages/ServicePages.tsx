import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Check } from "lucide-react";
import { useRoute } from "wouter";
import { useState } from "react";
import { allServices, findService, serviceGroups } from "@/lib/serviceCatalog";
import { getServiceDetail, relatedServices } from "@/lib/serviceDetails";
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
  return <ServiceLayout><section className="service-page-hero"><div className="content-width"><span className="eyebrow light">Hill-Top Consultancy / services</span><h1>Technology expertise for the work ahead.</h1><p>From strategy and cloud foundations to data, AI, software, and security, we create practical paths from challenge to measurable progress.</p></div></section><section className="service-page-body content-width"><div className="service-page-kicker">What we do</div><h2>One consultancy. The right expertise for every stage.</h2><div className="service-category-grid">{serviceGroups.map((serviceGroup) => <article key={serviceGroup.slug}><span className="service-number">{String(serviceGroups.indexOf(serviceGroup) + 1).padStart(2, "0")}</span><h3>{serviceGroup.name}</h3><p>{getServiceDetail(serviceGroup.slug, serviceGroup.items[0].slug).overview}</p><a href={`/services/${serviceGroup.slug}`}>Explore category <ArrowRight size={16} /></a></article>)}</div></section></ServiceLayout>;
}

export function ServiceGroupPage({ groupSlug }: { groupSlug: string }) {
  const serviceGroup = serviceGroups.find((group) => group.slug === groupSlug) ?? serviceGroups[0];
  const groupContent = getServiceDetail(serviceGroup.slug, serviceGroup.items[0].slug);
  return <ServiceLayout><section className="service-page-hero"><div className="content-width"><span className="eyebrow light">Hill-Top Consultancy / services</span><h1>{serviceGroup.name}</h1><p>{groupContent.overview}</p></div></section><section className="service-page-body content-width"><div className="service-page-kicker">{serviceGroup.name}</div><h2>Explore the capabilities in this category.</h2><div className="service-category-intro"><p>{groupContent.focus}</p><div><span>What this category covers</span>{groupContent.capabilities.slice(0, 3).map((item) => <strong key={item}>{item}</strong>)}</div></div><div className="service-detail-grid">{serviceGroup.items.map((item) => <a className="service-detail-card" href={`/services/${serviceGroup.slug}/${item.slug}`} key={item.slug}><span>{item.name}</span><ArrowUpRight size={20} /></a>)}</div></section></ServiceLayout>;
}

export function ServiceDetailPage({ groupSlug, serviceSlug }: { groupSlug: string; serviceSlug: string }) {
  const service = findService(serviceSlug);
  const serviceGroup = serviceGroups.find((group) => group.slug === groupSlug);
  const detail = getServiceDetail(groupSlug, serviceSlug);
  const related = relatedServices(groupSlug, serviceSlug);
  return <ServiceLayout><section className="service-page-hero service-detail-hero"><div className="content-width"><span className="eyebrow light">Hill-Top Consultancy / {serviceGroup?.name ?? "services"}</span><h1>{service?.name ?? "Service capability"}</h1><p>{detail.focus}</p></div></section><section className="service-detail-body content-width"><div className="service-detail-lead"><div><div className="service-page-kicker">{service?.name ?? "Service capability"}</div><h2>Practical expertise that moves from strategy to delivery.</h2></div><p>{detail.overview}</p></div><div className="service-detail-columns"><section><h3>What we cover</h3><ul>{detail.capabilities.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></section><section><h3>What you receive</h3><ul>{detail.deliverables.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></section><section><h3>Outcomes to expect</h3><ul>{detail.outcomes.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></section></div><section className="service-process"><div><span className="service-page-kicker">Our approach</span><h2>Start focused. Build confidence. Scale what works.</h2></div><div className="service-process-steps"><article><b>01</b><strong>Understand</strong><p>We map your goals, constraints, users, systems, and measures of success.</p></article><article><b>02</b><strong>Design</strong><p>We shape the target approach, prioritize the first release, and make trade-offs visible.</p></article><article><b>03</b><strong>Deliver</strong><p>We work alongside your team to build, validate, release, and transfer capability.</p></article><article><b>04</b><strong>Improve</strong><p>We use evidence from production to refine the solution and plan the next step.</p></article></div></section><div className="service-detail-cta"><div><span className="service-page-kicker">Ready to discuss {service?.name ?? "your challenge"}?</span><h2>Bring us the hard part.</h2></div><a className="orange-cta" href="/contact">Talk to Hill-Top Consultancy <ArrowUpRight size={15} /></a></div>{related.length > 0 && <section className="related-services"><div className="service-page-kicker">Related capabilities</div><div>{related.map((item) => <a href={`/services/${groupSlug}/${item.slug}`} key={item.slug}>{item.name}<ArrowRight size={16} /></a>)}</div></section>}</section></ServiceLayout>;
}

export function ServiceRouter() {
  const [, detailParams] = useRoute("/services/:groupSlug/:serviceSlug");
  const [, groupParams] = useRoute("/services/:groupSlug");
  if (detailParams) return <ServiceDetailPage groupSlug={detailParams.groupSlug} serviceSlug={detailParams.serviceSlug} />;
  if (groupParams) return <ServiceGroupPage groupSlug={groupParams.groupSlug} />;
  return <ServicesIndex />;
}

export const serviceCount = allServices.length;
