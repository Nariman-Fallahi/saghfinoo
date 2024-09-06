import Image from "next/image";

type SearchDataNotFound = {
  text: string;
};

export default function SearchDataNotFound({ text }: SearchDataNotFound) {
  return (
    <div className="p-4 w-full">
      <div className="w-full border rounded-lg p-6 flex items-center flex-col justify-center">
        <Image
          width={250}
          height={250}
          src="/icons/searchDataNotFound.svg"
          alt="No Data"
          className="md:w-[300px] md:h-[300px] mt-2 lg:w-[400px] lg:h-[400px]"
        />

        <p className="font-bold md:text-lg lg:text-xl mt-1 text-center">
          {text}
        </p>
      </div>
    </div>
  );
}
