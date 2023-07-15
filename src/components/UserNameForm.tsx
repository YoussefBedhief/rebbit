"use client"

import { UserNameType, UserNameValidator } from "@/lib/validators/usename"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card"
import { Label } from "./ui/Label"
import { Input } from "./ui/Input"
import { Button } from "./ui/Button"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "@/hooks/use-toast"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { startTransition } from "react"
import { useRouter } from "next/navigation"

interface UserNameFormProps {
  user: Pick<User, "id" | "username">
}

const UserNameForm = ({ user }: UserNameFormProps) => {
  const { loginToast } = useCustomToast()
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserNameType>({
    resolver: zodResolver(UserNameValidator),
    defaultValues: {
      name: user?.username || "",
    },
  })

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: UserNameType) => {
      const payload: UserNameType = {
        name,
      }
      const { data } = await axios.patch("/api/username", payload)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Username already taken.",
            description: "Please choose a different name.",
            variant: "destructive",
          })
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid username.",
            description: "Please choose a name between 3 and 50 letters.",
            variant: "destructive",
          })
        }

        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      toast({
        title: "There was an error.",
        description: "Could not change username.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })
      return toast({
        title: "Subscribed successfully!",
        description: `Username changed successfully`,
        variant: "success",
      })
    },
  })

  return (
    <form
      onSubmit={handleSubmit((e) => {
        updateUsername(e)
      })}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Username</CardTitle>
          <CardDescription>
            Please enter a username between 3 to 50 character you are
            confortable with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc-400">u/</span>
            </div>
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px] pl-6"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">
                {errors?.name.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button isLoading={isLoading}> Change Username</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default UserNameForm
