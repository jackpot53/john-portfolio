import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const rateLimit = new Map<string, number>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const last = rateLimit.get(ip) ?? 0;
  const now = Date.now();

  if (now - last < 60_000) {
    return NextResponse.json(
      { error: "잠시 후 다시 시도해주세요." },
      { status: 429 }
    );
  }
  rateLimit.set(ip, now);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "입력 값을 확인해주세요." }, { status: 422 });
  }

  const { name, email, message, _honeypot } = parsed.data;

  if (_honeypot) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.error("RESEND_API_KEY 또는 CONTACT_TO_EMAIL 환경변수가 설정되지 않았습니다.");
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `[포트폴리오 문의] ${name}`,
    text: `이름: ${name}\n이메일: ${email}\n\n메시지:\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "메일 전송에 실패했습니다." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
