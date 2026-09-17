export const insights = [
  { title: "Self-improving AI: How it works and what it means for businesses", category: "AI", slug: "self-improving-ai-businesses", excerpt: "How managed learning loops improve workflows while keeping accountability and measurable outcomes." },
  { title: "AI agent harness: What makes agents reliable in 2026", category: "AI", slug: "ai-agent-harness-reliable-2026", excerpt: "The controls around tools, memory, evaluation, permissions, and recovery that make agents reliable." },
  { title: "The cloud maturity checklist: Signals your platform is ready for growth", category: "Cloud & DevOps", slug: "cloud-maturity-checklist", excerpt: "The delivery, operations, security, and cost signals that indicate cloud readiness." },
  { title: "Data sovereignty: What does compliance require in 2026?", category: "Security & Governance", slug: "data-sovereignty-compliance-2026", excerpt: "Why sovereignty is an architecture, operating-model, and supplier-management decision." },
].map((article) => ({ title: article.title, type: article.category, href: `/insights/${article.slug}`, description: article.excerpt }));
