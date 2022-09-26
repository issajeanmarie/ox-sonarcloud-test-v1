import Card from "antd/lib/card";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDownloadOOSReportMutation } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";

const TruckOverviewCard = ({ data }: any) => {
  const [downloadOOSReport, { isLoading: isDownloadLoading }] =
    useDownloadOOSReportMutation();

  const handleDownloadSuccess = (file: File) => {
    handleDownloadFile({
      file,
      name: "OOS Report",
      fileFormat: "xls"
    });
  };

  const handleDownloadOOSReport = () => {
    handleAPIRequests({
      request: downloadOOSReport,
      successMessage: "File downloaded successfully!",
      handleSuccess: handleDownloadSuccess,
      fileType: "XLS"
    });
  };

  return (
    <Card className="radius4 overviewCard">
      <span className="block mb-2 text_ellipsis" title={data?.name}>
        {data?.name}
      </span>

      <Row align="middle" justify="space-between">
        <Col>
          <span className="text-2xl font-semibold block yellow">
            {data?.num}
          </span>
        </Col>

        <Col>
          {data.name === "Out of service days" ? (
            isDownloadLoading ? (
              <LoadingOutlined spin={isDownloadLoading} />
            ) : (
              <Image
                onClick={handleDownloadOOSReport}
                className="pointer"
                width={18}
                height={18}
                src="/icons/download.svg"
                alt=""
                preview={false}
              />
            )
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default TruckOverviewCard;
