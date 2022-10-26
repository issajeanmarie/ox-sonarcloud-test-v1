import Table from "antd/lib/table";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import CustomButton from "../Shared/Button/button";

const { Column } = Table;
const { Text } = Typography;

const tableData = [
  {
    key: 1,
    name: "BISEMAGE Yves Honore",
    phone: "0788734295",
    email: "yves@gmail.com",
    status: "STATUS"
  },
  {
    key: 2,
    name: "BISEMAGE Yves Honore",
    phone: "0788734295",
    email: "yves@gmail.com",
    status: "STATUS"
  }
];

type Types = {
  key: number;
  name: string;
  phone: string;
  email: string;
  status: string;
};

const DriversTable = () => (
  <div className="mx-4">
    <Table
      className="data_table"
      rowClassName="shadow"
      dataSource={tableData}
      rowKey={(record) => record.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
    >
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
        width="25%"
        key="name"
        title="Name"
        render={(text: Types, record: Types) => {
          const child = (
            <Text className="normalText fowe700">{record.name}</Text>
          );
          return { children: child, props: { "data-label": "Name" } };
        }}
      />

      <Column
        width="20%"
        key="phone"
        title="Phone number"
        render={(text: Types, record: Types) => {
          const child = (
            <Text className="normalText opacity_56">{record.phone}</Text>
          );
          return { children: child, props: { "data-label": "Phone number" } };
        }}
      />

      <Column
        width="20%"
        key="email"
        title="Email"
        render={(text: Types, record: Types) => {
          const child = (
            <Text className="normalText opacity_56">{record.email}</Text>
          );
          return { children: child, props: { "data-label": "Email" } };
        }}
      />

      <Column
        width="15%"
        key="key"
        title="Status"
        render={(text: Types, record: Types) => {
          const child = (
            <Text className="heading2 uppercase red">{record.status}</Text>
          );
          return { children: child, props: { "data-label": "Status" } };
        }}
      />

      <Column
        width="20%"
        key="key"
        title="Action"
        render={() => {
          const child = (
            <Row align="middle" gutter={16} wrap={false}>
              <Col>
                <CustomButton
                  form=""
                  type="normal"
                  size="icon"
                  icon={
                    <Image
                      src="/icons/ic-contact-edit.svg"
                      alt=""
                      width={12}
                      preview={false}
                    />
                  }
                />
              </Col>

              <Col>
                <CustomButton
                  form=""
                  type="danger"
                  size="icon"
                  className="bg_danger"
                  icon={
                    <Image
                      src="/icons/ic-actions-remove.svg"
                      alt=""
                      width={12}
                      preview={false}
                    />
                  }
                />
              </Col>

              <Col>
                <CustomButton form="" type="view" size="small">
                  View
                </CustomButton>
              </Col>
            </Row>
          );
          return { children: child, props: { "data-label": "" } };
        }}
      />
    </Table>
  </div>
);

export default DriversTable;
