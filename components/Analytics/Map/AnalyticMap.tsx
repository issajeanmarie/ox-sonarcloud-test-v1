/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Col, Image, Row } from "antd";
import React, { FC, Fragment, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api";
import { AnalyticMapTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticMapTypes";
import CustomInput from "../../Shared/Input";
import { SmallSpinLoader } from "../../Shared/Loaders/Loaders";
import { mapContainerStyle } from "./mapContainerStyle";
// import { MapDataTypes } from "../../../lib/types/pageTypes/Analytics/MapData";

const AnalyticMap: FC<AnalyticMapTypes> = ({
  active,
  isCategoriesLoading,
  categories,
  onCategoryChange
  // mapData,
  // mapLoading,
  // mapFetching
}) => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  // const [locationMarkers, setLocationMarkers] = useState([]);

  // useEffect(() => {
  //   mapData?.payload?.map((item: MapDataTypes) => {
  //     const _locations = locationMarkers?.push({
  //       id: item?.office?.id,
  //       name: item?.office?.location,
  //       position:
  //         item?.office?.coordinates !== null ||
  //         item?.office?.coordinates !== undefined ||
  //         item?.office?.coordinates !== ""
  //           ? JSON.parse(item?.office?.coordinates)
  //           : null
  //     });
  //     setLocationMarkers([_locations]);
  //   });
  // }, [locationMarkers, mapData?.payload]);

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const markers = [
    {
      id: 1,
      name: "Nyamasheke, Rwanda",
      position: { lat: -2.3909755, lng: 29.1855785 }
    },
    {
      id: 2,
      name: "Nyamasheke, Rwanda",
      position: { lat: -2.3909755, lng: 29.1855785 }
    }
  ];

  const handleOnLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
  });

  return (
    <div className={`${active === "map" && "h-screen relative"}`}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={markers[1]?.position}
          zoom={10}
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
        >
          {markers.map(({ id, name, position }) => (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      ) : (
        <></>
      )}
      <div
        style={{ minWidth: "25%" }}
        className="absolute top-4 right-4 bg-white rounded shadow-[0px_0px_19px_#00000008] p-[0_2.5rem_2.5rem_2.5rem] h-[83%] overflow_Y"
      >
        {!isCategoriesLoading && (
          <div className="sticky top-0 bg-white z-10 pt-[2.5rem]">
            <span className="opacity-80 font-light">Show</span>
            <div className="my-5">
              <CustomInput
                type="text"
                placeholder="Search category"
                name="searchTruckUsage"
                suffixIcon={
                  <Image
                    width={10}
                    src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                    preview={false}
                    alt=""
                  />
                }
              />
            </div>
          </div>
        )}

        {isCategoriesLoading ? (
          <Row className="mb-3">
            <Col
              style={{ height: "100%", width: "100%" }}
              className="flex justify-center items-center"
            >
              <SmallSpinLoader />
            </Col>
          </Row>
        ) : (
          <>
            {categories?.payload?.map((item: any) => (
              <Row key={item?.id} className="mb-3">
                <Col
                  flex="auto"
                  className="flex items-center gap-4 flex-nowrap"
                >
                  <span className="text-xs font-light">{item?.id}</span>
                  <span className="text-xs font-bold">{item?.name}</span>
                </Col>
                <Col flex="none">
                  <Checkbox.Group onChange={() => onCategoryChange}>
                    <Checkbox value={item?.id} />
                  </Checkbox.Group>
                </Col>
              </Row>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticMap;
