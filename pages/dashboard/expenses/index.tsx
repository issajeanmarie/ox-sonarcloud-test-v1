/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ExpensesTable from "../../../components/Tables/Expenses/ExpensesTable";
import ExpensesTopNavigator from "../../../components/Expenses/ExpensesTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import {
  // useAuthorizeQuery,
  useLazyExpensesQuery
} from "../../../lib/api/endpoints/Expenses/expensesEndpoint";
import { ExpensesTableLoader } from "../../../components/Shared/Loaders/Loaders";
import Content from "../../../components/Shared/Content";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../../../config/pagination";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import RecordExpenseModal from "../../../components/Modals/RecordExpenseModal";
import { Expense } from "../../../lib/types/expenses";

const Expenses = () => {
  const [currentPages, setCurrentPages] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [sortValue, setSort]: any = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Expense | null>(null);

  // const { data } = useAuthorizeQuery();
  const [getExpenses, { isLoading: isExpensesLoading }] =
    useLazyExpensesQuery();

  const dispatch = useDispatch();

  const expensesState = useSelector(
    (state: any) => state.paginatedData.displayPaginatedData
  );

  const dispatchReplace = (newContent: any) => {
    dispatch(
      displayPaginatedData({
        payload: {
          payload: {
            content: [...newContent],
            totalPages: expensesState.payload.totalPages,
            totalElements: expensesState.payload.totalElements
          }
        },
        replace: true
      })
    );
  };

  const handleRenderSuccess = (res: any) => {
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
  };

  const handleLoadMoreSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getExpensesAction({
      page: currentPages,
      handleSuccess: handleLoadMoreSuccess,
      handleFailure: handleLoadMoreFailure
    });
  };

  const getExpensesAction = ({
    page,
    size = pagination.clients.size,
    sort = sortValue.value || "",
    handleSuccess = handleRenderSuccess,
    handleFailure,
    request = getExpenses
  }: any) => {
    handleAPIRequests({
      request,
      page,
      size,
      sort,
      handleSuccess,
      handleFailure
    });
  };

  const onSelectedRows = (rows: number[]) => {
    setSelectedRows(rows);
  };

  const approveSlected = () => {
    setIsWarningModalVisible(false);
  };

  useEffect(() => {
    getExpensesAction({});
  }, [sortValue]);

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (record: Expense) => {
    setItemToEdit(record);
    setIsModalVisible(true);
  };

  //WARNING MODAL
  const showWarningModal = () => {
    setIsWarningModalVisible(true);
  };

  const onRecordExpenseFinish = () => {
    setIsModalVisible(false);
  };

  const onEditExpenseFinish = ({ payload }: any) => {
    const newExpensesList: any = [];

    expensesState?.payload?.content?.map((resource: any) => {
      if (resource.id === payload.id) {
        newExpensesList.push(payload);
      } else {
        newExpensesList.push(resource);
      }
    });

    dispatchReplace(newExpensesList);
    setItemToEdit(null);
    setIsModalVisible(false);
  };

  const showPagination =
    expensesState?.payload?.totalPages > currentPages || isLoadMoreLoading;

  return (
    <Layout>
      <div className="mx-4 relative">
        <ExpensesTopNavigator
          showModal={showModal}
          isWarningModalVisible={isWarningModalVisible}
          showWarningModal={showWarningModal}
          setIsWarningModalVisible={setIsWarningModalVisible}
          expenses={expensesState?.payload}
          sort={sortValue}
          setSort={setSort}
          selectedRows={selectedRows}
          approveSelected={approveSlected}
          isApproving={false}
        />

        <Content isOverflowHidden={false} navType="CENTER">
          <>
            {isExpensesLoading ? (
              <>
                {[...Array(20)].map((_, index) => (
                  <ExpensesTableLoader key={index} />
                ))}
              </>
            ) : (
              <ExpensesTable
                expenses={expensesState}
                isExpensesFetching={isExpensesLoading}
                onSelectRows={onSelectedRows}
                showEditModal={showEditModal}
              />
            )}

            {showPagination && (
              <div style={{ width: "12%", margin: "32px auto" }}>
                <CustomButton
                  loading={isLoadMoreLoading}
                  onClick={handleLoadMore}
                  type="secondary"
                >
                  Load more
                </CustomButton>
              </div>
            )}
          </>
        </Content>
      </div>
      <RecordExpenseModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isEdit={!!itemToEdit}
        editExpenseData={itemToEdit}
        onRecordExpenseFinish={onRecordExpenseFinish}
        onEditExpenseFinish={onEditExpenseFinish}
      />
    </Layout>
  );
};

export default WithPrivateRoute(Expenses);
