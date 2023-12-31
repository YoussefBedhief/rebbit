"use client"

import { useQuery } from "@tanstack/react-query"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/Command"
import { useCallback, useEffect, useRef, useState } from "react"
import axios from "axios"
import { Prisma, Subrebbit } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"
import { Users } from "lucide-react"
import debounce from "lodash.debounce"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

const SearchBar = () => {
  const [input, setInput] = useState<string>("")
  const router = useRouter()
  const CommandRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return []
      const { data } = await axios.get(`/api/search?q=${input}`)
      return data as (Subrebbit & {
        count: Prisma.SubrebbitCountOutputType
      })[]
    },
    queryKey: ["search-query"],
    enabled: false,
  })

  const request = debounce(async () => {
    await refetch()
  }, 500)

  const debounceRequest = useCallback(() => {
    request()
  }, [])

  useOnClickOutside(CommandRef, () => {
    setInput("")
  })

  useEffect(() => {
    setInput("")
  }, [pathname])

  return (
    <Command
      ref={CommandRef}
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        className="outline-none border-none ring-0 focus:outline-none focus:border-none "
        placeholder="search for community ..."
        value={input}
        onValueChange={(text) => {
          setInput(text)
          debounceRequest()
        }}
      />
      {input.length > 0 && (
        <CommandList className="absolute bg-white dark:bg-gray-900 top-full inset-x-0 shadow rounded-b-md">
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Communities">
              {queryResults?.map((subreddit) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/r/${e}`)
                    router.refresh()
                  }}
                  key={subreddit.id}
                  value={subreddit.name}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  )
}

export default SearchBar
