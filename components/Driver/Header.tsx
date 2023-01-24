/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Image as AntDImage } from "antd";
import Spin from "antd/lib/spin";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { routes } from "../../config/route-config";
import {
  useDeleteDriverMutation,
  useToggleDriverMutation
} from "../../lib/api/endpoints/Accounts/driversEndpoints";
import { DriverProfileResponse } from "../../lib/types/Accounts/drivers";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import ActionModal from "../Shared/ActionModal";
import Navbar from "../Shared/Content/Navbar";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 16, color: "black" }} spin />
);

interface Props {
  driverData: DriverProfileResponse;
}

const Header: FC<Props> = ({ driverData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const router = useRouter();

  const [deleteDriver, { isLoading }] = useDeleteDriverMutation();
  const [toggleDriver, { isLoading: isTogglingDriver }] =
    useToggleDriverMutation();

  const handleDeleteDriverSuccess = () => {
    router.back();
  };

  const handleDeleteDriver = () => {
    handleAPIRequests({
      request: deleteDriver,
      id: driverData?.payload?.profileInfo?.id,
      showSuccess: true,
      handleSuccess: handleDeleteDriverSuccess
    });
  };

  const handleToggleDriver = () => {
    handleAPIRequests({
      request: toggleDriver,
      id: driverData?.payload?.profileInfo?.id,
      showSuccess: true
    });
  };

  const LeftSide = (
    <div className="flex items-center gap-4 ">
      <AntDImage
        onClick={() => router.push(routes.Accounts.url)}
        className="pointer"
        src="/icons/keyboard_backspace_black_24dp.svg"
        alt="Backspace icon"
        width={20}
        height={20}
        preview={false}
      />
      <span className="text-md font-bold">Driver</span>
      <span className="normalText">/</span>
      <span className="text-gray-400">
        {driverData?.payload?.profileInfo?.names}
      </span>
    </div>
  );

  const RightSide = (
    <Col className="flex gap-8 items-center">
      {isTogglingDriver ? (
        <Spin indicator={antIcon} />
      ) : (
        <AntDImage
          onClick={() => handleToggleDriver()}
          className="pointer"
          src={`/icons/ic-media-${
            driverData?.payload?.profileInfo?.enabled ? "stop" : "play"
          }.svg`}
          alt="Backspace icon"
          width={18}
          height={18}
          preview={false}
        />
      )}

      <AntDImage
        onClick={() => setIsModalVisible(true)}
        className="pointer"
        src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
        alt=""
        width={22}
        height={22}
        preview={false}
      />
    </Col>
  );

  return (
    <>
      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteDriver()}
        loading={isLoading}
      />

      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="FULL" />
    </>
  );
};

export default Header;
