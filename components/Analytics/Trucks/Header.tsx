import { useDispatch } from "react-redux";
import { FC, useEffect, useState } from "react";
import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import info from "antd/lib/message";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Dropdown from "antd/lib/dropdown";
import CustomInput from "../../Shared/Input";
import { ViewTruckHeaderTypes } from "../../../lib/types/pageTypes/Trucks/ViewTruckHeaderTypes";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import {
  useDeleteTruckMutation,
  useLazyGetTrucksQuery,
  useToggleTruckMutation
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import CustomButton from "../../Shared/Button/button";
import { displaySingleTruck } from "../../../lib/redux/slices/trucksSlice";
import { userType } from "../../../helpers/getLoggedInUser";
import { routes } from "../../../config/route-config";

type TrucksHoverTypes = {
  plateNumber: string;
  model: string;
  id: number;
};

const ViewTruckHeader: FC<ViewTruckHeaderTypes> = ({
  truckData,
  isPageLoading
}) => {
  const router = useRouter();
  const user = userType();

  const [toggleTruck, { isLoading }] = useToggleTruckMutation();
  const [allTrucks, setAllTrucks] = useState([]);
  const [isGetTrucksLoading, setIsGetTrucksLoading] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<any>({});

  const [getTrucks, { data: trucks }] = useLazyGetTrucksQuery();
  const [deleteTruck, { isLoading: isDeleteLoading }] =
    useDeleteTruckMutation();
  const dispatch = useDispatch();

  const handleToggleTruckSuccess = (res: any) => {
    info.success(res.message);

    dispatch(
      displaySingleTruck({ ...truckData, active: res?.payload?.active })
    );
  };

  const handleDeleteTruckSuccess = () => {
    router.push(routes.Trucks.url);
  };

  const handleGetTrucksSuccess = (res: any) => {
    setAllTrucks(res);
    setIsGetTrucksLoading(false);
    setSelectedTruck(res);
  };

  const handleGetTrucksFailure = () => setIsGetTrucksLoading(false);

  const handleToggleTruck = () => {
    handleAPIRequests({
      request: toggleTruck,
      id: truckData?.id,
      handleSuccess: handleToggleTruckSuccess
    });
  };

  const handleDeletTruck = () => {
    handleAPIRequests({
      request: deleteTruck,
      id: truckData?.id,
      handleSuccess: handleDeleteTruckSuccess
    });
  };

  useEffect(() => {
    handleAPIRequests({
      request: getTrucks,
      noPagination: true,
      handleSuccess: handleGetTrucksSuccess,
      handleFailure: handleGetTrucksFailure
    });
  }, [getTrucks]);

  const handleSearchTruck = (query: string) => {
    const filteredTrucks = trucks.filter(
      (truck: any) =>
        truck.plateNumber.includes(query) || truck.model.includes(query)
    );
    setAllTrucks(filteredTrucks);
  };

  const handleSelectTruck = (truck: any) => {
    setSelectedTruck(truck);
    router.push(`${routes.Trucks.url}/${truck.id}`);
  };

  const menu = (
    <div className="radius4 h-[500px] myCard p-6 py-12 bg-white rounded shadow-[0px_0px_19px_#2A354808] border">
      <CustomInput
        type="text"
        placeholder="Search category"
        name="searchTruckUsage"
        loading={true}
        onChange={handleSearchTruck}
        suffixIcon={
          isGetTrucksLoading ? (
            <LoadingOutlined spin />
          ) : (
            <Image
              width={10}
              src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
              preview={false}
              alt=""
            />
          )
        }
      />

      <div className="h-[400px] overflow-y-auto overflow-x-hidden mt-2">
        {allTrucks?.map((truck: TrucksHoverTypes, index: number) => (
          <Row
            onClick={() => handleSelectTruck(truck)}
            key={truck.id}
            justify="space-between"
            gutter={6}
            className={`${
              (selectedTruck.id || truckData.id) === truck.id
                ? "bg-ox-danger cursor-pointer p-3"
                : "hover:bg-gray-50 hover:p-1"
            } mt-6  cursor-pointer  rounded transition-all duration-100`}
            align="middle"
            wrap={false}
          >
            <Col span={3} className="text-gray-400 ml-1">
              {index + 1}
            </Col>
            <Col flex="auto" className="heading2 text-left text_ellipsis">
              {truck.plateNumber}
            </Col>
            <Col flex="none" className="text-right text-gray-400 text_ellipsis">
              {truck.model}
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white  shadow-[0px_0px_19px_#00000008] p-3 px-6 flex items-center">
        <div className="flex items-center gap-4 ">
          <Image
            className="pointer"
            src="/icons/keyboard_backspace_black_24dp.svg"
            alt="Backspace icon"
            width={20}
            height={20}
            onClick={() => router.back()}
            preview={false}
          />
          <span className="heading2">Trucks</span>

          <Dropdown placement="bottomLeft" overlay={menu}>
            <Row align="middle" gutter={12} className="pointer">
              <Col className="normalText">/</Col>
              <Col>
                <Row align="middle" gutter={4}>
                  <Col className="text-gray-400">
                    {selectedTruck?.plateNumber || truckData?.plateNumber}
                  </Col>
                  <Col>
                    {isPageLoading ? (
                      <LoadingOutlined className="mb-1" spin />
                    ) : (
                      <Image
                        className="pointer mb-1"
                        src="/icons/expand_more_black_24dp.svg"
                        alt="Backspace icon"
                        width={8}
                        preview={false}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Dropdown>
        </div>
        <div className="flex items-center flex-1 justify-end gap-11">
          <div className="flex items-center gap-6">
            <CustomButton
              onClick={handleToggleTruck}
              type="normal"
              size="icon"
              className="bg_danger"
              loading={isLoading}
              icon={
                <Image
                  className="pointer"
                  src={`/icons/ic-media-${
                    truckData?.active ? "stop" : "play"
                  }.svg`}
                  width={16}
                  preview={false}
                  alt=""
                />
              }
            />

            {user.isSuperAdmin && (
              <CustomButton
                onClick={handleDeletTruck}
                type="normal"
                size="icon"
                loading={isDeleteLoading}
                icon={
                  <Image
                    className="pointer"
                    src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
                    alt="Backspace icon"
                    width={22}
                    preview={false}
                  />
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTruckHeader;
