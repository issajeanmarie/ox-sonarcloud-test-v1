import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { FC } from "react";
import {
  useGetTruckNearByClientsQuery,
  useGetTruckNearByLocationsQuery
} from "../../lib/api/endpoints/Trucks/trucksEndpoints";
import EmptyData from "../Shared/EmptyData";
import { SpinningLoader } from "../Shared/Loaders/Loaders";
import NearbyCenterCard from "../Trucks/NearbyCenterCard";
import NearByClientCard from "../Trucks/NearByClientCard";
import ModalWrapper from "./ModalWrapper";
interface Props {
  activeTruck: { id: number; plateNumber: string } | null;
  setActiveTruck: React.Dispatch<
    React.SetStateAction<{ id: number; plateNumber: string } | null>
  >;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NearByClientsModal: FC<Props> = ({
  isVisible,
  setIsVisible,
  setActiveTruck,
  activeTruck
}) => {
  const handleCancel = () => {
    setIsVisible(false);
    setActiveTruck(null);
  };

  const { data, isFetching: isNearByLocationsFetching } =
    useGetTruckNearByLocationsQuery(
      activeTruck
        ? {
            truckId: activeTruck?.id
          }
        : skipToken
    );

  const { data: nearbyClients, isFetching: isNearByClientsFetching } =
    useGetTruckNearByClientsQuery(
      activeTruck
        ? {
            truckId: activeTruck?.id
          }
        : skipToken
    );

  const isLoading = isNearByLocationsFetching || isNearByClientsFetching;
  const showEmpty = !(nearbyClients?.payload?.length && data?.payload?.length);

  return (
    <ModalWrapper
      title={`${activeTruck?.plateNumber} NEARBY`}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      onCancel={handleCancel}
      loading={false}
      destroyOnClose
    >
      {isLoading ? (
        <SpinningLoader className="h-[30vh]" />
      ) : !showEmpty ? (
        <>
          {nearbyClients?.payload?.length && (
            <>
              <p className="text-md opacity_56">Clients (2)</p>
              {nearbyClients?.payload?.map((client, index) => (
                <NearByClientCard
                  index={index}
                  key={client.name}
                  client={client}
                />
              ))}
            </>
          )}

          {data?.payload?.length && (
            <>
              <p className="text-md opacity_56 mt-12">Centers / Markets (3)</p>
              {data?.payload?.map((location) => (
                <NearbyCenterCard key={location?.name} center={location} />
              ))}
            </>
          )}
        </>
      ) : (
        <EmptyData text="No data to display!" width={100} />
      )}
    </ModalWrapper>
  );
};

export default NearByClientsModal;
