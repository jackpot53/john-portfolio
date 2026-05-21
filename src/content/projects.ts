import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "개인 포트폴리오 웹사이트",
    summary:
      "Next.js 16과 shadcn/ui로 만든 이 포트폴리오 사이트입니다. 미니멀 타이포그래피 디자인, 다크모드, 문의 폼 API를 포함합니다.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vercel"],
    links: [
      { label: "GitHub", href: "https://github.com/johnk/john-portfolio" },
    ],
    period: "2025.05",
  },
  {
    slug: "placeholder-project-2",
    title: "프로젝트 제목",
    summary:
      "프로젝트 설명을 여기에 입력하세요. 무엇을 만들었고, 어떤 문제를 해결했는지 간단하게 적어주세요.",
    stack: ["Go", "Kubernetes", "PostgreSQL"],
    links: [{ label: "GitHub", href: "#" }],
    period: "2024.xx",
  },
  {
    slug: "placeholder-project-3",
    title: "프로젝트 제목",
    summary:
      "프로젝트 설명을 여기에 입력하세요. 무엇을 만들었고, 어떤 문제를 해결했는지 간단하게 적어주세요.",
    stack: ["React", "Node.js", "MySQL"],
    links: [{ label: "GitHub", href: "#" }],
    period: "2024.xx",
  },
];
