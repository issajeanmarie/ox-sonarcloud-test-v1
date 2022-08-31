import { Image, Table } from "antd";
import { SettingsCategoriesTableData } from "../Dummies/SettingsCategoriesTableData";
import CustomButton from "../../Shared/Button/button";

const SettingsCategoriesTable = () => {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (text: number) => <p className="black text12 fowe400">{text}</p>,
      width: "50%"
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text: string) => <p className="black text12 fowe400">{text}</p>,
      width: "50%"
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: () => (
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
      ),
      width: "50%"
    }
  ];
  return (
    <Table
      key="settingsCategoriesTable"
      pagination={false}
      showHeader={false}
      columns={columns}
      expandable={{
        childrenColumnName: "children",
        defaultExpandAllRows: true,
        expandIcon: () => null
      }}
      dataSource={SettingsCategoriesTableData}
    />
  );
};

export default SettingsCategoriesTable;
