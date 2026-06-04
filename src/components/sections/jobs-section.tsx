import Link from "next/link";
import { ExternalLink, MapPin, Briefcase } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { JobItem } from "@/types/job";

function formatPostedDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  return `${Math.floor(diffDays / 30)}개월 전`;
}

function formatSalary(job: JobItem): string | null {
  if (!job.job_min_salary && !job.job_max_salary) return null;
  const currency = job.job_salary_currency ?? "";
  const period = job.job_salary_period ? ` / ${job.job_salary_period}` : "";
  if (job.job_min_salary && job.job_max_salary) {
    return `${currency} ${job.job_min_salary.toLocaleString()} – ${job.job_max_salary.toLocaleString()}${period}`;
  }
  const amount = job.job_min_salary ?? job.job_max_salary;
  return `${currency} ${amount?.toLocaleString()}${period}`;
}

function JobCard({ job }: { job: JobItem }) {
  const salary = formatSalary(job);
  const location = [job.job_city, job.job_country].filter(Boolean).join(", ");

  return (
    <div className="group p-6 rounded-2xl border border-border/60 hover:border-primary/40 bg-card transition-colors flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-foreground leading-snug line-clamp-2">
            {job.job_title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            {job.employer_name}
          </p>
        </div>
        {job.employer_logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={job.employer_logo}
            alt={job.employer_name}
            className="size-10 rounded-lg object-contain border border-border/40 bg-background flex-shrink-0"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {location && (
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            {job.job_is_remote ? `${location} (원격 가능)` : location}
          </span>
        )}
        {job.job_employment_type && (
          <span className="flex items-center gap-1">
            <Briefcase className="size-3" />
            {job.job_employment_type}
          </span>
        )}
        {salary && <span>{salary}</span>}
        {job.job_posted_at_datetime_utc && (
          <span className="ml-auto">{formatPostedDate(job.job_posted_at_datetime_utc)}</span>
        )}
      </div>

      {job.job_required_skills && job.job_required_skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.job_required_skills.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <Link
        href={job.job_apply_link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "h-8 px-3 text-xs gap-1.5 self-start"
        )}
      >
        <ExternalLink className="size-3" />
        지원하기
      </Link>
    </div>
  );
}

export function JobsSection({ jobs }: { jobs: JobItem[] }) {
  if (jobs.length === 0) return null;

  return (
    <section id="jobs" className="py-24 md:py-32 border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-primary">
            Open Positions
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Fullstack developer · Korea
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {jobs.map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
