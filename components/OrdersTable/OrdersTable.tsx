import Table from "antd/lib/table";
import Space from "antd/lib/space";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";

const { Column } = Table;
const { Title } = Typography;

type Types = {
  key: number;
  plate: string;
  driver: string;
  weight: string;
  unitPrice: string;
  from: string;
  to: string;
  price: string;
  supporting: string;
};

const orderData = [
  {
    key: 1,
    plate: "RAF 003 A",
    driver: "Yves Lionel",
    weight: "1000 KG",
    unitPrice: "20 Rwf / Kg",
    from: "Musanze",
    to: "Nyamasheke",
    price: "60, 000 Rwf",
    supporting: ""
  },
  {
    key: 2,
    plate: "RAF 003 A",
    driver: "Yves Lionel",
    weight: "1000 KG",
    unitPrice: "20 Rwf / Kg",
    from: "Musanze",
    to: "Nyamasheke",
    price: "60, 000 Rwf",
    supporting: "Supporting order"
  }
];

const OrdersTable = () => (
  <Space className="mg_auto shadow" style={{ width: "97%", display: "block" }}>
    {/* TOP ROW */}
    <Row
      justify="space-between"
      className="pad24"
      style={{
        borderBottom: "1px solid #eaeff2"
      }}
    >
      {/* TOP ROW RIGHT SIDE */}
      <Col span={12}>
        <Row align="middle" gutter={32}>
          <Col>
            <Image
              width={16}
              src="/icons/ic-actions-user-yellow.svg"
              preview={false}
              alt=""
            />
          </Col>

          <Col>
            <Title className="fowe700 text18 mb0">Turatsinze Theoneste</Title>
          </Col>

          <Col>
            <Title className="fowe400 text16 mb0 opacity_56 mb0">
              0788734295
            </Title>
          </Col>
        </Row>
      </Col>

      {/* TOP ROW RIGHT SIDE */}
      <Col span={12}>
        <Row align="middle" justify="end" gutter={64}>
          <Col>
            <Title className="fowe700 text18 mb0" style={{ color: "#ED7818" }}>
              70, 000 Rwf
            </Title>
          </Col>

          <Col span={9}>
            <Row align="middle" gutter={12} justify="end" wrap={false}>
              <Col>
                <Title className="text14 black fowe400 opacity_56 italic nowrap mb0">
                  Order status:
                </Title>
              </Col>

              <Col>
                <Title className="fowe700 text14 dark mb0">PENDING</Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>

    {/* MIDDLE ROW */}
    <Table
      style={{ padding: "10px" }}
      className="data_table"
      dataSource={orderData}
      rowKey={(record) => record.key}
      pagination={false}
      showHeader={false}
      bordered={false}
      scroll={{ x: 0 }}
    >
      <Column
        key="key"
        title="Name"
        render={(text: Types, record: Types) => {
          const child = (
            <Row align="middle" gutter={24} wrap={false}>
              <Col>
                <Image
                  width={22}
                  src="/icons/ic-ecommerce-delivery-yellow.svg"
                  preview={false}
                  alt=""
                />
              </Col>

              <Col>
                <Row align="middle" gutter={24}>
                  <Col>
                    <Title className="fowe700 text16 nowrap mb0">
                      {record.plate}
                    </Title>
                  </Col>

                  <Col>
                    <Title className="fowe400 text14 opacity_56 dark nowrap mb0">
                      {record.driver}
                    </Title>
                  </Col>
                </Row>
              </Col>
            </Row>
          );
          return { children: child, props: { "data-label": "Name" } };
        }}
      />

      <Column
        key="name"
        title="Weight"
        render={(text: Types, record: Types) => {
          const child = (
            <Row align="middle" gutter={16}>
              <Col>
                <Title className="fowe700 text16 nowrap mb0">
                  {record.weight}
                </Title>
              </Col>

              <Col>
                <Title className="text16 black fowe400 nowrap opacity_56 italic mb0">
                  {record.unitPrice}
                </Title>
              </Col>
            </Row>
          );
          return { children: child, props: { "data-label": "Name" } };
        }}
      />

      <Column
        key="from"
        title="From"
        render={(text: Types, record: Types) => {
          const child = (
            <Row align="middle" gutter={16}>
              <Col>
                <Title className="fowe700 text16 mb0">From</Title>
              </Col>

              <Col>
                <Title className="fowe400 text16 opacity_56 dark mb0">
                  {record.from}
                </Title>
              </Col>
            </Row>
          );
          return { children: child, props: { "data-label": "Phone number" } };
        }}
      />

      <Column
        key="key"
        title="To"
        render={(text: Types, record: Types) => {
          const child = (
            <Row align="middle" gutter={16}>
              <Col>
                <Title className="fowe700 text16 mb0">To</Title>
              </Col>

              <Col>
                <Title className="fowe400 text16 opacity_56 dark mb0">
                  {record.to}
                </Title>
              </Col>
            </Row>
          );
          return { children: child, props: { "data-label": "Email" } };
        }}
      />

      <Column
        key="key"
        title="Supporting"
        render={(text: Types, record: Types) => {
          const child = (
            <Title className="text14 black fowe400 opacity_56 italic nowrap mb0">
              {record.supporting}
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
                <Title
                  className="fowe700 text16 red nowrap mb0"
                  style={{ margin: "0 5.6rem 0 0" }}
                >
                  70, 000 Rwf
                </Title>
              </Col>

              <Col>
                <Space
                  className="flex align_center justify_center radius5 bg_white_edit_btn pointer"
                  style={{ width: "36px", height: "36px" }}
                >
                  <Image
                    src="/icons/ic-ecommerce-invoice.svg"
                    alt="OX Delivery Logo"
                    width={18}
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
                    alt="OX Delivery Logo"
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
          return { children: child, props: { "data-label": "Status" } };
        }}
      />
    </Table>

    {/* BOTTOM ROW */}
    <Row
      justify="space-between"
      style={{
        borderTop: "1px solid #eaeff2",
        padding: "16px 24px"
      }}
    >
      {/* TOP ROW RIGHT SIDE */}
      <Col>
        <Row gutter={12} align="middle">
          <Col>
            <Title className="text14 black fowe400 opacity_56 nowrap mb0">
              Created: 11th May 2022 -
            </Title>
          </Col>

          <Col>
            <Title className="text14 black fowe700 opacity_56 italic nowrap mb0">
              Edited by Yves Honore
            </Title>
          </Col>
        </Row>
      </Col>

      <Col>
        <Title className="text14 black fowe400 opacity_56 italic nowrap mb0">
          NYAMASHEKE Depot
        </Title>
      </Col>
    </Row>
  </Space>
);

export default OrdersTable;
