import Table from "antd/lib/table";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import CustomButton from "../Shared/Button";

const { Column } = Table;
const { Text } = Typography;

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
  <div className="shadow w-[99%] m-auto my-5">
    {/* TOP ROW */}
    <div className="p-5 border-b flex items-center justify-between">
      {/* TOP ROW RIGHT SIDE */}
      <div>
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
            <Text className="heading2">Turatsinze Theoneste</Text>
          </Col>

          <Col>
            <Text className="normalText opacity_56">0788734295</Text>
          </Col>
        </Row>
      </div>

      {/* TOP ROW RIGHT SIDE */}
      <div>
        <div className="flex items-center gap-4">
          <Col>
            <Text className="heading2 orange">70, 000 Rwf</Text>
          </Col>

          <div className="flex items-center gap-4">
            <Text className="captionText">Order status:</Text>
            <Text className="normalText fowe700">PENDING</Text>
          </div>
        </div>
      </div>
    </div>

    {/* MIDDLE ROW */}
    <Table
      className="data_table"
      dataSource={orderData}
      rowKey={(record) => record.key}
      pagination={false}
      showHeader={false}
      bordered={false}
      scroll={{ x: "100%" }}
      tableLayout="auto"
    >
      <Column
        key="key"
        title="Name"
        render={(text: Types, record: Types) => {
          const child = (
            <div className="flex items-center gap-3">
              <Image
                width={22}
                src="/icons/ic-ecommerce-delivery-yellow.svg"
                preview={false}
                alt=""
              />

              <div className="flex items-center gap-3">
                <Text className="heading2 nowrap">{record.plate}</Text>
                <Text className="normalText nowrap">{record.driver}</Text>
              </div>
            </div>
          );
          return { children: child, props: { "data-label": "Name" } };
        }}
      />

      <Column
        key="name"
        title="Weight"
        render={(text: Types, record: Types) => {
          const child = (
            <div className="flex items-center gap-3">
              <Text className="heading2 nowrap">{record.weight}</Text>

              <Text className="captionText nowrap">{record.unitPrice}</Text>
            </div>
          );
          return { children: child, props: { "data-label": "Name" } };
        }}
      />

      <Column
        key="from"
        title="From"
        render={(text: Types, record: Types) => {
          const child = (
            <div className="flex items-center gap-2">
              <Text className="heading2">From</Text>
              <Text className="normalText">{record.from}</Text>
            </div>
          );
          return { children: child, props: { "data-label": "Phone number" } };
        }}
      />

      <Column
        key="key"
        title="To"
        render={(text: Types, record: Types) => {
          const child = (
            <div className="flex items-center gap-2">
              <Text className="heading2">To</Text>
              <Text className="normalText">{record.to}</Text>
            </div>
          );
          return { children: child, props: { "data-label": "Email" } };
        }}
      />

      <Column
        key="key"
        title="Supporting"
        render={(text: Types, record: Types) => {
          const child = (
            <Text className="captionText opacity_56 italic nowrap mb0">
              {record.supporting}
            </Text>
          );
          return { children: child, props: { "data-label": "Status" } };
        }}
      />

      <Column
        key="key"
        title="Action"
        render={() => {
          const child = (
            <div className="flex items-center gap-3 justify-end">
              <Text className="heading2 red nowrap mb0">70, 000 Rwf</Text>

              <CustomButton
                type="secondary"
                size="icon"
                icon={
                  <Image
                    src="/icons/ic-ecommerce-invoice.svg"
                    alt="OX Delivery Logo"
                    width={12}
                    preview={false}
                  />
                }
              />

              <CustomButton
                type="danger"
                size="icon"
                icon={
                  <Image
                    src="/icons/ic-actions-remove.svg"
                    alt="OX Delivery Logo"
                    width={12}
                    preview={false}
                  />
                }
              />

              <CustomButton type="secondary" size="small">
                View
              </CustomButton>
            </div>
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
            <Text className="normalText opacity_56 nowrap">
              Created: 11th May 2022 -
            </Text>
          </Col>

          <Col>
            <Text className="normalText opacity_56 italic nowrap ">
              Edited by Yves Honore
            </Text>
          </Col>
        </Row>
      </Col>

      <Col>
        <Text className="normalText opacity_56 italic nowrap mb0">
          NYAMASHEKE Depot
        </Text>
      </Col>
    </Row>
  </div>
);

export default OrdersTable;
