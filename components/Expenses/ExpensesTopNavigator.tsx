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

const ExpensesTopNavigator: FC<ExpensesTopNavigatorTypes> = ({
  showModal,
  isWarningModalVisible,
  showWarningModal,
  setIsWarningModalVisible,
  expenses,
  sort,
  setSort,
  selectedRows,
  approveSelected,
  isApproving
}) => {
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
              onClick={showWarningModal}
              loading={isApproving}
              disabled={isApproving}
            >
              APPROVE SELECTED
            </Button>
          </div>

          <div className="flex items-center gap-6">
            <Button
              type="danger_filled"
              onClick={showWarningModal}
              loading={isApproving}
              disabled={isApproving}
            >
              DELETE SELECTED
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
      {/* Action Modal */}
      <ActionModal
        isModalVisible={isWarningModalVisible}
        setIsModalVisible={setIsWarningModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => approveSelected()}
        loading={isApproving}
      />

      <Navbar type="CENTER" LeftSide={LeftSide} RightSide={RightSide} />
    </>
  );
};

export default ExpensesTopNavigator;
