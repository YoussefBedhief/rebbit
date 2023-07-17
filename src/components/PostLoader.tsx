import { Skeleton } from "./ui/Skeleton"

const PostLoader = () => {
  return (
    <div className="rounded-md bg-white dark:bg-gray-800 shadow">
      <div className="px-6 py-4 flex justify-between">
        <Skeleton className=" mr-5 h-80 w-10 " />

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500 flex items-center ">
            <>
              <Skeleton className=" h-4 w-6 " />
              <span className="px-1">•</span>
            </>

            <Skeleton className="  h-4 w-[250px] " />
          </div>
          <Skeleton className="my-2 h-6 w-[250px] " />

          <div className="relative text-sm w-full overflow-clip">
            <Skeleton className="h-[260px] w-full" />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 z-20 text-sm px-4 py-4 sm:px-6">
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  )
}

export default PostLoader
