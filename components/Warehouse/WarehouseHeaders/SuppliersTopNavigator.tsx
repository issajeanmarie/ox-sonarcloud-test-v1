import React, { FC, useState } from "react";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { localeString } from "../../../utils/numberFormatter";
import Button from "../../Shared/Button";
import ModalWrapper from "../../Modals/ModalWrapper";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { Form } from "antd";
import DropDownSelector from "../../Shared/DropDownSelector";
import AddSupplier from "../../Forms/Warehouse/Add/AddSupplier";

import { LatLng } from "use-places-autocomplete";
import { usePostSupplierMutation } from "../../../lib/api/endpoints/Warehouse/supplierEndpoints";
import { SuppliersTopNavigatorTypes } from "../../../lib/types/pageTypes/Warehouse/Suppliers/SuppliersTopNavigator";

const SuppliersTopNavigator: FC<SuppliersTopNavigatorTypes> = ({
  showModal,
  setIsModalVisible,
  isModalVisible,
  setSort,
  sort,
  data
}) => {
  const [form] = Form.useForm();
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();

  const [postSupplier, { isLoading: isAddingSupplier }] =
    usePostSupplierMutation();

  const onAddSupplierFinish = (values: any) => {
    postSupplier({
      names: values?.names,
      email: values?.email,
      phone: values?.phone,
      location: location ? location?.name : "",
      coordinates: location ? JSON.stringify(location?.coordinates) : "",
      tinNumber: values?.tinNumber,
      economicStatus: values?.economicStatus
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setLocation(undefined);
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

  const LeftSide = (
    <Col className="flex items-center gap-4">
      <Row gutter={24} align="middle" wrap={false}>
        <Col>
          <Heading1>{localeString(data?.totalElements)} Items</Heading1>
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
      <div className="flex items-center gap-6 w-[140px]">
        <Button onClick={showModal} type="primary">
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
        title="NEW STOCK ORDER"
        loading={false}
      >
        <AddSupplier
          onAddSupplierFinish={onAddSupplierFinish}
          form={form}
          isLoading={isAddingSupplier}
          setLocation={setLocation}
          location={location}
        />
      </ModalWrapper>
      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default SuppliersTopNavigator;
