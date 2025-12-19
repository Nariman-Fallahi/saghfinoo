export const TextError = ({ text }: { text: string | undefined }) => {
  return (
    <p className="text-xs lg:text-sm mt-3 text-red-500 text-right w-full">
      {text}
    </p>
  );
};
