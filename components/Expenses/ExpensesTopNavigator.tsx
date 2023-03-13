/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import React from "react";
import { FC } from "react";
import { ExpensesTopNavigatorTypes } from "../../lib/types/pageTypes/Expenses/ExpensesTopNavigatorTypes";
import DropDownSelector from "../Shared/DropDownSelector";
import Navbar from "../Shared/Content/Navbar";
import Heading1 from "../Shared/Text/Heading1";
import Button from "../Shared/Button";
import { localeString } from "../../utils/numberFormatter";
import ActionModal from "../Shared/ActionModal";
import { Expense } from "../../lib/types/expenses";

const ExpensesTopNavigator: FC<ExpensesTopNavigatorTypes> = ({
  showModal,
  isDeleteModalVisible,
  setIsDeleteModalVisible,
  showDeleteModal,
  isApproveModalVisible,
  setIsApproveModalVisible,
  showApproveModal,
  expenses,
  sort,
  setSort,
  selectedRows,
  deleteSelected,
  isDeleting,
  approveSelected,
  isApproving
}) => {
  const isApproveDisabled = () => {
    const selectedExpenses = expenses?.content.filter(
      (expense: Expense) => selectedRows.indexOf(expense.id) !== -1
    );
    return (
      isApproving ||
      selectedExpenses?.find(
        (expense: Expense) =>
          !expense.depot ||
          !expense.date ||
          !expense.qbSupplierId ||
          !expense.amount ||
          !expense.qbTruckId ||
          !expense.qbLocationId ||
          !expense.description ||
          !expense.attachmentUrl ||
          !expense.qbPaymentMethodId ||
          !expense.qbPaymentType ||
          !expense.qbAccountId ||
          !expense.qbCategoryId
      )
    );
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
      {selectedRows.length ? (
        <>
          <div className="flex items-center gap-6">
            <Button
              type="secondary"
              onClick={showApproveModal}
              loading={isApproving}
              disabled={isApproveDisabled()}
            >
              {`APPROVE SELECTED (${selectedRows.length})`}
            </Button>
          </div>

          <div className="flex items-center gap-6">
            <Button
              type="danger_filled"
              onClick={showDeleteModal}
              loading={isApproving}
              disabled={isApproving}
            >
              {`DELETE SELECTED (${selectedRows.length})`}
            </Button>
          </div>
        </>
      ) : null}

      <div className="flex items-center gap-6">
        <Button type="primary" onClick={showModal}>
          RECORD EXPENSE
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar type="CENTER" LeftSide={LeftSide} RightSide={RightSide} />

      {/* Action Modal */}
      <ActionModal
        isModalVisible={isDeleteModalVisible}
        setIsModalVisible={setIsDeleteModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={deleteSelected}
        loading={isDeleting}
      />

      <ActionModal
        isModalVisible={isApproveModalVisible}
        setIsModalVisible={setIsApproveModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={approveSelected}
        loading={isApproving}
      />
    </>
  );
};

export default ExpensesTopNavigator;
