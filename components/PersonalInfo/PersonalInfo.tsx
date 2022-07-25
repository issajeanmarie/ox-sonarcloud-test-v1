import React, { useState } from "react";
import { Col, Row, Divider } from "antd";
import Typography from "antd/lib/typography";
import Card from "antd/lib/card";
import CustomInput from "../../components/Shared/Input";
import Form from "antd/lib/form";
import CustomPhoneInput from "../../components/Shared/Custom/CustomPhoneInput";
import Image from "antd/lib/image";
import CustomButton from "../../components/Shared/Button/button";

const { Text } = Typography;

const KPIsTable = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validatePhone] = useState(false);

  return (
    <Card
      className="radius2 noborder"
      headStyle={{ border: "none", marginBottom: "0" }}
      style={{
        padding: "30px",
        borderRadius: "4px",
        position: "fixed"
      }}
    >
      <div className=" items-center">
        <Row gutter={2}>
          <Col span={7}>
            <Image
              preview={false}
              width={120}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              style={{ borderRadius: "4px" }}
              alt="Profile picture"
            />
          </Col>
          {/* Personal Info TABLE */}
          <Col span={10}>
            <p>
              <Text className="txt-title">Yves Honore</Text>
            </p>
            <p>
              <Text className="txt-small">ADMIN</Text>
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
      <Divider />

      <div className=" items-center mato32">
        <Text className="mediumText">Edit Personal Information</Text>
        <Row gutter={24} align="bottom" className="mato32">
          <Col sm={{ span: 24 }} xl={{ span: 12 }}>
            <CustomInput
              type="text"
              name="Name"
              label="Full name"
              placeholder="*********"
            />
          </Col>

          <Col sm={{ span: 25 }} xl={{ span: 12 }}>
            <Form.Item name="verifyAccountPhone">
              <CustomPhoneInput
                width=""
                name="verifyAccountPhone"
                validatePhone={validatePhone}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* BUTTONS  */}
        <Row align="bottom" className="my-5 justify-end">
          <Col sm={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 8 }}>
            <CustomButton type="primary">SAVE CHANGES</CustomButton>
          </Col>
        </Row>
      </div>
      <Divider />

      <div className=" items-center mato32">
        <Text className="mediumText">Edit Password</Text>
        <Row gutter={24} align="bottom" className="mato32">
          <Col sm={{ span: 24 }} xl={{ span: 12 }}>
            <CustomInput
              type="password"
              name="Name"
              label="Current Password"
              placeholder="*********"
            />
          </Col>

          <Col sm={{ span: 25 }} xl={{ span: 12 }}>
            <CustomInput
              type="password"
              name="Name"
              label="New Password"
              placeholder="*********"
            />
          </Col>
        </Row>
        {/* BUTTONS  */}
        <Row align="bottom" className="my-5 justify-end">
          <Col sm={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 8 }}>
            <CustomButton type="primary">SAVE CHANGES</CustomButton>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default KPIsTable;
