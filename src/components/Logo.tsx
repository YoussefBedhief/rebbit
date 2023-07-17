"use client"

import { useTheme } from "next-themes"
import React from "react"
import { Icons } from "./Icons"

const Logo = () => {
  const { resolvedTheme } = useTheme()

  return (
    <>
      {resolvedTheme === "dark" ? (
        <Icons.darkModeLogo className="h-8 w-8 sm:h-6 sm:w-6" />
      ) : (
        <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
      )}
    </>
  )
}

export default Logo
