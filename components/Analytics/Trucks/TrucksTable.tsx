import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "antd/lib/table";
import Row from "antd/lib/row";
import moment from "moment";
import Col from "antd/lib/col";
import info from "antd/lib/message";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import CustomButton from "../../../components/Shared/Button/button";
import Loader from "../../../components/Shared/Loader";
import { useToggleTruckMutation } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { displayTrucks } from "../../../lib/redux/slices/trucksSlice";
import { NewTruckModal } from "../../../components/Modals";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";

const { Column } = Table;
const { Text } = Typography;

interface TrucksProps {
  data: any;
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

type State = {
  trucks: any;
};

const TrucksTable: FC<TrucksProps> = ({ data, isLoading }) => {
  const [loadingBtn, setLoadingBtn] = useState<number | null>(null);
  const [toggleTruck] = useToggleTruckMutation();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const trucksState = useSelector((state: State) => state.trucks.displayTrucks);

  const handleToggleTruck = (id: number) => {
    setLoadingBtn(id);

    toggleTruck({
      id: id
    })
      .unwrap()
      .then((res: any) => {
        const newResult: object[] = [];

        trucksState?.content?.map((result: SingleTruckTypes) => {
          if (result.id !== res?.payload?.id) {
            newResult.push(result);
          } else {
            newResult.push(res?.payload);
          }
        });

        const newPayload = {
          message: "Test",
          payload: {
            totalPages: 10000,
            content: newResult
          }
        };

        dispatch(displayTrucks({ ...newPayload, replace: true }));
        setLoadingBtn(null);
      })
      .catch((err) => {
        setLoadingBtn(null);
        if (err) info.error(err?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="mx-4">
      <NewTruckModal isVisible={isVisible} setIsVisible={setIsVisible} />

      {isLoading ? (
        <Loader />
      ) : (
        <Table
          className="data_table"
          rowClassName="rounded"
          dataSource={data}
          rowKey={(record: SingleTruckTypes) => {
            return record?.id;
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
                <Text className="normalText fowe700">
                  {record?.plateNumber}
                </Text>
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
                <Text className="normalText opacity_56">{record?.model}</Text>
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
                <Text className="normalText opacity_56">
                  {record?.capacity}
                </Text>
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
                    record?.active ? "dark" : "red"
                  } uppercase`}
                >
                  {record?.active ? "IN USE" : "OUT OF SERVICE"}
                </Text>
              );
              return { children: child, props: { "data-label": "Status" } };
            }}
          />

          <Column
            width="20%"
            key="key"
            title="Action"
            render={(record: any) => {
              const child = (
                <Row align="middle" gutter={16} wrap={false}>
                  <Col onClick={() => setIsVisible(true)}>
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

                  <Col onClick={() => handleToggleTruck(record?.id)}>
                    <CustomButton
                      type="normal"
                      size="icon"
                      className="bg_danger"
                      loading={record?.id === loadingBtn}
                      icon={
                        <Image
                          src={`/icons/ic-media-${
                            record?.active ? "stop" : "play"
                          }.svg`}
                          alt=""
                          width={16}
                          preview={false}
                        />
                      }
                    />
                  </Col>

                  <Col
                    onClick={() =>
                      router.push(`${routes.Trucks.url}/${record?.id}`)
                    }
                  >
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
