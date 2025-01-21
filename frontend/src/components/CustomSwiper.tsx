import useAddQuery from "@/hooks/useAddQuery";
import S_Comments from "@/skeleton/S_Comments";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Swiper } from "swiper/react";
import { SwiperProps } from "swiper/react";

interface CustomSwiperProps extends SwiperProps {
  children: ReactNode;
  dataLength: number;
  isPending: boolean;
}

export default function CustomSwiper({
  children,
  dataLength,
  isPending,
  ...props
}: CustomSwiperProps) {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const swiperRef: MutableRefObject<any> = useRef(null);
  const [isSkeleton, setIsSkeleton] = useState(true);
  const { setQuery } = useAddQuery();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      swiperInstance.on("reachEnd", () => {
        setPageNumber((prevState) => prevState + 1);
        setQuery("swiperPageNumber", pageNumber.toString());
        setIsSkeleton(false);
      });

      return () => {
        swiperInstance.off("reachEnd");
      };
    }
  }, [pageNumber, pathname, router, setPageNumber, setQuery]);

  useEffect(() => {
    if (pageNumber > 1 && dataLength < 1) {
      setPageNumber((prevState) => prevState - 1);
    }
  }, [dataLength, pageNumber, setPageNumber]);

  return (
    <Swiper ref={swiperRef} {...props}>
      {isPending && isSkeleton ? (
        <div className="flex justify-between">
          <S_Comments />
        </div>
      ) : (
        children
      )}
    </Swiper>
  );
}
