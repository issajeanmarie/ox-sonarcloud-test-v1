import React from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import CustomInput from "../../components/Shared/Input";
import CustomButton from "../../components/Shared/Button/button";
import DriversTable from "../../components/DriversTable";

const { Text } = Typography;

const Trucks = () => {
  return (
    <Layout>
      <div
        className="flex items-center justify-between dashboard_header shadow p-4"
        style={{ width: "98%", margin: "0 auto" }}
      >
        {/* LEFT SIDE  */}
        <div className="flex items-center gap-4">
          <Text className="heading2">6 Trucks</Text>

          <CustomInput
            type="text"
            name="search"
            size="small"
            placeholder="Placeholder"
            suffixIcon={
              <Image
                width={14}
                src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                preview={false}
                alt=""
              />
            }
          />

          <CustomInput
            type="text"
            name="search"
            size="small"
            placeholder="Placeholder"
            suffixIcon={
              <Image
                width={14}
                src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                preview={false}
                alt=""
              />
            }
          />

          <CustomInput
            type="text"
            name="search"
            size="small"
            placeholder="Placeholder"
            suffixIcon={
              <Image
                width={14}
                src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                preview={false}
                alt=""
              />
            }
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <CustomButton type="primary">NEW TRUCK</CustomButton>
        </div>
      </div>

      <DriversTable />

      <div style={{ width: "12%", margin: "32px auto" }}>
        <CustomButton type="secondary">Load more</CustomButton>
      </div>
      <p>Trucks page</p>
    </Layout>
  );
};

export default WithPrivateRoute(Trucks);
