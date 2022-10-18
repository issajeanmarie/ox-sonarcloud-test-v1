import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "antd/lib/table";
import Row from "antd/lib/row";
import moment from "moment";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import CustomButton from "../../../components/Shared/Button/button";
import { TrucksTableLoader } from "../../../components/Shared/Loaders/Loaders";
import {
  useLazyGetSingleTruckQuery,
  useToggleTruckMutation
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import {
  displaySingleTruck,
  displayTrucks
} from "../../../lib/redux/slices/trucksSlice";
import { NewTruckModal } from "../../../components/Modals";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

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
  const [isVisible, setIsVisible] = useState(false);
  const [editTruckData, setEditTruckData] = useState();
  const [isGetSingleTruckLoading, setIsGetSingleTruckLoading] = useState(null);
  const [isUserEditing, setIsUserEditing] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const trucksState = useSelector((state: State) => state.trucks.displayTrucks);
  const [getSingleTruck] = useLazyGetSingleTruckQuery();

  const handleToggleTruckSuccess = (res: any) => {
    const newResult: object[] = [];

    trucksState?.content?.map((result: SingleTruckTypes) => {
      if (result.id !== res?.payload?.id) {
        newResult.push(result);
      } else {
        newResult.push(res?.payload);
      }
    });

    const newPayload = {
      payload: {
        ...trucksState,
        content: newResult
      }
    };

    dispatch(displayTrucks({ ...newPayload, replace: true }));
    setLoadingBtn(null);
  };

  const handleToggleTruckFailure = () => {
    setLoadingBtn(null);
  };

  const handleToggleTruck = (id: number) => {
    setLoadingBtn(id);
    handleAPIRequests({
      request: toggleTruck,
      id: id,
      handleSuccess: handleToggleTruckSuccess,
      handleFailure: handleToggleTruckFailure
    });
  };

  const handleGetSingleTruckSuccess = (res: any) => {
    dispatch(displaySingleTruck(res));
    setIsGetSingleTruckLoading(null);

    setEditTruckData(res);
    setIsVisible(true);
  };

  const handleEditTruckModal = (record: any) => {
    setIsGetSingleTruckLoading(record.id);
    setIsUserEditing(true);

    handleAPIRequests({
      request: getSingleTruck,
      id: record?.id,
      handleSuccess: handleGetSingleTruckSuccess
    });
  };

  return (
    <>
      <NewTruckModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        editTruckData={editTruckData}
        setEditTruckData={setEditTruckData}
        isUserEditing={isUserEditing}
        setIsUserEditing={setIsUserEditing}
      />

      {isLoading ? (
        <>
          {[...Array(20)].map((_, index) => (
            <TrucksTableLoader key={index} />
          ))}
        </>
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
            width="4%"
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
            width="26%"
            key="plateNumber"
            title="Plate number"
            render={(text: SingleTruckTypes, record: SingleTruckTypes) => {
              const child = (
                <Text className="normalText fowe700 text_ellipsis">
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
                  <span className="fontwe700 text_ellipsis">
                    {record?.lastInspection?.score || ""}
                  </span>{" "}
                  <span className="captionText text_ellipsis">{`${
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
                  className={`normalText text_ellipsis fontwe700 ${
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
                  <Col
                    className="my-[-12px]"
                    onClick={() => handleEditTruckModal(record)}
                  >
                    <CustomButton
                      type="normal"
                      size="icon"
                      loading={record?.id === isGetSingleTruckLoading}
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

                  <Col
                    className="my-[-12px]"
                    onClick={() => handleToggleTruck(record?.id)}
                  >
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
                    className="my-[-12px]"
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
    </>
  );
};

export default TrucksTable;
