"use client"

import { Session } from "next-auth"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/Button"
import { ImageIcon, Link2 } from "lucide-react"
import { Input } from "./ui/Input"
import UserAvatar from "./UserAvatar"

interface MiniCreatePostProps {
  session: Session | null
}

const MiniCreatePost = ({ session }: MiniCreatePostProps) => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <li className="overflow-hidden rounded-md bg-white dark:bg-gray-800 shadow list-none">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />

          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white dark:bg-green-400 " />
        </div>
        <Input
          onClick={() => router.push(pathname + "/submit")}
          readOnly
          placeholder="Create post"
        />
        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="ghost"
        >
          <ImageIcon className="text-zinc-600 dark:text-zinc-400" />
        </Button>
        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="ghost"
        >
          <Link2 className="text-zinc-600 dark:text-zinc-400" />
        </Button>
      </div>
    </li>
  )
}

export default MiniCreatePost
