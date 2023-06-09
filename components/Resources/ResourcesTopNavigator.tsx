/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Row, Col } from "antd";
import React, { FC } from "react";
import DropDownSelector from "../Shared/DropDownSelector";
import { ResourcesTopNavigatorTypes } from "../../lib/types/pageTypes/Resources/ResourcesTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewResource from "../Forms/Resources/AddNewResource";
import { usePostResourceMutation } from "../../lib/api/endpoints/Resources/resourcesEndpoints";
import Navbar from "../Shared/Content/Navbar";
import Heading1 from "../Shared/Text/Heading1";
import Button from "../Shared/Button";
import { localeString } from "../../utils/numberFormatter";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../lib/redux/slices/paginatedData";

const ResourcesTopNavigator: FC<ResourcesTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  resources,
  sort,
  setSort
}) => {
  const [form] = Form.useForm();
  const [postResource, { isLoading }] = usePostResourceMutation();

  const dispatch = useDispatch();

  const handleAddResourceSuccess = ({ payload }: any) => {
    form.resetFields();
    setIsModalVisible(false);

    dispatch(displayPaginatedData({ payload }));
  };

  const onAddResourceFinish = (values: any) => {
    handleAPIRequests({
      request: postResource,
      title: values?.title,
      link: values?.link,
      showSuccess: true,
      handleSuccess: handleAddResourceSuccess
    });
  };

  const LeftSide = (
    <Col className="flex items-center gap-4">
      <Row gutter={24} align="middle" wrap={false}>
        <Col>
          <Heading1>
            {localeString(resources?.totalElements)} Resources
          </Heading1>
        </Col>

        <Col>
          <DropDownSelector
            label="Sort"
            dropDownContent={[
              { id: 0, name: "Reset", value: "" },
              { id: 1, name: "Date (New - Old)", value: "DATE_DESC" },
              { id: 2, name: "Date (Old - New)", value: "DATE_ASC" },
              { id: 3, name: "Name (A - Z)", value: "NAMES_ASC" },
              { id: 4, name: "Name (Z - A)", value: "NAMES_DESC" }
            ]}
            defaultSelected={sort}
            setDefaultSelected={setSort}
          />
        </Col>
      </Row>
    </Col>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-6 w-[120px]">
        <Button type="primary" onClick={showModal}>
          ADD RESOURCE
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <ModalWrapper
        footerContent={
          <Button
            form="AddNewResource"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            ADD RESOURCE
          </Button>
        }
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

      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default ResourcesTopNavigator;
