import { FC, useEffect } from "react";
import { Typography } from "antd";
import { SettingsTopNavigatorProps } from "../../lib/types/components/SettingsTopNavigatorProps";

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
    </div>
  );
};

export default SettingsTopNavigator;
