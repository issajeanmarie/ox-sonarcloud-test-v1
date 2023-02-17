declare let google: any;

import React, { useEffect, useState } from "react";
import { Marker, Polyline } from "react-google-maps";

const OrderRouteRenderer = () => {
  const [coords, setCoords] = useState();

  useEffect(() => {
    const DirectionsService = new google.maps.DirectionsService({
      polylineOptions: {
        strokeColor: "blue"
      },
      suppressMarkers: true
    });

    DirectionsService.route(
      {
        origin: { lat: -2.371853100051158, lng: 30.13172392485542 },
        destination: { lat: -1.9507108593112863, lng: 30.083945555332473 },
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

  return coords ? (
    <>
      <Polyline
        path={coords}
        // geodesic={true}
        options={{
          strokeColor: "#e7b522",
          strokeOpacity: 0.8,
          strokeWeight: 5,
          clickable: true
        }}
      />

      <Marker
        position={new google.maps.LatLng(-2.371853100051158, 30.13172392485542)}
        icon={{
          url: "/icons/origin.svg",
          scale: 7
        }}
      />
      <Marker
        position={
          new google.maps.LatLng(-1.9507108593112863, 30.083945555332473)
        }
        icon={{
          url: "/icons/destination.svg",
          scale: 7
        }}
      />
    </>
  ) : null;
};

export default OrderRouteRenderer;
