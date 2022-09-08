import { FC } from "react";
import Table from "antd/lib/table";
import CustomInput from "../../../components/Shared/Input";
import Typography from "antd/lib/typography";
import { KPI, KPI as KPIType } from "../../../lib/types/settings";

const { Column } = Table;
const { Text } = Typography;

interface KPIProps {
  kpi: KPIType;
  key: number;
}

// type Types = {
//     kpi: string;
//     key: number;
//     depotName: string;
// };

const KPI: FC<KPIProps> = ({ key, kpi }) => {
  return (
    <div>
      {/* MIDDLE ROW */}
      <Table
        className="data_table"
        dataSource={[kpi]}
        pagination={false}
        showHeader={true}
        bordered={false}
        scroll={{ x: "100%" }}
        tableLayout="auto"
      >
        {/* BOTTOM ROW */}
        <Column
          width="5%"
          key={kpi.depotName == "Kayove Depot" ? "Key" : ""}
          title={kpi.depotName == "Kayove Depot" ? "#" : ""}
          render={() => {
            const child = <Text className="normalText opacity_56">{key}</Text>;
            return { children: child, props: { "data-label": "#" } };
          }}
        />

        <Column
          width="30%"
          key="key"
          title={kpi.depotName == "Kayove Depot" ? "Depot" : ""}
          render={() => {
            const child = (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Text className="heading2 nowrap">{kpi.depotName}</Text>
                </div>
              </div>
            );
            return { children: child, props: { "data-label": "Depot" } };
          }}
        />

        <Column
          key="key"
          title={kpi.depotName == "Kayove Depot" ? "Revenue" : ""}
          render={() => {
            const child = (
              <div className="flex items-center gap-3">
                <CustomInput
                  type="text"
                  name="Name"
                  placeholder="2,000,000"
                  suffixIcon={
                    <Text className="normalText opacity_56">Rwf</Text>
                  }
                />
              </div>
            );
            return { children: child, props: { "data-label": "Revenue" } };
          }}
        />
        <Column
          key="key"
          title={kpi.depotName == "Kayove Depot" ? "Revenue/Km" : ""}
          render={() => {
            const child = (
              <div className="flex items-center gap-3">
                <CustomInput
                  type="text"
                  name="Name"
                  placeholder="5,000"
                  suffixIcon={
                    <Text className="normalText opacity_56">Rwf</Text>
                  }
                />
              </div>
            );
            return { children: child, props: { "data-label": "Revenue/Km" } };
          }}
        />
      </Table>
    </div>
  );
};
export default KPI;
