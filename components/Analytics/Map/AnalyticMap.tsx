import { Checkbox, Col, Image, Row } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { FC } from "react";
import { AnalyticMapTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticMapTypes";
import CustomInput from "../../Shared/Input";
import { CategoriesArr } from "./CategoriesArr";

const AnalyticMap: FC<AnalyticMapTypes> = ({ active }) => {
  const onChange = (e: CheckboxChangeEvent) => {
    return e.target.checked;
  };

  return (
    <div className={`${active === "map" && "h-screen relative"}`}>
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1020806.7305300423!2d29.31998750794072!3d-1.9421909992623463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2srw!4v1659444306830!5m2!1sen!2srw"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div
        style={{ minWidth: "21%" }}
        className="absolute top-4 right-4 bg-white rounded shadow-[0px_0px_19px_#00000008] p-7 h-[86%]"
      >
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
        {CategoriesArr.map((item) => (
          <Row key={item?.id} className="mb-3">
            <Col flex="auto" className="flex items-center gap-4 flex-nowrap">
              <span className="text-xs font-light">{item?.id}</span>
              <span className="text-xs font-bold">{item?.category}</span>
            </Col>
            <Col flex="none">
              <Checkbox onChange={onChange} />
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default AnalyticMap;
