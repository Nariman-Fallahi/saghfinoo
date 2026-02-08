export default function FilterSkeleton() {
  return (
    <div className="w-full flex gap-3 animate-pulse">
      <div className="hidden md:flex flex-1 gap-3 items-center">
        <div className="h-10 bg-gray-200 rounded-[4px] w-32"></div>
        <div className="h-10 bg-gray-200 rounded-[4px] w-32"></div>
        <div className="h-10 bg-gray-200 rounded-[4px] w-32"></div>
        <div className="h-10 bg-gray-200 rounded-[4px] w-32"></div>
        <div className="h-10 bg-gray-200 rounded-[4px] w-32"></div>
        <div className="h-10 bg-gray-200 rounded-[4px] w-32"></div>
      </div>

      <div className="md:hidden w-full">
        <div className="h-8 bg-gray-200 rounded-[4px] w-full"></div>
      </div>
    </div>
  );
}
