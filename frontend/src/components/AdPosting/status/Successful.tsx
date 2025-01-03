import Image from "next/image";

export default function Successful() {
  return (
    <>
      <p className="md:text-xl lg:text-2xl font-bold">فرم با موفقیت ارسال شد</p>

      <i className="mt-5">
        <Image
          width={250}
          height={250}
          className="md:w-[400px] md:h-[400px]"
          src="/icons/formSubmit_S.svg"
          alt="Form submit successful"
        />
      </i>
    </>
  );
}
