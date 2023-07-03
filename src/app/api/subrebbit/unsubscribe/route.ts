import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { SubrebbitSubscriptionValidator } from "@/lib/validators/subrebbit"
import { z } from "zod"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }
    const body = await req.json()
    const { subrebbitId } = SubrebbitSubscriptionValidator.parse(body)
    const subrebbitExists = await db.subrebbit.findFirst({
      where: {
        id: subrebbitId,
      },
    })
    if (!subrebbitExists) {
      return new Response("Your trying to subscribe to unexisting subrebbit", {
        status: 408,
      })
    }
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        userId: session.user.id,
        subrebbitId,
      },
    })
    if (!subscriptionExists) {
      return new Response("You are not subscribed to this subrebbit.", {
        status: 409,
      })
    }

    const subrebbit = await db.subrebbit.findFirst({
      where: {
        id: subrebbitId,
        creatorId: session.user.id,
      },
    })

    if (subrebbit) {
      return new Response("You can't unsubscribe from your own subrebbit.", {
        status: 400,
      })
    }

    await db.subscription.delete({
      where: {
        userId_subrebbitId: {
          userId: session.user.id,
          subrebbitId,
        },
      },
    })
    return new Response("Subscription succeded")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new Response(
      "Could not unsubscribe to this subrebbit, please try again later",
      {
        status: 500,
      }
    )
  }
}
