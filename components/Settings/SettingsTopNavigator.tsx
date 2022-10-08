import { FC, useEffect } from "react";
import { Typography } from "antd";
import { SettingsTopNavigatorProps } from "../../lib/types/components/SettingsTopNavigatorProps";
import Navbar from "../Shared/Content/Navbar";

const { Text } = Typography;

const SettingsTopNavigator: FC<SettingsTopNavigatorProps> = ({
  headerLinks,
  setActive,
  active,
  toggleActiveHandler
}) => {
  useEffect(() => {
    headerLinks && setActive && setActive(headerLinks[0].id);
  }, [headerLinks, setActive]);

  const LeftSide = (
    <div className="flex items-center justify-between gap-10">
      {headerLinks.map((link, index) => {
        return (
          <button
            key={index}
            className={`py-4 cursor-pointer text-sm ${
              active === link.id && "active_submenu relative"
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
  );

  return (
    <>
      <Navbar LeftSide={LeftSide} type="FULL" />
    </>
  );
};

export default SettingsTopNavigator;
