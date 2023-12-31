import CommentsSection from "@/components/CommentsSection"
import DeletePostButton from "@/components/DeletePostButton"
import EditorOutput from "@/components/EditorOutput"
import PostVoteServer from "@/components/post-vote/PostVoteServer"
import { buttonVariants } from "@/components/ui/Button"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { redis } from "@/lib/redis"
import { formatTimeToNow } from "@/lib/utils"
import { CachedPost } from "@/types/redis"
import { Post, User, Vote } from "@prisma/client"
import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export async function generateMetadata({
  params,
}: {
  params: { postId: string }
}) {
  const post = await db.post.findFirst({
    where: { id: params.postId },
  })

  return { title: `Rebbit | ${post?.title}` }
}

interface PostDetailsPageProps {
  params: {
    postId: string
  }
}

export const dynamic = "force-dynamic" // Making the pages dynamic
export const fetchCache = "force-no-store" // Making no cash in the page

const PostDetailsPage = async ({ params }: PostDetailsPageProps) => {
  const session = await getAuthSession()

  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost

  let post: (Post & { votes: Vote[]; author: User }) | null = null

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    })
  }

  if (!post && !cachedPost) return notFound()

  return (
    <div>
      <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
        <Suspense fallback={<PostVoteShell />}>
          {/* @ts-expect-error server component */}
          <PostVoteServer
            postId={post?.id ?? cachedPost.id}
            getData={async () => {
              return await db.post.findUnique({
                where: {
                  id: params.postId,
                },
                include: {
                  votes: true,
                },
              })
            }}
          />
        </Suspense>

        <div className="sm:w-0 w-full flex-1 bg-white dark:bg-gray-800 p-4 rounded-sm">
          <div className="flex justify-between">
            <p className="max-h-40 mt-1 truncate text-xs text-gray-500 dark:text-gray-300">
              Posted by u/{post?.author.username ?? cachedPost.authorUsername}{" "}
              {formatTimeToNow(
                new Date(post?.createdAt ?? cachedPost.createdAt)
              )}
            </p>
            {session &&
            (session.user.id === post?.author.id ||
              session.user.id === cachedPost?.authorId) ? (
              <DeletePostButton postId={params.postId} />
            ) : null}
          </div>
          <h1 className="text-xl font-semibold py-2 leading-6 text-gray-900 dark:text-white">
            {post?.title ?? cachedPost.title}
          </h1>

          <EditorOutput content={post?.content ?? cachedPost.content} />
          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-zinc-500 dark:text-zinc-300" />
            }
          >
            {/* @ts-expect-error Server Component */}
            <CommentsSection postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function PostVoteShell() {
  return (
    <div className="flex items-center flex-col pr-6 w-20">
      {/* upvote */}
      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigUp className="h-5 w-5 text-zinc-700" />
      </div>

      {/* score */}
      <div className="text-center py-2 font-medium text-sm text-zinc-900">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>

      {/* downvote */}
      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigDown className="h-5 w-5 text-zinc-700" />
      </div>
    </div>
  )
}

export default PostDetailsPage
