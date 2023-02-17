import Col from "antd/lib/col";
import Collapse from "antd/lib/collapse";
import Row from "antd/lib/row";
import Image from "antd/lib/image";
import DriverLeftHeader from "./DriverLeftHeader";
import DriverShiftHistoryTable from "./DriverShiftHistoryTable";
import LeftSideInnerHeader from "./LeftSideInnerHeader";
import { DriverLeftSideProps } from "../../lib/types/Accounts/drivers";
import moment from "moment";
import DriverShiftsTableHeader from "./DriverShiftsTableHeader";
import { MediumSpinLoader } from "../Shared/Loaders/Loaders";
import CustomButton from "../Shared/Button/button";
import { useEffect, useState } from "react";
import { useLazyGetDriverShiftOrdersQuery } from "../../lib/api/endpoints/Accounts/driversEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";

const { Panel } = Collapse;

const DriverLeftSide = ({
  selectedFilter,
  setSelectedFilter,
  shifts,
  isLoading,
  showPagination,
  isLoadMoreLoading,
  handleLoadMore,
  driverData
}: DriverLeftSideProps) => {
  const [openPanel, setOpenPanel] = useState<number | null>(null);
  const [getDriverShiftOrders, { isFetching: isFetchingOrders, data }] =
    useLazyGetDriverShiftOrdersQuery();

  useEffect(() => {
    if (openPanel) {
      handleAPIRequests({
        request: getDriverShiftOrders,
        id: openPanel
      });
    }
  }, [getDriverShiftOrders, openPanel]);

  return (
    <>
      <DriverLeftHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        shiftsNumber={shifts?.payload?.totalElements || 0}
        driverData={driverData}
      />

      <DriverShiftsTableHeader />

      <div className="mb-10">
        {isLoading ? (
          <div className="w-[100%] flex justify-center p-12">
            <MediumSpinLoader />
          </div>
        ) : (
          <Collapse bordered={false} accordion>
            {shifts?.payload?.content?.map((shift, index) => (
              <Panel
                key={shift.id}
                showArrow={false}
                header={
                  <Row
                    onClick={() => setOpenPanel(shift.id)}
                    align="middle"
                    justify="space-between"
                    className="w-[100%]"
                  >
                    <Col span={14}>
                      <Row align="middle" gutter={32} wrap={false}>
                        <Col md={2} lg={2}>
                          <span className="text-gray-400">{index + 1}</span>
                        </Col>

                        <Col md={6} lg={6} xl={10} xxl={10}>
                          <span className="text_ellipsis text-gray-400">
                            {moment(shift?.startDateTime).format("ll")}
                          </span>
                        </Col>

                        <Col md={14} lg={14} xl={14} xxl={12}>
                          <span className="text font-bold text-ox-dark">
                            {shift?.duration}
                          </span>
                        </Col>
                      </Row>
                    </Col>

                    <Col span={8} style={{ marginRight: "-12px" }}>
                      <Row align="middle" justify="end" gutter={32}>
                        <Col md={14} lg={14} xl={14} xxl={12}>
                          <span className="text font-bold text-ox-dark">
                            {shift?.truck?.plateNumber}
                          </span>
                        </Col>

                        <Col>
                          <Image
                            className="opacity-50"
                            src="/icons/unfold_more_FILL0_wght400_GRAD0_opsz48.svg"
                            preview={false}
                            width={24}
                            alt=""
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                }
                className="mabo6"
                style={{
                  borderRadius: "4px",
                  padding: "10px",
                  background: "white",
                  marginBottom: "12px",
                  borderBottom: "1px solid transparent"
                }}
              >
                {isFetchingOrders ? (
                  <div className="w-[100%] flex justify-center p-12">
                    <MediumSpinLoader />
                  </div>
                ) : (
                  data && (
                    <div className="border border-grey rounded p-2 m-2">
                      <LeftSideInnerHeader
                        totalRevenue={data?.payload?.totalRevenue || 0}
                        ordersNumbers={data?.payload?.orders?.length || 0}
                      />

                      <DriverShiftHistoryTable
                        data={data}
                        isFetchingOrders={isFetchingOrders}
                      />
                    </div>
                  )
                )}
              </Panel>
            ))}
          </Collapse>
        )}
      </div>

      {showPagination && (
        <div style={{ width: "12%", margin: "32px auto" }}>
          <CustomButton
            loading={isLoadMoreLoading}
            onClick={handleLoadMore}
            type="secondary"
          >
            Load more
          </CustomButton>
        </div>
      )}
    </>
  );
};

export default DriverLeftSide;
