import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Project } from "@/types/content";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group p-6 rounded-2xl border border-border/60 hover:border-primary/40 bg-card transition-colors flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-lg text-foreground leading-snug">
          {project.title}
        </h3>
        {project.period && (
          <p className="text-xs text-muted-foreground mt-1">{project.period}</p>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {project.summary}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-2 pt-1">
        {project.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-8 px-3 text-xs gap-1.5")}
          >
            <ExternalLink className="h-3 w-3" />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 md:py-32 border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-10">
          Projects
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
