import React from "react"
import { Icons } from "./Icons"
import Link from "next/link"
import UserAuthForm from "./UserAuthForm"
import Logo from "./Logo"

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] dark:bg-gray-900">
      <div className="flex flex-col space-y-2 text-center">
        <div className=" mx-auto">
          <Logo />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        New to Breaddit?{" "}
        <Link
          href="/sign-up"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default SignIn
