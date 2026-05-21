import type { SkillGroup } from "@/types/content";

export function SkillsSection({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="py-24 md:py-32 border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-10">
          Skills
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {groups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
