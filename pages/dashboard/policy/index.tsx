/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useRouter } from "next/router";
import Button from "../../../components/Shared/Button";
import { PRIVACY_POLICY_CONTENT } from "../../../config/constants";
import { routes } from "../../../config/route-config";

const Policy = () => {
  const router = useRouter();

  return (
    <div className="relative leading-[2]">
      <Row className="bg-white p-6 sticky top-0 z-0">
        <Col flex={1}>
          <Image
            onClick={() => router.push(routes.Orders.url)}
            width={46}
            src="/icons/OX_Logo.svg"
            preview={false}
            alt=""
            className="mt-1 pointer"
          />
        </Col>

        <Col>
          <a href="/docs/ox_privacy_policy.pdf" download>
            <Button
              form="AddNewDriver"
              loading={false}
              type="secondary"
              htmlType="submit"
            >
              Download PDF
            </Button>
          </a>
        </Col>
      </Row>

      <div className="w-[100%] h-[30vh] bg-ox-yellow sticky top-0 z-0" />

      <div className="absolute w-[100%] h-[95vh] overflow-auto top-24 pt-32">
        <div
          className="bg-white shadow-md rounded m-auto p-8 sm:p-8 md:p-12 lg:p-14 xl:p-16 2xl:p-16 bg-white w-[95%] sm:w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] h-[fit-content] pb-32"
          style={{ zIndex: 100 }}
        >
          <span className="text-[32px] font-bold block">OX Privacy Policy</span>

          <p className="text-[16px] italic text-gray-500">
            Last updated on{" "}
            <span className="text-ox-dark">22nd January 2023</span>
          </p>

          <p className="mt-12 mb-6">{PRIVACY_POLICY_CONTENT?.intro}</p>

          {PRIVACY_POLICY_CONTENT?.sections?.map((section, index) => (
            <div key={section.id}>
              <h1 className="font-bold text-black text-[18px] mt-12">
                {index + 1}. {section.title}
              </h1>

              <span className="block my-6">{section.subTitle}</span>

              {section.details?.map((detail) => (
                <div
                  key={detail}
                  className="font-bold ml-4 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-12 2xl:ml-12 flex items-top gap-6 mt-6"
                >
                  <span className="text-[8px] mt-2">⚫</span>{" "}
                  <span className="font-[400]">{detail}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policy;
