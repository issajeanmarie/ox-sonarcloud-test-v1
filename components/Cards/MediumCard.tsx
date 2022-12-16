import { Card, Image, Spin, Typography } from "antd";
import React, { FC, useState } from "react";
import Dropdown from "antd/lib/dropdown";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import moment from "moment";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { AnalyticsCardTypes } from "../../lib/types/pageTypes/Analytics/AnalyticsCardTypes";
import { SmallSpinLoader } from "../Shared/Loaders/Loaders";
import { useDownloadAnalyticsReportMutation } from "../../lib/api/endpoints/Analytics/analyticEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import fileDownload from "js-file-download";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";

const { Text } = Typography;

const downloadOptions = [
  { id: 0, name: "Download PDF", value: "PDF" },
  { id: 1, name: "Download XLS", value: "XLS" },
  { id: 2, name: "Download CSV", value: "CSV" }
];

const MediumCard: FC<AnalyticsCardTypes> = ({
  title,
  subTitle,
  count,
  isFetching,
  scope,
  start,
  end
}) => {
  const [downloadAnlyticsReport, { isLoading }] =
    useDownloadAnalyticsReportMutation();
  const [loadingScope, setLoadingScope] = useState<string>("");

  const handleDownload = ({ scope, file_type }: any) => {
    setLoadingScope(scope);

    const handleDownloadFile = (file: File) => {
      const date = moment().format("YYYY-MM-DD");
      fileDownload(file, `Report-${date}.${file_type}`);
    };

    const handleDownloadFileFailure = () => {
      ErrorMessage("No data to download");
    };

    handleAPIRequests({
      request: downloadAnlyticsReport,
      file_type,
      start,
      end,
      scope,
      showSuccess: true,
      showFailure: false,
      handleSuccess: handleDownloadFile,
      handleFailure: handleDownloadFileFailure
    });
  };

  const DropdownMenu = (scope: string) => (
    <div className="radius4  myCard p-6 bg-white rounded shadow-[0px_0px_19px_#2A354808] border">
      {isLoading && loadingScope === scope ? (
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 13, color: "#e7b522" }} spin />
          }
        />
      ) : (
        downloadOptions.map((option) => (
          <Row
            onClick={() => handleDownload({ scope, file_type: option.value })}
            key={option.id}
            align="middle"
            gutter={12}
            className="pointer mb-4"
          >
            <Col>
              <Image
                src="/icons/download_2.svg"
                width={12}
                alt="Download icon"
                preview={false}
              />
            </Col>
            <Col className="text-base font-light">{option.name}</Col>
          </Row>
        ))
      )}
    </div>
  );

  return (
    <Card
      className="radius4 shadow-[0px_0px_19px_#00000008]"
      headStyle={{ border: "none", marginBottom: "0" }}
      bodyStyle={{ padding: "0 24px 24px 24px" }}
      style={{ width: "auto", border: "1px solid #EAEFF2" }}
      title={<Text className="text-base font-light">{title}</Text>}
      extra={
        scope && (
          <Dropdown overlay={() => DropdownMenu(scope)} trigger={["click"]}>
            <Image
              className="pointer"
              width={18}
              src="/icons/more_vert_FILL0_wght400_GRAD0_opsz48.svg"
              preview={false}
              alt=""
            />
          </Dropdown>
        )
      }
    >
      <Text className="text-2xl font-semibold block yellow mb-3">
        {isFetching ? (
          <SmallSpinLoader />
        ) : (
          <>{count !== null ? numbersFormatter(count) : "None"}</>
        )}
      </Text>
      <Text className="captionText">
        {isFetching ? `Hold on, getting you ${title}...` : subTitle}
      </Text>
    </Card>
  );
};

export default MediumCard;
