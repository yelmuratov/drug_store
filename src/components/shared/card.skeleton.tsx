import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"


const CardSkeleton = () => {
  return (
    <Card className="flex flex-col cursor-pointer justify-center items-center space-y-3 bg-white border border-gray-200 p-4 box-border rounded-xl">
      <Skeleton className="w-full h-72" />
      <Skeleton className="text-[25px] text-center" />
      <Skeleton className="text-center flex-grow" />
      <Skeleton className="text-3xl text-center" />
      <div className="flex items-center space-x-2">
        <Skeleton className="text-gray-600 w-[60px]" />
      </div>
      <div className="flex">
        <Skeleton className="text-sm px-5 py-2.5 me-2 mb-2" />
        <Skeleton className="text-sm px-5 py-2.5 me-2 mb-2" />
      </div>
    </Card>
  )
}

export default CardSkeleton