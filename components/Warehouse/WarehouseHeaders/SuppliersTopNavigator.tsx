import React, { FC, useState } from "react";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { localeString } from "../../../utils/numberFormatter";
import Button from "../../Shared/Button";
import ModalWrapper from "../../Modals/ModalWrapper";
import { Form } from "antd";
import DropDownSelector from "../../Shared/DropDownSelector";
import AddSupplier from "../../Forms/Warehouse/Add/AddSupplier";

import { LatLng } from "use-places-autocomplete";
import { usePostSupplierMutation } from "../../../lib/api/endpoints/Warehouse/supplierEndpoints";
import { SuppliersTopNavigatorTypes } from "../../../lib/types/pageTypes/Warehouse/Suppliers/SuppliersTopNavigator";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

const SuppliersTopNavigator: FC<SuppliersTopNavigatorTypes> = ({
  showModal,
  setIsModalVisible,
  isModalVisible,
  setSort,
  sort,
  totalElements
}) => {
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();

  const [postSupplier, { isLoading: isAddingSupplier }] =
    usePostSupplierMutation();

  const dispatch = useDispatch();

  const handleAddSupplierSuccess = ({ payload }: any) => {
    setLocation(undefined);
    form.resetFields();
    setIsModalVisible(false);
    setPhoneNumber("");

    dispatch(displayPaginatedData({ payload }));
  };

  const onAddSupplierFinish = (values: any) => {
    phoneNumber &&
      handleAPIRequests({
        request: postSupplier,
        names: values?.names,
        email: values?.email,
        phone: phoneNumber,
        location: location ? location?.name : "",
        coordinates: location ? JSON.stringify(location?.coordinates) : "",
        tinNumber: values?.tinNumber,
        economicStatus: values?.economicStatus,
        showSuccess: true,
        handleSuccess: handleAddSupplierSuccess
      });
  };

  const LeftSide = (
    <Col className="flex items-center gap-4">
      <Row gutter={24} align="middle" wrap={false}>
        <Col>
          <Heading1>{localeString(totalElements || 0)} Items</Heading1>
        </Col>

        <Col>
          <DropDownSelector
            label="Sort"
            setDefaultSelected={setSort}
            defaultSelected={sort}
            dropDownContent={[
              { id: 0, name: "Z-A (Names)", value: "NAMES_DESC" },
              { id: 1, name: "A-Z (Names)", value: "NAMES_ASC" },
              { id: 2, name: "Z-A (Date)", value: "DATE_DESC" },
              { id: 3, name: "A-Z (Date)", value: "DATE_ASC" }
            ]}
          />
        </Col>
      </Row>
    </Col>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-6 w-[120px]">
        <Button form="" onClick={showModal} type="primary">
          NEW SUPPLIER
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW OX SUPPLIER"
        loading={false}
        footerContent={
          <Button
            form="AddSupplier"
            loading={isAddingSupplier}
            type="primary"
            htmlType="submit"
          >
            ADD SUPPLIER
          </Button>
        }
      >
        <AddSupplier
          onAddSupplierFinish={onAddSupplierFinish}
          form={form}
          isLoading={isAddingSupplier}
          setLocation={setLocation}
          location={location}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </ModalWrapper>
      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default SuppliersTopNavigator;
