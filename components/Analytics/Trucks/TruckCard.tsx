import Image from "antd/lib/image";
import Card from "antd/lib/card";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

const DocumentCard = ({ document }: any) => {
  return (
    <Card
      className="radius4 myCard"
      headStyle={{ border: "none", marginBottom: "0" }}
    >
      <Row align="middle">
        <Col flex="auto">
          <Row align="middle" gutter={24}>
            <Col>
              <Image
                width={16}
                src="/icons/description_FILL0_wght400_GRAD0_opsz48.svg"
                alt=""
              />
            </Col>

            <Col>
              <span className="normalText">{document.title}</span>
            </Col>
          </Row>
        </Col>

        <Col flex="none">
          <Row align="middle" gutter={16}>
            <Col>
              <a href={document.url} target="_blank" rel="noopener noreferrer">
                <Image
                  className="pointer"
                  width={18}
                  height={18}
                  src="/icons/download.svg"
                  alt=""
                  preview={false}
                />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default DocumentCard;
