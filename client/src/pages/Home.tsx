import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";

const phases = [
  {
    number: "01",
    name: "Assess",
    copy: "2 weeks: Our engineers work inside your codebase with your team. Every AI workflow is documented, every gap is sized, and every opportunity is costed. If nothing in the report justifies the next step, you stop here.",
  },
  {
    number: "02",
    name: "Pilot",
    copy: "4 to 6 weeks: Three to five workflows run on your real code, with your real engineers, against a baseline agreed at the start. At the end, the numbers either moved or they did not.",
  },
  {
    number: "03",
    name: "Expand",
    copy: "The workflows that worked are standardised across your organisation. Most clients land here. The gains show up in the numbers your board tracks.",
  },
  {
    number: "04",
    name: "eXceed",
    copy: "For teams where the Expand baseline supports it with autonomous AI agents inside deployment pipelines and code review cycles.",
  },
];

const services = [
  ["AI-Augmented Development", "AI in code generation, testing, and DevOps measured against your delivery baseline."],
  ["AI Consulting and Implementation", "50+ AI projects: strategy development, MLOps & GenAI. AWS AI Services Competency."],
  ["AI Agent Development", "Custom AI agents for workflow automation and multi-agent orchestration, with one team throughout."],
  ["Software engineering", "Application development, legacy modernisation, and product engineering. Same engineers, start to finish."],
  ["Cloud Solutions and Services", "400+ cloud projects across AWS, Azure, and Google Cloud. AWS Premier Tier partner."],
  ["Data and Analytics", "Data platform engineering, warehouse modernisation, and BI. Live in production across four industries."],
];

const caseStudies = [
  "A SaaS company. 250 engineers. Zero AI usage to 28% AI-generated code in six weeks. Code review time down 42%.",
  "A US transportation company. 140 engineers. Velocity up 27%. Test coverage from 55% to 81%. Hotfix deployment time down 70%.",
  "A housing management platform. 150+ engineers. Regression testing from three days to four hours. Incident resolution down 87.5%.",
];

const partnerMarks = [
  { name: "Microsoft", sub: "Solutions Partner", color: "#767676" },
  { name: "Google Cloud", sub: "Partner", color: "#4285f4" },
  { name: "aws", sub: "partner network", color: "#222" },
  { name: "PALANTIR", sub: "Premier", color: "#1d4e72" },
  { name: "SAP", sub: "Partner", color: "#0878ad" },
];

function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 180 }, (_, index) => {
        const angle = (index * 137.5 * Math.PI) / 180;
        const radius = 18 + ((index * 17) % 170);
        const spread = 0.65 + ((index * 13) % 40) / 100;
        return {
          left: `${50 + Math.cos(angle) * radius * spread * 0.2}%`,
          top: `${50 + Math.sin(angle) * radius * 0.58 * 0.2}%`,
          size: `${1 + (index % 3) * 0.7}px`,
          delay: `${(index % 12) * 0.08}s`,
        };
      }),
    [],
  );

  return (
    <div className="particle-field" aria-hidden="true">
      <div className="particle-core" />
      {particles.map((particle, index) => (
        <i key={index} style={particle} />
      ))}
    </div>
  );
}

function BrandRail() {
  return (
    <div className="brand-rail" aria-label="Trusted by">
      <span className="brand siemens">SIEMENS</span>
      <span className="brand ebay"><b>e</b>bay</span>
      <span className="brand autoscout"><b>Auto</b><small>Scout24</small></span>
      <span className="brand gogo"><b>☁</b>gogo</span>
      <span className="brand fluke">FLUKE.</span>
      <span className="brand lux">LUX</span>
    </div>
  );
}

