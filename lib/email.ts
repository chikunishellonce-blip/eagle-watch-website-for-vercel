import { Resend } from "resend";

import type { ContactFormValues } from "@/lib/validations/contact";

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendContactEmail(data: ContactFormValues) {
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not set in the Vercel environment variables.");
  }

  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!from) {
    throw new Error("CONTACT_FROM_EMAIL is not set in the Vercel environment variables.");
  }
  if (!to) {
    throw new Error("CONTACT_TO_EMAIL is not set in the Vercel environment variables.");
  }

  try {
    return await resend?.emails.send({
      from,
      to,
      reply_to: data.email,
      subject: `Website enquiry — ${data.name}${data.siteType ? ` (${data.siteType})` : ""}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        data.siteType ? `Site / company: ${data.siteType}` : null,
        "",
        "Message:",
        data.message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; font-size: 14px; color:#15181C;">
          <h2 style="font-family: 'Space Grotesk', Arial, sans-serif; margin-bottom: 4px;">New website enquiry</h2>
          <p style="color:#585F67; margin-top:0;">Eagle Watch Security Services</p>
          <table cellpadding="6" style="border-collapse: collapse;">
            <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
            <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
            ${data.siteType ? `<tr><td><strong>Site / company</strong></td><td>${escapeHtml(data.siteType)}</td></tr>` : ""}
          </table>
          <p style="margin-top:16px;"><strong>Message</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
      `,
    });
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown Resend error";
    throw new Error(`Resend send failed: ${details}`);
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
