import { ABOUT_CONTENT } from "@/constant/about";
import { SITE_METADATA } from "@/constant/metadata";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: SITE_METADATA.about.title,
  description: SITE_METADATA.about.description,
};

export default function About() {
  const { storyTitle, heroTitle, heroSubtitle, description } = ABOUT_CONTENT;

  return (
    <div className="w-full p-4">
      <div className="mt-24 border rounded-xl p-4 border-[#D9D9D9] flex flex-col md:mt-32">
        <p className="font-bold text-xs md:text-base lg:text-2xl">
          {storyTitle}
        </p>
        <p
          className="mt-6 font-bold text-[#871212] md:mt-7 md:text-2xl lg:text-3xl
         w-full text-center"
        >
          {heroTitle}
        </p>
        A
        <p
          className="mt-2 font-medium text-[#717171] md:mt-3 md:text-xl lg:text-2xl
        w-full text-center"
        >
          {heroSubtitle}
        </p>
        <div
          className="mt-7 flex flex-col items-center md:flex-row md:justify-between
         md:mt-8 md:items-start"
        >
          <Image
            width={500}
            height={200}
            className="w-full md:hidden rounded-md"
            src="/image/About-image.png"
            alt="Image"
          />

          <p className="text-xs mt-3 md:text-sm lg:text-base md:pl-5 text-justify">
            {description}
          </p>

          <Image
            width={500}
            height={200}
            src="/image/desktop-image-about.png"
            alt="Image"
            className="w-1/4 hidden md:block rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
