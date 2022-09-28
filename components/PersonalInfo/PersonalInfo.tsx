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
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { SuccessMessage } from "../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";
import ImageUploader from "../Shared/Input/imageUploader2";

/**
 * @author Elie K. Gashagaza <gashagaza@awesomity.rw>
 * @since July 2022
 */

const { Text } = Typography;

const ProfileInfo = () => {
  const [personalInfo, { isLoading: personalLoading }] =
    usePersonalInfoMutation();
  const [changePassword] = useChangePasswordMutation();

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
  }, [data?.payload]);

  // Method to update profile and sends it to API
  const profileInfo = (values: ProfileTypes) => {
    personalInfo({
      names: values?.names,
      phone: values?.phone,
      profilePic: uploadedPicInfo
    })
      .unwrap()
      .then((res: GenericResponse) => {
        form.setFieldsValue(res);
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  const updatePassword = (values: PasswordTypes) => {
    changePassword({
      currentPassword: values?.currentPassword,
      newPassword: values?.newPassword
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        formChangePassword.resetFields();
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  return (
    <Card
      className="radius2 noborder"
      headStyle={{ border: "none", marginBottom: "0" }}
    >
      {isLoading && isFetching ? (
        // <Loader />
        <span>Loading</span>
      ) : (
        <div className=" items-center">
          <Row gutter={28}>
            <Col span={9}>
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
            <Col span={10}>
              <p>
                <Text className="txt-title">{data?.payload?.names}</Text>
              </p>
              <p>
                <Text className="txt-small">{data?.payload?.role}</Text>
              </p>

              <p>
                <Text className="txt-small">{data?.payload?.email}</Text>
              </p>
              <label htmlFor="imageUpload">
                <u>Edit Profile Picture</u>
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
              />
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
          <Row gutter={24} align="bottom" className="mato32">
            <Col sm={{ span: 24 }} xl={{ span: 12 }}>
              <CustomInput type="text" name="names" label="Full name" />
            </Col>

            <Col sm={{ span: 25 }} xl={{ span: 12 }}>
              <CustomInput type="text" name="phone" label="Phone Number" />
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
