import React, { useState } from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";
import { Header_Links } from "../../lib/types/links";
import { Row, Col, Typography } from "antd";
import PersonalInfo from "../../components/PersonalInfo";
import SettingsKPIsTable from "../../components/Tables/Settings/SettingsKPIsTable";
import SettingsCardWrapper from "../../components/Settings/SettingsCardWrapper";
import CustomButton from "../../components/Shared/Button/button";
import SettingsCategoriesTable from "../../components/Tables/Settings/SettingsCategoriesTable";
import AddCategory from "../../components/Forms/Settings/AddCategory";
import SettingsTopNavigator from "../../components/Settings/SettingsTopNavigator";

const { Text } = Typography;

const Settings = () => {
  const Links: Header_Links[] = [
    {
      label: "PREFERENCES",
      id: "preferences"
    },
    {
      label: "OX APP",
      id: "oxapp"
    }
  ];
  const [active, setActive] = useState<string>("trucks");

  const toggleActiveHandler = (id: string) => {
    setActive(id);
  };

  return (
    <Layout>
      <SettingsTopNavigator
        headerLinks={Links}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />

      <div className=" w-[100%] my-5">
        <Row className="p-5 mt-5" gutter={18}>
          <Col span={14}>
            <SettingsCardWrapper>
              <div className="mb-4">
                <Text className="mediumText">KPIs (Daily target)</Text>
              </div>
              <SettingsKPIsTable />

              <Row className="flex justify-end mt-4">
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                  <CustomButton type="primary">SAVE</CustomButton>
                </Col>
              </Row>
            </SettingsCardWrapper>

            <SettingsCardWrapper>
              <div className="mb-4">
                <Text className="mediumText">Categories (22)</Text>
              </div>

              <Row className="flex justify-between items-center mb-4 border-b pb-4">
                <AddCategory />
              </Row>

              <SettingsCategoriesTable />
            </SettingsCardWrapper>
          </Col>
          <Col span={10}>
            <PersonalInfo />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Settings);
