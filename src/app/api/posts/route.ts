import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

export async function GET(req: Request) {
  const url = new URL(req.url)

  const session = await getAuthSession()

  let followedCommunitiesIds: string[] = []

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: { subrebbit: true },
    })
    followedCommunitiesIds = followedCommunities?.map((sub) => sub.subrebbit.id)
  }

  try {
    const { limit, page, subrebbitName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subrebbitName: z.string().nullish().optional(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        subrebbitName: url.searchParams.get("subrebbitName"),
      })
    let whereClause = {}
    if (subrebbitName) {
      whereClause = {
        subrebbit: {
          name: subrebbitName,
        },
      }
    } else if (session) {
      whereClause = {
        subrebbit: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      }
    }
    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subrebbit: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    })

    if (!posts) {
      return new Response("No More posts to fetch", { status: 400 })
    }

    return new Response(JSON.stringify(posts))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new Response("Could not fetch posts", { status: 500 })
  }
}
