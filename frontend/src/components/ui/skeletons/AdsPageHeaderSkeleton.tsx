export default function AdsPageHeaderSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-7 w-40 bg-gray-200 rounded-md md:h-10 md:w-64" />

      <div className="flex gap-3 mt-6 overflow-hidden">
        <div className="h-10 w-24 bg-gray-100 rounded-full shrink-0" />
        <div className="h-10 w-24 bg-gray-100 rounded-full shrink-0" />
        <div className="h-10 w-24 bg-gray-100 rounded-full shrink-0 hidden md:block" />
        <div className="h-10 w-24 bg-gray-100 rounded-full shrink-0 hidden md:block" />
      </div>
    </div>
  );
}
