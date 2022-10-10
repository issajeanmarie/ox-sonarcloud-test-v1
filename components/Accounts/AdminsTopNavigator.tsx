/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from "antd";
import React, { useState } from "react";
import { FC } from "react";
import { AdminsTopNavigatorTypes } from "../../lib/types/pageTypes/Accounts/Admins/AdminsTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewAdmin from "../Forms/Accounts/Admins/AddNewAdmin";
import { usePostAdminMutation } from "../../lib/api/endpoints/Accounts/adminsEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { SuccessMessage } from "../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";
import Navbar from "../Shared/Content/Navbar";
import Heading1 from "../Shared/Text/Heading1";
import { localeString } from "../../utils/numberFormatter";
import Button from "../Shared/Button";

const AdminsTopNavigator: FC<AdminsTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Admins
}) => {
  const [form] = Form.useForm();
  const [postAdmin, { isLoading }] = usePostAdminMutation();
  const [checkbox, setCheckbox] = useState(false);

  const onAddAdminFinish = (values: any) => {
    postAdmin({
      names: values?.names,
      email: values?.email,
      isGuest: checkbox,
      isSuperAdmin: !checkbox
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        form.resetFields();
        setIsModalVisible(false);
        setCheckbox(false);
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
      <Row gutter={24} align="middle">
        <Col>
          <Heading1>{localeString(Admins?.totalElements)} Admins</Heading1>
        </Col>
      </Row>
    </Col>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-6 w-[120px]">
        <Button type="primary" onClick={showModal}>
          NEW ADMIN
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW OX ADMIN"
        loading={isLoading}
      >
        <AddNewAdmin
          onAddAdminFinish={onAddAdminFinish}
          isLoading={isLoading}
          form={form}
          setCheckbox={setCheckbox}
          checkbox={checkbox}
        />
      </ModalWrapper>

      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default AdminsTopNavigator;
