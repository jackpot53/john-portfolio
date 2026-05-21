import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";
import { profile } from "@/content/profile";
import { about } from "@/content/about";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";

export default function Home() {
  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection content={about} />
      <ProjectsSection projects={projects} />
      <SkillsSection groups={skills} />
      <ContactSection />
    </>
  );
}
