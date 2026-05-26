import type { CareerItem, EducationItem } from "@/types/content";

export function CareerSection({
  careers,
  educations,
}: {
  careers: CareerItem[];
  educations: EducationItem[];
}) {
  return (
    <section id="career" className="py-24 md:py-32 border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-10">
          Career &amp; Education
        </h2>

        <div className="grid lg:grid-cols-[1fr_300px] gap-16">
          {/* Career */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-8">경력</h3>
            <ol className="relative border-l border-border/60 space-y-10">
              {careers.map((item) => (
                <li key={item.company} className="pl-6">
                  <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full border-2 border-primary bg-background" />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1">
                    <span className="text-base font-semibold text-foreground">
                      {item.company}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.role}</span>
                  </div>
                  <p className="text-xs text-primary/70 mb-2 font-medium">{item.period}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {item.description}
                  </p>
                  {item.stack && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-8">학력</h3>
            <ol className="relative border-l border-border/60 space-y-8">
              {educations.map((item) => (
                <li key={item.school} className="pl-6">
                  <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full border-2 border-primary bg-background" />
                  <p className="text-base font-semibold text-foreground mb-0.5">
                    {item.school}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">{item.degree}</p>
                  <p className="text-xs text-primary/70 font-medium mb-2">{item.period}</p>
                  {item.note && (
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.note}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
