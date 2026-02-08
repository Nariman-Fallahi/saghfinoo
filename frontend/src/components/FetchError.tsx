import Image from "next/image";

export default function FetchError() {
  return (
    <div className="w-full flex items-center justify-center flex-col h-screen bg-gray-50/50">
      <div className="relative">
        <Image
          width={400}
          height={400}
          className="w-48 h-48 md:w-72 md:h-72 lg:w-100 lg:h-87.5 object-contain"
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 300px, 200px"
          src="/icons/errors/fetch-error.svg"
          alt="خطا در دریافت اطلاعات"
          priority
        />
      </div>

      <h2 className="text-gray-800 font-bold text-sm mt-8 md:text-lg lg:text-xl text-center px-4">
        متاسفانه در دریافت اطلاعات مشکلی پیش آمد ):
      </h2>

      <p className="text-gray-500 text-xs md:text-sm mt-2">
        لطفاً اتصال اینترنت خود را چک کنید یا صفحه را رفرش کنید.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all text-sm shadow-md"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
