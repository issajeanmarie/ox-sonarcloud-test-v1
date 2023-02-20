/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";

import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useRouter } from "next/router";
import Dropdown from "antd/lib/dropdown";
import Button from "../../../components/Shared/Button";
import {
  END_USER_AGREEMENTS_CONTENT,
  PRIVACY_POLICY_CONTENT
} from "../../../config/constants";
import { routes } from "../../../config/route-config";

const POLICY_MENUS = [
  {
    id: 1,
    name: "Policy",
    url: routes.Policy.url,
    page: "POLICY"
  },

  {
    id: 2,
    name: "Agreements",
    url: routes.Agreements.url,
    page: "AGREEMENTS"
  }
];

interface MenuTypes {
  page: string;
  url: string;
  id: number;
  name: string;
}

const Policy = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const router = useRouter();
  const { page } = router.query;

  const handleMenuChange = (menu: MenuTypes) => {
    router.push(menu.url);
  };

  useEffect(() => {
    setActiveMenu(String(page || "POLICY"));
  }, [page]);

  const CONTENT =
    activeMenu === "POLICY"
      ? PRIVACY_POLICY_CONTENT
      : END_USER_AGREEMENTS_CONTENT;

  const file_link =
    activeMenu === "POLICY"
      ? "/docs/OX_Privacy_Policy.pdf"
      : "/docs/OX_End_User_License_Agreement.pdf";

  const dropdownMenu = (
    <div className="max-h-[50vh]  overflow-y-auto radius4 p-6 pb-2 bg-white rounded shadow-[0px_0px_19px_#2A354808] border">
      {POLICY_MENUS?.map((menu) => (
        <Row
          key={menu.id}
          onClick={() => handleMenuChange(menu)}
          className={`${
            activeMenu === menu.page && "font-bold"
          } mb-4 pointer hover:text-ox-dark text-gray-600 hover:font-medium`}
        >
          <Col>{menu.name}</Col>
        </Row>
      ))}
    </div>
  );

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
          <Row align="middle" gutter={24}>
            <Col>
              <Dropdown
                overlay={dropdownMenu}
                trigger={["hover"]}
                placement="bottomRight"
              >
                <div className="pointer flex gap-2 items-center bg-gray-100 hover:bg-gray-200 rounded p-2 px-4">
                  <span className="font-medium">Menu</span>{" "}
                  <Image
                    preview={false}
                    src="/icons/expand_more_black_24dp.svg"
                    alt=""
                    width={8}
                  />
                </div>
              </Dropdown>
            </Col>

            <Col>
              <a href={file_link} download>
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
        </Col>
      </Row>

      <div className="w-[100%] h-[30vh] bg-ox-yellow sticky top-0 z-0" />

      <div className="absolute w-[100%] h-[95vh] overflow-auto top-24 pt-32">
        <div
          className="bg-white shadow-md rounded m-auto p-8 sm:p-8 md:p-12 lg:p-14 xl:p-16 2xl:p-16 bg-white w-[95%] sm:w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] h-[fit-content] pb-32"
          style={{ zIndex: 100 }}
        >
          <span className="text-[32px] font-bold block leading-[1.2] mb-3">
            {CONTENT.title}
          </span>

          <p className="text-[16px] italic text-gray-500">
            Last updated on:{" "}
            <span className="text-ox-dark">{CONTENT.lastUpdate}</span>
          </p>

          <p className="mt-12 mb-6">{CONTENT?.intro}</p>

          {CONTENT?.sections?.map((section, index) => (
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
