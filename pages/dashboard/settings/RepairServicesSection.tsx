import { Row, Col, Typography, Image, Empty } from "antd";
import SettingsCardWrapper from "../../../components/Settings/SettingsCardWrapper";
import { SettingsCategoriesTableLoader } from "../../../components/Shared/Loaders/Loaders";
import { useLazyGetRepairServicesQuery } from "../../../lib/api/endpoints/settings/settingsEndpoints";
import Input from "../../../components/Shared/Input";
import { useEffect, useState } from "react";
import RepairServicesTable from "../../../components/Tables/Settings/RepairServicesTable";
import CustomButton from "../../../components/Shared/Button";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { pagination } from "../../../config/pagination";
import { useDispatch, useSelector } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import AddRepairService from "../../../components/Forms/Settings/AddRepairService";

const { Text } = Typography;

const RepairServicesSection = ({
  isAddingRepairService,
  onAddRepairServiceFinish,
  handleCancel,
  handleDeleteCategory,
  isDeletingCategory,
  isUpdatingCategory,
  onUpdateCategoryFinish,
  showEditRepairServiceModal,
  handleEditOk,
  handleEditCancel,
  isEditRepairServiceModalVisible,
  form,
  isId,
  setIsEditRepairServiceModalVisible
}: any) => {
  const [currentPages, setCurrentPages] = useState(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  const AllRepairServices = useSelector(
    (state: { paginatedData: any }) => state.paginatedData.displayPaginatedData
  );

  const [
    getRepairServices,
    { data: repairServices, isFetching: repairServicesFetching }
  ] = useLazyGetRepairServicesQuery();

  const dispatch = useDispatch();

  const handleRenderSuccess = (payload: any) => {
    dispatch(displayPaginatedData({ payload, onRender: true }));
  };

  const getRepairServicesAction = ({
    page,
    size = pagination.repairServices.size,
    request = getRepairServices,
    handleSuccess = handleRenderSuccess,
    query
  }: any) => {
    handleAPIRequests({
      request,
      page,
      size,
      query,
      handleSuccess
    });
  };

  useEffect(() => {
    setCurrentPages(1);
    getRepairServicesAction({ query: searchValue });
  }, [searchValue]);

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

    getRepairServicesAction({
      page: currentPages,
      handleFailure: handleLoadMoreFailure,
      handleSuccess: handleLoadMoreSuccess
    });
  };

  const handleCategorySearch = (value: string) => {
    setSearchValue(value);

    return null;
  };

  const onRenderLoader = repairServicesFetching && !isLoadMoreLoading;
  const showPagination =
    (AllRepairServices?.payload?.totalPages > currentPages ||
      isLoadMoreLoading) &&
    !(repairServicesFetching && !isLoadMoreLoading);

  return (
    <>
      <SettingsCardWrapper>
        <div className="mb-6">
          <Text className="mediumText">
            Repair services ({repairServices?.payload?.totalElements || 0})
          </Text>
        </div>

        <Row
          wrap={false}
          align="top"
          className="flex justify-between items-center mb-4 border-b pb-4 gap-4"
        >
          <Col>
            <Input
              allowClear
              type="text"
              name="searchCategory"
              placeholder="Search repair service"
              onChange={handleCategorySearch}
              suffixIcon={
                <Image
                  width={14}
                  src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                  preview={false}
                  alt=""
                />
              }
            />
          </Col>

          <AddRepairService
            onAddRepairServiceFinish={onAddRepairServiceFinish}
            isAddingRepairService={isAddingRepairService}
            btnTitle="Add service"
          />
        </Row>

        {onRenderLoader ? (
          <>
            {[...Array(10)].map((_, index) => (
              <SettingsCategoriesTableLoader key={index} />
            ))}
          </>
        ) : repairServices?.payload?.length <= 0 ? (
          <div className="justify-center w-full">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        ) : (
          <>
            <RepairServicesTable
              data={AllRepairServices?.payload?.content}
              handleCancel={handleCancel}
              handleDeleteCategory={handleDeleteCategory}
              isDeletingCategory={isDeletingCategory}
              isUpdatingCategory={isUpdatingCategory}
              onUpdateCategoryFinish={onUpdateCategoryFinish}
              showEditRepairServiceModal={showEditRepairServiceModal}
              handleEditOk={handleEditOk}
              handleEditCancel={handleEditCancel}
              isEditRepairServiceModalVisible={isEditRepairServiceModalVisible}
              setIsEditRepairServiceModalVisible={
                setIsEditRepairServiceModalVisible
              }
              form={form}
              categoriesFetching={onRenderLoader}
              isLoading={false}
              isId={isId}
            />
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
            )}{" "}
          </>
        )}
      </SettingsCardWrapper>
    </>
  );
};

export default RepairServicesSection;
