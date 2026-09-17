export type ServiceItem = { name: string; slug: string };
export type ServiceGroup = { name: string; slug: string; items: ServiceItem[] };

export const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const group = (name: string, items: string[]): ServiceGroup => ({
  name,
  slug: slugify(name),
  items: items.map((item) => ({ name: item, slug: slugify(item) })),
});

export const serviceGroups: ServiceGroup[] = [
  group("AI-Augmented Development Services", ["Technology Consulting", "Digital Transformation", "Custom Solution Development", "Team Extension"]),
  group("Solutions", ["Software Product Engineering", "Application Modernization", "QA automation", "Mobile App Development", "UI/UX"]),
  group("Cloud Solutions and Consulting", ["Cloud Migration", "DevOps", "Cloud Infrastructure Management", "Cloud Modernization", "Cloud Application Development"]),
  group("Intelligent Platforms and Automation", ["RPA", "ERP Solutions", "SAP"]),
  group("Data and Analytics", ["Data Lake Consulting", "Data Warehouse Consulting Services", "Data Governance", "Data Migration", "Data Engineering Services", "Power BI Consulting"]),
  group("Embedded & IoT", ["Embedded & IoT"]),
  group("AI Consulting and Implementation", ["AI Agent Development Services", "Computer Vision", "Generative AI", "AI & Machine Learning", "RAG Development"]),
  group("Security and Quality", ["Business Continuity", "DevSecOps", "Application Security Testing", "Penetration Testing"]),
  group("Game Development", ["Game Development", "Immersive Tech"]),
];

export const allServices = serviceGroups.flatMap((serviceGroup) => serviceGroup.items.map((item) => ({ ...item, group: serviceGroup.name })));

export const findService = (slug: string) => allServices.find((item) => item.slug === slug);
