import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Image from "antd/lib/image";
import React from "react";
import MediumCard from "../Cards/MediumCard";
import { useRouter } from "next/router";
import { routes } from "../../config/route-config";

const DepotLeftSide = () => {
  const router = useRouter();

  return (
    <Col flex="32%">
      <div className="radius4 p-12 mb-6 bg-white shadow-[0px_0px_19px_#00000008]">
        <Row align="middle" justify="space-between" gutter={12}>
          <Col>
            <span className="heading1 block mb-2 text-ox-dark">
              Tyazo depot
            </span>
          </Col>

          <Col>
            <Image
              className="pointer"
              src="/icons/ic-contact-edit@4x@2x.png"
              alt=""
              width={22}
              preview={false}
            />
          </Col>
        </Row>

        <span className="text-gray-400">Nyamasheke, Southern province</span>
      </div>

      <Row justify="space-between" gutter={12} wrap={true}>
        <Col className="w-[50%] mb-4">
          <MediumCard title="Revenue (Rwf)" count={4656} isFetching={false} />
        </Col>

        <Col className="w-[50%] mb-4">
          <MediumCard
            title="Cash collected (Rwf)"
            count={8656876}
            isFetching={false}
          />
        </Col>

        <Col
          className="w-[50%] mb-4 pointer"
          onClick={() => router.push(routes.Trucks.url)}
        >
          <MediumCard title="Trucks available" count={7} isFetching={false} />
        </Col>

        <Col
          className="w-[50%] mb-4 pointer"
          onClick={() => router.push(routes.Clients.url)}
        >
          <MediumCard title="Clients" count={98} isFetching={false} />
        </Col>
      </Row>
    </Col>
  );
};

export default DepotLeftSide;
