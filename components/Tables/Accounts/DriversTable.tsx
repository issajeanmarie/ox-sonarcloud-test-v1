/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import { Col, Dropdown, Form, Menu, Row } from "antd";
import Typography from "antd/lib/typography";
import { DriversTableTypes } from "../../../lib/types/pageTypes/Accounts/Drivers/DriversTableTypes";
import { DriversTableProps } from "../../../lib/types/pageTypes/Accounts/Drivers/DriversTableProps";
import RowsWrapper from "../RowsWrapper";
import CustomButton from "../../Shared/Button";
import Button from "../../Shared/Button";
import { Image } from "antd";
import { FC, SetStateAction, useState } from "react";
import ActionModal from "../../Shared/ActionModal";
import {
  SmallSpinLoader,
  TableOnActionLoading
} from "../../Shared/Loaders/Loaders";
import {
  useDeleteDriverMutation,
  useEditDriverMutation,
  useEndShiftMutation,
  useMakeDriverDispatcherMutation,
  useToggleDriverMutation
} from "../../../lib/api/endpoints/Accounts/driversEndpoints";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditDriver from "../../Forms/Accounts/Drivers/EditDriver";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { useDispatch, useSelector } from "react-redux";
import { useGetShiftPreferencesQuery } from "../../../lib/api/endpoints/settings/settingsEndpoints";
import getHoursDiff from "../../../utils/getHoursDiff";
import { toNewDate } from "../../../utils/toNewDate";
import { splitDates } from "../../../utils/splitDates";
import { percentageCalculator } from "../../../helpers/pacentageCalculators";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";

const { Text } = Typography;

