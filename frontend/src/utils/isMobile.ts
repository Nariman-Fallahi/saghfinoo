export const isMobile: boolean =
  typeof window !== "undefined" && window.innerWidth < 768 ? true : false;
