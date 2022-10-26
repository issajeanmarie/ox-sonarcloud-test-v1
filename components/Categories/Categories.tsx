import Table from "antd/lib/table";
import { Col, Row } from "antd";
import Typography from "antd/lib/typography";
import Card from "antd/lib/card";
import CustomInput from "../Shared/Input";
import CustomButton from "../Shared/Button/button";
import Image from "antd/lib/image";

const { Column } = Table;
const { Text } = Typography;

// type Types = {
//   key: number;
//   category: string;
// };

const CategoryData = [
  {
    key: 1,
    parentCategory: "Bell Pepper/Poivron"
  },
  {
    key: 2,
    parentCategory: "Butter"
  },
  {
    key: 3,
    parentCategory: "Carrots",
    subCategories: [
      {
        id: 1,
        name: "Salad"
      },
      {
        id: 2,
        name: "Inkwavu"
      }
    ]
  }
];

const CategoriesTable = () => (
  <Card
    className="radius2 mato32 noborder"
    headStyle={{ border: "none", marginBottom: "0" }}
    style={{ padding: "30px", borderRadius: "4px" }}
    title={<Text className="mediumText">Categories(22)</Text>}
  >
    {/* FILTERS */}
    <div
      style={{ borderBottom: "1px solid #f0f0f0" }}
      className="flex items-center justify-between dashboard_header shadow p-4"
    >
      {/* LEFT SIDE  */}
      <div className="flex items-center">
        <CustomInput
          type="text"
          name="search"
          placeholder="Search category"
          suffixIcon={
            <Image
              width={14}
              src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
              preview={false}
              alt=""
            />
          }
        />
      </div>

      {/* RIGHT SIDE */}
      <Row gutter={24} align="bottom" className="">
        <div className="flex">
          <Col sm={{ span: 24 }} xl={{ span: 14 }}>
            <CustomInput
              type="text"
              name="name"
              placeholder="Enter category name"
            />
          </Col>
          <Col sm={{ span: 24 }} xl={{ span: 10 }}>
            <CustomButton type="primary">ADD CATEGORY</CustomButton>
          </Col>
        </div>
      </Row>
    </div>

    {/* MIDDLE ROW */}
    <Table
      className="data_table noborder"
      dataSource={CategoryData}
      rowKey={() => "record.key"}
      pagination={false}
      showHeader={false}
      bordered={false}
      scroll={{ x: "100%" }}
      tableLayout="auto"
      expandable={{
        // expandedRowRender: record => <p style={{ margin: 0 }}>record.subCategories</p>,
        // rowExpandable: record => record.subCategories !== 'Not Expandable',
        childrenColumnName: "subCategories",
        defaultExpandAllRows: true,
        expandIcon: () => null
      }}
    >
      {/* BOTTOM ROW */}
      <Column
        width="5%"
        key="key"
        title="#"
        render={() => {
          const child = (
            <Text className="normalText opacity_56">record.key</Text>
          );
          return { children: child, props: { "data-label": "#" } };
        }}
      />

      <Column
        width="30%"
        key="key"
        title="Depot"
        render={() => {
          const child = (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Text className="heading2 nowrap">record.parentCategory</Text>
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
            <div className="flex items-center  gap-3 justify-end">
              <Text className="captionText opacity_56 italic nowrap mb0">
                Subcategory
              </Text>
            </div>
          );
          return { children: child, props: { "data-label": "Revenue" } };
        }}
      />
      <Column
        key="key"
        title="Action"
        render={() => {
          const child = (
            <div className="flex items-center gap-3 justify-end">
              <CustomButton
                type="secondary"
                size="icon"
                icon={
                  <Image
                    src="/icons/ic-actions-add-simple.svg"
                    alt="OX Delivery Logo"
                    width={12}
                    preview={false}
                  />
                }
              />

              <CustomButton
                type="normal"
                size="icon"
                icon={
                  <Image
                    src="/icons/ic-contact-edit.svg"
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
            </div>
          );
          return { children: child, props: { "data-label": "Status" } };
        }}
      />
    </Table>
  </Card>
);

export default CategoriesTable;
