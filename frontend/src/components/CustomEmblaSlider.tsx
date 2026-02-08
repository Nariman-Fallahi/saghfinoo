"use client";
import React, { ReactNode, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import SliderSkeleton from "./ui/skeletons/SliderSkeleton";

interface Props {
  children: ReactNode;
  isPending: boolean;
  dataLength: number;
  onReachEnd?: () => void;
}

export default function CustomEmblaSlider({
  children,
  isPending,
  dataLength,
  onReachEnd,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    containScroll: "trimSnaps",
  });

  const onScroll = useCallback(() => {
    if (!emblaApi || !onReachEnd) return;

    const canScrollNext = emblaApi.canScrollNext();
    if (!canScrollNext && !isPending && dataLength > 0) {
      onReachEnd();
    }
  }, [emblaApi, onReachEnd, isPending, dataLength]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("scroll", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onScroll]);

  if (isPending && dataLength === 0) {
    return <SliderSkeleton />;
  }

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4">
        {children}

        {isPending && dataLength > 0 && (
          <div className="flex-none w-64 h-40 bg-gray-100 animate-pulse rounded-2xl" />
        )}
      </div>
    </div>
  );
}
