import React, { FC } from "react";
import EmptyData from "../Shared/EmptyData";
import { SpinningLoader } from "../Shared/Loaders/Loaders";
import NearbyCenterCard from "../Trucks/NearbyCenterCard";
import NearByClientCard from "../Trucks/NearByClientCard";
import ModalWrapper from "./ModalWrapper";
import {
  useHandleNearByClients,
  useHandleNearByLocations
} from "./useHandleNearBys";
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

  const { data: nearbyClients, isFetching: isNearByClientsFetching } =
    useHandleNearByClients({ activeTruck });

  const { data, isFetching: isNearByLocationsFetching } =
    useHandleNearByLocations({ activeTruck });

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
        <SpinningLoader className="h-[25vh]" />
      ) : !showEmpty ? (
        <>
          {nearbyClients?.payload?.length && (
            <>
              <p className="text-md opacity_56">
                Clients ({nearbyClients?.payload?.length})
              </p>
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
              <p className="text-md opacity_56 mt-12">
                Centers / Markets ({data?.payload?.length})
              </p>
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
