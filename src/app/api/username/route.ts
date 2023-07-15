import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { UserNameValidator } from "@/lib/validators/usename"
import { z } from "zod"

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { name } = UserNameValidator.parse(body)
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const username = await db.user.findFirst({
      where: { username: name },
    })
    if (username) {
      return new Response("Username already taken", { status: 409 })
    }
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
      },
    })
    return new Response("Username changed successfully")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        "Something went wrong could not update username, please try again later",
        {
          status: 400,
        }
      )
    }

    return new Response(
      "Could not post to subreddit at this time. Please try later",
      { status: 500 }
    )
  }
}
