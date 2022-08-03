import { FC, useEffect } from "react";
import { Header_Links } from "../../../lib/types/links";
import { Typography } from "antd";
import TopNavigatorRightSideWrapper from "./RightSide/TopNavigatorRightSideWrapper";
import RightSideRevenue from "./RightSide/Analytics/RightSideRevenue";
import RightSideKPIs from "./RightSide/Analytics/RightSideKPIs";

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
    <div
      style={{ background: "#fcfcfc" }}
      className="w-full shadow-[0px_-6px_24px_#0000001A] px-5 py-1 sticky top-0 z-50 flex justify-between items-center"
    >
      <div className="flex items-center justify-between gap-10">
        {headerLinks.map((link, index) => {
          return (
            <button
              key={index}
              className={`py-4 cursor-pointer text-sm ${
                active === link.id && "border-b-4 border-ox-yellow"
              }`}
              onClick={() => toggleActiveHandler(link.id)}
            >
              <Text className={`${active === link.id && "font-bold"} animate`}>
                {link.label}
              </Text>
            </button>
          );
        })}
      </div>

      {active === "revenues" && (
        <TopNavigatorRightSideWrapper>
          <RightSideRevenue />
        </TopNavigatorRightSideWrapper>
      )}
      {active === "KPIs" && (
        <TopNavigatorRightSideWrapper>
          <RightSideKPIs />
        </TopNavigatorRightSideWrapper>
      )}
    </div>
  );
};

export default TopNavigator;
