import { Modal, ModalContent, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Province from "../selection/Province";
import { useFilterValue } from "@/store/ReaFilter";
import { useQueryClient } from "@tanstack/react-query";
import { getProvincesType } from "@/types/Type";
import City from "../selection/City";
import { getProvinceCitiesType } from "@/types/Type";
import OptionalSelection from "../../../OptionalSelection";
import { useState } from "react";

type ModalFilterType = {
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
};

export default function ModalFilter({
  openFilterModal,
  setOpenFilterModal,
}: ModalFilterType) {
  const { filterValues } = useFilterValue();
  const queryClient = useQueryClient();
  const [openSelect, setOpenSelect] = useState<null | string>(null);

  const provincesData: { data: getProvincesType[] } | undefined =
    queryClient.getQueryData(["getProvinces"]);

  const provinceCitiesData: { data: getProvinceCitiesType[] } | undefined =
    queryClient.getQueryData(["getProvinceCities"]);

  //  this ensures that only one dropdown  is open at a time,
  // preventing both dropdowns from being open simultaneously.
  const handleSelectClick = (title: string) => {
    setOpenSelect(openSelect === title ? null : title);
  };

  return (
    <Modal
      isOpen={openFilterModal}
      onClose={() => setOpenFilterModal(false)}
      size="full"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="w-full flex items-center flex-col mt-7">
                <Image width={72} height={72} src="/icons/Logo.svg" alt="" />
                <div className="mt-5 w-full flex gap-3 justify-between flex-wrap">
                  <OptionalSelection
                    label="استان"
                    ButtonText={
                      filterValues.selectedProvince?.name
                        ? filterValues.selectedProvince.name
                        : "انتخاب استان"
                    }
                    component={<Province data={provincesData} />}
                    onPress={() => handleSelectClick("province")}
                    isOpen={openSelect === "province"}
                    className="flex flex-col mt-1"
                  />
                  {filterValues.selectedProvince && (
                    <OptionalSelection
                      label="شهر"
                      ButtonText={
                        filterValues.selectedCity
                          ? filterValues.selectedCity
                          : "انتخاب شهر"
                      }
                      component={<City data={provinceCitiesData} />}
                      onPress={() => handleSelectClick("city")}
                      isOpen={openSelect === "city"}
                      className="flex flex-col mt-1"
                    />
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                حذف فیلترها
              </Button>
              <Button color="primary" onPress={onClose}>
                اعمال فیلتر
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
