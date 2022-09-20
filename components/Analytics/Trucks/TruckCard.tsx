import Image from "antd/lib/image";
import Card from "antd/lib/card";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useState } from "react";
import NewTRuckDocumentModal from "../../Modals/NewTruckDocumentModal";

const DocumentCard = ({ document, truckData }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [editTruckData, setEditTruckData] = useState({});

  const handleNewTruckModal = () => {
    setIsVisible(true);
    setEditTruckData(document);
  };

  return (
    <>
      <NewTRuckDocumentModal
        truckData={truckData}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isUserEditing={true}
        editTruckData={editTruckData}
        setEditTruckData={setEditTruckData}
      />
      <Card
        className="radius4 myCard"
        headStyle={{ border: "none", marginBottom: "0" }}
      >
        <Row justify="space-between" wrap={false} gutter={12}>
          <Col flex="auto">
            <Row wrap={false} gutter={12}>
              <Col>
                <Image
                  preview={false}
                  width={16}
                  src="/icons/description_FILL0_wght400_GRAD0_opsz48.svg"
                  alt=""
                />
              </Col>

              <Col className="text_ellipsis text-left" title={document.title}>
                {document.title}
              </Col>
            </Row>
          </Col>

          <Col>
            <Row align="middle" gutter={14} wrap={false}>
              <Col onClick={handleNewTruckModal}>
                <Image
                  className="pointer"
                  src="/icons/edit.svg"
                  alt=""
                  preview={false}
                  width={11}
                />
              </Col>

              <Col>
                <a
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="pointer"
                    width={12}
                    src="/icons/download_2.svg"
                    alt=""
                    preview={false}
                  />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DocumentCard;
