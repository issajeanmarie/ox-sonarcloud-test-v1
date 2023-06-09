/* eslint-disable @typescript-eslint/no-explicit-any */
declare const google: any;

import { Checkbox, Col, Image, Row } from "antd";
import React, { FC, useEffect, useState } from "react";
import {
  GoogleMap as GoogleMapComponent,
  withScriptjs,
  withGoogleMap
} from "react-google-maps";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import { AnalyticMapTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticMapTypes";
import CustomInput from "../../Shared/Input";
import { MediumSpinLoader } from "../../Shared/Loaders/Loaders";
import { mapStyles } from "../../../helpers/mapStyles";
import { LatLng } from "use-places-autocomplete";
import LiveTrucks from "./LiveTrucks";

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
  //HANDLE SEARCH
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categories) {
      setFiltered(categories?.payload);
    }
  }, [categories]);

  const handleCategorySearch = (value: string) => {
    setSearchQuery(value);
    const filteredData = categories?.payload.filter(
      (entry: { [s: string]: unknown } | ArrayLike<unknown>) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(value.toLowerCase())
        )
    );

    setFiltered(filteredData);
  };

  const coordinates = mapData?.payload?.map(
    (location: officeLocationType) => location?.office?.coordinates
  );

  let heatMapData: any = [];

  if (coordinates) {
    //REMOVE UNDEFINEDs AND NULLs
    const filteredCoordinates = coordinates?.filter((item: LatLng) => item);

    filteredCoordinates?.forEach((coordinate: any) => {
      if (
        coordinate &&
        typeof coordinate === "string" &&
        coordinate.includes(":")
      ) {
        const parsedCoordinates = JSON.parse(coordinate);
        if (
          parsedCoordinates &&
          parsedCoordinates?.lat &&
          parsedCoordinates?.lng
        ) {
          const otherCoordinate = new google.maps.LatLng(
            parsedCoordinates?.lat,
            parsedCoordinates?.lng
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

      <LiveTrucks />
    </GoogleMapComponent>
  );

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
    <div className={`${active === "MAP" && "h-screen relative"}`}>
      {mapLoading || mapFetching ? (
        <div className="flex justify-center items-center h-full w-4/5 flex-col">
          <span className="font-light">Looking for locations...</span>
          <div className="mt-4">
            <MediumSpinLoader />
          </div>
        </div>
      ) : (
        <WrappedMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyB9hqG4ozeDqzIdNd-OoftYqgFCHc33U_4"
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
                onChange={handleCategorySearch}
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
              style={{ height: "80vh", width: "100%" }}
              className="flex justify-center items-center"
            >
              <MediumSpinLoader />
            </Col>
          </Row>
        ) : (
          <>
            {filtered?.length !== 0 ? (
              <>
                {filtered?.map((item: any, index: number) => (
                  <Row key={item?.id} className="mb-3" gutter={6}>
                    <Col
                      flex="auto"
                      className="flex items-center gap-4 flex-nowrap"
                    >
                      <span className="text-xs font-light">{index + 1}</span>
                      <span
                        className="text-xs font-bold text_ellipsis max-w-[300px]"
                        title={item?.name}
                      >
                        {item?.name}
                      </span>
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
            ) : (
              <>
                {searchQuery && filtered?.length === 0 ? (
                  <div className="flex flex-col gap-5 items-center justify-center mt-12">
                    <Image
                      src="/icons/transaction.svg"
                      width={80}
                      height={80}
                      alt=""
                      preview={false}
                    />
                    <div className="font-extralight text-md w-[170px] text-center">
                      No results for{" "}
                      <span className="font-bold">{searchQuery}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {categories?.payload?.map((item: any, index: number) => (
                      <Row key={item?.id} className="mb-3">
                        <Col
                          flex="auto"
                          className="flex items-center gap-4 flex-nowrap"
                        >
                          <span className="text-xs font-light">
                            {index + 1}
                          </span>
                          <span className="text-xs font-bold">
                            {item?.name}
                          </span>
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticMap;
