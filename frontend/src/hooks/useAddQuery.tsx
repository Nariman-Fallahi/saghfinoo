"use client";

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

export default function useAddQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQuery = (key: string, value: string | undefined) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    if (value) {
      updatedSearchParams.set(key, value);
    } else {
      updatedSearchParams.delete(key);
    }

    router.push(`${pathname}?${updatedSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return { setQuery };
}
