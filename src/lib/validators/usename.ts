import { z } from "zod"

export const UserNameValidator = z.object({
  name: z
    .string()
    .min(3, {
      message: "UserName must be at least 3 characters long",
    })
    .max(50, {
      message: "UserName must be at most 50 characters long",
    })
    .regex(/^[a-zA-Z0-9]+$/),
})

export type UserNameType = z.infer<typeof UserNameValidator>
