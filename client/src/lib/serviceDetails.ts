import { findService, serviceGroups, slugify } from "./serviceCatalog";

export type ServiceDetail = {
  focus: string;
  overview: string;
  capabilities: string[];
  deliverables: string[];
  outcomes: string[];
};

const focus: Record<string, string> = {
  "technology-consulting": "Align business priorities, architecture decisions, and an executable technology roadmap before delivery investment begins.",
  "digital-transformation": "Turn disconnected processes and legacy constraints into a sequenced transformation program that teams can adopt.",
  "custom-solution-development": "Design and build differentiated digital products around your users, workflows, integrations, and operating model.",
  "team-extension": "Add senior engineering capacity that integrates with your rituals, tooling, quality bar, and ownership model.",
  "software-product-engineering": "Move from product intent to reliable software through discovery, architecture, engineering, quality, and continuous improvement.",
  "application-modernization": "Reduce the cost and risk of aging applications with a pragmatic modernization path that protects business continuity.",
  "qa-automation": "Build a sustainable quality engineering practice with automation that gives teams faster, more trustworthy feedback.",
  "mobile-app-development": "Create secure, high-performing mobile experiences that feel native to each platform and connected to your wider product ecosystem.",
  "ui-ux": "Make complex products easier to understand and use through research-led journeys, clear interaction patterns, and scalable design systems.",
  "cloud-migration": "Plan and execute a controlled move to cloud platforms with clear workload sequencing, security guardrails, and measurable value.",
  "devops": "Shorten the path from code to reliable production through automation, platform engineering, observability, and better team feedback loops.",
  "cloud-infrastructure-management": "Operate cloud foundations with the reliability, cost visibility, security posture, and operational discipline your teams need.",
  "cloud-modernization": "Refactor infrastructure and platform capabilities so cloud becomes an accelerator for delivery rather than another layer of complexity.",
  "cloud-application-development": "Build cloud-native applications that scale predictably, integrate cleanly, and are designed for continuous delivery from day one.",
  "rpa": "Automate repetitive, rules-based work while improving controls, exception handling, and the employee experience around operations.",
  "erp-solutions": "Connect enterprise processes, data, and reporting through ERP solutions designed around adoption, governance, and measurable business change.",
  "sap": "Plan, implement, extend, or modernize SAP capabilities with a focus on process fit, integration quality, data readiness, and user adoption.",
  "data-lake-consulting": "Create a governed data lake foundation that brings diverse sources together for exploration, analytics, and AI use cases.",
  "data-warehouse-consulting-services": "Build a trusted analytical warehouse with clear dimensional models, reliable pipelines, and performance that supports decision-making.",
  "data-governance": "Make data ownership, quality, lineage, access, and policy practical enough to work across teams and real operating conditions.",
  "data-migration": "Move data between platforms with a controlled approach to profiling, mapping, cleansing, reconciliation, and cutover.",
  "data-engineering-services": "Design dependable data pipelines and platforms that turn raw operational information into usable, timely, governed products.",
  "power-bi-consulting": "Turn governed business data into Power BI experiences that help leaders see performance, ask better questions, and act faster.",
  "embedded-iot": "Connect devices, firmware, edge processing, and cloud services into dependable IoT products that can operate in the real world.",
  "ai-agent-development-services": "Design AI agents that can reason over trusted context, use tools safely, and automate meaningful workflows with human control.",
  "computer-vision": "Apply image and video intelligence to inspection, safety, document, retail, and operational workflows where visual signals matter.",
  "generative-ai": "Move generative AI from experimentation to useful production capabilities with responsible architecture, evaluation, and adoption.",
  "ai-and-machine-learning": "Develop machine learning systems that are measurable, explainable, deployable, and connected to the decisions they are meant to improve.",
  "rag-development": "Build retrieval-augmented experiences that ground model answers in your documents, data, permissions, and business context.",
  "business-continuity": "Prepare critical technology services to withstand disruption through impact analysis, recovery design, testing, and operational readiness.",
  "devsecops": "Embed security into software delivery through automated controls, secure defaults, threat modeling, and shared engineering responsibility.",
  "application-security-testing": "Find and prioritize application vulnerabilities through repeatable testing integrated into development and release workflows.",
  "penetration-testing": "Simulate realistic attacks to expose exploitable weaknesses, validate defenses, and give leadership a clear remediation path.",
  "game-development": "Build engaging, stable game experiences across gameplay systems, services, tooling, performance, and live product operations.",
  "immersive-tech": "Prototype and deliver AR, VR, and spatial experiences that connect compelling interaction design with practical business outcomes.",
};

