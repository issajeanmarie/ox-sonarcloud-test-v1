import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Dropdown from "antd/lib/dropdown";
import { DropDownSelectorTypes } from "../../../lib/types/components/DropdownSelectorProps";

type ContentTypes = {
  name: string;
  id: number;
};

const DropDownSelector = ({
  dropDownContent,
  defaultSelected,
  setDefaultSelected,
  label
}: DropDownSelectorTypes) => {
  const dropdownMenu = (
    <div className="max-h-[50vh] overflow-y-auto radius4 p-6 bg-white rounded shadow-[0px_0px_19px_#2A354808] border">
      {dropDownContent?.map((content: ContentTypes) => (
        <Row
          onClick={() => setDefaultSelected(content)}
          className={`${
            defaultSelected?.id === content.id
              ? "bg_white_yellow p-2 cursor-pointer"
              : "hover:bg-gray-50 hover:p-2"
          } cursor-pointer mb-2 rounded transition-all duration-300`}
          key={content.id}
        >
          <Col>{content.name}</Col>
        </Row>
      ))}
    </div>
  );

  return (
    <div>
      <Dropdown overlay={dropdownMenu} trigger={["hover"]}>
        <Row
          gutter={12}
          align="middle"
          justify="space-between"
          className="border p-2 py-2.8 rounded pointer"
          wrap={false}
        >
          <Col className="font-bold text-sm">{label}:</Col>

          <Col className="text_ellipsis text-sm">
            {defaultSelected?.name || "--- --- ---"}
          </Col>

          <Col>
            <Image
              className="mb-1"
              preview={false}
              src="/icons/expand_more_black_24dp.svg"
              alt=""
              width={8}
            />
          </Col>
        </Row>
      </Dropdown>
    </div>
  );
};

export default DropDownSelector;
