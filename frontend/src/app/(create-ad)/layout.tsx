import Image from "next/image";
import Link from "next/link";

export default function AdPostingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex overflow-hidden">
      <div
        className="hidden md:block w-[30%] h-full bg-no-repeat bg-cover border-l"
        style={{
          backgroundImage: "url(/icons/BgForm.svg)",
          backgroundPosition: "center",
        }}
      />

      <div className="flex flex-col flex-grow w-full md:w-[70%] h-full">
        <header className="border-b p-4 z-20">
          <div className="flex justify-between items-center px-4 md:px-8">
            <Image
              width={72}
              height={32}
              className="lg:w-20"
              src="/icons/Logo.svg"
              alt="Saghfinoo Logo"
            />
            <Link
              href="/"
              className="text-sm font-medium text-gray-500 hover:text-primary transition-all flex items-center gap-1 border-b border-transparent hover:border-primary pb-0.5 cursor-pointer"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </header>

        <main className="flex-grow p-4 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </section>
  );
}
