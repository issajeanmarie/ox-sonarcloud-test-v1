/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import { DriverProfileResponse } from "../../lib/types/Accounts/drivers";
import { abbreviateNumber } from "../../utils/numberFormatter";
import DropDownSelector from "../Shared/DropDownSelector";

interface Props {
  selectedFilter: any;
  setSelectedFilter: React.Dispatch<React.SetStateAction<any>>;
  shiftsNumber: number;
  driverData: DriverProfileResponse | undefined;
}

const DriverLeftHeader = ({
  selectedFilter,
  setSelectedFilter,
  shiftsNumber,
  driverData
}: Props) => {
  return (
    <Row className="bg-white mb-4 py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1] flex justify-between sticky top-0 z-10">
      <Col className="flex items-center gap-6">
        <span className="font-bold">
          Shift history ({abbreviateNumber(shiftsNumber)})
        </span>

        <DropDownSelector
          label="Filter"
          dropDownContent={[
            { id: 0, name: "All shifts", value: "" },
            { id: 1, name: "Started", value: "STARTED" },
            { id: 2, name: "Ended", value: "ENDED" }
          ]}
          defaultSelected={selectedFilter}
          setDefaultSelected={setSelectedFilter}
        />
      </Col>

      <Col className="flex items-center gap-4">
        <span className=" opacity_56">Total Revenue Made:</span>
        <span className="font-bold yellow">
          {abbreviateNumber(driverData?.payload?.totalRevenue || 0)} Rwf
        </span>
      </Col>
    </Row>
  );
};

export default DriverLeftHeader;
