"use client"

import { Trash2 } from "lucide-react"
import { Button } from "./ui/Button"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "@/hooks/use-toast"
import { usePathname, useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/Alert-dialog"

interface DeletePostButtonProps {
  postId: string
}

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/posts/delete/${postId}`)
      console.log(data)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 408) {
          return toast({
            title: "Post d'ont exist.",
            description: "You are trying to delete an unexosting post.",
            variant: "destructive",
          })
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid post id.",
            description: "Please choose a valid post to delete.",
            variant: "destructive",
          })
        }
      }

      toast({
        title: "There was an error.",
        description: "Could not delete this post.",
        variant: "destructive",
      })
    },

    onSuccess: () => {
      // turn pathname /r/mycommunity/post/postId into /r/mycommunity/post and this path is undefined so we need to make it one more time
      const newPathname = pathname.split("/").slice(0, -1).join("/")
      // turn pathname /r/mycommunity/post into /r/mycommunity
      const newPathname2 = newPathname.split("/").slice(0, -1).join("/")
      router.push(newPathname2)

      return toast({
        description: "Your post has been deleted.",
        variant: "success",
      })
    },
  })

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"delete"}
            onClick={() => {
              deletePost()
            }}
            isLoading={isLoading}
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove the post data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DeletePostButton
