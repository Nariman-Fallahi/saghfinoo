export const SelectTitle = ({ text }: { text: string | undefined }) => {
  return (
    <label className="text-sm md:text-base lg:text-lg text-[#353535] mt-2 pb-2">
      {text}
    </label>
  );
};
