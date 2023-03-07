import React, { FC, useEffect, useState } from "react";
import {
  GoogleMap as GoogleMapComponent,
  withScriptjs,
  withGoogleMap
} from "react-google-maps";
import { orderRouteMapStyles } from "../../../helpers/mapStyles";
import { Query } from "../../../lib/types/shared";
import { GetTruckMovementResponse } from "../../../lib/types/trucksTypes";
import OrderRouteRenderer from "./OrderRouteRenderer";

interface Props {
  movements: GetTruckMovementResponse;
  isMoving?: boolean;
  start?: number;
  truckID?: number | string | Query;
}

const OrderRoute: FC<Props> = ({ movements, isMoving, start, truckID }) => {
  const [center, setCenter] = useState({ lat: -1.9440727, lng: 30.0618851 });

  const centerTo =
    movements?.payload[Math.round(movements?.payload?.length / 2)];

  useEffect(() => {
    if (centerTo) {
      setCenter({ lat: centerTo.latitude, lng: centerTo.longitude });
    }
  }, [centerTo]);

  const Map = () => (
    <GoogleMapComponent
      defaultZoom={10}
      defaultCenter={center}
      defaultOptions={{ styles: orderRouteMapStyles }}
    >
      <OrderRouteRenderer
        start={start as number}
        movements={movements}
        isMoving={!!isMoving}
        truckID={truckID}
      />
    </GoogleMapComponent>
  );

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
    <WrappedMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyB9hqG4ozeDqzIdNd-OoftYqgFCHc33U_4"
      loadingElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ height: "100%" }} />}
      mapElement={<div style={{ height: "100%" }} />}
    />
  );
};

export default OrderRoute;
