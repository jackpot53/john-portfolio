import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { CareerSection } from "@/components/sections/career-section";
import { ContactSection } from "@/components/sections/contact-section";
import { profile } from "@/content/profile";
import { about } from "@/content/about";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { getCareers, getEducations } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [careers, educations] = await Promise.all([getCareers(), getEducations()]);

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection content={about} />
      <ProjectsSection projects={projects} />
      <SkillsSection groups={skills} />
      <CareerSection careers={careers} educations={educations} />
      <ContactSection />
    </>
  );
}
