import { ChangeEvent, FormEvent, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, Paperclip, X } from "lucide-react";
import GlobalSearch from "@/components/GlobalSearch";
import SiteFooter from "@/components/SiteFooter";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";
import SiteMegaMenu, { aboutItems, industryItems } from "@/components/SiteMegaMenu";

const services = ["AI-Augmented Development", "AI Consulting and Implementation", "AI Agent Development", "Software Product Engineering", "Cloud Solutions and Consulting", "DevOps and Kubernetes", "Data and Analytics", "Security and Quality", "Mobile App Development", "Other"];
const discoveryOptions = ["Search engine", "AI tool", "Social media", "Event or conference", "Network recommendation", "Partner referral", "Other"];
const offices = [
  ["Denmark", "Copenhagen", "Sylen 3, 2. sal, 2630 Taastrup", "09:00 local time"],
  ["Sweden", "Malmo", "1 Västra Kanalgatan St.", "09:00 local time"],
  ["United Kingdom", "London", "EC3A 7BA, 6 Bevis Marks", "08:00 local time"],
  ["United States", "Florida", "4330 W Broward Boulevard, Plantation, FL 33317", "11:00 local time"],
  ["United Arab Emirates", "Dubai", "Dubai Internet City", "12:00 local time"],
  ["Singapore", "Singapore", "Central Business District", "17:00 local time"],
];

function ContactHeader({ onMenu }: { onMenu: () => void }) {
  return <header className="inner-header contact-header"><a className="wordmark hilltop-wordmark" href="/" aria-label="Hill-Top Consultancy home">Hill-Top Consultancy</a><nav className="desktop-nav inner-nav" aria-label="Primary navigation"><ServicesMegaMenu /><SiteMegaMenu label="About us" href="/about" intro="About Hill-Top" title="A partner built for lasting value." items={aboutItems} /><SiteMegaMenu label="Industries" href="/industries" intro="Industries we serve" title="Deep context. Better outcomes." items={industryItems} /><a href="/success-stories">Success stories</a><a href="/insights">Insights <ChevronDown size={15} /></a></nav><div className="inner-header-actions"><GlobalSearch /><a className="contact-button inner-contact" href="/contact">Contact us</a><button className="icon-button inner-menu-button" onClick={onMenu} aria-label="Open navigation"><Menu size={24} /></button></div></header>;
}

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    const total = selected.reduce((sum, file) => sum + file.size, 0);
    if (selected.length > 3) return setFileError("Please attach no more than 3 files.");
    if (total > 5 * 1024 * 1024) return setFileError("The total attachment size must not exceed 5MB.");
    setFiles(selected); setFileError("");
  };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return <div className="contact-page"><ContactHeader onMenu={() => setMenuOpen(true)} />{menuOpen && <div className="inner-menu contact-mobile-menu"><button className="inner-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={22} /></button><p className="eyebrow">Hill-Top Consultancy</p>{[["Services","/services"],["Industries","/industries"],["About Hill-Top","/about"],["Success stories","/success-stories"],["Insights","/insights"],["Contact","/contact"]].map(([label, href]) => <a href={href} key={href}>{label}<ArrowUpRight size={20} /></a>)}</div>}
    <section className="contact-hero"><div className="content-width"><span className="eyebrow light">Hill-Top Consultancy / contact</span><h1>Tell us what you are trying to change.</h1><p>Briefly outline your project or challenge, and our team will respond within one business day with relevant experience and initial technical insights.</p></div></section>
    <main className="contact-main content-width"><section className="contact-form-section"><div className="contact-form-intro"><span className="service-page-kicker">Start a conversation</span><h2>Bring us the challenge that needs a clearer next step.</h2><p>Share enough context for us to connect you with the right senior consultant. There is no obligation and no sales script—just a focused first conversation.</p><div className="contact-assurances"><div><strong>Your privacy is protected</strong><span>ISO 27001 aligned · GDPR conscious</span></div><div><strong>Typical response time</strong><span>Within 1 business day</span></div></div></div>{submitted ? <div className="contact-success"><Check size={28} /><span className="service-page-kicker">Inquiry received</span><h2>Thank you. We’ll be in touch shortly.</h2><p>Your details have been captured for this demonstration form. A Hill-Top consultant would follow up within one business day.</p><button className="orange-cta" onClick={() => setSubmitted(false)}>Send another inquiry <ArrowUpRight size={15} /></button></div> : <form className="contact-form" onSubmit={submit}><div className="contact-form-grid"><label>Full name *<input name="name" required placeholder="Your full name" /></label><label>Business email *<input name="email" type="email" required placeholder="you@company.com" /></label><label>Company name *<input name="company" required placeholder="Your company" /></label><label>Location *<input name="location" required placeholder="City, country" /></label><label>Phone number<input name="phone" type="tel" placeholder="+45 ..." /></label><label>How did you hear about us?<select name="source" defaultValue=""><option value="" disabled>Select an option</option>{discoveryOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label className="contact-form-wide">Services you are interested in *<select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label><label className="contact-form-wide">Message *<textarea name="message" required placeholder="Tell us about your challenge, goals, and timeline" rows={6} /></label><label className="contact-form-wide file-field">Attach files <span className="file-help">Up to 3 attachments · total size up to 5MB</span><span className="file-picker"><Paperclip size={17} />Choose files<input type="file" multiple onChange={handleFiles} accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.txt" /></span>{files.length > 0 && <span className="file-list">{files.map((file) => <span key={file.name}>{file.name}</span>)}</span>}{fileError && <span className="field-error">{fileError}</span>}</label><label className="consent contact-form-wide"><input type="checkbox" required /> <span>I have read and accepted the Terms & Conditions and Privacy Notice *</span></label></div><button className="orange-cta contact-submit" type="submit">Submit inquiry <ArrowUpRight size={15} /></button><p className="required-note">* Required fields</p></form>}</section></main>
    <section className="contact-trust"><div className="content-width"><span className="service-page-kicker">Trusted by ambitious teams</span><h2>Partners and platforms your teams already trust.</h2><div className="contact-logo-grid"><span>Microsoft</span><span>AWS</span><span>Google Cloud</span><span>Kubernetes</span><span>SAP</span><span>Palantir</span></div></div></section>
    <section className="contact-network"><div className="content-width"><div className="network-heading"><span className="service-page-kicker">Global delivery network</span><h2>Senior expertise, close to your operating reality.</h2><p>Our distributed team works across time zones so projects keep moving and conversations stay practical.</p></div><div className="network-stats"><div><strong>10</strong><span>countries</span></div><div><strong>13</strong><span>offices and delivery hubs</span></div><div><strong>2,400+</strong><span>engineers</span></div></div><div className="office-grid">{offices.map(([country, city, address, time]) => <article key={country}><span>{country}</span><h3>{city}</h3><p>{time}</p><address>{address}</address><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer">Open in maps <ArrowUpRight size={14} /></a></article>)}</div></div></section>
    <SiteFooter />
  </div>;
}
