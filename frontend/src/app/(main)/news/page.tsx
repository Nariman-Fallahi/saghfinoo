export const mockNewsData: NewsType[] = [
  {
    id: 1,
    title: "اخبار املاک",
    layout: "FEATURED_ROW",
    posts: [
      {
        imageFullPath:
          "https://thlearn.storage.iran.liara.space/news/ec418c60-fc3e-4c0b-90e9-ae7abff9c4c4.png",
        readTime: 5,
        title: "رکود بازار مسکن",
        shortDescription:
          "فروشندگان در انتظار خریداران و خریداران در انتظار شکست نرخ فروشندگان هستند. وضعیت بازار مسکن به گونه‌ای است که...",
        category: "مسکن",
        special: 2,
        slug: "record",
        createdAt: "2024-12-20T10:30:00",
      },
    ],
  },
  {
    id: 2,
    title: "مسکن",
    layout: "MIXED_GRID",
    posts: [
      {
        imageFullPath:
          "https://thlearn.storage.iran.liara.space/news/4a9f8bbd-81fc-471e-9e66-86dd8c610a21.png",
        readTime: 10,
        title: "خطر ویرانی زلزله در آسمان‌خراش‌ها بیشتر است یا در آپارتمان‌ها؟",
        shortDescription:
          "زلزله یکی از حوادث طبیعی است که نمی‌توان زمان و مکان آن را بصورت دقیق پیش‌بینی کرد...",
        category: "مسکن",
        special: 1,
        slug: "low-height-homes",
        createdAt: "2024-12-20T10:30:00",
      },
      {
        imageFullPath:
          "https://thlearn.storage.iran.liara.space/news/7a0cba4f-1ccc-47e6-9e63-00a7d9b7c77d.png",
        readTime: 6,
        title: "بازار کساد کسب و کار معماران داخلی",
        shortDescription:
          "بالا رفتن قیمت مواد و متریال اولیه باعث شده تا پروژه‌های بازسازی با رکود مواجه شوند.",
        category: "مسکن",
        special: 0,
        slug: "bad-market",
        createdAt: "2024-12-20T10:30:00",
      },
      {
        imageFullPath:
          "https://thlearn.storage.iran.liara.space/news/a565c09f-3359-4db9-8614-2853edd8e442.png",
        readTime: 5,
        title: "شهرک ساحلی زمزم وارد بازار مزایده شد",
        shortDescription:
          "جزئیات واگذاری واحدها در منطقه نور استان مازندران منتشر شد.",
        category: "مسکن",
        special: 0,
        slug: "zamzam-town",
        createdAt: "2024-12-20T10:30:00",
      },
    ],
  },
  {
    id: 3,
    title: "ساخت و ساز",
    layout: "EQUAL_GRID",
    posts: [
      {
        imageFullPath:
          "https://thlearn.storage.iran.liara.space/news/ad5aaf8d-c994-45e1-8755-3f4e1a06b5dc.png",
        readTime: 5,
        title: "ضرورت استفاده مصالح ساختمانی استاندارد در کرمانشاه",
        shortDescription:
          "استفاده از مصالح با کیفیت در پروژه‌های ملی مسکن الزامی شد.",
        category: "ساخت و ساز",
        special: 0,
        slug: "using",
        createdAt: "2024-12-20T10:30:00",
      },
      {
        imageFullPath:
          "https://thlearn.storage.iran.liara.space/news/6c969c5b-fd10-4fe8-9e54-7b46bf0e6c9d.png",
        readTime: 2,
        title: "تخریب ساخت‌وسازهای غیرمجاز مدیران",
        shortDescription:
          "دادستان دماوند از برخورد قاطع با تخلفات ساختمانی خبر داد.",
        category: "ساخت و ساز",
        special: 0,
        slug: "damavand",
        createdAt: "2024-12-20T10:30:00",
      },
      {
        imageFullPath:
          "https://thlearn.storage.iran.liara.space/news/2ac40ccb-ac85-409e-b10e-0eebda8acccf.png",
        readTime: 7,
        title: "استفاده از تاسیسات جدید برای صرفه جویی انرژی",
        shortDescription:
          "سیستم‌های نوین گرمایشی و سرمایشی در ساختمان‌های مدرن.",
        category: "ساخت و ساز",
        special: 0,
        slug: "energy",
        createdAt: "2024-12-20T10:30:00",
      },
      {
        imageFullPath:
          "https://thlearn.storage.iran.liara.space/news/3dd84a2b-5459-4585-9a2f-3e264ad561f2.png",
        readTime: 4,
        title: "نظارت بر روند ساخت و سازها در دستور کار",
        shortDescription:
          "مدیران شهری موظف به بازدید دوره‌ای از پروژه‌ها شدند.",
        category: "ساخت و ساز",
        special: 0,
        slug: "create-process",
        createdAt: "2024-12-20T10:30:00",
      },
    ],
  },
];

import { Api, QueryKeys } from "@/services/apiService";
import { universalFetcher } from "@/services/fetcher";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// Components
import Ad from "@/components/news/PromoBanner";
import { SITE_METADATA } from "@/constant/metadata";
import NewsSection from "@/components/news/NewsSection";
import { NewsType } from "@/types";
import PromoBanner from "@/components/news/PromoBanner";

export const metadata: Metadata = {
  title: SITE_METADATA.news.title,
  description: SITE_METADATA.news.description,
};

export default async function News({
  searchParams,
}: {
  searchParams: {
    housingNewsPageNumber?: string;
    constructionNewsPageNumber?: string;
    rentNewsPageNumber?: string;
  };
}) {
  const queryClient = new QueryClient();

  const housingPage = searchParams.housingNewsPageNumber || "1";
  const constructionPage = searchParams.constructionNewsPageNumber || "1";
  const rentPage = searchParams.rentNewsPageNumber || "1";

  const endpoints = {
    main: `${Api.News}/?page=1&special=2`,
    housingImportant: `${Api.News}/?page=1&category=مسکن&special=1`,
    housingList: `${Api.News}/?page=${housingPage}&special=0`,
    construction: `${Api.News}/?page=${constructionPage}&category=ساخت و ساز`,
    rentImportant: `${Api.News}/?page=1&category=اجاره&special=1`,
    rentList: `${Api.News}/?page=${rentPage}&category=اجاره&special=0`,
  };

  // await Promise.all([
  //   queryClient.prefetchQuery({
  //     queryKey: [QueryKeys.GET_NEWS, "main"],
  //     queryFn: () => universalFetcher(endpoints.main),
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: [QueryKeys.GET_NEWS, "housing", "important"],
  //     queryFn: () => universalFetcher(endpoints.housingImportant),
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: [QueryKeys.GET_NEWS, "housing", housingPage],
  //     queryFn: () => universalFetcher(endpoints.housingList),
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: [QueryKeys.GET_NEWS, "construction", constructionPage],
  //     queryFn: () => universalFetcher(endpoints.construction),
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: [QueryKeys.GET_NEWS, "rent", "important"],
  //     queryFn: () => universalFetcher(endpoints.rentImportant),
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: [QueryKeys.GET_NEWS, "rent", rentPage],
  //     queryFn: () => universalFetcher(endpoints.rentList),
  //   }),
  // ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-16 mt-20 md:mt-32">
        {mockNewsData.map((item, index) => (
          <>
            <NewsSection key={item.id} section={item} />
            {index === 1 && <PromoBanner />}
          </>
        ))}
      </main>
    </HydrationBoundary>
  );
}
