/* eslint-disable @typescript-eslint/no-explicit-any */
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import CustomButton from "../Shared/Button";
import Divider from "antd/lib/divider";
import TruckOverviewCard from "../Analytics/Trucks/TruckOverviewCard";
import { FC } from "react";
import { DriverProfileResponse } from "../../lib/types/Accounts/drivers";
import TimeOverviewCard from "../Analytics/Trucks/TimeOverviewCard";
import { useEndShiftMutation } from "../../lib/api/endpoints/Accounts/driversEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";

interface Props {
  driverData: DriverProfileResponse;
}

const DriverOnGoingShift: FC<Props> = ({ driverData }) => {
  const [endShift, { isLoading }] = useEndShiftMutation();

  const handleEndShift = () => {
    handleAPIRequests({
      request: endShift,
      id: driverData?.payload?.profileInfo?.id,
      showSuccess: true
    });
  };

  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">ONGOING SHIFT</span>
          </div>
        </Col>

        <Col flex="none">
          <CustomButton
            type="danger"
            size="small"
            loading={isLoading}
            onClick={handleEndShift}
          >
            <span className="red">STOP SHIFT</span>
          </CustomButton>
        </Col>
      </Row>

      <Divider style={{ padding: 0, margin: 0 }} />

      <div className="w-full p-8">
        <Row gutter={24} className="p-0" justify="space-between">
          <Col
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
            className="mb-8"
          >
            <TimeOverviewCard
              data={{
                name: "Duration",
                profileInfo: driverData?.payload?.profileInfo
              }}
            />
          </Col>

          <Col
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
            className="mb-8"
          >
            <TruckOverviewCard
              data={{
                name: "Orders",
                num: driverData?.payload?.ongoingOrders
              }}
            />
          </Col>
        </Row>
      </div>
    </Row>
  );
};

export default DriverOnGoingShift;
