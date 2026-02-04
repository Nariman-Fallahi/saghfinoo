type TitleType = {
  title: string;
};

export function Title({ title }: TitleType) {
  return (
    <h3 className="text-sm font-bold md:text-lg lg:text-[32px]">{title}</h3>
  );
}
