type AboutContent = {
  paragraphs: string[];
};

export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-10">
          About
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            {content.paragraphs.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
          <div className="space-y-6">
            <div className="aspect-square max-w-xs rounded-2xl bg-muted flex items-center justify-center text-muted-foreground text-sm">
              프로필 이미지
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
