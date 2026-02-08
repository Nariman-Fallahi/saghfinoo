import Image from "next/image";

type ErrorDisplayProps = {
  icon: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function ErrorDisplay({
  icon,
  description,
  title,
  children,
}: ErrorDisplayProps) {
  return (
    <div className="w-full p-5">
      <div className="border rounded-lg items-center justify-center py-8 flex flex-col">
        <Image
          width={250}
          height={250}
          className="md:w-[350px] md:h-[350px]"
          sizes="(min-width: 768px) 350px, 350px"
          src={icon}
          alt="ERROR"
        />
        <p className="font-bold text-xl mt-8 md:text-2xl">{title}</p>
        <p className="mt-3 text-sm text-center md:text-xl">{description}</p>

        <div className="mt-8">
          {children && children}
        </div>
      </div>
    </div>
  );
}
