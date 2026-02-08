export default function SliderSkeleton() {
  return (
    <div className="flex gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="min-w-[242px] w-[242px] p-4 flex flex-col shadow-sm
           rounded-2xl border border-[#EDEDED] animate-pulse bg-white"
        >
          <div className="flex items-center md:flex-col md:justify-center">
            <div className="w-[38px] h-[38px] md:w-[60px] md:h-[60px] bg-gray-200 rounded-full shrink-0" />

            <div className="flex flex-col mr-3 md:mr-0 md:mt-3 md:items-center space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-2 w-14 bg-gray-100 rounded" />
            </div>
          </div>

          <div className="mt-5 flex flex-col space-y-2">
            <div className="h-2 w-full bg-gray-100 rounded" />
            <div className="h-2 w-full bg-gray-100 rounded" />
            <div className="h-2 w-2/3 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
