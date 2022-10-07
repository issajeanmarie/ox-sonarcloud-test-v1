import { FC, useEffect } from "react";
import { Typography } from "antd";
import { AllAccountsTopNavigatorProps } from "../../lib/types/components/AllAccountsTopNavigatorProps";
import { useRouter } from "next/router";
import Navbar from "../Shared/Content/Navbar";

const { Text } = Typography;

const AllAccountsTopNavigator: FC<AllAccountsTopNavigatorProps> = ({
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
              query?.tb === link.id && "active_submenu relative"
            }`}
            onClick={() => toggleActiveHandler(link.id)}
          >
            <Text className={`${query?.tb === link.id && "font-bold"} animate`}>
              {link.label}
            </Text>
          </button>
        );
      })}
    </div>
  );

  return <Navbar LeftSide={LeftSide} type="FULL" />;
};

export default AllAccountsTopNavigator;
