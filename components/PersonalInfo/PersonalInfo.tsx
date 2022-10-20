/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Col, Row, Divider } from "antd";
import Typography from "antd/lib/typography";
import Card from "antd/lib/card";
import CustomInput from "../../components/Shared/Input";
import Form from "antd/lib/form";
import Button from "../Shared/Button";
import { ProfileTypes, PasswordTypes } from "../../lib/types/settings";
import {
  useSettingsQuery,
  usePersonalInfoMutation,
  useChangePasswordMutation
} from "../../lib/api/endpoints/settings/settingsEndpoints";
import { BackendErrorTypes } from "../../lib/types/shared";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";
import ImageUploader from "../Shared/Input/imageUploader2";
import { SettingsProfileLoader } from "../Shared/Loaders/Loaders";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import CustomPhoneInput from "../Shared/Custom/CustomPhoneInput";

/**
 * @author Elie K. Gashagaza <gashagaza@awesomity.rw>
 * @since July 2022
 */

const { Text } = Typography;

const ProfileInfo = () => {
  const [personalInfo, { isLoading: personalLoading }] =
    usePersonalInfoMutation();
  const [changePassword] = useChangePasswordMutation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const { data, isLoading, isFetching } = useSettingsQuery();

  // Forms
  const [form] = Form.useForm();
  const [formChangePassword] = Form.useForm();

  // Image Upload
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadFailure, setUploadFailure] = useState(null);
  const [uploadedPicInfo, setUploadedPicInfo] = useState(null);
  const [, setUploadSuccess] = useState(false);
  const [allIMGs, setAllIMGs] = useState([]);

  useEffect(() => {
    if (uploadedPicInfo) {
      const imagesCopy = [...allIMGs];
      imagesCopy.push(uploadedPicInfo);

      setAllIMGs(imagesCopy);
    }
  }, [uploadedPicInfo]);

  useEffect(() => {
    form.setFieldsValue(data?.payload);
    setPhoneNumber(data?.payload?.phone);
  }, [data?.payload]);

  const handleEditPersonalInfoSuccess = ({ payload }: any) => {
    form.setFieldsValue(payload);
    setPhoneNumber(payload?.phone);
  };

  // Method to update profile and sends it to API
  const profileInfo = (values: ProfileTypes) => {
    phoneNumber &&
      handleAPIRequests({
        request: personalInfo,
        names: values?.names,
        phone: phoneNumber,
        profilePic: uploadedPicInfo,
        showSuccess: true,
        handleSuccess: handleEditPersonalInfoSuccess
      });
  };

  const handleUpdatePasswordSuccess = () => {
    formChangePassword.resetFields();
  };

  const handleUpdatePasswordFailure = (err: BackendErrorTypes) => {
    ErrorMessage(err?.data?.message);
  };

  const updatePassword = (values: PasswordTypes) => {
    handleAPIRequests({
      request: changePassword,
      currentPassword: values?.currentPassword,
      newPassword: values?.newPassword,
      showSuccess: true,
      handleSuccess: handleUpdatePasswordSuccess,
      handleFailure: handleUpdatePasswordFailure
    });
  };

  return (
    <Card
      className="radius2 noborder"
      headStyle={{ border: "none", marginBottom: "0" }}
    >
      {isLoading && isFetching ? (
        // <Loader />
        <SettingsProfileLoader />
      ) : (
        <div>
          <Row gutter={24} align="middle">
            <Col className="w-[140px]">
              <ImageUploader
                uploadLoading={uploadLoading}
                setUploadLoading={setUploadLoading}
                uploadFailure={uploadFailure}
                setUploadFailure={setUploadFailure}
                uploadedPicInfo={uploadedPicInfo}
                setUploadedPicInfo={setUploadedPicInfo}
                setUploadSuccess={setUploadSuccess}
                allIMGs={allIMGs}
                setAllIMGs={setAllIMGs}
                src={data?.payload?.profilePic}
              />
            </Col>
            {/* Personal Info TABLE */}
            <Col>
              <p className="txt-title mb-6">{data?.payload?.names}</p>

              <p className="txt-sm mb-2">
                {data?.payload?.role?.replace("_", " ")}
              </p>

              <p className="txt-sm m-0">{data?.payload?.email}</p>
            </Col>
          </Row>
        </div>
      )}
      <Divider />

      <Form
        name="personalInfo"
        onFinish={profileInfo}
        title="PersonalInfo"
        form={form}
      >
        <div className=" items-center mato32">
          <Text className="mediumText">Edit Personal Information</Text>
          <Row gutter={24} align="top" className="mato32">
            <Col sm={{ span: 24 }} xl={{ span: 12 }}>
              <CustomInput type="text" name="names" label="Full name" />
            </Col>

            <Col sm={{ span: 25 }} xl={{ span: 12 }}>
              <CustomPhoneInput
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                validatePhone={false}
              />
            </Col>
          </Row>

          {/* BUTTONS  */}
          <Row align="bottom" className="my-5 justify-end">
            <Col sm={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 8 }}>
              <Button
                loading={personalLoading}
                type="primary"
                htmlType="submit"
              >
                SAVE CHANGES
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
      <Divider />

      <Form
        name="changePassword"
        onFinish={updatePassword}
        form={formChangePassword}
        title="changePassword"
      >
        <div className=" items-center mato32">
          <Text className="mediumText">Edit Password</Text>
          <Row gutter={24} align="bottom" className="mato32">
            <Col sm={{ span: 24 }} xl={{ span: 12 }}>
              <CustomInput
                type="password"
                name="currentPassword"
                label="Current Password"
                placeholder="*********"
              />
            </Col>

            <Col sm={{ span: 25 }} xl={{ span: 12 }}>
              <CustomInput
                type="password"
                name="newPassword"
                label="New Password"
                placeholder="*********"
              />
            </Col>
          </Row>
          {/* BUTTONS  */}
          <Row align="bottom" className="my-5 justify-end">
            <Col sm={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 8 }}>
              <Button loading={isLoading} type="primary" htmlType="submit">
                SAVE CHANGES
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Card>
  );
};

export default ProfileInfo;
