export type Profile = {
  name: string;
  tagline: string;
  email: string;
  socials: { label: string; href: string }[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
  thumbnail?: string;
  period?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};
