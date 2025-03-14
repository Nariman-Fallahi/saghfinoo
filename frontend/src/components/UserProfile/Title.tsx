export default function Title({ title }: { title: string }) {
  return <p className="text-xs md:text-xl lg:text-2xl font-bold">{title}</p>;
}
