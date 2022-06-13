import { FC, useEffect, useState } from "react";
import { Header_Links } from "../../../lib/types/links";
import { Typography } from "antd";

const { Text } = Typography;

interface TopNavigatorProps {
  headerLinks: Header_Links[];
}

const TopNavigator: FC<TopNavigatorProps> = ({ headerLinks }) => {
  const [active, setActive] = useState<string>();

  const toggleActiveHandler = (id: string) => {
    setActive(id);
  };

  useEffect(() => {
    headerLinks && setActive(headerLinks[0].id);
  }, []);

  return (
    <div className="w-full shadow px-5 bg-ox-white">
      <div className="flex items-center gap-10">
        {headerLinks.map((link, index) => {
          return (
            <div
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopNavigator;
