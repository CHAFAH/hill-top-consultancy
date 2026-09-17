import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "node:fs";

export const config = { api: { bodyParser: false } };

const recipients = [
  "admin@hilltopconsultancy.com",
  "info@hilltopconsultancy.com",
  "contact@hilltopconsultancy.com",
  "support@hilltopconsultancy.com",
  "consult@hilltopconsultancy.com",
];

const serviceReplies = {
  "AI-Augmented Development": "AI-augmented delivery and practical engineering acceleration",
  "AI Consulting and Implementation": "AI consulting and implementation",
  "AI Agent Development": "AI agent development",
  "Software Product Engineering": "software product engineering",
  "Cloud Solutions and Consulting": "cloud solutions and consulting",
  "DevOps and Kubernetes": "DevOps and Kubernetes",
  "Data and Analytics": "data and analytics",
  "Security and Quality": "security and quality",
  "Mobile App Development": "mobile app development",
};

function value(fields, key) {
  const item = fields[key];
  return Array.isArray(item) ? item[0] : item || "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.MIGADU_SMTP_USER || !process.env.MIGADU_SMTP_PASSWORD) {
    return res.status(503).json({ error: "Email delivery is not configured yet." });
  }

  const form = formidable({ maxFiles: 3, maxFileSize: 5 * 1024 * 1024, multiples: true, keepExtensions: true });
  try {
    const [fields, parsedFiles] = await form.parse(req);
    const name = value(fields, "name");
    const email = value(fields, "email");
    const company = value(fields, "company");
    const location = value(fields, "location");
    const phone = value(fields, "phone");
    const service = value(fields, "service");
    const message = value(fields, "message");
    const source = value(fields, "source");
    if (!name || !email || !company || !location || !service || !message) return res.status(400).json({ error: "Please complete all required fields." });

    const files = Object.values(parsedFiles).flat().filter(Boolean).map((file) => ({ filename: file.originalFilename || "attachment", path: file.filepath }));
    const transporter = nodemailer.createTransport({ host: "smtp.migadu.com", port: 465, secure: true, auth: { user: process.env.MIGADU_SMTP_USER, pass: process.env.MIGADU_SMTP_PASSWORD } });
    const subject = `New Hill-Top inquiry: ${service} — ${company}`;
    const detailText = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nLocation: ${location}\nPhone: ${phone || "Not provided"}\nRequested service: ${service}\nHow they found us: ${source || "Not provided"}\n\nMessage:\n${message}`;
    await transporter.sendMail({ from: `Hill-Top Consultancy <${process.env.MIGADU_SMTP_USER}>`, to: recipients.join(","), replyTo: email, subject, text: detailText, attachments: files });
    const replyTopic = serviceReplies[service] || service.toLowerCase();
    await transporter.sendMail({ from: `Hill-Top Consultancy <${process.env.MIGADU_SMTP_USER}>`, to: email, replyTo: process.env.MIGADU_SMTP_USER, subject: `Thank you, ${name} — we received your Hill-Top inquiry`, text: `Hello ${name},\n\nThank you for contacting Hill-Top Consultancy about ${replyTopic}. We have received your message and our team will review it shortly. A consultant will follow up within one business day.\n\nYour request summary:\nCompany: ${company}\nLocation: ${location}\nService: ${service}\n\nBest regards,\nHill-Top Consultancy\nhilltopconsultancy.com\n${process.env.MIGADU_SMTP_USER}`, });
    files.forEach(({ path }) => { try { fs.unlinkSync(path); } catch {} });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("contact submission failed", error);
    return res.status(500).json({ error: "We could not send your inquiry. Please try again or email contact@hilltopconsultancy.com." });
  }
}
