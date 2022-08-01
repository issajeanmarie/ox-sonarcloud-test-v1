import { FC, useEffect } from "react";
import { Header_Links } from "../../../lib/types/links";
import { Typography } from "antd";

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
    <div className="w-full shadow-[0px_-6px_24px_#0000001A] px-5 bg-ox-white sticky top-0 z-50 flex items-center gap-10">
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
  );
};

export default TopNavigator;
