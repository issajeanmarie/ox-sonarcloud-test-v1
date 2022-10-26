/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import { Col, Form, Row } from "antd";
import React, { FC } from "react";
import { usePostClientNoteMutation } from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { ClientAdminNotesTypes } from "../../../../lib/types/pageTypes/Clients/ClientAdminNotesTypes";
import {
  BackendErrorTypes,
  GenericResponse
} from "../../../../lib/types/shared";
import { requiredInput } from "../../../../lib/validation/InputValidations";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";
import { ErrorMessage } from "../../../Shared/Messages/ErrorMessage";
import { SuccessMessage } from "../../../Shared/Messages/SuccessMessage";

const ClientAdminNotes: FC<ClientAdminNotesTypes> = ({ client }) => {
  const [form] = Form.useForm();
  const [postClientNote, { isLoading: isPostingNote }] =
    usePostClientNoteMutation();

  const onAddClientNoteFinish = (values: any) => {
    postClientNote({
      id: client?.id,
      comment: values?.comment
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        form.resetFields();
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">ADMIN'S NOTES</span>
          </div>
        </Col>
      </Row>

      <div className="w-full p-8">
        <Form
          initialValues={{ comment: client?.comment || "" }}
          form={form}
          onFinish={onAddClientNoteFinish}
          name="AddAdminNotes"
          layout="vertical"
          title=""
        >
          <Row className="flex justify-end gap-8">
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Input
                type="text_area"
                name="comment"
                label="Note"
                placeholder="Type something"
                rules={requiredInput}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <Button
                form=""
                loading={isPostingNote}
                type="primary"
                htmlType="submit"
              >
                SAVE NOTE
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Row>
  );
};

export default ClientAdminNotes;
