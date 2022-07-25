import React from "react";
import Table from "antd/lib/table";
import { Col, Row } from "antd";
import Typography from "antd/lib/typography";
import Card from "antd/lib/card";
import CustomInput from "../../components/Shared/Input";
import CustomButton from "../../components/Shared/Button/button";

const { Column } = Table;
const { Text } = Typography;

type Types = {
  key: number;
  depot: string;
};

const KPIsData = [
  {
    key: 1,
    depot: "Tyazo"
  },
  {
    key: 2,
    depot: "LHS"
  }
];

const KPIsTable = () => (
  <Card
    className="radius2"
    headStyle={{ border: "none", marginBottom: "0" }}
    style={{ padding: "30px", borderRadius: "4px" }}
    title={<Text className="mediumText">KPIs (Daily target)</Text>}
  >
    {/* MIDDLE ROW */}
    <Table
      className="data_table"
      dataSource={KPIsData}
      rowKey={(record) => record.key}
      pagination={false}
      showHeader={true}
      bordered={false}
      scroll={{ x: "100%" }}
      tableLayout="auto"
    >
      {/* BOTTOM ROW */}
      <Column
        width="5%"
        key="key"
        title="#"
        render={(text: Types, record: Types) => {
          const child = (
            <Text className="normalText opacity_56">{record.key}</Text>
          );
          return { children: child, props: { "data-label": "#" } };
        }}
      />

      <Column
        width="30%"
        key="key"
        title="Depot"
        render={(text: Types, record: Types) => {
          const child = (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Text className="heading2 nowrap">{record.depot}</Text>
              </div>
            </div>
          );
          return { children: child, props: { "data-label": "Depot" } };
        }}
      />

      <Column
        key="key"
        title="Revenue"
        render={() => {
          const child = (
            <div className="flex items-center gap-3">
              <CustomInput
                type="text"
                name="Name"
                placeholder="2,000,000"
                suffixIcon={<Text className="normalText opacity_56">Rwf</Text>}
              />
            </div>
          );
          return { children: child, props: { "data-label": "Revenue" } };
        }}
      />
      <Column
        key="key"
        title="Revenue/Km"
        render={() => {
          const child = (
            <div className="flex items-center gap-3">
              <CustomInput
                type="text"
                name="Name"
                placeholder="5,000"
                suffixIcon={<Text className="normalText opacity_56">Rwf</Text>}
              />
            </div>
          );
          return { children: child, props: { "data-label": "Revenue/Km" } };
        }}
      />
    </Table>
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

export default KPIsTable;
