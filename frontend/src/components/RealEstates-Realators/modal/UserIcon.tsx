import Image from "next/image";

type UserIcon = {
  src: string;
  userName: string | undefined;
};

export default function UserIcon({ src, userName }: UserIcon) {
  return (
    <div className="flex flex-col items-center">
      <Image
        width={75}
        height={75}
        src={src}
        alt="User Profile"
        className="rounded-full h-[75px] md:h-[87px] md:w-[87px]"
      />

      <h3 className="mt-3 font-bold">{userName}</h3>
    </div>
  );
}
