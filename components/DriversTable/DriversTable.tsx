import Table from "antd/lib/table";
import Space from "antd/lib/space";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";

const { Column } = Table;
const { Title } = Typography;

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
  <Space
    className="mg_auto"
    style={{ padding: "12px 24px", width: "97%", display: "block" }}
  >
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
            <Title className="text14 fowe400 dark opacity_56">
              {record.key}
            </Title>
          );
          return { children: child, props: { "data-label": "#" } };
        }}
      />

      <Column
        width="25%"
        key="name"
        title="Name"
        render={(text: Types, record: Types) => {
          const child = <Title className="text14 fowe700">{record.name}</Title>;
          return { children: child, props: { "data-label": "Name" } };
        }}
      />

      <Column
        width="20%"
        key="phone"
        title="Phone number"
        render={(text: Types, record: Types) => {
          const child = (
            <Title className="text14 fowe400 dark opacity_56">
              {record.phone}
            </Title>
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
            <Title className="text14 fowe400 dark opacity_56">
              {record.email}
            </Title>
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
            <Title className="text14 fowe700 uppercase red">
              {record.status}
            </Title>
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
                <Space
                  className="flex align_center justify_center radius5 bg_white_edit_btn pointer"
                  style={{ width: "36px", height: "36px" }}
                >
                  <Image
                    src="/icons/ic-contact-edit.svg"
                    alt=""
                    width={16}
                    preview={false}
                  />
                </Space>
              </Col>

              <Col>
                <Space
                  className="flex align_center justify_center radius5 bg_white_red pointer"
                  style={{ width: "36px", height: "36px" }}
                >
                  <Image
                    src="/icons/ic-actions-remove.svg"
                    alt=""
                    width={16}
                    preview={false}
                  />
                </Space>
              </Col>

              <Col>
                <Space
                  className="flex align_center justify_center radius5 bg_yellow_view_btn pointer"
                  style={{ padding: "0px 32px", height: "36px" }}
                >
                  <Title className="yellow_faded_text text14 fowe700 mb0">
                    View
                  </Title>
                </Space>
              </Col>
            </Row>
          );
          return { children: child, props: { "data-label": "" } };
        }}
      />
    </Table>
  </Space>
);

export default DriversTable;
