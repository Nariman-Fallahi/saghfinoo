import create from "zustand";
import { filterValuesType } from "@/types/Type";

interface filterValueStateType {
  filterValues: filterValuesType;
  setFilterValues: (val: filterValuesType) => void;
}
export const useFilterValue = create<filterValueStateType>((set) => ({
  filterValues: {
    selectedCity: undefined,
    selectedProvince: undefined,
  },
  setFilterValues: (val) =>
    set((state) => ({
      filterValues: {
        ...state.filterValues,
        ...val,
      },
    })),
}));
