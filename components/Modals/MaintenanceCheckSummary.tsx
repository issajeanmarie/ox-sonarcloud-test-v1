/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Checkbox, Col, Row } from "antd";
import React from "react";
import Image from "antd/lib/image";
import Form from "antd/lib/form";
import Input from "../Shared/Input";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { yearDateFormat } from "../../config/dateFormats";

const MaintenanceCheckSummary = ({
  summary,
  setSummary,
  setChecklistDate
}: any) => {
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

  const onStartDateChange = (_: string, date: string) => {
    setChecklistDate(date);
  };

  const [form] = useForm();

  form.setFieldsValue({
    date: moment(moment(), yearDateFormat)
  });

  return (
    <Form
      name="Filter orders"
      form={form}
      layout="vertical"
      title="FILTER ORDERS"
    >
      <div className="flex w-[100%] gap-12">
        <div className="mb-6 flex-1">
          <Input
            onDateChange={onStartDateChange}
            type="date"
            name="date"
            label="Date"
            placeholder="Date"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
              />
            }
          />
        </div>

        <div className="mb-6 flex-1">
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
          <Col span={10}>
            <Row align="middle" gutter={32}>
              <Col>Item</Col>
            </Row>
          </Col>

          {/* Left side */}
          <Col span={14}>
            <Row align="middle" gutter={32}>
              <Col span={4}>Ok</Col>
              <Col span={8}>Needs repair</Col>
              <Col span={7}>Repaired</Col>
              <Col span={5}>N/A</Col>
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
          <Col span={10}>
            <Row align="middle" gutter={32}>
              <Col className="font-bold">Overall condition of the vehicle</Col>
            </Row>
          </Col>

          {/* Left side */}
          <Col span={14}>
            <Row align="middle" gutter={32}>
              <Col span={4}>
                <Checkbox
                  checked={overallStatus === "OK"}
                  onChange={() => setOverallStatus("OK")}
                />
              </Col>

              <Col span={8}>
                <Checkbox
                  checked={overallStatus === "NEEDS_REPAIR"}
                  onChange={() => setOverallStatus("NEEDS_REPAIR")}
                />
              </Col>

              <Col span={7}>
                <Checkbox
                  checked={overallStatus === "REPAIRED"}
                  onChange={() => setOverallStatus("REPAIRED")}
                />
              </Col>

              <Col span={5}>
                <Checkbox
                  checked={overallStatus === "NOT_APPLICABLE"}
                  onChange={() => setOverallStatus("NOT_APPLICABLE")}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default MaintenanceCheckSummary;
