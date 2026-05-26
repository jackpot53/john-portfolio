import type { CareerItem, EducationItem } from "@/types/content";

export const careers: CareerItem[] = [
  {
    company: "카카오",
    role: "Software Engineer",
    period: "2022.03 — 현재",
    description:
      "카카오톡 채널 메시지 플랫폼 백엔드 개발. 일 수억 건 메시지 처리 파이프라인을 Go로 재설계해 P99 레이턴시를 40% 개선. 쿠버네티스 기반 서비스 운영 및 사내 공통 모니터링 라이브러리 개발 참여.",
    stack: ["Go", "Kotlin", "Kubernetes", "Kafka", "Redis", "MySQL"],
  },
  {
    company: "라인플러스",
    role: "Backend Developer",
    period: "2020.01 — 2022.02",
    description:
      "LINE 스티커샵 서버 개발 및 운영. Spring Boot 기반 API 서버를 담당하며 결제 플로우 안정성 개선, 어뷰징 탐지 모듈 구현. 신규 입사자 온보딩 멘토 역할 수행.",
    stack: ["Java", "Spring Boot", "MySQL", "Redis", "GCP"],
  },
  {
    company: "스타트업 N사",
    role: "Full-Stack Developer (인턴)",
    period: "2019.07 — 2019.12",
    description:
      "React + Node.js 기반 B2B SaaS 대시보드 개발. 사용자 행동 분석 기능 설계부터 배포까지 단독 담당. 6개월 인턴 종료 후 정규직 전환 제안 수령.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
];

export const educations: EducationItem[] = [
  {
    school: "한국대학교",
    degree: "컴퓨터공학과 학사",
    period: "2015.03 — 2020.02",
    note: "졸업논문: 분산 환경에서의 일관성 보장을 위한 Saga 패턴 적용 연구",
  },
];
