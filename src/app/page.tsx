import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { CareerSection } from "@/components/sections/career-section";
import { JobsSection } from "@/components/sections/jobs-section";
import { ContactSection } from "@/components/sections/contact-section";
import { profile } from "@/content/profile";
import { about } from "@/content/about";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { getCareers, getEducations } from "@/lib/db/queries";
import { getJobs } from "@/lib/jobs";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [careers, educations, admin, jobs] = await Promise.all([
    getCareers(),
    getEducations(),
    isAdmin(),
    getJobs(),
  ]);

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection content={about} />
      <ProjectsSection projects={projects} />
      <SkillsSection groups={skills} />
      <CareerSection careers={careers} educations={educations} isAdmin={admin} />
      <JobsSection jobs={jobs} />
      <ContactSection />
    </>
  );
}
