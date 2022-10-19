/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Col, Image, Row } from "antd";
import React, { FC } from "react";
import {
  GoogleMap as GoogleMapComponent,
  withScriptjs,
  withGoogleMap
} from "react-google-maps";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import { AnalyticMapTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticMapTypes";
import CustomInput from "../../Shared/Input";
import { SmallSpinLoader } from "../../Shared/Loaders/Loaders";
import { mapStyles } from "../../../helpers/mapStyles";

declare const google: any;

type officeLocationType = {
  office: {
    coordinates: any;
  };
};

const AnalyticMap: FC<AnalyticMapTypes> = ({
  active,
  isCategoriesLoading,
  categories,
  onCategoryChange,
  mapData,
  mapLoading,
  mapFetching
}) => {
  const coordinates = mapData?.payload?.map(
    (location: officeLocationType) => location?.office?.coordinates
  );

  let heatMapData: any = [];

  if (coordinates) {
    coordinates.forEach((coordinate: any) => {
      if (
        coordinate &&
        typeof coordinate === "string" &&
        coordinate.includes(":")
      ) {
        const displayCoordinates = JSON.parse(coordinate);
        if (
          displayCoordinates &&
          displayCoordinates.lat &&
          displayCoordinates.lng
        ) {
          const otherCoordinate = new google.maps.LatLng(
            displayCoordinates?.lat,
            displayCoordinates?.lng
          );
          heatMapData = [...heatMapData, otherCoordinate];
        }
      }
    });
  }

  const Map = () => (
    <GoogleMapComponent
      defaultZoom={10}
      defaultCenter={{ lat: -1.9440727, lng: 30.0618851 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {coordinates && <HeatmapLayer data={heatMapData} />}
    </GoogleMapComponent>
  );

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
    <div className={`${active === "MAP" && "h-screen relative"}`}>
      {mapLoading || mapFetching ? (
        <div className="flex justify-center items-center h-full">
          <SmallSpinLoader />
        </div>
      ) : (
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
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
                  <Checkbox.Group
                    onChange={(e) => onCategoryChange(e, item?.id)}
                  >
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
