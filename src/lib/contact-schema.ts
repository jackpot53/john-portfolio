import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요.").max(100),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  message: z
    .string()
    .min(10, "메시지를 10자 이상 입력해주세요.")
    .max(2000, "메시지는 2000자 이내로 입력해주세요."),
  _honeypot: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