const DriversTable: FC<DriversTableProps> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Drivers,
  isDriversFetching
}) => {
  const [form] = Form.useForm();
  const [shiftToEnd, setShiftToEnd] =
    useState<SetStateAction<number | null>>(null);
  const [itemToDelete, setItemToDelete] =
    useState<SetStateAction<number | undefined>>();
  const [driverToToggle, setDriverToToggle] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [driverToMakeDispatcher, setDriverToMakeDispatcher] = useState<
    number | undefined
  >();
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();

  const router = useRouter();

  const AllDrivers = useSelector(
    (state: any) => state.paginatedData.displayPaginatedData
  );

  const dispatch = useDispatch();

  const [deleteDriver, { isLoading }] = useDeleteDriverMutation();
  const [editDriver, { isLoading: isEditing }] = useEditDriverMutation();
  const [toggleDriver, { isLoading: isTogglingDriver }] =
    useToggleDriverMutation();
  const [makeDriverDispatcher, { isLoading: isMakingDispatcher }] =
    useMakeDriverDispatcherMutation();
  const { data: shiftPreferences } = useGetShiftPreferencesQuery();
  const [endShift] = useEndShiftMutation();

  const handleDeleteDriverSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ deleted: true, payload: { id: payload } }));

    setIsModalVisible(false);
  };

  const handleDeleteDriver = () => {
    handleAPIRequests({
      request: deleteDriver,
      id: itemToDelete,
      showSuccess: true,
      handleSuccess: handleDeleteDriverSuccess
    });
  };

  //edit
  const showEditModal = (record: any) => {
    setItemToEdit(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
    setPhoneNumber(record?.phone || "");
  };

  const dispatchReplace = (newContent: any) => {
    dispatch(
      displayPaginatedData({
        payload: {
          payload: {
            content: [...newContent],
            totalPages: AllDrivers.payload.totalPages,
            totalElements: AllDrivers.payload.totalElements
          }
        },
        replace: true
      })
    );
  };

  const handleEditDriverSuccess = ({ payload }: any) => {
    form.resetFields();
    setIsEditModalVisible(false);
    setPhoneNumber("");

    const newDriversList: any = [];

    AllDrivers?.payload?.content?.map((driver: any) => {
      if (driver.id === payload.id) {
        newDriversList.push(payload);
      } else {
        newDriversList.push(driver);
      }
    });

    dispatchReplace(newDriversList);
  };

  const onEditDriverFinish = (values: any) => {
    phoneNumber &&
      handleAPIRequests({
        request: editDriver,
        names: values?.names,
        email: values?.email,
        phone: phoneNumber,
        gender: values?.gender,
        id: itemToEdit?.id,
        showSuccess: true,
        handleSuccess: handleEditDriverSuccess
      });
  };

  const handleToggleDriverSuccess = ({ payload }: any) => {
    const newDriversList: any = [];

    AllDrivers?.payload?.content?.map((driver: any) => {
      if (driver.id === payload.id) {
        newDriversList.push({ ...driver, enabled: payload.enabled });
      } else {
        newDriversList.push(driver);
      }
    });

    dispatchReplace(newDriversList);
  };

  //toggle
  const handleToggleDriver = (id: any) => {
    setDriverToToggle(id);

    handleAPIRequests({
      request: toggleDriver,
      id: id,
      showSuccess: true,
      handleSuccess: handleToggleDriverSuccess
    });
  };

  const handleMakeDispatcherSuccess = ({ payload }: any) => {
    const newDriversList: any = [];

    AllDrivers?.payload?.content?.map((driver: any) => {
      if (driver.id === payload.id) {
        newDriversList.push({ ...driver, role: payload.role });
      } else {
        newDriversList.push(driver);
      }
    });

    dispatchReplace(newDriversList);
  };

  const handleMakeDispatcher = (id: number | undefined) => {
    setDriverToMakeDispatcher(id);
    handleAPIRequests({
      request: makeDriverDispatcher,
      id: id,
      showSuccess: true,
      handleSuccess: handleMakeDispatcherSuccess
    });
  };

  const handleEndShiftFailure = () => {
    setShiftToEnd(null);
  };

  const handleEndShiftSuccess = ({ payload }: any) => {
    const newDriversList: any = [];

    AllDrivers?.payload?.content?.map((driver: any) => {
      if (driver.id === payload.id) {
        newDriversList.push({ ...driver, ongoingShift: null });
      } else {
        newDriversList.push(driver);
      }
    });

    dispatchReplace(newDriversList);

    setShiftToEnd(null);
  };

  const handleEndShift = (id: number) => {
    setShiftToEnd(id);

    handleAPIRequests({
      request: endShift,
      id: id,
      showSuccess: true,
      handleSuccess: handleEndShiftSuccess,
      handleFailure: handleEndShiftFailure
    });
  };

  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Names</span>
        </div>
      ),
      key: "Names",
      width: "22%",
      render: (
        text: DriversTableTypes,
        record: DriversTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <Text
              className="normalText fowe700 text_ellipsis"
              title={record.names}
            >
              {record?.names}
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Phone number",
      width: "12%",
      key: "phoneNumber",
      render: (text: DriversTableTypes, record: DriversTableTypes) => (
        <RowsWrapper>
          <Text
            className="normalText opacity_56 text_ellipsis"
            title={record?.phone}
          >
            {record?.phone ? record?.phone : "---"}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Email",
      width: "14%",
      key: "email",
      render: (text: DriversTableTypes, record: DriversTableTypes) => (
        <RowsWrapper>
          <Text
            className="normalText opacity_56 text_ellipsis"
            title={record?.email}
          >
            {record?.email ? record?.email : "---"}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Role",
      key: "Role",
      render: (text: DriversTableTypes, record: DriversTableTypes) => (
        <RowsWrapper>
          {isMakingDispatcher && driverToMakeDispatcher === record?.id ? (
            <SmallSpinLoader />
          ) : (
            <Dropdown
              overlay={
                <Menu
                  style={{
                    marginTop: "15px",
                    padding: "10px"
                  }}
                >
                  <Menu.Item
                    onClick={() => handleMakeDispatcher(record?.id)}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    {record?.role === "DISPATCHER" ? (
                      <div className="flex flex-col">
                        <span>Deny the dispatcher role</span>
                        <span>
                          from{" "}
                          <span className="font-bold">{record?.names}</span>{" "}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span>
                          Make{" "}
                          <span className="font-bold">{record?.names}</span>
                        </span>
                        <span> a dispatcher</span>
                      </div>
                    )}
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <span
                  className={`normalText ${
                    record?.role === "DISPATCHER"
                      ? "text-[#E3B221]"
                      : "text-black"
                  } fowe700`}
                >
                  {record?.role}
                </span>
                <Image
                  preview={false}
                  src="/icons/expand_more_black_24dp.svg"
                  alt=""
                  width={10}
                />
              </div>
            </Dropdown>
          )}
        </RowsWrapper>
      )
    },
    {
      title: "Shift status",
      key: "ongoingShift",
      render: (text: DriversTableTypes, record: DriversTableTypes) => {
        const now = splitDates();
        const shiftStartingTime = splitDates(
          record.ongoingShift ? record.ongoingShift.startDateTime : ""
        );

        const diff = getHoursDiff(toNewDate(shiftStartingTime), toNewDate(now));

        const percent = percentageCalculator(
          shiftPreferences?.payload?.maxHoursPerDay,
          diff
        );

        const percent_color =
          percent <= 50
            ? "text-dark"
            : percent > 50 && percent < 100
            ? "text-[#E3B221]"
            : "text-ox-red";

        return (
          record.ongoingShift && (
            <RowsWrapper>
              <Row wrap={false} gutter={24} align="middle">
                <Col>
                  <span className={`${percent_color} fowe700`}>{percent}%</span>
                </Col>

                <Col onClick={() => handleEndShift(record.id)}>
                  <Button type="toggle" loading={record.id === shiftToEnd} />
                </Col>
              </Row>
            </RowsWrapper>
          )
        );
      }
    },
    {
      title: "Status",
      key: "status",
      render: (text: DriversTableTypes, record: DriversTableTypes) => (
        <RowsWrapper>
          {!record?.enabled ? (
            <Text className=" text-sm font-bold red text_ellipsis">
              DEACTIVATED
            </Text>
          ) : null}
        </RowsWrapper>
      )
    },
    {
      title: (
        <div className="flex justify-start items-center">
          <span>Action</span>
        </div>
      ),
      width: "250px",
      key: "Action",
      fixed: "right",
      render: (text: DriversTableTypes, record: DriversTableTypes) => (
        <RowsWrapper>
          <div className="flex justify-start items-center gap-4">
            <div className="h-1 flex items-center">
              <CustomButton
                onClick={() => showEditModal(record)}
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

            <div className="h-1 flex items-center">
              <CustomButton
                onClick={() => handleToggleDriver(record?.id)}
                type="normal"
                size="icon"
                className="bg_danger"
                loading={record?.id === driverToToggle && isTogglingDriver}
                icon={
                  <Image
                    src={`/icons/ic-media-${
                      record?.enabled ? "stop" : "play"
                    }.svg`}
                    alt=""
                    width={16}
                    preview={false}
                  />
                }
              />
            </div>

            <div className="h-1 flex items-center">
              <CustomButton
                onClick={() => showModal(setItemToDelete(record?.id))}
                type="danger"
                size="icon"
                icon={
                  <Image
                    src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
                    alt="OX Delivery Logo"
                    width={16}
                    preview={false}
                  />
                }
              />
            </div>

            <div className="h-1 flex items-center">
              <CustomButton
                type="view"
                size="small"
                onClick={() =>
                  router.push(`${routes.DriverProfile.url}/${record.id}`)
                }
              >
                View
              </CustomButton>
            </div>
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <>
      <Table
        className="data_table light_white_header light_white_table"
        columns={columns}
        dataSource={Drivers?.payload?.content}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: "100px" }}
        loading={TableOnActionLoading(isDriversFetching)}
      />

      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteDriver()}
        loading={isLoading}
      />

      <ModalWrapper
        footerContent={
          <Button
            form="EditDriver"
            loading={isEditing}
            type="primary"
            htmlType="submit"
          >
            SAVE CHANGES
          </Button>
        }
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title={`EDIT ${itemToEdit?.names && itemToEdit?.names?.split(" ")[0]}`}
        loading={isEditing}
      >
        <EditDriver
          onEditDriverFinish={onEditDriverFinish}
          isLoading={isEditing}
          form={form}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </ModalWrapper>
    </>
  );
};

export default DriversTable;
