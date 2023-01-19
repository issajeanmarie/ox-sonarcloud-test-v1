/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ExpensesTable from "../../../components/Tables/Expenses/ExpensesTable";
import ExpensesTopNavigator from "../../../components/Expenses/ExpensesTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
// import {
//   useLazyExpensesQuery
// } from "../../../lib/api/endpoints/Expenses/expensesEndpoint";
import { ExpensesTableLoader } from "../../../components/Shared/Loaders/Loaders";
import Content from "../../../components/Shared/Content";

const Expenses = () => {
  const [currentPages, setCurrentPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory]: any = useState("");
  const [sortValue, setSort]: any = useState("");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

  // const [getExpenses, { isLoading: isExpensesLoading }] = useLazyExpensesQuery();
  const isExpensesLoading = false;

  const expensesState = {
    payload: {
      content: [
        {
          id: 1,
          depot: "Tyazo depot",
          supplier: "Elvis Rugamba",
          payee: "Elvis Rugamba",
          truck: "RAD 345 D",
          date: "2022-10-13T08:08:29.735267",
          amount: 15000,
          attachment:
            "https://oxawsbucket.s3.af-south-1.amazonaws.com/sample.pdf",
          description:
            "https://oxawsbucket.s3.af-south-1.amazonaws.com/sample.pdf",
          approved: false
        },
        {
          id: 2,
          depot: "Kayove depot",
          supplier: "Brian Gitego",
          payee: "Brian Gitego",
          truck: "RAF 456 E",
          date: "2022-10-12T08:08:29.735267",
          amount: 10000,
          description: "Here.s note about the expense",
          approved: true
        }
      ],
      totalElements: 2
    }
  };

  // const dispatch = useDispatch();

  // useSelector(
  //   (state: any) => state.paginatedData.displayPaginatedData
  // );

  // const handleRenderSuccess = (res: any) => {
  //   setFiltersBasedLoader(false);
  //   dispatch(displayPaginatedData({ payload: res, onRender: true }));
  // };

  // const handleLoadMoreOrdersSuccess = ({ payload }: any) => {
  //   dispatch(displayPaginatedData({ payload, paginate: true }));
  //   setIsLoadMoreLoading(false);
  // };

  // const handleLoadMoreOrdersFailure = () => {
  //   setIsLoadMoreLoading(false);
  // };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);
  };

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  //WARNING MODAL
  const showWarningModal = () => {
    setIsWarningModalVisible(true);
  };

  const showPagination = false;
  // expensesState?.payload?.totalPages > currentPages || isLoadMoreLoading;

  return (
    <Layout>
      <div className="mx-4 relative">
        <ExpensesTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          expenses={expensesState?.payload}
          defaultSelected={selectedCategory}
          setDefaultSelected={setSelectedCategory}
          sort={sortValue}
          setSort={setSort}
          setCurrentPages={setCurrentPages}
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
                isModalVisible={isWarningModalVisible}
                showModal={showWarningModal}
                setIsModalVisible={setIsWarningModalVisible}
                expenses={expensesState}
                isExpensesFetching={false}
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
    </Layout>
  );
};

export default WithPrivateRoute(Expenses);
