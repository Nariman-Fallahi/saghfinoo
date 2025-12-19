export const numberToPersian = (number: number) => {
  return new Intl.NumberFormat("fa-IR").format(number);
};
