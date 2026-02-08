export default function AdsCardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 w-full gap-4 lg:gap-6 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-fit flex flex-col border border-[#E1E1E1] rounded-lg mt-6 lg:mt-8 md:rounded-2xl animate-pulse"
        >
          <div className="w-full h-25 bg-gray-200 rounded-t-lg md:h-45"></div>

          <div className="flex flex-col p-2 md:p-3 space-y-3">
            <div className="flex w-full justify-between items-center">
              <div className="h-4 w-20 bg-gray-200 rounded-sm"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>

            <div className="h-4 w-3/4 bg-gray-200 rounded-sm"></div>

            <div className="h-4 w-1/2 bg-gray-200 rounded-sm"></div>

            <div className="h-4 w-2/3 bg-gray-200 rounded-sm"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
