import { FC } from "react";
import Table from "antd/lib/table";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import CustomButton from "../../../components/Shared/Button/button";
import Loader from "../../../components/Shared/Loader";
import moment from "moment";

const { Column } = Table;
const { Text } = Typography;

interface TrucksProps {
  data: [];
  isLoading: boolean;
}

interface LastInspection {
  score: number;
  createdAt: string;
}

type SingleTruckTypes = {
  id: number;
  plateNumber: string;
  lastInspection: LastInspection;
  model: string;
  capacity: number;
  active: boolean;
};

const TrucksTable: FC<TrucksProps> = ({ data, isLoading }) => {
  return (
    <div className="mx-4">
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          className="data_table"
          rowClassName="shadow"
          dataSource={data}
          rowKey={(record: SingleTruckTypes) => {
            return record.id;
          }}
          pagination={false}
          bordered={false}
          scroll={{ x: 0 }}
        >
          <Column
            width="5%"
            key="key"
            title="#"
            render={(
              text: SingleTruckTypes,
              record: SingleTruckTypes,
              index
            ) => {
              const child = (
                <Text className="normalText opacity_56">{index + 1}</Text>
              );
              return { children: child, props: { "data-label": "#" } };
            }}
          />

          <Column
            width="25%"
            key="plateNumber"
            title="Plate number"
            render={(text: SingleTruckTypes, record: SingleTruckTypes) => {
              const child = (
                <Text className="normalText fowe700">{record.plateNumber}</Text>
              );
              return {
                children: child,
                props: { "data-label": "Plate number" }
              };
            }}
          />

          <Column
            width="20%"
            key="model"
            title="Model"
            render={(text: SingleTruckTypes, record: SingleTruckTypes) => {
              const child = (
                <Text className="normalText opacity_56">{record.model}</Text>
              );
              return { children: child, props: { "data-label": "Model" } };
            }}
          />

          <Column
            width="20%"
            key="capacity"
            title="Capacity"
            render={(text: SingleTruckTypes, record: SingleTruckTypes) => {
              const child = (
                <Text className="normalText opacity_56">{record.capacity}</Text>
              );
              return { children: child, props: { "data-label": "Capacity" } };
            }}
          />

          <Column
            width="15%"
            key="lastInspection"
            title="Last inspection"
            render={(text: SingleTruckTypes, record: SingleTruckTypes) => {
              const child = (
                <>
                  <span className="fontwe700">
                    {record?.lastInspection?.score || ""}
                  </span>{" "}
                  <span className="captionText">{`${
                    record?.lastInspection?.createdAt
                      ? `(${moment(
                          record?.lastInspection?.createdAt
                        ).fromNow()})`
                      : ""
                  }`}</span>
                </>
              );
              return {
                children: child,
                props: { "data-label": "Last inspection" }
              };
            }}
          />

          <Column
            width="15%"
            key="status"
            title="Status"
            render={(text: SingleTruckTypes, record: SingleTruckTypes) => {
              const child = (
                <Text
                  className={`normalText fontwe700 ${
                    record.active ? "dark" : "red"
                  } uppercase`}
                >
                  {record.active ? "IN USE" : "OUT OF SERVICE"}
                </Text>
              );
              return { children: child, props: { "data-label": "Status" } };
            }}
          />

          <Column
            width="20%"
            key="key"
            title="Action"
            render={() => {
              const child = (
                <Row align="middle" gutter={16} wrap={false}>
                  <Col>
                    <CustomButton
                      type="normal"
                      size="icon"
                      icon={
                        <Image
                          src="/icons/ic-contact-edit.svg"
                          alt=""
                          width={12}
                          preview={false}
                        />
                      }
                    />
                  </Col>

                  <Col>
                    <CustomButton
                      type="normal"
                      size="icon"
                      className="bg_danger"
                      icon={
                        <Image
                          src="/icons/ic-media-stop.svg"
                          alt=""
                          width={16}
                          preview={false}
                        />
                      }
                    />
                  </Col>

                  <Col>
                    <CustomButton type="view" size="small">
                      View
                    </CustomButton>
                  </Col>
                </Row>
              );
              return { children: child, props: { "data-label": "" } };
            }}
          />
        </Table>
      )}
    </div>
  );
};

export default TrucksTable;
