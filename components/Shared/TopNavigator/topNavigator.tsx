import { FC, useEffect } from "react";
import CustomInput from "../../Shared/Input";
import { Header_Links } from "../../../lib/types/links";
import { Image, Typography } from "antd";
import TopNavigatorRightSide from "./TopNavigatorRightSide";

const { Text } = Typography;

interface TopNavigatorProps {
  headerLinks: Header_Links[];
  setActive: (menu: string) => void;
  active: string;
  toggleActiveHandler: (menuID: string) => void;
}

const TopNavigator: FC<TopNavigatorProps> = ({
  headerLinks,
  setActive,
  active,
  toggleActiveHandler
}) => {
  useEffect(() => {
    headerLinks && setActive && setActive(headerLinks[0].id);
  }, [headerLinks, setActive]);

  return (
    <div className="w-full shadow-[0px_-6px_24px_#0000001A] px-5 bg-ox-white sticky top-0 z-50 flex justify-between items-center">
      <div className="flex items-center justify-between gap-10">
        {headerLinks.map((link, index) => {
          return (
            <button
              key={index}
              className={`py-4 cursor-pointer ${
                active === link.id && "border-b-4 border-ox-yellow"
              }`}
              onClick={() => toggleActiveHandler(link.id)}
            >
              <Text
                className={`${
                  active === link.id ? "font-bold" : "normalText"
                } animate`}
              >
                {link.label}
              </Text>
            </button>
          );
        })}
      </div>

      {active === "revenues" && (
        <TopNavigatorRightSide>
          <CustomInput
            type="select"
            label=""
            placeholder="Show: Last 7 days"
            options={[
              { label: "Item one", value: "one" },
              { label: "Item two", value: "two" },
              { label: "Item three", value: "three" }
            ]}
            name="sort"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />
          <CustomInput
            type="date"
            name="Start"
            placeholder="Start"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
              />
            }
          />
          <CustomInput
            type="date"
            name="End"
            placeholder="End"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
              />
            }
          />
        </TopNavigatorRightSide>
      )}
    </div>
  );
};

export default TopNavigator;
