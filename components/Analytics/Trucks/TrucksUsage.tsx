import { Col, Dropdown, Image, Row, Typography, Upload } from "antd";
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
  handleDownloadTruckUsage,
  isDownloadingTruckReport,
  isDownloadFetching,
  selectedSort,
  setSelectedSort,
  handleDownloadTruckMonthlyReport
}) => {
  const downloadButtonDropdown = (
    <div className="radius4  p-6 bg-white rounded shadow-[0px_0px_19px_#2A354808] border">
      <Row
        onClick={handleDownloadTruckUsage}
        className="hover:bg-gray-50 hover:p-2  cursor-pointer my-4 rounded transition-all duration-300"
      >
        <Col>Download Truck Usage Report</Col>
      </Row>

      <Row
        onClick={handleDownloadTruckMonthlyReport}
        className="hover:bg-gray-50 hover:p-2  cursor-pointer mb-4 rounded transition-all duration-300"
      >
        <Col>Download Operations Report</Col>
      </Row>
    </div>
  );

  return (
    <>
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

        <Col>
          <Row gutter={12} align="middle" justify="end">
            <Col sm={{ span: 8 }}>
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
            </Col>

            <Col>
              <Dropdown
                overlay={downloadButtonDropdown}
                placement="bottomRight"
              >
                <div className="flex items-center gap-6">
                  <CustomButton
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
                </div>
              </Dropdown>
            </Col>

            <Col>
              <Upload {...uploadFileProps}>
                <CustomButton loading={uploadingFuelReport} type="primary">
                  <span className="text-sm">UPLOAD FUEL REPORT</span>
                </CustomButton>
              </Upload>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
    // <Row
    //   justify="space-between"
    //   className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808]"
    // >
    //   <Col className="flex items-center gap-4">
    //     <Text className="heading2">Trucks usage</Text>

    //     <DropDownSelector
    //       label="Sort"
    //       dropDownContent={[
    //         { id: 0, name: "Revenue", value: "REVENUE" },
    //         { id: 1, name: "Distance", value: "DISTANCE" },
    //         { id: 2, name: "Weight", value: "WEIGHT" }
    //       ]}
    //       setDefaultSelected={setSelectedSort}
    //       defaultSelected={selectedSort}
    //     />

    //     <Input
    //       onDateChange={onStartDateChange}
    //       defaultValue={localStorage.getItem("ox_startDate")}
    //       type="date"
    //       name="Start"
    //       placeholder="Start"
    //       suffixIcon={
    //         <Image
    //           preview={false}
    //           src="/icons/ic-actions-calendar.svg"
    //           alt=""
    //           width={18}
    //         />
    //       }
    //     />
    //     <Input
    //       onDateChange={onEndDateChange}
    //       defaultValue={localStorage.getItem("ox_endDate")}
    //       type="date"
    //       name="End"
    //       placeholder="End"
    //       suffixIcon={
    //         <Image
    //           preview={false}
    //           src="/icons/ic-actions-calendar.svg"
    //           alt=""
    //           width={18}
    //         />
    //       }
    //     />
    //   </Col>

    //   <Col className="flex items-center gap-4">
    //     <Input
    //       onChange={handleSearch}
    //       type="text"
    //       placeholder="Search truck"
    //       name="searchTruckUsage"
    //       suffixIcon={
    //         <Image
    //           width={10}
    //           src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
    //           preview={false}
    //           alt=""
    //         />
    //       }
    //     />

    //     <Dropdown overlay={downloadButtonDropdown} placement="bottomRight">
    //       <div className="flex items-center gap-6 w-[120px]">
    //         <CustomButton
    //           disabled={isDownloadingTruckReport || isDownloadFetching}
    //           type="secondary"
    //           size="small"
    //         >
    //           <span className="text-sm">
    //             {isDownloadingTruckReport || isDownloadFetching ? (
    //               <SmallSpinLoader />
    //             ) : (
    //               YellowDownloadIcon
    //             )}
    //           </span>
    //         </CustomButton>
    //       </div>
    //     </Dropdown>

    //     <Upload {...uploadFileProps}>
    //       <CustomButton loading={uploadingFuelReport} type="primary">
    //         <span className="text-sm">UPLOAD FUEL REPORT</span>
    //       </CustomButton>
    //     </Upload>
    //   </Col>
    // </Row>
  );
};

export default TrucksUsage;
