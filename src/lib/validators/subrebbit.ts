import { z } from "zod"

export const SubrebbitValidator = z.object({
  name: z.string().min(3).max(21).trim(),
})
export const SubrebbitSubscriptionValidator = z.object({
  subrebbitId: z.string(),
})

export type CreateSubrebbitPayload = z.infer<typeof SubrebbitValidator>
export type SubscribeToSubrebbitPayload = z.infer<
  typeof SubrebbitSubscriptionValidator
>
