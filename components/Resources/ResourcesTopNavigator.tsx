/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Typography } from "antd";
import React, { FC } from "react";
import DropDownSelector from "../Shared/DropDownSelector";
import CustomButton from "../Shared/Button/button";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { ResourcesTopNavigatorTypes } from "../../lib/types/pageTypes/Resources/ResourcesTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewResource from "../Forms/Resources/AddNewResource";
import { usePostResourceMutation } from "../../lib/api/endpoints/Resources/resourcesEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { SuccessMessage } from "../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";

const { Text } = Typography;

const ResourcesTopNavigator: FC<ResourcesTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  resources,
  sort,
  setSort,
  isResourcesLoading
}) => {
  const [form] = Form.useForm();
  const [postResource, { isLoading }] = usePostResourceMutation();

  const onAddResourceFinish = (values: any) => {
    postResource({
      title: values?.title,
      link: values?.link
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) =>
        ErrorMessage(
          err?.data?.payload
            ? err?.data?.payload[0]?.messageError
            : err?.data?.message
        )
      );
  };

  return (
    <div className="flex items-center justify-between mt-6 bg-white py-2 rounded px-4 m-auto w-[98%] border_faded mb-4">
      {/* LEFT SIDE  */}
      <div className="flex items-center gap-12">
        <Text className="heading2">
          {isResourcesLoading ? (
            <span>...</span>
          ) : (
            <>
              {resources?.totalElements !== 0 && (
                <>
                  {resources?.totalElements &&
                    numbersFormatter(resources?.totalElements)}{" "}
                </>
              )}
            </>
          )}
          {resources?.totalElements === 0 ? (
            "No available resources"
          ) : (
            <>{resources?.totalElements === 1 ? "Resource" : "Resources"}</>
          )}
        </Text>

        <DropDownSelector
          label="Sort"
          dropDownContent={[
            { id: 0, name: "Reset", value: "" },
            { id: 1, name: "Date (New - Old)", value: "DATE_DESC" },
            { id: 3, name: "Date (Old - New)", value: "DATE_ASC" },
            { id: 4, name: "Name (A - Z)", value: "NAMES_ASC" },
            { id: 5, name: "Name (Z - A)", value: "NAMES_DESC" }
          ]}
          defaultSelected={sort}
          setDefaultSelected={setSort}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <CustomButton type="primary" size="small" onClick={showModal}>
          ADD RESOURCE
        </CustomButton>
      </div>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW RESOURCE"
        loading={isLoading}
      >
        <AddNewResource
          onAddResourceFinish={onAddResourceFinish}
          isLoading={isLoading}
          form={form}
        />
      </ModalWrapper>
    </div>
  );
};

export default ResourcesTopNavigator;
