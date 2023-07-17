"use client"

import { formatTimeToNow } from "@/lib/utils"
import { Post, User, Vote } from "@prisma/client"
import { MessageSquare } from "lucide-react"
import Link from "next/link"
import { FC, useRef } from "react"
import EditorOutput from "./EditorOutput"
import PostVoteClient from "./post-vote/PostVoteClient"

type PartialVote = Pick<Vote, "type">

interface PostProps {
  post: Post & {
    author: User
    votes: Vote[]
  }
  voteCount: number
  subrebbitName: string
  currentVote?: PartialVote
  commentAmt: number
}

const Post: FC<PostProps> = ({
  post,
  voteCount: _voteCount,
  currentVote: _currentVote,
  subrebbitName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null)

  return (
    <div className="rounded-md bg-white shadow dark:bg-gray-800">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          postId={post.id}
          initialvoteCount={_voteCount}
          initialVote={_currentVote?.type}
        />

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500 dark:text-gray-400">
            {subrebbitName ? (
              <>
                <a
                  className="underline text-zinc-900 dark:text-emerald-400 text-sm underline-offset-2"
                  href={`/r/${subrebbitName}`}
                >
                  r/{subrebbitName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.username}</span>{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/r/${subrebbitName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900 dark:text-white">
              {post.title}
            </h1>
          </a>

          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <a href={`/r/${subrebbitName}/post/${post.id}`}>
              <EditorOutput content={post.content} />
            </a>
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent  dark:from-gray-800 dark:to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 z-20 text-sm px-4 py-4 sm:px-6">
        <Link
          href={`/r/${subrebbitName}/post/${post.id}`}
          className="w-fit flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </Link>
      </div>
    </div>
  )
}
export default Post
