"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useAuthModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isOpen = searchParams.get("auth") === "login";

  const setOpen = (open: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (open) {
      params.set("auth", "login");
    } else {
      params.delete("auth");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { isOpen, setOpen };
};
