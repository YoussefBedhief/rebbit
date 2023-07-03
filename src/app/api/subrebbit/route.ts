import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { SubrebbitValidator } from "@/lib/validators/subrebbit"
import { z } from "zod"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name } = SubrebbitValidator.parse(body)

    const subrebbitExists = await db.subrebbit.findFirst({ where: { name } })
    if (subrebbitExists) {
      return new Response("Subrebbit already exists", { status: 409 })
    }
    const subrebbit = await db.subrebbit.create({
      data: { name, creatorId: session.user.id },
    })

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subrebbitId: subrebbit.id,
      },
    })

    return new Response(subrebbit.name)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new Response("Could not create a subrebbit", { status: 500 })
  }
}