function AppButton({ children, outline = false, href = "#contact" }: { children: React.ReactNode; outline?: boolean; href?: string }) {
  return (
    <a className={`app-button ${outline ? "outline" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={15} strokeWidth={1.8} />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark hilltop-wordmark" href="#top" aria-label="Hill-Top Consultancy home">Hill-Top Consultancy</a>
        <div className="header-actions">
          <button className="icon-button search-button" aria-label="Search"><Search size={20} /></button>
          <Sparkles className="sparkle" size={18} />
          <a className="contact-button" href="/contact">Contact us</a>
          <button className="icon-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={24} /></button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button className="drawer-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={26} /></button>
          <p className="eyebrow">Hill-Top Consultancy / consultancy</p>
          <nav>
            {[['Services', '/services'], ['About Hill-Top', '/about'], ['Insights', '/insights'], ['Contact us', '/contact']].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={22} /></a>
            ))}
          </nav>
          <div className="drawer-note">Cloud, DevOps, Kubernetes, security, and software delivery for teams ready to move with confidence.</div>
        </div>
      )}

      <main id="top">
        <section className="hero-section">
          <ParticleField />
          <div className="hero-content">
            <p className="eyebrow light">Hill-Top Consultancy / engineering, elevated</p>
            <h1>Pragmatic Cloud<br />&amp; DevOps Consulting</h1>
            <p className="hero-copy">Hill-Top Consultancy helps ambitious teams build secure, scalable digital platforms across cloud, DevOps, Kubernetes, and modern software delivery.</p>
            <div className="hero-actions">
              <AppButton href="/services">Explore our services</AppButton>
              <AppButton outline href="/contact">Assess your AI maturity</AppButton>
            </div>
          </div>
          <div className="hero-bottom-fade" />
        </section>

        <section className="stats-strip" aria-label="Company statistics">
          {[['2,400+', 'engineers'], ['10', 'countries'], ['90+', 'enterprise clients'], ['24', 'years']].map(([value, label]) => (
            <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </section>

        <BrandRail />

        <section className="intro-section content-width">
          <h2>AI tool adoption is up across enterprise engineering. Delivery metrics are not.</h2>
          <div className="compare-grid">
            <div><b>For CTOs</b><p>Engineers are faster.<br />Sprints are not.</p></div>
            <div><b>For CIOs</b><p>AI tools are live but disconnected<br className="desktop-only" /> from the cloud, data, and security<br className="desktop-only" /> infrastructure they depend on.</p></div>
          </div>
          <p className="intro-note">Hill-Top Consultancy connects your engineering goals to the cloud, platforms, data, and security foundations needed to scale with confidence.</p>
        </section>

        <section className="phases-section content-width" id="phases">
          <h2>Four phases. One exit at each. No long-term commitment at any of them.</h2>
          <div className="phase-row">
            {phases.map((phase, index) => (
              <div className={`phase-wrap ${index === 0 ? "active" : ""}`} key={phase.number}>
                <div className="phase-item"><span className="phase-number">{phase.number}</span><b>{phase.name}</b></div>
                {index < phases.length - 1 && <ArrowRight className="phase-arrow" size={31} strokeWidth={1.1} />}
              </div>
            ))}
          </div>
          <p className="phase-copy">{phases[0].copy}</p>
        </section>

        <section className="testimonial-section">
          <div className="testimonial content-width">
            <div className="workwave-logo"><span>W</span> WORKWAVE<sup>®</sup></div>
            <div className="quote-content">
              <div className="quote-mark">“</div>
              <p>What surprised me was how quickly Hill-Top Consultancy turned a complex cloud challenge into a clear operating model.<br />The team brought our developers, platform engineers, and security stakeholders together around practical standards that could be adopted across the organisation.</p>
              <strong>Greg Svitak</strong>
              <span>Chief Software Architect, WorkWave</span>
            </div>
          </div>
        </section>

        <section className="case-studies content-width">
          {caseStudies.map((copy, index) => (
            <article className="case-card" key={index}>
              <span className="case-tag">Case study</span>
              <p>{copy}</p>
              <ArrowRight className="case-arrow" size={26} strokeWidth={1.1} />
            </article>
          ))}
        </section>

        <section className="research-banner" id="research">
          <div className="research-inner content-width">
            <div>
              <span className="white-tag">Research</span>
              <h2>Hill-Top Cloud Index<br />2026</h2>
              <p>Practical signals for stronger cloud foundations, faster delivery, and the security decisions that matter as you scale.</p>
            </div>
            <a className="research-button" href="#contact">Download the report <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="partnerships content-width">
          <h2>Certified partnerships with the platforms your teams already run</h2>
          <p>Hill-Top Consultancy helps teams make the most of the platforms they already run, with practical depth across Microsoft, AWS, Google Cloud, Kubernetes, and modern data foundations.</p>
          <div className="partner-row">
            {partnerMarks.map((partner) => <div className="partner-mark" key={partner.name} style={{ '--mark-color': partner.color } as React.CSSProperties}><b>{partner.name}</b><small>{partner.sub}</small></div>)}
          </div>
            <a href="/contact" className="orange-cta">Explore our partnerships <ArrowUpRight size={14} /></a>
        </section>

        <section className="what-we-do" id="what-we-do">
          <div className="content-width">
            <h2>What we do</h2>
            <div className="services-grid">
              {services.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p><a href="/services" aria-label={`Learn more about ${title}`}><ArrowUpRight size={17} /></a></article>)}
            </div>
          </div>
        </section>

        <section className="outcomes-section content-width">
          <div className="section-kicker">Everything we do</div>
          <div className="outcomes-heading"><h2>Client outcomes<br />by industry</h2><a href="/insights" className="text-link">View all industries <ArrowRight size={16} /></a></div>
          <div className="outcomes-grid">
            {[['Retail / E-commerce', '100M+', 'end users served daily'], ['Finance', '$400M', 'in account balances processed monthly'], ['Manufacturing', '450+', 'warehouses automated'], ['Logistics', '10 min', 'vessel scheduling reduced from 4 hours']].map(([industry, stat, desc]) => <article key={industry}><span>{industry}</span><strong>{stat}</strong><p>{desc}</p></article>)}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="content-width contact-inner">
            <div className="contact-copy"><span className="section-kicker">Start with the numbers</span><h2>Tell us where AI should move the needle.</h2><p>Briefly outline your project or challenge, and our team will respond within one business day with relevant experience and initial technical insights.</p></div>
            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <label>Full name <input placeholder="Your name" /></label>
              <label>Business email <input type="email" placeholder="you@company.com" /></label>
              <label>Message <textarea rows={4} placeholder="Tell us about your challenge" /></label>
              <button type="submit" className="submit-button">Submit inquiry <ArrowUpRight size={16} /></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="content-width"><a className="wordmark dark hilltop-wordmark" href="#top">Hill-Top Consultancy</a><p>Pragmatic cloud and DevOps consultancy for modern teams.</p><span>© 2026 Hill-Top Consultancy. Built for confident delivery.</span></div></footer>
    </div>
  );
}
