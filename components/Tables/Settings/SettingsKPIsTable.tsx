import React, { FC, useState } from "react";
import CustomInput from "../../Shared/Input";
import Input from "../../Shared/Input";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { SettingsKPIsTableProps } from "../../../lib/types/pageTypes/Settings/SettingsKPIsTableProps";

const SettingsKPIsTable: FC<SettingsKPIsTableProps> = ({ data: kpis }) => {
  const [editedPerKMs, setEditedPerKMs] = useState<React.SetStateAction<any>>(
    []
  );

  const handleTargetPerDayChange = (value: any) => value;

  const handleTargetPerKMChange = (value: any) => {
    const filteredResult = editedPerKMs.filter(
      (perKMs: { receivedValue: { id: number } }) =>
        perKMs.receivedValue.id !== value.receivedValue.id
    );
    setEditedPerKMs([{ ...value }, ...filteredResult]);
  };

  return kpis?.map(
    (
      kpi: { targetPerDay: number; targetPerKm: number; depotId: number },
      index: number
    ) => (
      <Row key={kpi.depotId} className="w-[100%] mb-4" gutter={32}>
        <Col>{index + 1}</Col>

        <Col>
          <CustomInput
            onChange={handleTargetPerDayChange}
            defaultValue={kpi?.targetPerDay}
            type="text"
            inputType="number"
            placeholder="Type revenue..."
            name="revenue"
            suffixIcon={
              <span
                style={{ color: "#000000", opacity: 0.34, fontSize: "0.9rem" }}
              >
                Rwf
              </span>
            }
          />
        </Col>

        <Col>
          <Input
            selfHandleValue={{
              id: kpi.depotId,
              targetPerDay: kpi?.targetPerDay
            }}
            onChange={handleTargetPerKMChange}
            defaultValue={kpi?.targetPerKm}
            type="text"
            inputType="number"
            placeholder="Type revenue/km..."
            name="rperkm"
            suffixIcon={
              <span
                style={{ color: "#000000", opacity: 0.34, fontSize: "0.9rem" }}
              >
                Rwf
              </span>
            }
          />
        </Col>
      </Row>
    )
  );
};

export default SettingsKPIsTable;
