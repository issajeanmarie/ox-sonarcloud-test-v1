import { Col, Row, Typography } from "antd";
import SettingsCardWrapper from "../../../components/Settings/SettingsCardWrapper";
import Button from "../../../components/Shared/Button";
import Form from "antd/lib/form";
import CustomInput from "../../../components/Shared/Input";
import {
  useAddShiftPreferencesMutation,
  useGetShiftPreferencesQuery
} from "../../../lib/api/endpoints/settings/settingsEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { SettingsCategoriesTableLoader } from "../../../components/Shared/Loaders/Loaders";
import { useEffect } from "react";
import { requiredField } from "../../../lib/validation/InputValidations";
const { Text } = Typography;

const ShiftPreferencesSection = () => {
  const [addShiftPreference, { isLoading: isAddShiftPreferenceLoading }] =
    useAddShiftPreferencesMutation();
  const { data, isLoading } = useGetShiftPreferencesQuery();

  const [form] = Form.useForm();

  const onFinish = (values: { maxHoursPerDay: number }) => {
    handleAPIRequests({
      request: addShiftPreference,
      ...values,
      showSuccess: true
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      maxHoursPerDay: data?.payload?.maxHoursPerDay
    });
  }, [data]);

  return (
    <>
      <SettingsCardWrapper>
        <div className="mb-6">
          <Text className="mediumText">Shift preferences</Text>
        </div>

        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <SettingsCategoriesTableLoader key={index} />
          ))
        ) : (
          <Form
            name="CreateShiftPreference"
            onFinish={onFinish}
            layout="vertical"
            form={form}
            title="Shift Preference"
            id="CreateShiftPreference"
          >
            <Row className="w-[100%] py-6" gutter={32} align="middle">
              <Col span={1}>
                <span className="mediumText">1</span>
              </Col>

              <Col span={10} className="text_ellipsis font-bold">
                Driver&apos;s shift hours
              </Col>

              <Col className="flex-1">
                <Row align="top" gutter={32}>
                  <Col className="flex-1">
                    <CustomInput
                      type="text"
                      inputType="number"
                      rules={requiredField("Max hours")}
                      placeholder="Type revenue..."
                      name="maxHoursPerDay"
                      suffixIcon={
                        <span
                          style={{
                            color: "#000000",
                            opacity: 0.34,
                            fontSize: "0.9rem"
                          }}
                        >
                          Hrs
                        </span>
                      }
                    />
                  </Col>

                  <Col className="flex-1">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isAddShiftPreferenceLoading}
                    >
                      SAVE
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        )}
      </SettingsCardWrapper>
    </>
  );
};

export default ShiftPreferencesSection;
