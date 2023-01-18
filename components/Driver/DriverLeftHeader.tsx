/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import { abbreviateNumber } from "../../utils/numberFormatter";
import DropDownSelector from "../Shared/DropDownSelector";

const DriverLeftHeader = ({ selectedFilter, setSelectedFilter }: any) => {
  return (
    <Row className="bg-white mb-4 py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1] flex justify-between sticky top-0 z-10">
      <Col className="flex items-center gap-6">
        <span className="font-bold">Shift history (21)</span>

        <DropDownSelector
          label="Filter"
          dropDownContent={[
            { id: 0, name: "All shifts" },
            { id: 1, name: "Half paid", value: "HALF_PAID" },
            { id: 2, name: "Full paid", value: "FULL_PAID" },
            { id: 3, name: "Pending", value: "PENDING" },
            { id: 4, name: "Write off", value: "WRITTEN_OFF" }
          ]}
          defaultSelected={selectedFilter}
          setDefaultSelected={setSelectedFilter}
        />
      </Col>
      <Col className="flex items-center gap-4">
        <span className=" opacity_56">Total Revenue Made:</span>
        <span className="font-bold yellow">
          {abbreviateNumber(764787678)} Rwf
        </span>
      </Col>
    </Row>
  );
};

export default DriverLeftHeader;
