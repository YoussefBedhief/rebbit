import CloseModal from "@/components/CloseModal"
import SignUp from "@/components/SignUp"
import React from "react"

export const metadata = {
  title: "Rebbit | SingnUp",
  description: "Registration page to Rebbit ",
}

const InterceptSignUpPage = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10 dark:bg-white/40">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white dark:bg-gray-900 w-full h-fit rounded-lg py-20 px-2">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>
          <SignUp />
        </div>
      </div>
    </div>
  )
}

export default InterceptSignUpPage
