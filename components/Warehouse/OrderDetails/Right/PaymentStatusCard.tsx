import { Card, Col, Row } from "antd";
import React, { FC } from "react";

type PaymentStatusCardTypes = {
  title: string;
  count: string;
};

const PaymentStatusCard: FC<PaymentStatusCardTypes> = ({ title, count }) => {
  return (
    <Col flex="auto">
      <Card className="radius4 overviewCard border-[1px_solid_#EAEFF2]">
        <span className="block mb-2 text_ellipsis" title={title}>
          {title}
        </span>

        <Row align="middle" justify="space-between">
          <Col>
            <span className="text-2xl font-semibold block yellow">{count}</span>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default PaymentStatusCard;
