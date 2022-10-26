/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Divider, Form, Image, Row, Tag } from "antd";
import React, { FC, useState } from "react";
import {
  usePostClientTagMutation,
  useDeleteClientTagMutation
} from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { useTagsQuery } from "../../../../lib/api/endpoints/Tags/tagEndpoints";
import { ClientTagesTypes } from "../../../../lib/types/pageTypes/Clients/ClientTagesTypes";
import {
  BackendErrorTypes,
  GenericResponse
} from "../../../../lib/types/shared";
import AddClientTag from "../../../Forms/Clients/AddClientTag";
import ModalWrapper from "../../../Modals/ModalWrapper";
import CustomButton from "../../../Shared/Button/button";
import { ErrorMessage } from "../../../Shared/Messages/ErrorMessage";
import { SuccessMessage } from "../../../Shared/Messages/SuccessMessage";
import Button from "../../../Shared/Button";

type clientTags = {
  name: string | undefined;
  id: number | undefined;
};

const ClientTages: FC<ClientTagesTypes> = ({ client }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [postClientTag, { isLoading: isPostingTag }] =
    usePostClientTagMutation();

  const onAddClientTagFinish = (values: any) => {
    postClientTag({
      id: client?.id,
      name: values?.name
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  const { data: tags, isLoading: isTagsLoading } = useTagsQuery();
  const [deleteClientTag, { isLoading: isDeletingTag }] =
    useDeleteClientTagMutation();

  const onRemove = (id: number | undefined) => {
    deleteClientTag({
      id: client?.id,
      tagId: id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">TAGS</span>
            <span>
              {isDeletingTag && (
                <span className="font-light text-xs">Removing tag...</span>
              )}
            </span>
          </div>
        </Col>

        <Col flex="none">
          <CustomButton
            form=""
            onClick={showModal}
            type="secondary"
            size="icon"
            icon={
              <Image
                src="/icons/ic-actions-add-simple.svg"
                alt="OX Delivery Logo"
                width={12}
                preview={false}
              />
            }
          />
        </Col>
      </Row>
      <Divider style={{ padding: 0, margin: 0 }} />

      <div className="w-full p-8">
        {client?.tags?.length < 1 ? (
          <span className="font-normal opacity-50 dark">
            No tags to display
          </span>
        ) : (
          <>
            {client?.tags?.map((tag: clientTags) => (
              <Tag onClose={() => onRemove(tag?.id)} key={tag?.id} closable>
                {tag?.name}
              </Tag>
            ))}
          </>
        )}
      </div>

      <ModalWrapper
        footerContent={
          <Button
            form="AddClientTag"
            loading={isPostingTag}
            type="primary"
            htmlType="submit"
          >
            ADD TAG
          </Button>
        }
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="ADD TAG"
        loading={isPostingTag}
      >
        <AddClientTag
          onAddClientTagFinish={onAddClientTagFinish}
          isLoading={isPostingTag}
          tags={tags?.payload}
          isTagsLoading={isTagsLoading}
          form={form}
        />
      </ModalWrapper>
    </Row>
  );
};

export default ClientTages;