const groupDefaults: Record<string, Omit<ServiceDetail, "focus">> = {
  "ai-augmented-development-services": { overview: "We combine experienced consultants and engineers with disciplined delivery practices to make technology change practical, measurable, and aligned to your operating reality.", capabilities: ["Discovery and current-state assessment", "Architecture and delivery roadmap", "Product and platform engineering", "Ways of working and team enablement"], deliverables: ["Prioritized opportunity map", "Target architecture and delivery plan", "Working product increments", "Knowledge transfer and operating playbook"], outcomes: ["Clearer investment decisions", "Faster delivery with less rework", "Stronger internal capability", "A measurable path from idea to value"] },
  "solutions": { overview: "We build and improve the digital products your customers and employees rely on, balancing experience, quality, speed, and long-term maintainability.", capabilities: ["Product discovery and roadmapping", "Application and platform engineering", "Quality engineering and automation", "Experience design and validation"], deliverables: ["Product backlog and release plan", "Production-ready features", "Automated quality coverage", "Design system and documentation"], outcomes: ["More confident releases", "Better product usability", "Lower maintenance cost", "A foundation for continuous improvement"] },
  "cloud-solutions-and-consulting": { overview: "We help organizations make cloud a dependable business capability through clear strategy, secure foundations, automation, and operational ownership.", capabilities: ["Cloud readiness and assessment", "Landing zones and platform foundations", "Migration and modernization", "DevOps, SRE, and FinOps practices"], deliverables: ["Cloud strategy and workload roadmap", "Secure platform baseline", "Migration waves and runbooks", "Observability and operating model"], outcomes: ["Improved resilience", "Faster time to market", "More transparent cloud cost", "Safer, repeatable change"] },
  "intelligent-platforms-and-automation": { overview: "We connect enterprise platforms and automation to the processes that matter, improving visibility, consistency, and the ability to scale operations.", capabilities: ["Process discovery and fit-gap analysis", "Platform architecture and integration", "Workflow and task automation", "Adoption, governance, and support"], deliverables: ["Future-state process model", "Integration and configuration plan", "Automated workflows", "Adoption and support playbook"], outcomes: ["Less manual effort", "More consistent processes", "Better operational reporting", "Higher return from enterprise platforms"] },
  "data-and-analytics": { overview: "We turn fragmented information into trusted data products, analytical foundations, and decision experiences that teams can use every day.", capabilities: ["Data strategy and operating model", "Platform and pipeline engineering", "Governance, quality, and lineage", "BI, reporting, and advanced analytics"], deliverables: ["Data domain and platform roadmap", "Reliable ingestion and transformation", "Governed analytical models", "Dashboards and insight workflows"], outcomes: ["Faster access to trusted data", "Lower reporting friction", "Stronger compliance posture", "Better decisions at the point of work"] },
  "embedded-and-iot": { overview: "We bring together device, software, connectivity, and cloud expertise to create connected products that are dependable from prototype to scale.", capabilities: ["Embedded and firmware engineering", "Edge and device connectivity", "Cloud and data platform integration", "Testing, monitoring, and field readiness"], deliverables: ["Reference architecture", "Firmware and device software", "Telemetry and control services", "Validation and deployment plan"], outcomes: ["Reliable device behavior", "Faster path from prototype to product", "Operational visibility", "Scalable connected experiences"] },
  "ai-consulting-and-implementation": { overview: "We help teams choose the right AI opportunities, design responsible solutions, and put models and AI-enabled workflows into production with measurable controls.", capabilities: ["AI opportunity discovery", "Model and data architecture", "Evaluation and responsible AI", "MLOps, deployment, and adoption"], deliverables: ["AI use-case portfolio", "Solution architecture and evaluation plan", "Production pilot", "Governance and adoption guide"], outcomes: ["Useful AI rather than demos", "Measured business impact", "Safer model operations", "A repeatable path to scale"] },
  "security-and-quality": { overview: "We make security and quality visible throughout the lifecycle, combining practical testing with controls that teams can sustain as delivery accelerates.", capabilities: ["Risk and threat assessment", "Secure development practices", "Application and infrastructure testing", "Continuity and recovery readiness"], deliverables: ["Risk register and remediation plan", "Security test findings", "Pipeline controls and standards", "Recovery and response runbooks"], outcomes: ["Fewer critical weaknesses", "Earlier risk discovery", "More resilient operations", "Greater confidence in releases"] },
  "game-development": { overview: "We support game and immersive teams with engineering, interaction, performance, and production expertise across the full player experience.", capabilities: ["Gameplay and systems engineering", "Multiplayer and backend services", "Performance and platform optimization", "Immersive interaction design"], deliverables: ["Playable vertical slice", "Production systems and services", "Performance test plan", "Release and live-ops readiness"], outcomes: ["More stable player experiences", "Faster iteration", "Better platform performance", "A stronger path to launch"] },
};

export function getServiceDetail(groupSlug: string, serviceSlug: string): ServiceDetail {
  const group = groupDefaults[groupSlug] ?? groupDefaults["solutions"];
  const service = findService(serviceSlug);
  const serviceFocus = focus[serviceSlug] ?? `Deliver focused ${service?.name ?? "technology"} capabilities around your priorities, constraints, and growth plans.`;
  return { focus: serviceFocus, ...group };
}

export function relatedServices(groupSlug: string, serviceSlug: string) {
  const group = serviceGroups.find((item) => item.slug === groupSlug);
  return (group?.items ?? []).filter((item) => item.slug !== serviceSlug).slice(0, 3);
}

export const serviceDetailCount = serviceGroups.reduce((total, group) => total + group.items.length, 0);
