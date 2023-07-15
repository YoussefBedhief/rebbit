import { z } from "zod"

export const UserNameValidator = z.object({
  name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9]+$/),
})

export type UserNameType = z.infer<typeof UserNameValidator>
