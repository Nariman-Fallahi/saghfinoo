export default function RealEstatesCardsSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 p-3 gap-6 md:gap-8 md:p-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="shadow-sm rounded-2xl flex flex-col p-4 items-center border border-[#E1E1E1] mt-6 animate-pulse"
        >
          <div className="rounded-full bg-gray-200 w-[50px] h-[50px] md:w-[80px] md:h-[80px]" />

          <div className="flex items-center mt-6 w-full justify-center">
            <div className="h-4 bg-gray-200 rounded-sm w-3/4 md:h-6" />
          </div>

          <div className="mt-4 h-3 bg-gray-200 rounded-sm w-5/6 md:h-4" />

          <div className="mt-3 h-3 bg-gray-200 rounded-sm w-2/3 md:h-4" />
          <div className="mt-2 h-3 bg-gray-200 rounded-sm w-1/2 md:h-4" />

          <div className="mt-4 h-8 bg-gray-100 rounded-lg w-full" />

          <div className="hidden md:block mt-3 h-10 bg-gray-200 rounded-xs w-full" />
        </div>
      ))}
    </div>
  );
}
