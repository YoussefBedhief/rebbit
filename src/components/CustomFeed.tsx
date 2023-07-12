import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import PostFeed from "./PostFeed"
import { notFound } from "next/navigation"

const CustomFeed = async () => {
  const session = await getAuthSession()
  if (!session) return notFound()

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subrebbit: true,
    },
  })

  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      votes: true,
      subrebbit: true,
      author: true,
      comments: true,
    },
    where: {
      subrebbit: {
        name: {
          in: followedCommunities.map(({ subrebbit }) => subrebbit.name),
        },
      },
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  })

  return <PostFeed initialPosts={posts} />
}

export default CustomFeed
