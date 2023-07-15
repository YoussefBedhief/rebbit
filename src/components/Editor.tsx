"use client"
import TextAreaAutoSize from "react-textarea-autosize"
import { useForm } from "react-hook-form"
import { PostCreationRequest, PostValidator } from "@/lib/validators/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useRef, useState } from "react"
import EditorJS from "@editorjs/editorjs"
import { uploadFiles } from "@/lib/uploadthing"
import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import { z } from "zod"

type FormData = z.infer<typeof PostValidator>

interface EditorProps {
  subrebbitId: string
}

const Editor = ({ subrebbitId }: EditorProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subrebbitId,
      title: "",
      content: null,
    },
  })

  const ref = useRef<EditorJS>()
  const pathname = usePathname()
  const router = useRouter()
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      subrebbitId,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, content, subrebbitId }
      const { data } = await axios.post("/api/subrebbit/post/create", payload)
      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      // turn pathname /r/mycommunity/submit into /r/mycommunity
      const newPathname = pathname.split("/").slice(0, -1).join("/")
      router.push(newPathname)

      router.refresh()

      return toast({
        description: "Your post has been published.",
        variant: "success",
      })
    },
  })

  const initializeEditor = useCallback(async () => {
    const EditorJs = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Warning = (await import("@editorjs/warning")).default
    const Quote = (await import("@editorjs/quote")).default
    const Embed = (await import("@editorjs/embed")).default
    const Code = (await import("@editorjs/code")).default
    const RawTool = (await import("@editorjs/raw")).default
    const Marker = (await import("@editorjs/marker")).default
    const LinkTool = (await import("@editorjs/link")).default
    const List = (await import("@editorjs/list")).default
    const InlineCode = (await import("@editorjs/inline-code")).default
    const ImageTool = (await import("@editorjs/image")).default

    if (!ref.current) {
      const editor = new EditorJs({
        // The div id
        holder: "editor",
        // If the editor is ready store it in the ref
        onReady() {
          ref.current = editor
        },
        // The place holder of the editor
        placeholder: "Type here to write your post...",
        // Activate the toolbar
        inlineToolbar: true,
        // By default there is nothing in the editor
        data: { blocks: [] },
        tools: {
          header: Header,
          code: {
            class: Code,
            shortcut: "SHIFT+C",
          },
          inlineCode: {
            class: InlineCode,
            shortcut: "SHIFT+I",
          },
          marker: {
            class: Marker,
            shortcut: "SHIFT+M",
          },
          rawTool: RawTool,
          warning: {
            class: Warning,
            shortcut: "SHIFT+W",
          },
          list: {
            class: List,
            shortcut: "SHIFT+L",
            inlineToolbar: true,
          },
          embed: {
            class: Embed,
            shortcut: "SHIFT+E",
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            shortcut: "SHIFT+Q",
            inlineToolbar: true,
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles([file], "imageUploader")

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  }
                },
              },
            },
          },
        },
      })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Ouups something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        })
      }
    }
  }, [errors])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()
      setTimeout(() => {
        // set the title to focus
        titleRef.current?.focus()
      }, 0)
    }
    if (isMounted) {
      init()
      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save()

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      subrebbitId,
    }

    createPost(payload)
  }

  if (!isMounted) return null

  const { ref: refTitle, ...rest } = register("title")

  return (
    <div className="w-full bg-zinc-50 border-zinc-200 border p-4">
      <form
        id="subrebbit-post-form"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextAreaAutoSize
            ref={(e) => {
              refTitle(e)

              //@ts-ignore
              titleRef.current = e
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none overflow-hidden appearance-none bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px] " />
        </div>
      </form>
    </div>
  )
}

export default Editor
