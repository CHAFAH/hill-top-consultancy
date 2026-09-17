import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "node:fs";

export const config = { api: { bodyParser: false } };
const value = (fields, key) => { const item = fields[key]; return Array.isArray(item) ? item[0] : item || ""; };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.MIGADU_SMTP_USER || !process.env.MIGADU_SMTP_PASSWORD) return res.status(503).json({ error: "Email delivery is not configured yet." });
  const form = formidable({ maxFiles: 3, maxFileSize: 8 * 1024 * 1024, multiples: true, keepExtensions: true });
  let files = [];
  try {
    const [fields, parsedFiles] = await form.parse(req);
    const firstName = value(fields, "firstName");
    const lastName = value(fields, "lastName");
    const email = value(fields, "email");
    const phone = value(fields, "phone");
    const address = value(fields, "address");
    const jobTitle = value(fields, "jobTitle");
    const motivation = value(fields, "motivation");
    const profileUrl = value(fields, "profileUrl");
    if (!firstName || !lastName || !email || !phone || !address || !jobTitle || !motivation || !value(fields, "privacyConsent")) return res.status(400).json({ error: "Please complete all required fields and accept the Privacy Policy." });
    files = Object.values(parsedFiles).flat().filter(Boolean).map((file) => ({ filename: file.originalFilename || "application-file", path: file.filepath }));
    if (!files.length) return res.status(400).json({ error: "Please attach your CV." });
    const transporter = nodemailer.createTransport({ host: "smtp.migadu.com", port: 465, secure: true, auth: { user: process.env.MIGADU_SMTP_USER, pass: process.env.MIGADU_SMTP_PASSWORD } });
    const fullName = `${firstName} ${lastName}`;
    const detailText = `New job application\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nRole: ${jobTitle}\nProfile: ${profileUrl || "Not provided"}\n\nMotivation:\n${motivation}`;
    await transporter.sendMail({ from: `Hill-Top Careers <${process.env.MIGADU_SMTP_USER}>`, to: "contact@hilltopconsultancy.com", replyTo: email, subject: `Job application: ${jobTitle} — ${fullName}`, text: detailText, attachments: files });
    const siteUrl = process.env.SITE_URL || "https://hilltopconsultancy.com";
    await transporter.sendMail({ from: `Hill-Top Consultancy <${process.env.MIGADU_SMTP_USER}>`, to: email, replyTo: process.env.MIGADU_SMTP_USER, subject: `Application received — ${jobTitle}`, text: `Hello ${firstName},\n\nThank you for applying for ${jobTitle} at Hill-Top Consultancy. We have received your application and will review it carefully.\n\nBest regards,\nHill-Top Consultancy\n${siteUrl}\ncontact@hilltopconsultancy.com`, html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#13253b"><div style="background:#071a2f;padding:28px;color:#fff"><strong>Hill-Top Consultancy</strong></div><div style="padding:32px"><p style="color:#e5531a;text-transform:uppercase;font-weight:bold;letter-spacing:1px">Application received</p><h1>Thank you, ${firstName}.</h1><p>We have received your application for <strong>${jobTitle}</strong>. Our team will review it and contact you if your experience matches the next stage.</p><p>Best regards,<br><strong>Hill-Top Consultancy</strong></p></div></div>` });
    files.forEach(({ path }) => { try { fs.unlinkSync(path); } catch {} });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("application submission failed", error);
    files.forEach(({ path }) => { try { fs.unlinkSync(path); } catch {} });
    return res.status(500).json({ error: "We could not send your application. Please try again or email contact@hilltopconsultancy.com." });
  }
}
