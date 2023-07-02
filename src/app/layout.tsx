import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/Toaster"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

import { Inter } from "next/font/google"

export const metadata = {
  title: "Rebbit",
  description: "A Reddit clone built with Next.js and TypeScript.",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-950  light", inter.className)}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <div className="container max-w-7xl mx-auto h-full pt-12">
          {/* @ts-expect-error server components */}
          <Navbar />
          {authModal}
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  )
}
