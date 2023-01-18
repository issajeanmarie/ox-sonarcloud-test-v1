import { Col } from "antd";
import DriverInfo from "./DriverInfo";
import DriverOnGoingShift from "./DriverOnGoingShift";

const DriverRightSide = () => {
  return (
    <Col
      xs={24}
      sm={24}
      md={10}
      lg={10}
      xl={10}
      xxl={10}
      className="h-[86vh] overflow-auto"
    >
      <DriverInfo />

      <DriverOnGoingShift />
    </Col>
  );
};

export default DriverRightSide;
