import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function useAddQuery() {
  const router = useRouter();
  const pathname = usePathname();

  const setQuery = (key: string, value: string | undefined) => {
    if (value) {
      router.push(`${pathname}?${key}=${value}`, {
        scroll: false,
      });
    }
  };

  return { setQuery };
}
