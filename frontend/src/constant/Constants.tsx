export enum RegisterStatusValue {
  status1 = "phoneNumber",
  status2 = "codeSent",
  status3 = "notRegistered",
}

type TitleType = {
  title: string;
};

export function Title({ title }: TitleType) {
  return (
    <h3 className="text-sm font-bold md:text-lg lg:text-[32px]">{title}</h3>
  );
}

export const isMobile: boolean =
  typeof window !== "undefined" && window.innerWidth < 768 ? true : false;

export const isPersian = (text: string) => {
  const persian = /^[\u0600-\u06FF\s]+$/;
  return persian.test(text);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const numberToPersian = (number: number) => {
  return new Intl.NumberFormat("fa-IR").format(number);
};

export const TextError = ({ text }: { text: string | undefined }) => {
  return (
    <p className="text-xs lg:text-sm mt-3 text-red-500 text-right w-full">
      {text}
    </p>
  );
};

export const SelectTitle = ({ text }: { text: string | undefined }) => {
  return (
    <label className="text-sm md:text-base lg:text-lg text-[#353535] mt-2 pb-2">
      {text}
    </label>
  );
};
