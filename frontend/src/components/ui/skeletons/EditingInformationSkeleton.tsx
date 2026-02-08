export default function EditingInformationSkeleton() {
  return (
    <div className="animate-pulse w-full">
      <div className="h-8 w-40 bg-gray-200 rounded-sm mb-6" />
      <div className="w-24 h-24 bg-gray-200 rounded-lg mb-8" />

      <div className="w-full flex flex-wrap justify-between gap-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full md:w-[48%] h-12 bg-gray-100 rounded-lg"
          />
        ))}
        <div className="w-full h-px bg-gray-100 my-4" />
        <div className="w-full md:w-[48%] h-12 bg-gray-100 rounded-lg" />
        <div className="w-full md:w-[48%] h-12 bg-gray-100 rounded-lg" />
      </div>

      <div className="h-12 w-full md:w-1/3 bg-gray-200 rounded-lg mt-8" />
    </div>
  );
}
