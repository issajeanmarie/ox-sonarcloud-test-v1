import { FC } from "react";
import { DriverProfileResponse } from "../../lib/types/Accounts/drivers";
import DriverInfo from "./DriverInfo";
import DriverOnGoingShift from "./DriverOnGoingShift";

interface Props {
  driverData: DriverProfileResponse;
}

const DriverRightSide: FC<Props> = ({ driverData }) => {
  return (
    <>
      <DriverInfo driverData={driverData} />
      {driverData?.payload?.profileInfo?.ongoingShift && (
        <DriverOnGoingShift driverData={driverData} />
      )}
    </>
  );
};

export default DriverRightSide;
