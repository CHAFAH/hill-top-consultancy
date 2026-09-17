import { useMemo, useState } from "react";
import LogoLockup from "@/components/LogoLockup";
import SiteFooter from "@/components/SiteFooter";
import GlobalSearch from "@/components/GlobalSearch";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";
import SiteMegaMenu, { aboutItems, industryItems } from "@/components/SiteMegaMenu";

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

const partnerLogos = [
  ["Google Cloud", "/assets/google-cloud.png"],
  ["AWS", "/assets/aws.png"],
  ["Microsoft Azure", "/assets/azure.png"],
  ["IBM", "/assets/ibm.png"],
  ["SAP", "/assets/sap.png"],
  ["Kubernetes", "/assets/kubernetes.png"],
  ["GitHub", "/assets/github.png"],
  ["CircleCI", "/assets/circleci.png"],
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
      {partnerLogos.slice(0, 6).map(([name, src]) => <img className="brand-logo uploaded-brand-logo" src={src} alt={name} key={name} />)}
    </div>
  );
}

function GlobeVisual() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const nodes = [
    [98, 139, "Copenhagen"], [143, 112, "London"], [191, 155, "Frankfurt"], [257, 112, "Stockholm"],
    [82, 220, "New York"], [285, 220, "Tokyo"], [220, 278, "Singapore"], [155, 286, "Dubai"],
  ];
  return <div className="globe-visual" onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setTilt({ x: (event.clientX - rect.left - rect.width / 2) / 24, y: (event.clientY - rect.top - rect.height / 2) / 24 }); }} onMouseLeave={() => setTilt({ x: 0, y: 0 })} aria-hidden="true">
    <div className="globe-caption">CONNECTED <span>GLOBAL TECHNOLOGY</span></div>
    <svg viewBox="0 0 360 360" role="presentation" style={{ transform: `rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)` }}>
      <defs>
        <radialGradient id="globe-fill" cx="35%" cy="30%"><stop offset="0" stopColor="#153c59" /><stop offset=".58" stopColor="#071622" /><stop offset="1" stopColor="#02080d" /></radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <clipPath id="globe-clip"><circle cx="180" cy="180" r="130" /></clipPath>
      </defs>
      <circle cx="180" cy="180" r="140" fill="#042032" opacity=".35" filter="url(#glow)" />
      <circle cx="180" cy="180" r="130" fill="url(#globe-fill)" stroke="#3bc4e8" strokeOpacity=".6" strokeWidth="1.4" />
      <g clipPath="url(#globe-clip)" fill="none" stroke="#63cce7" strokeOpacity=".34" strokeWidth=".8">
        <ellipse cx="180" cy="180" rx="129" ry="41" /><ellipse cx="180" cy="180" rx="129" ry="78" /><ellipse cx="180" cy="180" rx="129" ry="110" />
        <ellipse cx="180" cy="180" rx="41" ry="130" /><ellipse cx="180" cy="180" rx="78" ry="130" /><ellipse cx="180" cy="180" rx="110" ry="130" />
        <path d="M52 180h256M61 130h238M61 230h238" />
      </g>
      <g clipPath="url(#globe-clip)" fill="none" stroke="#8de5fa" strokeOpacity=".62" strokeWidth="1.1">
        <path d="M98 139Q144 157 191 155T257 112" /><path d="M82 220Q143 112 191 155T285 220" /><path d="M155 286Q174 225 220 278" />
      </g>
      <g filter="url(#glow)">{nodes.map(([x, y, label], index) => <g key={label as string} className="globe-node"><circle cx={x} cy={y} r="4" fill="#bdf6ff" /><circle cx={x} cy={y} r="9" fill="none" stroke="#5de3ff" strokeOpacity=".5" strokeWidth="1"><animate attributeName="r" values="7;13;7" dur={`${2.4 + index / 5}s`} repeatCount="indefinite" /></circle><title>{label as string}</title></g>)}</g>
      <text x="180" y="190" textAnchor="middle" fill="#d9f9ff" fontSize="11" letterSpacing="3">SCALE</text>
    </svg>
    <div className="globe-tech-labels"><span>AWS</span><span>KUBERNETES</span><span>DEVOPS</span></div>
  </div>;
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
        <a className="wordmark hilltop-wordmark" href="#top" aria-label="Hill-Top Consultancy home"><LogoLockup /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <ServicesMegaMenu />
          <SiteMegaMenu label="About us" href="/about" intro="About Hill-Top" title="A partner built for lasting value." items={aboutItems} />
          <SiteMegaMenu label="Industries" href="/industries" intro="Industries we serve" title="Deep context. Better outcomes." items={industryItems} />
          <a href="/success-stories">Success stories</a>
          <a href="/insights">Insights <ChevronDown size={15} /></a>
        </nav>
        <div className="header-actions">
          <GlobalSearch />
          <Sparkles className="sparkle" size={18} />
          <a className="contact-button" href="/contact">Contact us</a>
          <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={24} /></button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button className="drawer-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={26} /></button>
          <p className="eyebrow">Hill-Top Consultancy / consultancy</p>
          <nav>
            {[['Services', '/services'], ['Industries', '/industries'], ['About Hill-Top', '/about'], ['Insights', '/insights'], ['Contact us', '/contact']].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={22} /></a>
            ))}
          </nav>
          <div className="drawer-note">Cloud, DevOps, Kubernetes, security, and software delivery for teams ready to move with confidence.</div>
        </div>
      )}

      <main id="top">
        <section className="hero-section">
          <ParticleField />
          <GlobeVisual />
          <div className="hero-content">
            <p className="eyebrow light">Hill-Top Consultancy / engineering, elevated</p>
            <h1><span>Pragmatic Cloud</span><span>&amp; DevOps Consulting</span></h1>
            <p className="hero-copy"><span>Hill-Top Consultancy helps ambitious teams build secure, scalable digital platforms</span><span>across cloud, DevOps, Kubernetes, and modern software delivery.</span></p>
            <div className="hero-actions">
              <AppButton href="/services"><span>Explore our<br />services</span></AppButton>
              <AppButton outline href="/contact"><span>Assess your AI<br />maturity</span></AppButton>
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
            <div className="testimonial-logo-wrap"><img className="testimonial-logo" src="/assets/tranzak-logo.png" alt="TRANZAK SARL" /></div>
            <div className="quote-content">
              <div className="quote-mark">“</div>
              <p>What stood out was how quickly Hill-Top Consultancy turned a complex technology challenge into a clear operating model.<br />The team brought our people, platforms, and security priorities together around practical standards we could adopt across the organisation.</p>
              <strong>Ntui Daniel</strong>
              <span>CEO, TRANZAK SARL</span>
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
            {partnerLogos.map(([name, src]) => <div className="partner-mark image-partner-mark" key={name}><img src={src} alt={name} /></div>)}
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

      <SiteFooter />
    </div>
  );
}
