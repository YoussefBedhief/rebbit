import Editor from "@/components/Editor"
import { Button } from "@/components/ui/Button"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import React from "react"

interface CreatingPostPageProps {
  params: {
    slug: string
  }
}
const CreatingPostPage = async ({ params }: CreatingPostPageProps) => {
  const { slug } = params
  const subrebbit = await db.subrebbit.findFirst({ where: { name: slug } })
  if (!subrebbit) return notFound()

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="flex flex-wrap items-baseline -ml-2 -mt-2">
          <h3 className="ml-3 mt-2 text-base font-semibold leading-6 text-gray-900">
            Create post
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            in r/{slug}{" "}
          </p>
        </div>
      </div>
      {/*Form to create a post */}
      <Editor subrebbitId={subrebbit.id} />
      <div className="flex justify-end w-full">
        <Button type="submit" className="w-full" form="subrebbit-post-form">
          Post
        </Button>
      </div>
    </div>
  )
}

export default CreatingPostPage
