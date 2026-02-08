export const toPersianDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
