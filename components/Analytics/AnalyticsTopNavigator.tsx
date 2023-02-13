import { FC, useEffect } from "react";
import { Typography } from "antd";
import { AnalyticsTopNavigatorProps } from "../../lib/types/pageTypes/Analytics/AnalyticsTopNavigatorProps";
import TopNavigatorRightSideWrapper from "../Shared/TopNavigator/RightSide/TopNavigatorRightSideWrapper";
import RightSideRevenue from "../Shared/TopNavigator/RightSide/Analytics/RightSideRevenue";
import RightSideKPIs from "../Shared/TopNavigator/RightSide/Analytics/RightSideKPIs";
import Navbar from "../Shared/Content/Navbar";
import { useRouter } from "next/router";

const { Text } = Typography;

const AnalyticsTopNavigator: FC<AnalyticsTopNavigatorProps> = ({
  headerLinks,
  setActive,
  toggleActiveHandler,
  onStartDateChange,
  onEndDateChange,
  selectedDay,
  setSelectedDay,
  isDateCustom,
  setIsDateCustom,
  daysList,
  selectedDepot,
  setSelectedDepot,
  form
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
              query?.currentTab === link.id && "active_submenu relative"
            }`}
            onClick={() => toggleActiveHandler(link.id)}
          >
            <Text
              className={`${
                query?.currentTab === link.id && "font-bold"
              } animate`}
            >
              {link.label}
            </Text>
          </button>
        );
      })}
    </div>
  );

  const RightSide = (
    <>
      {query?.currentTab === "REVENUE" && (
        <TopNavigatorRightSideWrapper>
          <RightSideRevenue
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            daysList={daysList}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            isDateCustom={isDateCustom}
            setIsDateCustom={setIsDateCustom}
            form={form}
          />
        </TopNavigatorRightSideWrapper>
      )}
      {query?.currentTab === "KPIs" && (
        <TopNavigatorRightSideWrapper>
          <RightSideKPIs
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            daysList={daysList}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            isDateCustom={isDateCustom}
            setIsDateCustom={setIsDateCustom}
            selectedDepot={selectedDepot}
            setSelectedDepot={setSelectedDepot}
            form={form}
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

export default AnalyticsTopNavigator;
