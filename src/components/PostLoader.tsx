import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const PostLoader = () => {
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <Skeleton height={360} width={70} className="mr-5" />

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500 flex items-center ">
            <>
              <Skeleton height={20} width={25} />
              <span className="px-1">•</span>
            </>

            <Skeleton height={20} width={200} />
          </div>
          <Skeleton height={30} width={250} />

          <div className="relative text-sm w-full overflow-clip">
            <Skeleton height={300} width={600} />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
        <Skeleton height={20} width={250} />
      </div>
    </div>
  )
}

export default PostLoader
