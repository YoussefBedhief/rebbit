import CustomFeed from "@/components/CustomFeed"
import GeneralFeed from "@/components/GeneralFeed"
import { buttonVariants } from "@/components/ui/Button"
import { getAuthSession } from "@/lib/auth"
import { HomeIcon } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function Home() {
  const session = await getAuthSession()

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl dark:text-zinc-100">
        Your feed
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* Feed */}

        {/* @ts-expect-error server component */}
        {session ? <CustomFeed /> : <GeneralFeed />}

        {/* Subrebbit info */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 dark:border-gray-900 order-first md:order-last dark:bg-emerald-900 dark:text-emerald-200 dark:divide-gray-900">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5 dark:text-emerald-700">
              <HomeIcon className="h-4 w-4" />
              Home
            </p>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500 dark:text-emerald-300">
                Your personal Rebbit frontpage. Come here to check in with your
                favorite communities.
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
              href={`/r/create`}
            >
              Create Community
            </Link>
          </dl>
        </div>
      </div>
    </>
  )
}
