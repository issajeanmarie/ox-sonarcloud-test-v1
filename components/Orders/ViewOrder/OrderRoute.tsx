import React from "react";
import {
  GoogleMap as GoogleMapComponent,
  withScriptjs,
  withGoogleMap
} from "react-google-maps";
import { orderRouteMapStyles } from "../../../helpers/mapStyles";
import OrderRouteRenderer from "./OrderRouteRenderer";

const OrderRoute = () => {
  const Map = () => (
    <GoogleMapComponent
      defaultZoom={10}
      defaultCenter={{ lat: -1.9440727, lng: 30.0618851 }}
      defaultOptions={{ styles: orderRouteMapStyles }}
    >
      <OrderRouteRenderer />
    </GoogleMapComponent>
  );

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
    <div className="h-[300px] mt-4 mb-12 border rounded overflow-hidden">
      <WrappedMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyB9hqG4ozeDqzIdNd-OoftYqgFCHc33U_4"
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
};

export default OrderRoute;
