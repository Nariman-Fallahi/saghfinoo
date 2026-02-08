export default function RealEstateNewsSkeleton() {
  return (
    <div className="flex w-full flex-col animate-pulse">
      <div className="h-8 w-32 bg-gray-300 rounded-sm mb-4"></div>

      <div className="flex flex-col w-full bg-[#f3f3f3] mt-4 md:flex-row-reverse h-[400px] md:rounded-lg lg:rounded-xl md:gap-4">
        <div className="w-full h-1/2 md:h-full md:w-1/2 bg-gray-300 md:rounded-l-lg lg:rounded-l-xl"></div>

        <div className="w-full flex flex-col p-3 mt-1 md:w-1/2">
          <div className="h-4 w-20 bg-gray-300 rounded-sm mb-4"></div>{" "}
          <div className="h-10 w-3/4 bg-gray-300 rounded-sm mb-4"></div>{" "}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded-sm"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded-sm"></div>
          </div>
          <div className="w-full flex justify-between mt-auto mb-4">
            <div className="h-8 w-24 bg-gray-300 rounded-lg"></div>
            <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
