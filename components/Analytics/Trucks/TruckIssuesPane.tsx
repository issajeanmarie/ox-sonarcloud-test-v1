import React, { useEffect, useRef, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Divider from "antd/lib/divider";
import Checkbox from "antd/lib/checkbox";
import moment from "moment";
import Spin from "antd/lib/spin";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import CustomButton from "../../Shared/Button/button";
import {
  useLazyGetTruckIssuesQuery,
  useToggleTruckIssueStatusMutation
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useRouter } from "next/router";
import Loader from "../../Shared/Loader";
import { SingleTruckIssueTypes } from "../../../lib/types/trucksTypes";
import TruckNewIssueModal from "./TruckNewIssueModal";
import { useDispatch, useSelector } from "react-redux";
import { displayTruckIssues } from "../../../lib/redux/slices/trucksSlice";
import { TruckIssuesTypes } from "../../../lib/types/pageTypes/Trucks/DisplayTrucksTypes";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

type SingleIssueTypes = {
  createdAt: string;
  deletedAt: null;
  description: string;
  id: number;
  status: string;
  updatedAt: string;
};

const antIcon = (
  <LoadingOutlined style={{ fontSize: 16, color: "black" }} spin />
);

const TruckIssuesPane = () => {
  const dispatch = useDispatch();
  const [loadingBtn, setLoadingBtn] = useState<number | null>(null);
  const truckIssues = useSelector(
    (state: TruckIssuesTypes) => state.trucks.displayTruckIssues
  );

  const [isNewIssueModalVisible, setIsNewIssueModalVisible] =
    useState<boolean>(false);
  const [getTruckIssues, { isLoading }] = useLazyGetTruckIssuesQuery();
  const [toggleTruckIssueStatus] = useToggleTruckIssueStatusMutation();
  const componentDidMount = useRef(false);

  const router = useRouter();
  const { id: truckId } = router.query;

  const handleGetIssuesSuccess = (payload: any) => {
    dispatch(displayTruckIssues({ payload, replace: true }));
  };

  useEffect(() => {
    if (!componentDidMount.current && truckId) {
      handleAPIRequests({
        request: getTruckIssues,
        truckId,
        handleSuccess: handleGetIssuesSuccess
      });

      componentDidMount.current = true;
    }
  }, [truckId, getTruckIssues, dispatch]);

  const handleLogNewIssue = () => {
    setIsNewIssueModalVisible(true);
  };

  const handleToggleIssueSuccess = (payload: any) => {
    const newIssues: object[] = [];
    truckIssues?.content?.map((truckIssue: SingleIssueTypes) => {
      if (truckIssue?.id !== payload?.payload?.id) {
        newIssues.push(truckIssue);
      } else {
        newIssues.push(payload?.payload);
      }
    });
    dispatch(displayTruckIssues({ payload: newIssues, toggle: true }));
    setLoadingBtn(null);
  };

  const handleToggleIssueFailure = () => {
    setLoadingBtn(null);
  };

  const handleCheckBoxChange = (issueId: number) => {
    setLoadingBtn(issueId);
    handleAPIRequests({
      request: toggleTruckIssueStatus,
      truckId,
      issueId,
      showSuccess: true,
      handleSuccess: handleToggleIssueSuccess,
      handleFailure: handleToggleIssueFailure
    });
  };

  return (
    <>
      <TruckNewIssueModal
        isVisible={isNewIssueModalVisible}
        setIsVisible={setIsNewIssueModalVisible}
      />
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
              <CustomButton type="primary" onClick={handleLogNewIssue}>
                <span className="text-sm">LOG ISSUE</span>
              </CustomButton>
            </Col>
          </Row>

          <Divider />

          {truckIssues?.content?.map(
            (issue: SingleTruckIssueTypes, index: number) => {
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
                      <Col>{index + 1}</Col>

                      <Col>
                        <span
                          className={
                            issue?.status === "RESOLVED"
                              ? `line-through text-gray-400`
                              : ""
                          }
                        >
                          {issue?.description}
                        </span>
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row align="middle" gutter={64}>
                      <Col>
                        <span
                          className={
                            issue?.status === "RESOLVED" ? `text-gray-400` : ""
                          }
                        >
                          {" "}
                          Reported on{" "}
                          {moment(issue.createdAt).format("MMMM DD, YYYY")}
                        </span>
                      </Col>

                      <Col>
                        {issue.id === loadingBtn ? (
                          <Spin indicator={antIcon} />
                        ) : (
                          <Checkbox
                            defaultChecked={
                              issue?.status === "RESOLVED" ||
                              (loadingBtn === issue.id &&
                                issue.status === "UNRESOLVED")
                            }
                            onChange={() => handleCheckBoxChange(issue.id)}
                          />
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            }
          )}
        </>
      )}
    </>
  );
};

export default TruckIssuesPane;
