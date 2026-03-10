import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Resend client is lazily initialised inside the handler to avoid
 * crashing the build when RESEND_API_KEY is not yet set (e.g. during
 * `next build` in CI). The key is only required at runtime.
 */
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

/**
 * Escape HTML special characters to prevent XSS in email templates.
 * User-supplied values (name, email, phone, message) MUST be passed
 * through this before interpolation into any HTML string.
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = getResend();

    // Sanitise all user input before embedding in HTML
    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safePhone = phone ? escapeHtml(String(phone)) : "";
    const safeMessage = escapeHtml(String(message));

    await resend.emails.send({
      from: "Formularz kontaktowy <kontakt@loty-dronem.pl>",
      to: "info@loty-dronem.pl",
      replyTo: email,
      subject: `Nowe zapytanie od ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Nowe zapytanie ze strony loty-dronem.pl</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #475569; width: 120px;">Imię i nazwisko:</td>
              <td style="padding: 8px; color: #1e293b;">${safeName}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 8px; font-weight: bold; color: #475569;">E-mail:</td>
              <td style="padding: 8px; color: #1e293b;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            ${safePhone ? `
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #475569;">Telefon:</td>
              <td style="padding: 8px; color: #1e293b;"><a href="tel:${safePhone}">${safePhone}</a></td>
            </tr>` : ""}
            <tr style="background: #f8fafc;">
              <td style="padding: 8px; font-weight: bold; color: #475569; vertical-align: top;">Wiadomość:</td>
              <td style="padding: 8px; color: #1e293b; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="color: #94a3b8; font-size: 12px;">
            Wysłano przez formularz na <a href="https://loty-dronem.pl">loty-dronem.pl</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
