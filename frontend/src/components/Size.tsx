"use client";
import { isMobile } from "@/constant/Constants";
import { useEffect } from "react";
import { useSizeBtn } from "@/store/Size";

export default function Size() {
  const { sizeBtn, setSizeBtn } = useSizeBtn();
  useEffect(() => {
    isMobile ? setSizeBtn("sm") : setSizeBtn("md");
  }, [setSizeBtn]);

  return null;
}
