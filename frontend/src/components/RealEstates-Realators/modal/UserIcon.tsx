import Image from "next/image";

type UserIcon = {
    src: string;
    userName: string | undefined;
};

export default function UserIcon({src, userName} : UserIcon) {
  return (
    <div className="flex flex-col">
      <Image
        width={87}
        height={87}
        src={src}
        alt="User Profile"
        className="rounded-full"
      />

      <h3 className="mt-3 font-bold">{userName}</h3>
    </div>
  );
}
