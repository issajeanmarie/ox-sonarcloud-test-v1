/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, SetStateAction } from "react";
import { Button, Col, Modal, Row, Typography } from "antd";
import { CloseIcon } from "../Icons";

const { Text } = Typography;

interface ModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  title: any;
  loading: boolean;
  onCancel?: () => void;
  destroyOnClose?: boolean;
  footerContent?: React.ReactNode;
  width?: number;
  subTitle?: string;
  footerWidth?: number;
}

const ModalWrapper: FC<ModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  children,
  title,
  loading,
  onCancel,
  destroyOnClose,
  footerContent,
  width = 550,
  subTitle,
  footerWidth
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      className="ox-modal ox_medium_modal"
      title={
        <div className="flex justify-between items-center">
          <div>
            <span
              className={`font-bold text-2xl uppercase mb-2 ${
                subTitle ? "block" : ""
              }`}
            >
              {title}
            </span>
            {subTitle && (
              <Text className="text-md font-normal">{subTitle}</Text>
            )}
          </div>
          {!loading && (
            <Button
              onClick={onCancel || handleCancel}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              {CloseIcon}
            </Button>
          )}
        </div>
      }
      width={width}
      footer={
        footerContent ? (
          <Row justify="end">
            <Col
              xs={24}
              sm={24}
              md={10}
              lg={footerWidth || 10}
              xl={footerWidth || 10}
              xxl={footerWidth || 10}
            >
              {footerContent}
            </Col>
          </Row>
        ) : (
          false
        )
      }
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={onCancel || handleCancel}
      centered
      maskClosable={!loading}
      closable={false}
      destroyOnClose={destroyOnClose}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
