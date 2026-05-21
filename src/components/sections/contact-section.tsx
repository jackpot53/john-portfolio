"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      toast.success("메시지가 전송됐습니다. 빠르게 답장 드리겠습니다!");
      reset();
    } catch {
      toast.error("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
          Contact
        </h2>
        <p className="text-2xl md:text-3xl font-semibold text-foreground mb-10 max-w-xl leading-snug">
          협업이나 궁금한 점이 있으시면 편하게 연락주세요.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg space-y-5"
          noValidate
        >
          {/* honeypot */}
          <input type="text" tabIndex={-1} className="hidden" {...register("_honeypot")} />

          <div className="space-y-1.5">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              placeholder="홍길동"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">메시지</Label>
            <Textarea
              id="message"
              placeholder="안녕하세요! 협업 관련해서 여쭤보고 싶습니다..."
              rows={5}
              {...register("message")}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "전송 중..." : "메시지 보내기"}
          </Button>
        </form>
      </div>
    </section>
  );
}
