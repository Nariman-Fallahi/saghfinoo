export default function ConsultantsSkeleton() {
  return (
    <div className="mt-10 flex flex-col w-full p-4 md:mt-14 md:p-8 animate-pulse">
      <div className="h-7 w-48 bg-gray-200 rounded-md md:h-9 md:w-64" />

      <div className="mt-5 flex justify-start flex-wrap gap-y-6 md:mt-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-1/4 flex flex-col justify-center items-center md:bg-[#f3f3f3]
             md:p-3 md:w-[15%] md:rounded-xl md:mx-2"
          >
            <div className="rounded-full bg-gray-200 w-[70px] h-[70px] md:w-[120px] md:h-[120px]" />

            <div className="mt-3 h-3 w-16 bg-gray-200 rounded md:mt-4 md:h-4 md:w-24" />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center space-x-2">
        <div className="size-8 bg-gray-100 rounded md:size-10" />
        <div className="size-8 bg-gray-200 rounded md:size-10" />
        <div className="size-8 bg-gray-100 rounded md:size-10" />
      </div>
    </div>
  );
}
