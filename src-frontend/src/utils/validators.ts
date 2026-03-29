// Path: src-frontend/src/utils/validators.ts

import { z } from 'zod'

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function isValidPhone(phone: string): boolean {
  return /^[+\d\s\-().]{7,20}$/.test(phone.trim())
}

// ─── Zod schemas ─────────────────────────────────────────────────────────────

export const emailEntrySchema = z.object({
  value: z.string().email('Email không hợp lệ'),
  type: z.array(z.string()).default(['INTERNET']),
  label: z.string().nullable().optional(),
})

export const phoneEntrySchema = z.object({
  value: z.string().min(1, 'Số điện thoại không được trống'),
  type: z.array(z.string()).default(['VOICE']),
})

export const contactFormSchema = z.object({
  contact: z.object({
    displayName: z.string().min(1, 'Tên không được trống'),
    organization: z.string().optional(),
    emails: z.array(emailEntrySchema).optional(),
    phones: z.array(phoneEntrySchema).optional(),
    categories: z.array(z.string()).default([]),
    note: z.string().optional(),
    birthday: z.string().optional(),
  }),
  userDefined: z.record(z.string()).default({}),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>