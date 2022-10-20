/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import CustomInput from "../../Shared/Input";
import Input from "../../Shared/Input";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { SettingsKPIsTableProps } from "../../../lib/types/pageTypes/Settings/SettingsKPIsTableProps";
import Button from "../../Shared/Button";
import { useAddKpiMutation } from "../../../lib/api/endpoints/settings/settingsEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

type OneKPITypes = {
  targetPerDay: number;
  targetPerKm: number;
  depotId: number;
  depotName?: string;
};

const SettingsKPIsTable: FC<SettingsKPIsTableProps> = ({ data: KPIs }) => {
  const [readyKPIs, setReadyKPIs] = useState<any>([]);

  useEffect(() => {
    setReadyKPIs(KPIs);
  }, [KPIs]);

  const handleKPIChange = (value: any) => {
    const newReadyKPIs: OneKPITypes[] = [];

    readyKPIs?.map((kpi: OneKPITypes) => {
      const { depotName, ...filteredKPIs } = kpi;

      if (kpi.depotId === value.receivedValue.id) {
        if (value.receivedValue.editedField === "targetPerDay") {
          newReadyKPIs.push({ ...filteredKPIs, targetPerDay: +value.value });
        } else {
          newReadyKPIs.push({ ...filteredKPIs, targetPerKm: +value.value });
        }
      } else {
        newReadyKPIs.push(filteredKPIs);
      }
    });

    setReadyKPIs(newReadyKPIs);
  };

  const [addKpi, { isLoading: isAddingKPIs }] = useAddKpiMutation();

  const saveKPIs = () => {
    handleAPIRequests({
      request: addKpi,
      kpis: readyKPIs,
      showSuccess: true
    });
  };

  return (
    <>
      <Row
        className="w-[100%] border-b border-gray py-6"
        gutter={32}
        align="middle"
      >
        <Col span={1}>
          <p className="mediumText">#</p>
        </Col>

        <Col span={8}>
          <p className="mediumText">Depot</p>
        </Col>

        <Col className="flex-1">
          <Row align="middle" gutter={32}>
            <Col className="flex-1">
              <p className="mediumText">Revenue</p>
            </Col>

            <Col className="flex-1">
              <p className="mediumText">Revenue/KM</p>
            </Col>
          </Row>
        </Col>
      </Row>

      {KPIs?.map((kpi: OneKPITypes, index: number) => (
        <Row
          key={kpi.depotId}
          className="w-[100%] border-b border-gray py-6"
          gutter={32}
          align="middle"
        >
          <Col span={1}>
            <span className="mediumText">{index + 1}</span>
          </Col>

          <Col span={8} className="text_ellipsis">
            {kpi.depotName}
          </Col>

          <Col className="flex-1">
            <Row align="middle" gutter={32}>
              <Col className="flex-1">
                <CustomInput
                  selfHandleValue={{
                    id: kpi.depotId,
                    editedField: "targetPerDay"
                  }}
                  onChange={handleKPIChange}
                  defaultValue={kpi?.targetPerDay}
                  type="text"
                  inputType="number"
                  placeholder="Type revenue..."
                  name="revenue"
                  suffixIcon={
                    <span
                      style={{
                        color: "#000000",
                        opacity: 0.34,
                        fontSize: "0.9rem"
                      }}
                    >
                      Rwf
                    </span>
                  }
                />
              </Col>

              <Col className="flex-1">
                <Input
                  selfHandleValue={{
                    id: kpi.depotId,
                    editedField: "targetPerKm"
                  }}
                  onChange={handleKPIChange}
                  defaultValue={kpi?.targetPerKm}
                  type="text"
                  inputType="number"
                  placeholder="Type revenue/km..."
                  name="rperkm"
                  suffixIcon={
                    <span
                      style={{
                        color: "#000000",
                        opacity: 0.34,
                        fontSize: "0.9rem"
                      }}
                    >
                      Rwf
                    </span>
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      ))}

      <div className="flex gap-10 mt-5">
        <div className="flex-1"></div>

        <div className="w-[200px]">
          <Button
            type="primary"
            htmlType="submit"
            loading={isAddingKPIs}
            onClick={saveKPIs}
          >
            SAVE
          </Button>
        </div>
      </div>
    </>
  );
};

export default SettingsKPIsTable;
