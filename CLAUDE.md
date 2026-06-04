# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

풀스택 개발자 John의 개인 포트폴리오 웹사이트. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui 기반의 싱글 페이지 포트폴리오로, 문의 폼 API (Resend)를 포함한다.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui (New York style)
- **Font**: Pretendard Variable
- **Form**: react-hook-form + zod
- **Email**: Resend
- **Theme**: next-themes (라이트/다크)
- **Deployment**: Vercel

## Commands

```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 (http://localhost:3000)
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 검사
```

## Environment Variables

`.env.local` 파일을 `.env.local.example`을 참고해 생성하세요.

```
RESEND_API_KEY=re_xxxxxxxxxxxx      # Resend API 키
CONTACT_TO_EMAIL=your@email.com    # 문의 수신 이메일
```

## Content Editing

콘텐츠는 `src/content/` 디렉토리의 TypeScript 파일에 있습니다. 실제 정보로 교체하세요.

- `src/content/profile.ts` — 이름, 한줄 소개, 소셜 링크
- `src/content/about.ts` — About 섹션 본문
- `src/content/projects.ts` — 프로젝트 목록
- `src/content/skills.ts` — 기술 스택 목록

## Database (Supabase + Drizzle ORM)

DB 관련 작업 시 **반드시** `docs/db/` 폴더를 먼저 확인하세요.

- `docs/db/erd.md` — Mermaid ERD 및 전체 테이블 정의 (컬럼·타입·제약 포함)

### 핵심 규칙

- 테이블 스키마 변경 시 `docs/db/erd.md`도 함께 업데이트할 것
- Drizzle 스키마는 `src/lib/db/schema.ts`, DB 클라이언트는 `src/lib/db/index.ts`
- 새 테이블에는 **반드시 RLS를 활성화**하고 최소 권한 정책을 명시할 것
  - 포트폴리오 공개 데이터 → `FOR SELECT USING (true)`
  - 쓰기는 서비스 롤 전용 (anon 키로 INSERT/UPDATE/DELETE 불가)
- 마이그레이션은 Supabase MCP `apply_migration` 또는 `drizzle-kit push` 사용

### 현재 테이블 (public 스키마)

| 테이블 | 설명 | RLS |
|--------|------|-----|
| `careers` | 경력 항목 (`ended_at` NULL = 현재 재직) | ✅ |
| `career_stacks` | 경력별 기술 스택 (careers FK) | ✅ |
| `educations` | 학력 항목 (`ended_at` NULL = 재학 중) | ✅ |
| `contacts` | 문의 폼 제출 내역 | — |

## Structure

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (폰트, 테마, 헤더/푸터)
│   ├── page.tsx                # 메인 페이지 (섹션 조립)
│   ├── globals.css             # 글로벌 스타일 + 디자인 토큰
│   └── api/contact/route.ts    # 문의 폼 POST API
├── components/
│   ├── sections/               # 5개 섹션 컴포넌트
│   ├── ui/                     # shadcn/ui 프리미티브
│   ├── providers.tsx           # ThemeProvider
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   └── theme-toggle.tsx
├── content/                    # 콘텐츠 데이터 (편집 대상)
├── lib/
│   ├── utils.ts                # cn() 헬퍼
│   └── contact-schema.ts       # zod 스키마
└── types/content.ts            # 도메인 타입
```
