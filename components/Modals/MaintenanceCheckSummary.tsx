/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Checkbox, Col, Row } from "antd";
import React from "react";
import Input from "../Shared/Input/input";

const MaintenanceCheckSummary = ({ summary, setSummary }: any) => {
  const [overallStatus, setOverallStatus] = useState("NOT_APPLICABLE");

  const handleMileageChange = (value: number) => {
    setSummary({ ...summary, mileage: value });
  };

  const handleObservationsChange = (value: string) => {
    setSummary({ ...summary, observations: value });
  };

  const handleRecommendationsChange = (value: string) => {
    setSummary({ ...summary, recommendations: value });
  };

  useEffect(() => {
    setSummary({ ...summary, overallCondition: overallStatus });
  }, [overallStatus, setSummary]);

  return (
    <>
      <div className="mb-6">
        <Input
          name="mileage"
          type="text"
          placeholder="00"
          label="Mileage"
          inputType="number"
          suffixIcon="KMs"
          onChange={(value: number) => handleMileageChange(value)}
        />
      </div>

      <div className="mb-6">
        <Input
          name="observations"
          type="text_area"
          label="Enter another observations"
          placeholder="Tell us more"
          onChange={(value: string) => handleObservationsChange(value)}
        />
      </div>

      <div className="mb-6">
        <Input
          name="recommendations"
          type="text_area"
          label="Recommendations"
          placeholder="Tell us more"
          onChange={(value: string) => handleRecommendationsChange(value)}
        />
      </div>

      <div className="px-4">
        <Row
          align="middle"
          gutter={32}
          justify="space-between"
          className="py-6 text-gray-400 font-bold mb-4"
        >
          {/* Right side */}
          <Col span={12}>
            <Row align="middle" gutter={32}>
              <Col>Item</Col>
            </Row>
          </Col>

          {/* Left side */}
          <Col span={12}>
            <Row align="middle" gutter={32}>
              <Col span={9}>Needs repair</Col>
              <Col span={8}>Repaired</Col>
              <Col span={7}>N/A</Col>
            </Row>
          </Col>
        </Row>

        <Row
          align="middle"
          gutter={32}
          justify="space-between"
          className="border border-grey py-6 rounded mb-4"
        >
          {/* Right side */}
          <Col span={12}>
            <Row align="middle" gutter={32}>
              <Col className="font-bold">Overall condition of the vehicle</Col>
            </Row>
          </Col>

          {/* Left side */}
          <Col span={12}>
            <Row align="middle" gutter={32}>
              <Col span={9}>
                <Checkbox
                  checked={overallStatus === "NEEDS_REPAIR"}
                  onChange={() => setOverallStatus("NEEDS_REPAIR")}
                />
              </Col>

              <Col span={8}>
                <Checkbox
                  checked={overallStatus === "REPAIRED"}
                  onChange={() => setOverallStatus("REPAIRED")}
                />
              </Col>

              <Col span={7}>
                <Checkbox
                  checked={overallStatus === "NOT_APPLICABLE"}
                  onChange={() => setOverallStatus("NOT_APPLICABLE")}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MaintenanceCheckSummary;
