import { FC, useEffect } from "react";
import { Typography } from "antd";
import { WarehouseTopNavigatorProps } from "../../lib/types/components/WarehouseTopNavigatorProps";
import { useRouter } from "next/router";
import Navbar from "../Shared/Content/Navbar";

const { Text } = Typography;

const WarehouseTopNavigator: FC<WarehouseTopNavigatorProps> = ({
  headerLinks,
  setActive,
  toggleActiveHandler
}) => {
  useEffect(() => {
    headerLinks && setActive && setActive(headerLinks[0].id);
  }, [headerLinks, setActive]);

  const { query } = useRouter();

  const LeftSide = (
    <div className="flex items-center justify-between gap-10">
      {headerLinks.map((link, index) => {
        return (
          <button
            key={index}
            className={`py-4 cursor-pointer text-sm ${
              query?.wtb === link.id && "active_submenu relative"
            }`}
            onClick={() => toggleActiveHandler(link.id)}
          >
            <Text
              className={`${query?.wtb === link.id && "font-bold"} animate`}
            >
              {link.label}
            </Text>
          </button>
        );
      })}
    </div>
  );

  return <Navbar LeftSide={LeftSide} type="FULL" />;
};

export default WarehouseTopNavigator;
