import React, { FC, Fragment } from "react";
// import Table from "antd/lib/table";
import { Col, Row } from "antd";
import Typography from "antd/lib/typography";
import Card from "antd/lib/card";
import CustomButton from "../../components/Shared/Button/button";
// import KPI from "./KPI";
import Loader from "../Shared/Loader";
import { useGetKpisQuery } from "../../lib/api/endpoints/settings/settingsEndpoints";

const { Text } = Typography;

const KPIsTable: FC = () => {
  // const { data, isLoading } = useGetKpisQuery();
  const { isLoading } = useGetKpisQuery();

  return (
    <Card
      className="radius2"
      headStyle={{ border: "none", marginBottom: "0" }}
      style={{ padding: "30px", borderRadius: "4px" }}
      title={<Text className="mediumText">KPIs (Daily target)</Text>}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* {data &&
            data?.payload?.map((kpi: string, index: number) => (
              <KPI key={index} kpi={kpi} />
            ))} */}
        </Fragment>
      )}

      <Col>
        {/* BUTTONS  */}
        <Row align="bottom" className="my-5 justify-end">
          <Col sm={{ span: 10 }} xl={{ span: 10 }} xxl={{ span: 6 }}>
            <CustomButton type="primary">SAVE</CustomButton>
          </Col>
        </Row>
      </Col>
    </Card>
  );
};

export default KPIsTable;
