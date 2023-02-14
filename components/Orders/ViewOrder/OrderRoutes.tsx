import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function OrderRoutes() {
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyBHgwcB3X6WdORbT2I5Ra5spl1raTEDWG8">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          Child components, such as markers, info windows, etc.
          <></>
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default React.memo(OrderRoutes);
