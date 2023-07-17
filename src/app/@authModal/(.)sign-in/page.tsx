import CloseModal from "@/components/CloseModal"
import SignIn from "@/components/SignIn"
import React from "react"

const InterceptSignInPage = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white dark:bg-gray-900 w-full h-fit rounded-lg py-20 px-2">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  )
}

export default InterceptSignInPage
