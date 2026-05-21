import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Profile } from "@/types/content";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section id="hero" className="py-24 md:py-40">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sm font-medium text-primary mb-4 tracking-widest uppercase">
          안녕하세요
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
          {profile.name}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
          {profile.tagline}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`mailto:${profile.email}`}
            className={cn(buttonVariants({ size: "lg" }), "gap-2")}
          >
            <Mail className="h-4 w-4" />
            이메일 보내기
          </Link>
          {profile.socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {social.label}
            </Link>
          ))}
          <Link
            href="#projects"
            className={buttonVariants({ variant: "ghost", size: "lg" })}
          >
            프로젝트 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
