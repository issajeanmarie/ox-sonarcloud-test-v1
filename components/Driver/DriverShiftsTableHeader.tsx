import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

const DriverShiftsTableHeader = () => {
  return (
    <Row align="middle" justify="space-between" className="w-[100%] my-6 px-8">
      <Col span={14}>
        <Row align="middle" gutter={32} wrap={false}>
          <Col md={2} lg={2}>
            <span className="text-gray-400 text-sm font-bold">#</span>
          </Col>

          <Col md={6} lg={6} xl={10} xxl={10}>
            <span className="text_ellipsis text-gray-400 text-sm font-bold">
              Date
            </span>
          </Col>

          <Col md={14} lg={14} xl={14} xxl={12}>
            <span className="text_ellipsis text-gray-400 text-sm font-bold">
              Duration
            </span>
          </Col>
        </Row>
      </Col>

      <Col span={8} style={{ marginRight: "-12px" }}>
        <Row align="middle" justify="end" gutter={32}>
          <Col md={14} lg={14} xl={14} xxl={12}>
            <span className="text-gray-400 text-sm font-bold">Truck</span>
          </Col>

          <Col className="w-[54px]"></Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DriverShiftsTableHeader;
