"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { type ThemeProviderProps } from "next-themes/dist/types"

const Providers = ({ children }: ThemeProviderProps) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers
