# JSearch Job API Spec

RapidAPI의 JSearch API를 사용해 구인 정보를 검색한다.

- **Provider**: RapidAPI / JSearch
- **Base URL**: `https://jsearch.p.rapidapi.com`
- **Auth**: `x-rapidapi-key` 헤더 (API 키는 `.env.local`의 `RAPIDAPI_KEY` 사용)

---

## Endpoints

### GET /search-v2 — 구인 정보 검색

```
GET https://jsearch.p.rapidapi.com/search-v2
```

#### Request Headers

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |
| `x-rapidapi-host` | `jsearch.p.rapidapi.com` |
| `x-rapidapi-key` | `{RAPIDAPI_KEY}` |

#### Query Parameters

| 파라미터 | 타입 | 필수 | 설명 | 예시 |
|---------|------|------|------|------|
| `query` | string | ✅ | 검색어 (직무 + 지역) | `developer jobs in seoul` |
| `num_pages` | number | | 결과 페이지 수 (기본 1) | `1` |
| `country` | string | | ISO 국가 코드 | `kr`, `us` |
| `date_posted` | string | | 게시 일자 필터 | `all`, `today`, `3days`, `week`, `month` |
| `language` | string | | 결과 언어 | `ko`, `en` |

#### Example Request

```bash
curl --request GET \
  --url 'https://jsearch.p.rapidapi.com/search-v2?query=backend%20developer%20jobs%20in%20seoul&num_pages=1&country=kr&date_posted=month' \
  --header 'Content-Type: application/json' \
  --header 'x-rapidapi-host: jsearch.p.rapidapi.com' \
  --header 'x-rapidapi-key: {RAPIDAPI_KEY}'
```

---

## Response

### 200 OK

```json
{
  "status": "OK",
  "request_id": "string",
  "parameters": {
    "query": "string",
    "date_posted": "string",
    "country": "string",
    "language": "string"
  },
  "data": {
    "jobs": [
      {
        "job_id": "string",
        "employer_name": "string",
        "employer_logo": "string | null",
        "employer_website": "string | null",
        "employer_company_type": "string | null",
        "job_publisher": "string",
        "job_employment_type": "FULLTIME | PARTTIME | CONTRACTOR | INTERN",
        "job_title": "string",
        "job_apply_link": "string",
        "job_description": "string",
        "job_is_remote": "boolean",
        "job_posted_at_datetime_utc": "string (ISO 8601)",
        "job_city": "string | null",
        "job_state": "string | null",
        "job_country": "string",
        "job_latitude": "number | null",
        "job_longitude": "number | null",
        "job_benefits": "string[] | null",
        "job_google_link": "string",
        "job_salary_currency": "string | null",
        "job_salary_period": "string | null",
        "job_min_salary": "number | null",
        "job_max_salary": "number | null",
        "job_required_experience": {
          "no_experience_required": "boolean",
          "required_experience_in_months": "number | null",
          "experience_mentioned": "boolean",
          "experience_preferred": "boolean"
        },
        "job_required_skills": "string[] | null",
        "job_highlights": {
          "Qualifications": "string[]",
          "Responsibilities": "string[]",
          "Benefits": "string[]"
        }
      }
    ],
    "cursor": "string | null"
  }
}
```

### 에러 응답

| Status | 원인 |
|--------|------|
| `400` | 잘못된 파라미터 |
| `401` | API 키 누락 또는 유효하지 않음 |
| `429` | 요금제 요청 한도 초과 |
| `500` | RapidAPI 서버 오류 |

---

## Next.js 구현 위치

| 역할 | 경로 |
|------|------|
| API Route (서버 프록시) | `src/app/api/jobs/route.ts` |
| 타입 정의 | `src/types/job.ts` |
| Fetch 유틸 | `src/lib/jobs.ts` |
| UI 섹션 컴포넌트 | `src/components/sections/jobs-section.tsx` |

### 설계 원칙

- **API 키는 서버 사이드 전용**: 클라이언트에 `RAPIDAPI_KEY`가 노출되지 않도록 Next.js API Route를 프록시로 사용한다.
- **환경 변수**: `RAPIDAPI_KEY`를 `.env.local`에 추가한다.
- **캐싱**: 동일 쿼리 반복 요청을 줄이기 위해 Next.js `fetch` 캐시 또는 `unstable_cache`를 활용한다.

---

## 환경 변수

`.env.local`에 추가:

```
RAPIDAPI_KEY=your_key_here
```
