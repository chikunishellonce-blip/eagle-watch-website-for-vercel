import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/email";

// Very small in-memory rate limit — fine for a single Vercel instance / low traffic
// contact form. For higher traffic, swap for Upstash Redis or Vercel KV.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Honeypot tripped — silently pretend success so bots don't learn anything.
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to send email:", err);
    return NextResponse.json(
      { ok: false, message: "We couldn't send your message right now. Please call or WhatsApp us instead." },
      { status: 502 }
    );
  }
}
