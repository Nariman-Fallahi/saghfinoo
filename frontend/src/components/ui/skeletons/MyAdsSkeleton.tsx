import Title from "@/components/userProfile/Title";

export default function MyAdsSkeleton() {
  return (
    <div className="animate-pulse">
      <Title title="آگهی های من" />
      <div className="h-8 w-32 bg-gray-200 rounded mt-4" />

      <div className="flex flex-wrap justify-between w-full mt-6 gap-y-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-[48%] lg:w-[31%] rounded-xl border border-gray-100 flex flex-col overflow-hidden"
          >
            <div className="w-full h-32 md:h-44 bg-gray-200" />
            <div className="p-3 space-y-3">
              <div className="h-3 w-3/4 bg-gray-100 rounded" />
              <div className="h-3 w-1/2 bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
