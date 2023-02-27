import { useEffect } from "react";
import {
  useLazyGetTruckNearByClientsQuery,
  useLazyGetTruckNearByLocationsQuery
} from "../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";

interface Props {
  activeTruck: { id: number; plateNumber: string } | null;
}

export const useHandleNearByLocations = ({ activeTruck }: Props) => {
  const [getNearByLocations, { data, isFetching }] =
    useLazyGetTruckNearByLocationsQuery();

  useEffect(() => {
    if (activeTruck) {
      handleAPIRequests({
        request: getNearByLocations,
        truckId: activeTruck?.id,
        showFailure: false
      });
    }
  }, [activeTruck, getNearByLocations]);

  return { data, isFetching };
};

export const useHandleNearByClients = ({ activeTruck }: Props) => {
  const [getNearByClients, { data, isFetching }] =
    useLazyGetTruckNearByClientsQuery();

  useEffect(() => {
    if (activeTruck) {
      handleAPIRequests({
        request: getNearByClients,
        truckId: activeTruck?.id
      });
    }
  }, [activeTruck, getNearByClients]);

  return { data, isFetching };
};
