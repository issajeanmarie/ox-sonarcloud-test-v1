/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import { SettingsLinks } from "../../../components/Settings/SettingsLinks";
import { Row, Col } from "antd";
import PersonalInfo from "../../../components/PersonalInfo";
import OxApp from "../.././../components/OxApp";
import SettingsCardWrapper from "../../../components/Settings/SettingsCardWrapper";
import SettingsTopNavigator from "../../../components/Settings/SettingsTopNavigator";
import Content from "../../../components/Shared/Content";
import PreferencesPane from "./PreferencesPane";

const Settings = () => {
  const [active, setActive] = useState<string>("preferences");

  const toggleActiveHandler = (id: string) => {
    setActive(id);
  };

  return (
    <Layout>
      <SettingsTopNavigator
        headerLinks={SettingsLinks}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />

      <Content isOverflowHidden={false} navType="FULL">
        <Row className="p-5  w-full" gutter={18}>
          <Col span={14} className="h-[82vh] overflow-y-scroll pb-12">
            {active === "preferences" ? (
              <PreferencesPane />
            ) : (
              <SettingsCardWrapper>
                <OxApp />
              </SettingsCardWrapper>
            )}
          </Col>

          <Col span={10} className="h-[82vh] overflow-y-scroll pb-12">
            <PersonalInfo />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default WithPrivateRoute(Settings);
