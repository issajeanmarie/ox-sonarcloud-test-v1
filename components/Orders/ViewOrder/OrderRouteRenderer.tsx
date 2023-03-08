declare let google: any;

import React, { FC, useEffect, useState } from "react";
import { Marker, Polyline, InfoWindow } from "react-google-maps";
import { useLazyGetTruckMovementQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { Query } from "../../../lib/types/shared";
import {
  GetTruckMovementResponse,
  SingleMovement
} from "../../../lib/types/trucksTypes";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

interface Props {
  movements: GetTruckMovementResponse;
  isMoving: boolean;
  start: number;
  truckID: number | string | Query;
}

const OrderRouteRenderer: FC<Props> = ({
  movements,
  isMoving,
  start,
  truckID
}) => {
  const [coords, setCoords] = useState();
  const [activeInfoWindow, setActiveInfoWindow] =
    useState<SingleMovement | null>(null);
  const [liveTruckMovements, setLiveTruckMovements] = useState(movements);

  const [getTruckMovement, { data: liveTruckMovementsFromAPI }] =
    useLazyGetTruckMovementQuery();

  useEffect(() => {
    if (liveTruckMovementsFromAPI && isMoving) {
      setLiveTruckMovements(liveTruckMovementsFromAPI);
    }
  }, [liveTruckMovementsFromAPI, setLiveTruckMovements, isMoving]);

  const firstEl = movements?.payload?.length && movements?.payload[0];
  const lastEl =
    movements?.payload?.length &&
    movements?.payload[movements.payload.length - 1];

  const firstElOnLive =
    liveTruckMovements?.payload?.length && liveTruckMovements?.payload[0];
  const lastElOnLive =
    liveTruckMovements?.payload?.length &&
    liveTruckMovements?.payload[liveTruckMovements.payload.length - 1];

  const originMarkerPos =
    isMoving && firstElOnLive
      ? { lat: firstElOnLive?.latitude, lng: firstElOnLive?.longitude }
      : {
          lat: (firstEl as SingleMovement)?.latitude,
          lng: (firstEl as SingleMovement)?.longitude
        };

  const destinationMarkerPos = {
    lat: (lastEl as SingleMovement)?.latitude,
    lng: (lastEl as SingleMovement)?.longitude
  };

  const routeHistoryPath = movements?.payload?.map((mov) => ({
    lat: mov.latitude,
    lng: mov.longitude
  }));

  const liveTrackPath = liveTruckMovements?.payload?.map((mov) => ({
    lat: mov.latitude,
    lng: mov.longitude
  }));

  const routeHistoryDirectionServiceOrigin = {
    lat: (firstEl as SingleMovement)?.latitude,
    lng: (firstEl as SingleMovement)?.longitude
  };

  const routeHistoryDirectionServiceDestination = {
    lat: (lastEl as SingleMovement)?.latitude,
    lng: (lastEl as SingleMovement)?.longitude
  };

  const liveTruckDirectionServiceOrigin = {
    lat: (firstElOnLive as SingleMovement)?.latitude,
    lng: (firstElOnLive as SingleMovement)?.longitude
  };

  const liveTruckDirectionServiceDestination = {
    lat: (lastElOnLive as SingleMovement)?.latitude,
    lng: (lastElOnLive as SingleMovement)?.longitude
  };

  const directionServiceOrigin = isMoving
    ? liveTruckDirectionServiceOrigin
    : routeHistoryDirectionServiceOrigin;

  const directionServiceDestination = isMoving
    ? liveTruckDirectionServiceDestination
    : routeHistoryDirectionServiceDestination;

  const truckPosition =
    liveTruckMovements?.payload?.length &&
    liveTruckMovements?.payload[liveTruckMovements.payload.length - 2];

  useEffect(() => {
    const DirectionsService = new google.maps.DirectionsService({
      polylineOptions: {
        strokeColor: "blue"
      },
      suppressMarkers: true
    });

    DirectionsService.route(
      {
        origin: directionServiceOrigin,
        destination: directionServiceDestination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result: any, status: any) => {
        if (status === google?.maps?.DirectionsStatus?.OK) {
          const got_coords = result.routes[0].overview_path;
          setCoords(got_coords);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, []);

  const handleShowInfoWindow = (e: google.maps.PolyMouseEvent) => {
    const gottenCoordinates = { lat: e?.latLng?.lat(), lng: e?.latLng?.lng() };
    const foundPositionFromAPI = movements?.payload?.find(
      (mov) =>
        mov.latitude.toFixed(3) === gottenCoordinates.lat?.toFixed(3) &&
        mov.longitude.toFixed(3) === gottenCoordinates.lng?.toFixed(3)
    );

    const foundPositionFromAPIWhenLive = liveTruckMovements?.payload?.find(
      (mov) =>
        mov.latitude.toFixed(3) === gottenCoordinates.lat?.toFixed(3) &&
        mov.longitude.toFixed(3) === gottenCoordinates.lng?.toFixed(3)
    );

    setActiveInfoWindow(
      foundPositionFromAPI || foundPositionFromAPIWhenLive || null
    );
  };

  const handleCloseInfoWindow = () => {
    setActiveInfoWindow(null);
  };

  useEffect(() => {
    if (isMoving) {
      const fetchMovements = () => {
        const now = new Date();

        handleAPIRequests({
          request: getTruckMovement,
          start: new Date(start).toISOString(),
          end: now?.toISOString(),
          id: truckID
        });

        const angle =
          truckPosition &&
          window.google.maps.geometry.spherical.computeHeading(
            {
              lat: truckPosition.latitude,
              lng: truckPosition.longitude
            },
            {
              lat:
                liveTruckMovements?.payload?.length &&
                liveTruckMovements?.payload[
                  liveTruckMovements?.payload.length - 1
                ].latitude,
              lng:
                liveTruckMovements?.payload?.length &&
                liveTruckMovements?.payload[
                  liveTruckMovements?.payload.length - 1
                ].longitude
            }
          );

        const actualAngle = angle ? angle - 5 : 0;

        const marker = document.querySelector(
          `[src="/icons/ox_truck_top_view.svg"]`
        );

        if (marker) {
          (marker as any).style.transform = `rotate(${actualAngle}deg)`;
        }
      };

      fetchMovements();
      const interval = setInterval(() => fetchMovements(), 4000);

      return () => clearInterval(interval);
    }
  }, [
    getTruckMovement,
    isMoving,
    liveTruckMovements,
    start,
    truckID,
    truckPosition
  ]);

  const path = isMoving ? liveTrackPath?.slice(0, -1) : routeHistoryPath;

  return coords ? (
    <>
      <Polyline
        path={path}
        options={{
          strokeColor: "#e7b522",
          strokeOpacity: 0.8,
          strokeWeight: 5,
          clickable: true
        }}
        onMouseOver={(e) => handleShowInfoWindow(e)}
      />
      {activeInfoWindow && (
        <InfoWindow
          position={{
            lat: activeInfoWindow.latitude,
            lng: activeInfoWindow.longitude
          }}
          onCloseClick={handleCloseInfoWindow}
        >
          <div className="px-4 mt-8 gs">
            <p className="text-[14px] font-medium">
              {activeInfoWindow?.deviceTime
                ? new Date(activeInfoWindow?.deviceTime)
                    .toLocaleString()
                    .split(",")[1]
                : "We don't have date for this position"}
            </p>
          </div>
        </InfoWindow>
      )}

      {isMoving && truckPosition && (
        <Marker
          position={{
            lat: truckPosition?.latitude,
            lng: truckPosition?.longitude
          }}
          icon={{
            url: "/icons/ox_truck_top_view.svg",
            scaledSize: new window.google.maps.Size(30, 30),
            anchor: new window.google.maps.Point(15, 15),
            scale: 0.7
          }}
        />
      )}

      <Marker
        position={originMarkerPos}
        icon={{
          url: "/icons/origin.svg",
          scale: 7
        }}
      />

      {!isMoving && (
        <Marker
          position={destinationMarkerPos}
          icon={{
            url: "/icons/destination.svg",
            scale: 7
          }}
        />
      )}
    </>
  ) : null;
};

export default OrderRouteRenderer;
