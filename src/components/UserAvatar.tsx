import { User } from "next-auth"
import { Avatar, AvatarFallback } from "./ui/Avatar"
import Image from "next/image"
import { Icons } from "./Icons"
import { AvatarProps } from "@radix-ui/react-avatar"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback className="dark:bg-gray-900">
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar
