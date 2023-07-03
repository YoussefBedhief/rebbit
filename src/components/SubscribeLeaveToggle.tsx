"use client"
import { useMutation } from "@tanstack/react-query"
import { Button } from "./ui/Button"
import { SubscribeToSubrebbitPayload } from "@/lib/validators/subrebbit"
import axios, { AxiosError } from "axios"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { toast } from "@/hooks/use-toast"
import { startTransition } from "react"
import { useRouter } from "next/navigation"

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean
  subrebbitId: string
  subrebbitName: string
}

const SubscribeLeaveToggle = ({
  isSubscribed,
  subrebbitId,
  subrebbitName,
}: SubscribeLeaveToggleProps) => {
  const router = useRouter()
  const { loginToast } = useCustomToast()

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubrebbitPayload = {
        subrebbitId,
      }
      const { data } = await axios.post("/api/subrebbit/subscribe", payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
        if (err.response?.status === 409) {
          return toast({
            title: err.message,
            description: "You can only subscribe to a subrebbit once.",
            variant: "destructive",
          })
        }
        if (err.response?.status === 408) {
          return toast({
            title: err.message,
            description: "You can't subscribe to an non existing subrebbit.",
            variant: "destructive",
          })
        }
        if (err.response?.status === 422) {
          return toast({
            title: err.message,
            description: "Error in your data request.",
            variant: "destructive",
          })
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not subscribe to this subreddit.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })
      return toast({
        title: "Subscribed successfully!",
        description: `You are now subscribed to r/${subrebbitName}`,
        variant: "success",
      })
    },
  })
  const { mutate: unsubscribe, isLoading: isUnSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubrebbitPayload = {
        subrebbitId,
      }
      const { data } = await axios.post("/api/subrebbit/unsubscribe", payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast({
            title: err.message,
            description: `You are the creator of a r/${subrebbitName}, you can't unsubscribe from it.`,
            variant: "destructive",
          })
        }
        if (err.response?.status === 401) {
          return loginToast()
        }
        if (err.response?.status === 409) {
          return toast({
            title: err.message,
            description:
              "You can only unsubscribe to a subrebbit that you already subscribed to.",
            variant: "destructive",
          })
        }
        if (err.response?.status === 408) {
          return toast({
            title: err.message,
            description: "You can't unsubscribe to a non existing subrebbit.",
            variant: "destructive",
          })
        }
        if (err.response?.status === 422) {
          return toast({
            title: err.message,
            description: "Error in your data request.",
            variant: "destructive",
          })
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not unsubscribe to this subreddit.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })
      return toast({
        title: "Unsubscribed successfully!",
        description: `You are now unsubscribed to r/${subrebbitName}`,
        variant: "success",
      })
    },
  })

  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isUnSubLoading}
      onClick={() => unsubscribe()}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isSubLoading}
      onClick={() => subscribe()}
    >
      Join to post
    </Button>
  )
}

export default SubscribeLeaveToggle
