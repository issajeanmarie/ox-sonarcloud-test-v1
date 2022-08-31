/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";
import { Header_Links } from "../../lib/types/links";
import { Row, Col, Typography } from "antd";
import PersonalInfo from "../../components/PersonalInfo";
import SettingsKPIsTable from "../../components/Tables/Settings/SettingsKPIsTable";
import SettingsCardWrapper from "../../components/Settings/SettingsCardWrapper";
import CustomButton from "../../components/Shared/Button/button";
import SettingsCategoriesTable from "../../components/Tables/Settings/SettingsCategoriesTable";
import AddCategory from "../../components/Forms/Settings/AddCategory";
import SettingsTopNavigator from "../../components/Settings/SettingsTopNavigator";
import {
  useGetKpisQuery,
  useAddKpiMutation
} from "../../lib/api/endpoints/settings/settingsEndpoints";
import { SuccessMessage } from "../../components/Shared/Messages/SuccessMessage";
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { ErrorMessage } from "../../components/Shared/Messages/ErrorMessage";

const { Text } = Typography;

const Settings = () => {
  const [targetPerDaykpi, setTargetPerDaykpi] = useState();
  const [targetPerKmkpi, setTargetPerKmkpi] = useState();
  const { data, isLoading } = useGetKpisQuery();
  const [addKpi, { isLoading: isAddingKPIs }] = useAddKpiMutation();
  const Links: Header_Links[] = [
    {
      label: "PREFERENCES",
      id: "preferences"
    },
    {
      label: "OX APP",
      id: "oxapp"
    }
  ];
  const [active, setActive] = useState<string>("trucks");

  const handlePostTargetPerDaykpi = (value: any) => {
    setTargetPerDaykpi(value);
  };

  const handlePostTargetPerKmykpi = (value: any) => {
    setTargetPerKmkpi(value);
  };

  const toggleActiveHandler = (id: string) => {
    setActive(id);
  };

  const handleAddKPIs = () => {
    addKpi({
      kpis: data?.payload?.map((item: any) => {
        return {
          depotId: item?.depotId,
          depotName: item?.depotName,
          targetPerDay: targetPerDaykpi ? +targetPerDaykpi : item?.targetPerDay,
          targetPerKm: targetPerKmkpi ? +targetPerKmkpi : item?.targetPerKm
        };
      })
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  return (
    <Layout>
      <SettingsTopNavigator
        headerLinks={Links}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />

      <div className=" w-[100%] my-5">
        <Row className="p-5 mt-5" gutter={18}>
          <Col span={14}>
            <SettingsCardWrapper>
              <div className="mb-4">
                <Text className="mediumText">KPIs (Daily target)</Text>
              </div>
              {isLoading ? (
                "loading..."
              ) : (
                <SettingsKPIsTable
                  data={data?.payload}
                  handlePostTargetPerDaykpi={handlePostTargetPerDaykpi}
                  handlePostTargetPerKmykpi={handlePostTargetPerKmykpi}
                />
              )}

              {!isLoading && (
                <Row className="flex justify-end mt-4">
                  <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <CustomButton
                      onClick={handleAddKPIs}
                      loading={isAddingKPIs}
                      type="primary"
                    >
                      SAVE
                    </CustomButton>
                  </Col>
                </Row>
              )}
            </SettingsCardWrapper>

            <SettingsCardWrapper>
              <div className="mb-4">
                <Text className="mediumText">Categories (22)</Text>
              </div>

              <Row className="flex justify-between items-center mb-4 border-b pb-4">
                <AddCategory />
              </Row>

              <SettingsCategoriesTable />
            </SettingsCardWrapper>
          </Col>
          <Col span={10}>
            <PersonalInfo />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Settings);
