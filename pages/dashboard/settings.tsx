import React, { useState } from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";
import TopNavigator from "../../components/Shared/TopNavigator";
import { Header_Links } from "../../lib/types/links";
import { Row, Col } from "antd";
import KPIsTable from "../../components/KPIsTable";
import Categories from "../../components/Categories";
import PersonalInfo from "../../components/PersonalInfo";

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
      {/* PAGES NAVIGATION */}
      <TopNavigator
        headerLinks={Links}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />

      <div className=" w-[100%] my-5">
        {/* TOP ROW */}
        <Row className="p-5 mt-5" gutter={18}>
          <Col span={14}>
            {/* KPIs TABLE */}
            <KPIsTable />

            {/* Categories TABLE */}
            <Categories />
          </Col>
          {/* Personal Info TABLE */}
          <Col span={10}>
            <PersonalInfo />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Settings);
