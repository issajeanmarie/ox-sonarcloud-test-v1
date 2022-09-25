/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row, Typography } from "antd";
import React, { useState } from "react";
import CustomButton from "../Shared/Button/button";

import { FC } from "react";
import { AdminsTopNavigatorTypes } from "../../lib/types/pageTypes/Accounts/Admins/AdminsTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewAdmin from "../Forms/Accounts/Admins/AddNewAdmin";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { usePostAdminMutation } from "../../lib/api/endpoints/Accounts/adminsEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { SuccessMessage } from "../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";

const { Text } = Typography;

const AdminsTopNavigator: FC<AdminsTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Admins,
  isAdminsLoading
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

  return (
    <Row
      justify="space-between"
      className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1]"
    >
      <Col className="flex items-center gap-4">
        <Text className="heading2 flex items-center">
          {isAdminsLoading ? (
            <span>...</span>
          ) : (
            <>
              {Admins?.totalElements !== 0 && (
                <>
                  {Admins?.totalElements &&
                    numbersFormatter(Admins?.totalElements)}{" "}
                </>
              )}
            </>
          )}
          {Admins?.totalElements === 0 ? (
            "No Admins"
          ) : (
            <>{Admins?.totalElements === 1 ? "Admin" : "Admins"}</>
          )}
        </Text>
      </Col>

      <Col className="flex items-center gap-4">
        <CustomButton onClick={showModal} type="primary">
          <span className="text-sm">NEW ADMIN</span>
        </CustomButton>
      </Col>
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
    </Row>
  );
};

export default AdminsTopNavigator;
