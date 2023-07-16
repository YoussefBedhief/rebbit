import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const id = params.postId

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const postExists = await db.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    })

    if (!postExists) {
      return new Response("This post don't exist", {
        status: 408,
      })
    }

    //First delete the comment reply of this post
    for (const comment of postExists.comments) {
      await db.comment.deleteMany({
        where: {
          replyToId: comment.id,
        },
      })
    }

    //Second delete the comment of this post
    await db.comment.deleteMany({
      where: {
        postId: id,
      },
    })
    //Finally delete the post
    await db.post.delete({
      where: {
        id,
      },
    })

    return new Response("Post deleted successfully")
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    } else {
      return new Response(error.message, {
        status: 500,
      })
    }
  }
}
