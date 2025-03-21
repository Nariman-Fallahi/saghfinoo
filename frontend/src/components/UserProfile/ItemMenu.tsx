import Image from "next/image";
import { useRouter } from "@bprogress/next/app";

type ItemMenuType = {
  title: string;
  icon: string;
  alt: string;
  userName: string;
  onClick?: () => void;
  active?: string;
  routerPush?: string;
};

export default function ItemMenu({
  active,
  alt,
  icon,
  title,
  userName,
  routerPush,
  onClick,
}: ItemMenuType) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (routerPush) {
          router.push(routerPush);
        } else if (onClick) {
          onClick();
        }
      }}
      className={`flex mt-2 p-2 cursor-pointer text-[#717171] ${
        userName === active
          ? "before:w-1 before:h-5 before:rounded-xl before:ml-2 before:bg-primary text-black"
          : null
      }`}
    >
      <i>
        <Image width={20} height={20} src={icon} alt={alt} />
      </i>
      <span className="text-xs lg:text-sm mr-3 w-full">{title}</span>
    </div>
  );
}
