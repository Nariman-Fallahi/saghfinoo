export default function InfoSkeleton({ isScore }: { isScore?: boolean }) {
  return (
    <div className="w-full flex flex-col animate-pulse">
      <div className="w-full h-44 mt-[60px] md:h-[280px] md:mt-0 bg-gray-200" />

      <div className="w-[96px] h-[96px] rounded-full -mt-12 mr-4 bg-gray-300 border-4 border-white md:w-[200px] md:h-[200px] md:-mt-[100px] md:mr-8" />

      <div className="w-full flex justify-between items-center">
        <div className="w-full p-4 flex flex-col md:p-8">
          <div className="w-full flex justify-between mt-4 items-center">
            <div className="h-6 w-32 bg-gray-200 rounded-sm md:h-12 md:w-64" />
            <div className="size-8 bg-gray-200 rounded-full md:size-12" />
          </div>

          <div className="h-4 w-48 bg-gray-100 rounded-sm mt-4 md:h-6 md:w-72" />
          <div className="h-4 w-64 bg-gray-200 rounded-sm mt-4 md:h-10 md:w-96 md:mt-6" />

          <div className="flex items-center mt-4">
            <div className="size-5 bg-gray-200 rounded-sm mr-1 md:size-8" />
            <div className="h-4 w-40 bg-gray-100 rounded-sm md:h-8 md:w-80" />
          </div>

          <div className="h-9 w-28 bg-gray-200 rounded-sm mt-4 md:h-12 md:w-40 md:mt-8" />
        </div>

        <div className="p-8 hidden md:flex ml-7 flex-col rounded-xl shadow-sm absolute left-0 bg-gray-50 items-center mt-14 min-w-[250px] space-y-4">
          {isScore && (
            <>
              <div className="h-4 w-32 bg-gray-200 rounded-sm" />
              <div className="h-10 w-full bg-gray-300 rounded-sm" />
            </>
          )}
          <div className="h-4 w-24 bg-gray-200 rounded-sm" />
          <div className="h-8 w-32 bg-gray-100 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
