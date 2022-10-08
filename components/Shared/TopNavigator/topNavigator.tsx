import { FC, useEffect } from "react";
import { Typography } from "antd";
import TopNavigatorRightSideWrapper from "./RightSide/TopNavigatorRightSideWrapper";
import RightSideRevenue from "./RightSide/Analytics/RightSideRevenue";
import RightSideKPIs from "./RightSide/Analytics/RightSideKPIs";
import { TopNavigatorProps } from "../../../lib/types/components/TopNavigatorProps";
import Navbar from "../Content/Navbar";

const { Text } = Typography;

const TopNavigator: FC<TopNavigatorProps> = ({
  headerLinks,
  setActive,
  active,
  toggleActiveHandler,
  onStartDateChange,
  onEndDateChange,
  selectedDay,
  setselectedDay,
  isDateCustom,
  setIsDateCustom,
  daysList,
  selectedDepot,
  setSelectedDepot
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

  const RightSide = (
    <>
      {active === "revenue" && (
        <TopNavigatorRightSideWrapper>
          <RightSideRevenue
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            daysList={daysList}
            selectedDay={selectedDay}
            setSelectedDay={setselectedDay}
            isDateCustom={isDateCustom}
            setIsDateCustom={setIsDateCustom}
          />
        </TopNavigatorRightSideWrapper>
      )}
      {active === "KPIs" && (
        <TopNavigatorRightSideWrapper>
          <RightSideKPIs
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            daysList={daysList}
            selectedDay={selectedDay}
            setSelectedDay={setselectedDay}
            isDateCustom={isDateCustom}
            setIsDateCustom={setIsDateCustom}
            selectedDepot={selectedDepot}
            setSelectedDepot={setSelectedDepot}
          />
        </TopNavigatorRightSideWrapper>
      )}
    </>
  );

  return (
    <>
      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="FULL" />
    </>
  );
};

export default TopNavigator;
