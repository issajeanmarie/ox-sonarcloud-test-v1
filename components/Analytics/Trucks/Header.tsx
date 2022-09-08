import { FC } from "react";
import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useRouter } from "next/router";
import Dropdown from "antd/lib/dropdown";
import CustomInput from "../../Shared/Input";
import { ViewTruckHeaderTypes } from "../../../lib/types/pageTypes/Trucks/ViewTruckHeaderTypes";

const ViewTruckHeader: FC<ViewTruckHeaderTypes> = ({ truckData }) => {
  const router = useRouter();

  const menu = (
    <div className="radius4 myCard p-6 py-12 bg-white rounded shadow-[0px_0px_19px_#2A354808] border">
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

      <Row
        justify="space-between"
        gutter={6}
        className="mt-6 hover:bg-gray-50 cursor-pointer hover:p-1 rounded transition-all duration-100"
        align="middle"
        wrap={false}
      >
        <Col span={2} className="text-gray-400">
          1
        </Col>
        <Col flex="auto" className="heading2 text-left text_ellipsis">
          RAC 787 J
        </Col>
        <Col flex="none" className="text-right text-gray-400 text_ellipsis">
          Mitsubishi
        </Col>
      </Row>

      <Row
        justify="space-between"
        gutter={6}
        className="mt-6 hover:bg-gray-50 cursor-pointer hover:p-1 rounded transition-all duration-100"
        align="middle"
        wrap={false}
      >
        <Col span={2} className="text-gray-400">
          2
        </Col>
        <Col flex="auto" className="heading2 text-left text_ellipsis">
          RAD 898 K
        </Col>
        <Col flex="none" className="text-right text-gray-400 text_ellipsis">
          Mitsubishi
        </Col>
      </Row>

      <Row
        justify="space-between"
        gutter={6}
        className="mt-6 hover:bg-gray-50 cursor-pointer hover:p-1 rounded transition-all duration-100"
        align="middle"
        wrap={false}
      >
        <Col span={2} className="text-gray-400">
          3
        </Col>
        <Col flex="auto" className="heading2 text-left text_ellipsis">
          RAZ 898 K
        </Col>
        <Col flex="none" className="text-right text-gray-400 text_ellipsis">
          Mitsubishi
        </Col>
      </Row>
    </div>
  );

  return (
    <>
      <div className="bg-white  shadow-[0px_0px_19px_#00000008] p-3 px-6 flex items-center">
        <div className="flex items-center gap-4 ">
          <Image
            className="pointer"
            src="/icons/keyboard_backspace_black_24dp.svg"
            alt="Backspace icon"
            width={20}
            height={20}
            onClick={() => router.back()}
            preview={false}
          />
          <span className="heading2">Trucks</span>

          <Dropdown placement="bottomLeft" overlay={menu}>
            <Row align="middle" gutter={12} className="pointer">
              <Col className="normalText">/</Col>
              <Col>
                <Row align="middle" gutter={4}>
                  <Col className="text-gray-400">
                    {truckData?.truck?.plateNumber}
                  </Col>
                  <Col>
                    <Image
                      className="pointer mb-1"
                      src="/icons/expand_more_black_24dp.svg"
                      alt="Backspace icon"
                      width={8}
                      preview={false}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Dropdown>
        </div>
        <div className="flex items-center flex-1 justify-end gap-11">
          <div className="flex items-center gap-6">
            <Image
              className="pointer"
              src={`/icons/ic-media-${
                truckData?.truck?.active ? "stop" : "play"
              }.svg`}
              alt=""
              width={16}
            />

            <Image
              className="pointer"
              src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
              alt="Backspace icon"
              width={22}
              preview={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTruckHeader;
