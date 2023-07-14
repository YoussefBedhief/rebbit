import Link from "next/link"
import { Icons } from "./Icons"
import { buttonVariants } from "./ui/Button"
import { getAuthSession } from "@/lib/auth"
import UserAccountNav from "./UserAccountNav"
import SearchBar from "./SearchBar"

const Navbar = async () => {
  const session = await getAuthSession()
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-10 py-4">
      <div className="container max-w-7xl w-full flex items-center justify-between gap-2">
        {/* logo */}
        <Link className="flex items-center gap-2" href="/">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-base font-medium md:block">
            Rebbit
          </p>
        </Link>

        {/* SearchBar */}
        <SearchBar />

        {/* Auth Button */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
