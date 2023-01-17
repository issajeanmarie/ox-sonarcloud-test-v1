/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import React from "react";
import { FC } from "react";
import { ExpensesTopNavigatorTypes } from "../../lib/types/pageTypes/Expenses/ExpensesTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import ReacordExpense from "../Forms/Expenses/RecordExpense";
import DropDownSelector from "../Shared/DropDownSelector";
import Navbar from "../Shared/Content/Navbar";
import Heading1 from "../Shared/Text/Heading1";
import Button from "../Shared/Button";
import { localeString } from "../../utils/numberFormatter";

const ExpensesTopNavigator: FC<ExpensesTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  expenses,
  sort,
  setSort
}) => {
  // ADD EXPENSE
  // const handlePostExpenseSuccess = () => {
  //   form.resetFields();
  //   setIsModalVisible(false);
  // };

  const onRecordExpenseFinish = () => {
    setIsModalVisible(false);
  };

  const LeftSide = (
    <Col className="flex items-center gap-4">
      <Row gutter={24} align="middle" wrap={false}>
        <Col>
          <Heading1>{localeString(expenses?.totalElements)} Expenses</Heading1>
        </Col>

        <Col>
          <DropDownSelector
            label="Sort"
            dropDownContent={[
              { id: 0, name: "Date (New - Old)", value: "DATE_DESC" },
              { id: 1, name: "Date (Old - New)", value: "DATE_ASC" }
            ]}
            defaultSelected={sort}
            setDefaultSelected={setSort}
          />
        </Col>
      </Row>
    </Col>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-6">
        <Button type="primary" onClick={showModal}>
          RECORD EXPENSE
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW EXPENSE"
        loading={false}
        footerContent={
          <Button
            type="primary"
            form="ReacordExpense"
            htmlType="submit"
            loading={false}
          >
            ADD EXPENSE
          </Button>
        }
      >
        <ReacordExpense
          onRecordExpenseFinish={onRecordExpenseFinish}
          isLoading={false}
        />
      </ModalWrapper>

      <Navbar type="CENTER" LeftSide={LeftSide} RightSide={RightSide} />
    </>
  );
};

export default ExpensesTopNavigator;
