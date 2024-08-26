import Image from "next/image";

type ShareModalType = {
  data: 
};

type socialNetworkType = {
  name: string;
  icon: string;
  alt: string;
  href: string | undefined;
};

//TODO Add Data

export default function ShareModal({ data }: ShareModalType) {
  const socialNetwork = ({ name, alt, href, icon }: socialNetworkType) => {
    return (
      <a href={href} className="flex items-center">
        <Image
          width={24}
          height={24}
          src={icon}
          alt={alt}
          className="md:w-[40px] md:h-[40px]"
          sizes="(min-width: 768px) 40px, 40px"
        />
        <span className="text-xs mr-2 md:text-2xl">{name}</span>
      </a>
    );
  };

  return (
    <div className="flex flex-col mt-10">
      <p className="font-bold md:mt-8 md:text-2xl text-center">اشتراک گذاری</p>

      <p className="mt-6 text-sm text-[#505050] md:text-lg md:text-center">
        این پروفایل را با دیگران به اشتراک بگذارید.
      </p>

      <div className="mt-6 md:mt-8 flex flex-col md:px-24">
        {shareData.socialNetwork.telegram &&
          socialNetwork({
            name: "تلگرام",
            alt: "Telegram Link",
            href: shareData.socialNetwork.telegram,
            icon: "/icons/Telegram-blue.svg",
          })}

        {shareData.socialNetwork.whatsapp &&
          socialNetwork({
            name: "واتساپ",
            alt: "Whatsapp Link",
            href: shareData.socialNetwork.whatsapp,
            icon: "/icons/whatsapp.svg",
          })}

        {shareData.socialNetwork.x &&
          socialNetwork({
            name: "ایکس",
            alt: "X | Twitter Link",
            href: shareData.socialNetwork.x,
            icon: "/icons/x.svg",
          })}

        {shareData.socialNetwork.facebook &&
          socialNetwork({
            name: "فیسبوک",
            alt: "Facebook Link",
            href: shareData.socialNetwork.facebook,
            icon: "/icons/facebook.svg",
          })}

        {shareData.socialNetwork.email &&
          socialNetwork({
            name: "ایمیل",
            alt: "Email Link",
            href: shareData.socialNetwork.email,
            icon: "/icons/formkit_email.svg",
          })}
      </div>
    </div>
  );
}
