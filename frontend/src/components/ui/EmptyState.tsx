import { useRouter } from "@bprogress/next/app";
import { Button } from "@heroui/button";
import Image from "next/image";

type EmptyStateProps = {
  imageSrc?: string;
  title: string;
  message: string;
  showReset?: boolean;
};

export default function EmptyState({
  imageSrc = "/icons/searchDataNotFound.svg",
  title,
  message,
  showReset = false,
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 w-full animate-in fade-in zoom-in duration-500">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
        <Image
          width={200}
          height={200}
          className="relative opacity-90 drop-shadow-sm md:w-64 md:h-64"
          src={imageSrc}
          alt="No Data"
        />
      </div>

      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
        {title}
      </h3>

      <p className="text-sm md:text-base text-gray-500 text-center max-w-xs md:max-w-md leading-relaxed mb-8">
        {message}
      </p>

      {showReset && (
        <Button
          color="primary"
          variant="flat"
          className="font-semibold !rounded-[8px] px-8"
          onPress={() => router.push(window.location.pathname)}
        >
          حذف تمام فیلترها
        </Button>
      )}
    </div>
  );
}
