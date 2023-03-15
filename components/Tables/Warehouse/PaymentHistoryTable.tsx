/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import RowsWrapper from "../RowsWrapper";
import { Form, Image } from "antd";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import CustomButton from "../../Shared/Button/button";
import { FC, useState } from "react";
import moment from "moment";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditTransaction from "../../Forms/Warehouse/Edit/EditTransaction";
import { useEditSaleTransactionMutation } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { userType } from "../../../helpers/getLoggedInUser";
import Button from "../../Shared/Button";

const { Text } = Typography;

type PaymentHistoryTableTypes = {
  id: number;
  amount: number;
  date: string;
  momoRefCode: string;
};

type PaymentHistoryTableProps = {
  transactions: [PaymentHistoryTableTypes];
  isFetching: boolean;
  saleId: number;
};

const PaymentHistoryTable: FC<PaymentHistoryTableProps> = ({
  transactions,
  isFetching,
  saleId
}) => {
  const user = userType();
  const [form] = Form.useForm();
  const [itemToEdit, setItemToEdit] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editSaleTransaction, { isLoading: isEditingTransaction }] =
    useEditSaleTransactionMutation();
  const showModal = (record: any) => {
    setIsModalVisible(true);
    form.setFieldsValue(record);
    setItemToEdit(record);
  };

  const handleFinish = (value: any) => {
    editSaleTransaction({
      id: saleId,
      transactionId: itemToEdit?.id,
      amount: value?.amount,
      momoRefCode: value?.momoRefCode,
      createdAt: ""
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>amount</span>
        </div>
      ),
      key: "amount",
      render: (
        text: PaymentHistoryTableTypes,
        record: PaymentHistoryTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">
                {numbersFormatter(record?.amount || 0)} Rwf
              </Text>
            </div>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "date",
      key: "date",
      render: (
        text: PaymentHistoryTableTypes,
        record: PaymentHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.date && moment(record?.date).format("ll")}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "ref",
      key: "ref",
      render: (
        text: PaymentHistoryTableTypes,
        record: PaymentHistoryTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex items-center gap-2">
            <Text className="normalText fowe700">MoMo Ref:</Text>
            <Text className="normalText opacity_56">{record?.momoRefCode}</Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "action",
      key: "action",
      render: (
        text: PaymentHistoryTableTypes,
        record: PaymentHistoryTableTypes
      ) => (
        <RowsWrapper>
          {user?.isSuperAdmin ? (
            <div className="flex justify-end items-center">
              <div className="h-1 flex items-center">
                <CustomButton
                  onClick={() => showModal(record)}
                  type="normal"
                  size="icon"
                  icon={
                    <Image
                      src="/icons/ic-contact-edit.svg"
                      alt=""
                      width={16}
                      preview={false}
                    />
                  }
                />
              </div>
            </div>
          ) : null}
        </RowsWrapper>
      )
    }
  ];
  return (
    <>
      <Table
        className="data_table  noborder"
        columns={columns}
        dataSource={transactions}
        rowKey={(record) => record?.id}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        showHeader={false}
        loading={TableOnActionLoading(isFetching)}
      />
      <ModalWrapper
        footerContent={
          <Button
            form="EditTransaction"
            type="primary"
            htmlType="submit"
            loading={isEditingTransaction}
          >
            SAVE CHANGES
          </Button>
        }
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="Edit payment history"
        loading={isEditingTransaction}
      >
        <EditTransaction form={form} handleFinish={handleFinish} />
      </ModalWrapper>
    </>
  );
};

export default PaymentHistoryTable;
