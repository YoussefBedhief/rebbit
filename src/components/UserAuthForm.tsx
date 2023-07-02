"use client"

import { cn } from "@/lib/utils"
import { Button } from "./ui/Button"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { Icons } from "./Icons"
import { useToast } from "@/hooks/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn("google")
    } catch (error) {
      // Toast notification for the error
      toast({
        title: "There was an error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size={"sm"}
        className="w-full flex items-center"
      >
        {isLoading ? null : <Icons.google className="w-9 h-9 p-2" />}
        Sign in with Google
      </Button>
    </div>
  )
}

export default UserAuthForm
