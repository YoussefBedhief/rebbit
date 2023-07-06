import MiniCreatePost from "@/components/MiniCreatePost"
import PostFeed from "@/components/PostFeed"
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import React from "react"

interface SubrebbitDetailsPageProps {
  params: {
    slug: string
  }
}

const SubrebbitDetailsPage = async ({ params }: SubrebbitDetailsPageProps) => {
  const { slug } = params

  const session = await getAuthSession()

  const subrebbit = await db.subrebbit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subrebbit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  })

  if (!subrebbit) return notFound()

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subrebbit.name}
      </h1>
      <MiniCreatePost session={session} />
      <PostFeed initialPosts={subrebbit.posts} subrebbitName={subrebbit.name} />
    </>
  )
}

export default SubrebbitDetailsPage
