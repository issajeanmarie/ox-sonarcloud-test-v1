import { Col, Image, Row, Typography, Upload } from "antd";
import React, { FC } from "react";
import Input from "../../Shared/Input";
import CustomButton from "../../Shared/Button/button";
import { TrucksUsageTypes } from "../../../lib/types/pageTypes/Analytics/TrucksUsageTableTypes";
import { YellowDownloadIcon } from "../../Icons";
import { SmallSpinLoader } from "../../Shared/Loaders/Loaders";
import DropDownSelector from "../../Shared/DropDownSelector";

const { Text } = Typography;

const TrucksUsage: FC<TrucksUsageTypes> = ({
  onStartDateChange,
  onEndDateChange,
  uploadingFuelReport,
  uploadFileProps,
  handleSearch,
  handleDownloadClients,
  isDownloadingTruckReport,
  isDownloadFetching,
  selectedSort,
  setSelectedSort
}) => {
  return (
    <Row
      justify="space-between"
      className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808]"
    >
      <Col className="flex items-center gap-4">
        <Text className="heading2">Trucks usage</Text>

        <DropDownSelector
          label="Sort"
          dropDownContent={[
            { id: 0, name: "Revenue", value: "REVENUE" },
            { id: 1, name: "Distance", value: "DISTANCE" },
            { id: 2, name: "Weight", value: "WEIGHT" }
          ]}
          setDefaultSelected={setSelectedSort}
          defaultSelected={selectedSort}
        />

        {/* <Input
          onSelectChange={onSortChange}
          type="select"
          label=""
          placeholder={`Sort: ${sorter}`}
          options={[
            { label: "Revenue", value: "REVENUE" },
            { label: "Distance", value: "DISTANCE" },
            { label: "Weight", value: "WEIGHT" }
          ]}
          name="sort"
          suffixIcon={
            <Image
              preview={false}
              src="/icons/expand_more_black_24dp.svg"
              alt=""
              width={10}
            />
          }
        /> */}
        <Input
          onDateChange={onStartDateChange}
          defaultValue={localStorage.getItem("ox_startDate")}
          type="date"
          name="Start"
          placeholder="Start"
          suffixIcon={
            <Image
              preview={false}
              src="/icons/ic-actions-calendar.svg"
              alt=""
              width={18}
            />
          }
        />
        <Input
          onDateChange={onEndDateChange}
          defaultValue={localStorage.getItem("ox_endDate")}
          type="date"
          name="End"
          placeholder="End"
          suffixIcon={
            <Image
              preview={false}
              src="/icons/ic-actions-calendar.svg"
              alt=""
              width={18}
            />
          }
        />
      </Col>

      <Col className="flex items-center gap-4">
        <Input
          onChange={handleSearch}
          type="text"
          placeholder="Search truck"
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
        <CustomButton
          onClick={handleDownloadClients}
          disabled={isDownloadingTruckReport || isDownloadFetching}
          type="secondary"
          size="small"
        >
          <span className="text-sm">
            {isDownloadingTruckReport || isDownloadFetching ? (
              <SmallSpinLoader />
            ) : (
              YellowDownloadIcon
            )}
          </span>
        </CustomButton>
        <Upload {...uploadFileProps}>
          <CustomButton loading={uploadingFuelReport} type="primary">
            <span className="text-sm">UPLOAD FUEL REPORT</span>
          </CustomButton>
        </Upload>
      </Col>
    </Row>
  );
};

export default TrucksUsage;
