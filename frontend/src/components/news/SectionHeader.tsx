import Link from "next/link";

interface Props {
  title: string;
  link?: string;
}

const SectionHeader = ({ title, link }: Props) => {
  return (
    <div className="flex justify-between items-center mb-6" dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800 border-r-4 border-red-600 pr-3">
        {title}
      </h2>

      {link && (
        <Link
          href={link}
          className="text-red-600 font-bold text-sm hover:underline transition-all"
        >
          مشاهده همه
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
