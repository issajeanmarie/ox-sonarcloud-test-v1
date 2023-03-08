import React, { useEffect, useState } from "react";
import { Marker, Polyline, InfoWindow } from "react-google-maps";
import {
  useLazyGetTruckMovementQuery,
  useLazyGetTrucksQuery
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import {
  GetTruckMovementResponse,
  GetTruckNoPaginationResponse,
  GetTruckNoPaginationResponse_SingleTruck
} from "../../../lib/types/trucksTypes";
import { subtractHours } from "../../../utils/dateFormatter";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import Button from "../../Shared/Button";

const LiveTrucks = () => {
  const [activeInfoWindow, setActiveInfoWindow] =
    useState<GetTruckNoPaginationResponse_SingleTruck | null>(null);
  const [truckMovements, setTruckMovements] =
    useState<GetTruckMovementResponse | null>();

  const [getTruckPositions, { data }] = useLazyGetTrucksQuery();

  const [getTruckMovements, { data: truckMovementsFromAPI, isFetching }] =
    useLazyGetTruckMovementQuery();

  useEffect(() => {
    setTruckMovements(truckMovementsFromAPI);
  }, [truckMovementsFromAPI]);

  const icon = {
    url: "/icons/ox_marker.svg",
    scaledSize: new window.google.maps.Size(30, 30),
    anchor: new window.google.maps.Point(15, 15),
    scale: 0.7
  };

  useEffect(() => {
    const doSomething = () => {
      handleAPIRequests({
        request: getTruckPositions,
        noPagination: true
      });
    };

    const interval = setInterval(() => {
      doSomething();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredTrucks = (
    data as GetTruckNoPaginationResponse
  )?.payload?.filter(
    (truck) => truck.trackingLatitude && truck.trackingLongitude
  );

  const handleViewTruckRoute = () => {
    setTruckMovements(null);

    const now = new Date().getTime();
    const startTimeStamp = subtractHours({ date: null, hours: 12 }).getTime();

    handleAPIRequests({
      request: getTruckMovements,
      id: activeInfoWindow?.id,
      start: new Date(startTimeStamp).toISOString(),
      end: new Date(now).toISOString()
    });
  };

  const handleCloseInfoWindow = () => {
    setActiveInfoWindow(null);
  };

  const handleHoverTruck = (
    truck: GetTruckNoPaginationResponse_SingleTruck
  ) => {
    setActiveInfoWindow(truck);
  };

  return (
    <>
      cons
      {activeInfoWindow && (
        <InfoWindow
          position={{
            lat: activeInfoWindow.trackingLatitude,
            lng: activeInfoWindow.trackingLongitude
          }}
          onCloseClick={handleCloseInfoWindow}
        >
          <div className="p-4">
            <p className="font-bold text-[16px] mb-3">
              {activeInfoWindow.plateNumber}
            </p>

            <span className="text-[14px] block mb-4">
              View route for last 12 hours
            </span>

            <div className="w-[60px] mt-6">
              <Button
                type="dash"
                loading={isFetching}
                className="underline font-medium pointer"
                onClick={handleViewTruckRoute}
              >
                View route
              </Button>
            </div>
          </div>
        </InfoWindow>
      )}
      {filteredTrucks?.map((truck) => (
        <Marker
          key={truck.id}
          clickable
          onMouseOver={() => handleHoverTruck(truck)}
          position={
            new google.maps.LatLng(
              truck?.trackingLatitude,
              truck?.trackingLongitude
            )
          }
          icon={icon}
        />
      ))}
      {truckMovements?.payload?.length && (
        <Marker
          position={{
            lat: truckMovements?.payload[0]?.latitude,
            lng: truckMovements?.payload[0]?.longitude
          }}
          icon={{
            url: "/icons/origin.svg",
            scale: 7
          }}
        />
      )}
      {truckMovements && (
        <Polyline
          path={truckMovements?.payload?.map((truck) => ({
            lat: truck.latitude,
            lng: truck.longitude
          }))}
          options={{ strokeColor: "black" }}
        />
      )}
    </>
  );
};

export default LiveTrucks;
