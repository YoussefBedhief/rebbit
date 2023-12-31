"use client"

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config"
import { ExtendedPost } from "@/types/db"
import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import Post from "./Post"
import PostLoader from "./PostLoader"

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  subrebbitName?: string
}

const PostFeed = ({ subrebbitName, initialPosts }: PostFeedProps) => {
  const { data: session } = useSession()
  const lastPostRef = useRef<HTMLElement>(null)
  const { entry, ref } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!subrebbitName ? `&subrebbitName=${subrebbitName}` : "")
      const { data } = await axios.get(query)
      return data as ExtendedPost[]
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
    return () => {}
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts?.map((post, index) => {
        const voteCount = post.votes.reduce((sum, vote) => {
          if (vote.type === "UP") return sum + 1
          if (vote.type === "DOWN") return sum - 1
          return sum
        }, 0)
        const currentVote = post.votes.find(
          (v) => v.userId === session?.user.id
        )

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                key={post.id}
                post={post}
                commentAmt={post.comments.length}
                subrebbitName={post.subrebbit.name}
                voteCount={voteCount}
                currentVote={currentVote}
              />
            </li>
          )
        } else {
          return (
            <Post
              key={post.id}
              post={post}
              commentAmt={post.comments.length}
              subrebbitName={post.subrebbit.name}
              voteCount={voteCount}
              currentVote={currentVote}
            />
          )
        }
      })}
      {isFetchingNextPage && (
        <li>
          <PostLoader />
        </li>
      )}
    </ul>
  )
}

export default PostFeed
