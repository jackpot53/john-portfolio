import { db } from "./index";
import type { CareerItem, EducationItem } from "@/types/content";

function toYearMonth(dateStr: string): string {
  // "2022-03-01" → "2022.03"
  return dateStr.slice(0, 7).replace("-", ".");
}

export async function getCareers(): Promise<CareerItem[]> {
  const rows = await db.query.careers.findMany({
    with: { stacks: { orderBy: (s, { asc }) => [asc(s.sortOrder)] } },
    orderBy: (c, { asc }) => [asc(c.sortOrder)],
  });

  return rows.map((c) => ({
    company: c.company,
    role: c.role,
    period: `${toYearMonth(c.startedAt)} — ${c.endedAt ? toYearMonth(c.endedAt) : "현재"}`,
    description: c.description,
    stack: c.stacks.map((s) => s.name),
  }));
}

export async function getEducations(): Promise<EducationItem[]> {
  const rows = await db.query.educations.findMany({
    orderBy: (e, { asc }) => [asc(e.sortOrder)],
  });

  return rows.map((e) => ({
    school: e.school,
    degree: e.degree,
    period: `${toYearMonth(e.startedAt)} — ${e.endedAt ? toYearMonth(e.endedAt) : "재학 중"}`,
    note: e.note ?? undefined,
  }));
}
