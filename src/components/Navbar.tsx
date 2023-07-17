import Link from "next/link"
import { buttonVariants } from "./ui/Button"
import { getAuthSession } from "@/lib/auth"
import UserAccountNav from "./UserAccountNav"
import SearchBar from "./SearchBar"
import { DarkmodeToggle } from "./DarkmodeToggleButton"
import Logo from "./Logo"

const Navbar = async () => {
  const session = await getAuthSession()

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-10 py-4 dark:border-zinc-950 dark:bg-gray-900 dark:text-white">
      <div className="container max-w-7xl w-full flex items-center justify-between gap-2">
        {/* logo */}
        <Link className="flex items-center gap-2" href="/">
          <Logo />
          <p className="hidden text-zinc-700 text-base font-medium md:block dark:text-gray-300">
            Rebbit
          </p>
        </Link>

        {/* SearchBar */}
        <SearchBar />

        {/* Auth Button */}
        {session?.user ? (
          <div className="flex items-center gap-x-7">
            <DarkmodeToggle />
            <UserAccountNav user={session.user} />
          </div>
        ) : (
          <div className="flex items-center gap-x-7">
            <DarkmodeToggle />
            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
