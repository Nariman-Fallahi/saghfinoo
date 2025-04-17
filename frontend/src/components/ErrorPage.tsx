import Image from "next/image";
import BackToHomeButton from "./BackToHomeButton";

type ErrorPage = {
  icon: string;
  title: string;
  description: string;
};

export default function ErrorPage({ icon, description, title }: ErrorPage) {
  return (
    <div className="w-full p-5">
      <div className="mt-20 md:mt-28 border rounded-lg items-center justify-center py-8 flex flex-col">
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

        <BackToHomeButton />
      </div>
    </div>
  );
}
