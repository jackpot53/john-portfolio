import type { JobItem, JobSearchResponse } from "@/types/job";

const QUERY = "fullstack developer jobs in korea";
const JOBS_LIMIT = 6;

export async function getJobs(): Promise<JobItem[]> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    console.error("RAPIDAPI_KEY 환경변수가 설정되지 않았습니다.");
    return [];
  }

  const url = new URL("https://jsearch.p.rapidapi.com/search-v2");
  url.searchParams.set("query", QUERY);
  url.searchParams.set("num_pages", "1");
  url.searchParams.set("country", "kr");
  url.searchParams.set("date_posted", "month");

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
    next: { revalidate: 3600 }, // 1시간 캐시
  });

  if (!res.ok) {
    console.error(`JSearch API 오류: ${res.status}`);
    return [];
  }

  const json: JobSearchResponse = await res.json();

  if (json.status !== "OK") {
    console.error("JSearch API 응답 상태 이상:", json.status);
    return [];
  }

  return (json.data?.jobs ?? []).slice(0, JOBS_LIMIT);
}
