import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "node:fs";

export const config = { api: { bodyParser: false } };

const serviceRecipients = {
  "AI-Augmented Development": "consult@hilltopconsultancy.com",
  "AI Consulting and Implementation": "consult@hilltopconsultancy.com",
  "AI Agent Development": "consult@hilltopconsultancy.com",
  "Software Product Engineering": "contact@hilltopconsultancy.com",
  "Cloud Solutions and Consulting": "support@hilltopconsultancy.com",
  "DevOps and Kubernetes": "support@hilltopconsultancy.com",
  "Data and Analytics": "info@hilltopconsultancy.com",
  "Security and Quality": "support@hilltopconsultancy.com",
  "Mobile App Development": "contact@hilltopconsultancy.com",
  Other: "contact@hilltopconsultancy.com",
};

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
    await transporter.sendMail({ from: `Hill-Top Consultancy <${process.env.MIGADU_SMTP_USER}>`, to: serviceRecipients[service] || "contact@hilltopconsultancy.com", replyTo: email, subject, text: detailText, attachments: files });
    const replyTopic = serviceReplies[service] || service.toLowerCase();
    const siteUrl = process.env.SITE_URL || "https://hilltopconsultancy.com";
    const escapeHtml = (input) => String(input).replace(/[&<>\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character]));
    const customerReplyText = `Hello ${name},\n\nThank you for contacting Hill-Top Consultancy about ${replyTopic}. We have received your message and our team will review it shortly. A consultant will follow up within one business day.\n\nYour request summary:\nCompany: ${company}\nLocation: ${location}\nService: ${service}\n\nBest regards,\nHill-Top Consultancy\nhilltopconsultancy.com\ncontact@hilltopconsultancy.com\n+45 23 11 79 08\nCVR 44814544`;
    const customerReplyHtml = `<!doctype html><html><body style="margin:0;background:#f6f4f0;font-family:Arial,Helvetica,sans-serif;color:#13253b"><div style="max-width:640px;margin:0 auto;background:#fff"><div style="background:linear-gradient(110deg,#ff6a00,#d92810);padding:28px 34px"><a href="${siteUrl}" style="text-decoration:none"><img src="${siteUrl}/assets/hilltop-logo-social.png" alt="Hill-Top Consultancy" width="250" style="display:block;width:250px;max-width:100%;height:auto"></a></div><div style="padding:38px 34px 30px"><p style="margin:0 0 12px;color:#e75c18;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">Inquiry received</p><h1 style="margin:0 0 20px;font-size:30px;line-height:1.15;color:#13253b">Thank you, ${escapeHtml(name)}.</h1><p style="font-size:16px;line-height:1.6">Thank you for contacting Hill-Top Consultancy about <strong>${escapeHtml(replyTopic)}</strong>. We have received your message and our team will review it shortly. A consultant will follow up within one business day.</p><div style="margin:26px 0;padding:20px;background:#f7f8fa;border-left:4px solid #f15b24"><p style="margin:0 0 8px;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#68788b">Your request summary</p><p style="margin:5px 0;font-size:14px"><strong>Company:</strong> ${escapeHtml(company)}</p><p style="margin:5px 0;font-size:14px"><strong>Location:</strong> ${escapeHtml(location)}</p><p style="margin:5px 0;font-size:14px"><strong>Service:</strong> ${escapeHtml(service)}</p></div><p style="font-size:16px;line-height:1.6">We look forward to learning more about your goals.</p><p style="margin:28px 0 0;font-size:16px;line-height:1.6">Best regards,<br><strong>Hill-Top Consultancy</strong></p></div><div style="padding:24px 34px;background:#071a2f;color:#fff;font-size:12px;line-height:1.7"><strong style="font-size:14px">Hill-Top Consultancy</strong><br><a href="${siteUrl}" style="color:#fff">${siteUrl.replace(/^https?:\/\//, "")}</a><br><a href="mailto:contact@hilltopconsultancy.com" style="color:#fff">contact@hilltopconsultancy.com</a> · <a href="tel:+4523117908" style="color:#fff">+45 23 11 79 08</a><br>Sylen 3, 2. sal, 2630 Taastrup, Denmark<br>CVR 44814544</div></div></body></html>`;
    await transporter.sendMail({ from: `Hill-Top Consultancy <${process.env.MIGADU_SMTP_USER}>`, to: email, replyTo: process.env.MIGADU_SMTP_USER, subject: `Thank you, ${name} — we received your Hill-Top inquiry`, text: customerReplyText, html: customerReplyHtml });
    files.forEach(({ path }) => { try { fs.unlinkSync(path); } catch {} });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("contact submission failed", error);
    return res.status(500).json({ error: "We could not send your inquiry. Please try again or email contact@hilltopconsultancy.com." });
  }
}
