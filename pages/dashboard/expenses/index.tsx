/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ExpensesTable from "../../../components/Tables/Expenses/ExpensesTable";
import ExpensesTopNavigator from "../../../components/Expenses/ExpensesTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import {
  useApproveMutation,
  useDeleteExpenseMutation,
  useLazyAuthorizeQuery,
  useLazyExpensesQuery
} from "../../../lib/api/endpoints/Expenses/expensesEndpoint";
import {
  AppLoadingLoader,
  ExpensesTableLoader
} from "../../../components/Shared/Loaders/Loaders";
import Content from "../../../components/Shared/Content";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../../../config/pagination";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import RecordExpenseModal from "../../../components/Modals/RecordExpenseModal";
import { Expense, ExpenseStatus } from "../../../lib/types/expenses";
import ActionModal from "../../../components/Shared/ActionModal";
import { useRouter } from "next/router";

const Expenses = () => {
  const [isAuthError, setIsAuthError] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [sortValue, setSort]: any = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [isApproveModalVisible, setIsApproveModalVisible] =
    useState<boolean>(false);
  const [isDeleteSelectedModalVisible, setIsDeleteSelectedModalVisible] =
    useState(false);
  const [isApproveSelectedModalVisible, setIsApproveSelectedModalVisible] =
    useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<Expense | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number>();
  const [itemToApprove, setItemToApprove] = useState<number>();
  const router = useRouter();

  const [authenticate, { isLoading: isAuthLoading }] = useLazyAuthorizeQuery();
  const [
    getExpenses,
    { isLoading: isExpensesLoading, isFetching: isExpensesFetching }
  ] = useLazyExpensesQuery();
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();
  const [approveExpense, { isLoading: isApproving }] = useApproveMutation();

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

  const handleAuthSuccess = (res: any) => {
    if (res?.payload) {
      router.replace(res.payload);
    }
  };

  const onQBAuthFailure = () => {
    setIsAuthError(true);
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

  const handleDeleteExpenseSuccess = () => {
    const ids = itemToDelete ? [itemToDelete] : selectedRows;
    const newExpensesList = expensesState?.payload?.content?.filter(
      (expense: any) => ids.indexOf(expense.id) === -1
    );
    dispatchReplace(newExpensesList);
    setItemToDelete(undefined);
    setSelectedRows([]);
    setIsDeleteModalVisible(false);
    setIsDeleteSelectedModalVisible(false);
  };

  const handleApproveExpenseSuccess = () => {
    const newExpensesList: any = [];
    const ids = itemToApprove ? [itemToApprove] : selectedRows;

    expensesState?.payload?.content?.forEach((expense: any) => {
      if (ids.indexOf(expense.id) > -1) {
        const payload = { ...expense, status: "APPROVED" as ExpenseStatus };
        newExpensesList.push(payload);
      } else {
        newExpensesList.push(expense);
      }
    });

    dispatchReplace(newExpensesList);
    setItemToApprove(undefined);
    setSelectedRows([]);
    setIsApproveModalVisible(false);
    setIsApproveSelectedModalVisible(false);
  };

  const handleQBFailure = (res: any) => {
    setItemToApprove(undefined);
    setSelectedRows([]);
    setIsApproveModalVisible(false);
    setIsApproveSelectedModalVisible(false);
    if (
      res?.status === 401 ||
      (res?.data?.message &&
        (res.data.message.indexOf("Access is denied") !== -1 ||
          res.data.message.indexOf("Token expired") !== -1 ||
          res.data.message.indexOf("Token revoked") !== -1))
    ) {
      onQBAuthFailure();
    }
  };

  const authenticationAction = ({
    request = authenticate,
    handleSuccess = handleAuthSuccess,
    handleFailure
  }: any) => {
    handleAPIRequests({
      request,
      handleSuccess,
      handleFailure
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

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getExpensesAction({
      page: currentPages,
      handleSuccess: handleLoadMoreSuccess,
      handleFailure: handleLoadMoreFailure
    });
  };

  const handleDeleteExpense = (ids: number[]) => {
    handleAPIRequests({
      request: deleteExpense,
      ids,
      showSuccess: true,
      handleSuccess: handleDeleteExpenseSuccess
    });
  };

  const handleApproveExpense = (ids: number[]) => {
    handleAPIRequests({
      request: approveExpense,
      ids,
      showSuccess: true,
      handleSuccess: handleApproveExpenseSuccess,
      handleFailure: handleQBFailure
    });
  };

  const handleDelete = () => {
    if (itemToDelete) {
      handleDeleteExpense([itemToDelete]);
    }
  };

  const handleApprove = () => {
    if (itemToApprove) {
      handleApproveExpense([itemToApprove]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length) {
      handleDeleteExpense(selectedRows);
    }
  };

  const handleApproveSlected = () => {
    if (selectedRows.length) {
      handleApproveExpense(selectedRows);
    }
  };

  useEffect(() => {
    if (isAuthError) {
      authenticationAction({});
    }
  }, [isAuthError]);

  useEffect(() => {
    getExpensesAction({});
  }, [sortValue]);

  const onSelectedRows = (rows: number[]) => {
    setSelectedRows(rows);
  };

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (record: Expense) => {
    setItemToEdit(record);
    setIsModalVisible(true);
  };

  const showDeleteModal = (id: number) => {
    setItemToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const showApproveModal = (id: number) => {
    setItemToApprove(id);
    setIsApproveModalVisible(true);
  };

  const showDeleteSelectedModal = () => {
    setIsDeleteSelectedModalVisible(true);
  };

  const showApproveSelectedModal = () => {
    setIsApproveSelectedModalVisible(true);
  };

  const showPagination =
    expensesState?.payload?.totalPages > currentPages || isLoadMoreLoading;

  return (
    <Layout>
      {isAuthLoading ? (
        <AppLoadingLoader />
      ) : (
        <>
          <div className="mx-4 relative">
            <ExpensesTopNavigator
              showModal={showModal}
              isDeleteModalVisible={isDeleteSelectedModalVisible}
              setIsDeleteModalVisible={setIsDeleteSelectedModalVisible}
              showDeleteModal={showDeleteSelectedModal}
              isApproveModalVisible={isApproveSelectedModalVisible}
              setIsApproveModalVisible={setIsApproveSelectedModalVisible}
              showApproveModal={showApproveSelectedModal}
              expenses={expensesState?.payload}
              sort={sortValue}
              setSort={setSort}
              selectedRows={selectedRows}
              deleteSelected={handleDeleteSelected}
              isDeleting={isDeleting}
              approveSelected={handleApproveSlected}
              isApproving={isApproving}
            />

            <Content isOverflowHidden={false} navType="CENTER">
              <>
                {isExpensesLoading || isExpensesFetching ? (
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
                    showApproveModal={showApproveModal}
                    showDeleteModal={showDeleteModal}
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
          {isModalVisible && (
            <RecordExpenseModal
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              isEdit={!!itemToEdit}
              editExpenseData={itemToEdit}
              onRecordExpenseFinish={onRecordExpenseFinish}
              onEditExpenseFinish={onEditExpenseFinish}
              onCancel={() => setItemToEdit(null)}
              onQBAuthFailure={onQBAuthFailure}
            />
          )}

          {/* Action Modal */}
          <ActionModal
            isModalVisible={isDeleteModalVisible}
            setIsModalVisible={setIsDeleteModalVisible}
            title="warning!"
            description="This action is not reversible, please make sure you really want to proceed with this action!"
            actionLabel="PROCEED"
            type="danger"
            action={handleDelete}
            loading={isDeleting}
          />

          <ActionModal
            isModalVisible={isApproveModalVisible}
            setIsModalVisible={setIsApproveModalVisible}
            title="warning!"
            description="This action is not reversible, please make sure you really want to proceed with this action!"
            actionLabel="PROCEED"
            type="danger"
            action={handleApprove}
            loading={isApproving}
          />
        </>
      )}
    </Layout>
  );
};

export default WithPrivateRoute(Expenses);
