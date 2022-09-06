import React, { useEffect, useRef } from "react";
import Row from "antd/lib/row";
import info from "antd/lib/message";
import Col from "antd/lib/col";
import Divider from "antd/lib/divider";
import Checkbox from "antd/lib/checkbox";
import moment from "moment";
import CustomButton from "../../Shared/Button/button";
import { useLazyGetTruckIssuesQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useRouter } from "next/router";
import Loader from "../../Shared/Loader";
import { SingleTruckIssueTypes } from "../../../lib/types/trucksTypes";

const TruckIssuesPane = () => {
  const [getTruckIssues, { isLoading, data }] = useLazyGetTruckIssuesQuery();
  const componentDidMount = useRef(false);

  const router = useRouter();
  const { id: truckId } = router.query;

  useEffect(() => {
    if (!componentDidMount.current && truckId) {
      getTruckIssues(truckId)
        .unwrap()
        .then()
        .catch((err) => info.error(err?.data?.message || "Something is wrong"));

      componentDidMount.current = true;
    }
  }, [truckId, getTruckIssues]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Row
            justify="space-between"
            className="bg-white my-4 mb-12 rounded shadow-[0px_0px_19px_#2A354808]"
          >
            <Col className="flex items-center gap-4">
              <span className="font-bold">Truck known issues</span>
            </Col>

            <Col className="flex items-center gap-4">
              <CustomButton type="primary">
                <span className="text-sm">LOG ISSUE</span>
              </CustomButton>
            </Col>
          </Row>

          <Divider />

          {data?.content?.map((issue: SingleTruckIssueTypes) => {
            return (
              <Row
                key={issue.id}
                style={{
                  padding: "24px",
                  border: "1px solid var(--color_toggle_grey)",
                  borderRadius: "4px",
                  marginBottom: "16px"
                }}
                align="middle"
                justify="space-between"
              >
                <Col>
                  <Row align="middle" gutter={64}>
                    <Col>1</Col>

                    <Col>
                      <span>{issue?.description}</span>
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row align="middle" gutter={64}>
                    <Col>
                      <span>
                        {" "}
                        Reported on{" "}
                        {moment(issue.createdAt).format("MMMM DD, YYYY")}
                      </span>
                    </Col>

                    <Col>
                      <Checkbox defaultChecked={issue?.status === "RESOLVED"} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
          })}
        </>
      )}
    </>
  );
};

export default TruckIssuesPane;
