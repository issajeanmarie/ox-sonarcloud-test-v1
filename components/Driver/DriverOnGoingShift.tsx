/* eslint-disable @typescript-eslint/no-explicit-any */
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import CustomButton from "../Shared/Button";
import Divider from "antd/lib/divider";
import TruckOverviewCard from "../Analytics/Trucks/TruckOverviewCard";

const DriverOnGoingShift = () => {
  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">ONGOING SHIFT</span>
          </div>
        </Col>

        <Col flex="none">
          <CustomButton type="danger" size="small">
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
            <TruckOverviewCard data={{ name: "Orders", num: 12323 }} />
          </Col>

          <Col
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
            className="mb-8"
          >
            <TruckOverviewCard data={{ name: "Duration", num: 12323 }} />
          </Col>
        </Row>
      </div>
    </Row>
  );
};

export default DriverOnGoingShift;
