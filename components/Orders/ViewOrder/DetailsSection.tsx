import Image from "antd/lib/image";
import { localeString } from "../../../utils/numberFormatter";
import TextLight from "../../Shared/Text/TextLight";
import { userType } from "../../../helpers/getLoggedInUser";
import { paymentStatus } from "../../../utils/orderStatus";
import { Dropdown, Menu, Typography } from "antd";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";

const { Text } = Typography;

const DetailsSection = ({
  title,
  details,
  type,
  editAction,
  totalWeight
}: {
  title: string;
  details: any;
  type: string;
  editAction?: any;
  totalWeight?: number;
}) => {
  const user = userType();

  const clientDetails = [
    {
      key: 0,
      label: "Name",
      value: details?.office?.client?.names || "N/A",
      editable: true,
      editAction: editAction,
      url: details?.office?.client?.id,
      showInfo: false
    },
    {
      key: 1,
      label: "Branch",
      value: details?.office?.location || "N/A",
      editable: false,
      editAction: () => null,
      url: null,
      showInfo: false
    },
    {
      key: 2,
      label: "Recipient code",
      value: details?.deliveryCode || "N/A",
      editable: false,
      editAction: () => null,
      url: null,
      showInfo: false
    }
  ];

  const orderDetails = [
    {
      key: 0,
      label: "Recipient",
      value: details?.depot.name,
      editable: false,
      editAction: () => null,
      url: null,
      showInfo: false
    },
    {
      key: 1,
      label: "Category",
      value: details?.category?.name,
      editable: false,
      editAction: () => null,
      url: null,
      showInfo: false
    },
    {
      key: 2,
      label: "Weight",
      value: `${totalWeight || "N/A"} KGs ${
        details?.paymentPlan === "PAY_BY_KG"
          ? `- ${
              totalWeight
                ? Math.round(details.totalAmount / totalWeight)
                : "N/A"
            } Rwf / KG`
          : ""
      }`,
      editable: false,
      editAction: () => null,
      url: null,
      showInfo: false
    },
    {
      key: 3,
      label: "Depot",
      value: details?.depot?.name,
      editable: user.isSuperAdmin,
      editAction: editAction,
      url: details?.depot?.id,
      showInfo: false
    }
  ];

  const summaryDetails = [
    {
      key: 0,
      label: "Job value",
      value: `${localeString(details?.totalAmount)} Rwf`,
      editable: user.isSuperAdmin || user.isAdmin || user.isDispatcher,
      editAction: editAction,
      url: null,
      showInfo: false
    },

    {
      key: 1,
      label: "Suggested price",
      value: details?.suggestedAmount
        ? `${localeString(details?.suggestedAmount)} Rwf`
        : "N/A",
      editable: false,
      editAction: editAction,
      url: null,
      showInfo: true
    },

    {
      key: 2,
      label: "Payment status",
      value: details?.paymentStatus?.replaceAll("_", " "),
      editable: false,
      editAction: editAction,
      url: null,
      showInfo: false
    },

    {
      key: 3,
      label: "Duration",
      value: `${details?.duration || "N/A"}`,
      editable: false,
      editAction: editAction,
      url: null,
      showInfo: false
    },

    {
      key: 4,
      label: "Distance",
      value: details?.distance,
      editable: false,
      editAction: editAction,
      url: null,
      showInfo: false
    }
  ];

  const displayDetails =
    type === "CLIENT"
      ? clientDetails
      : type === "SUMMARY"
      ? summaryDetails
      : orderDetails;

  const { isFullPaid, isHalfPaid, isPending } = paymentStatus(
    details?.paymentStatus
  );

  const router = useRouter();

  return (
    <div className="my-16">
      <TextLight className="mb-6">{title && `${title} details`}</TextLight>

      {displayDetails.map((detail) => {
        const paymentStatusClass = isPending
          ? "red"
          : isFullPaid
          ? "dark"
          : isHalfPaid
          ? "orange"
          : "";

        return (
          <div key={detail.key} className="flex items-center mb-5">
            <div className="w-[150px] font-bold">{detail.label}: </div>

            <div className="font-light flex items-center gap-5">
              <Text
                onClick={() =>
                  detail.url &&
                  router.push(`${routes.Clients.url}/${detail.url}`)
                }
                className={`${
                  detail.label === "Payment status" ? "font-bold" : ""
                } text-ox-${
                  detail.label === "Payment status" && paymentStatusClass
                } ${detail.url && "hover:underline pointer"}`}
              >
                {detail.value}
              </Text>

              {detail.editable && (
                <div className="cursor-pointer">
                  <Image
                    onClick={() => detail?.editAction(true)}
                    className="pointer"
                    src="/icons/ic-contact-edit.svg"
                    alt="Backspace icon"
                    width={13}
                    preview={false}
                  />
                </div>
              )}

              {detail.showInfo && (
                <Dropdown
                  overlay={() => (
                    <Menu
                      style={{
                        marginTop: "15px",
                        padding: "10px"
                      }}
                    >
                      <Menu.Item style={{ marginBottom: "0.5rem" }}>
                        <div className="flex flex-col">
                          <span>We use</span>
                          <span className="font-bold">
                            Distance * Weight * 0.5
                          </span>
                          <span>
                            formula to calculate estimated selling price
                          </span>
                        </div>
                      </Menu.Item>
                    </Menu>
                  )}
                  placement="topCenter"
                >
                  <div className="cursor-pointer">
                    <Image
                      title="This is a suggested price for this !"
                      className="pointer opacity-50"
                      src="/icons/info.svg"
                      alt="Backspace icon"
                      width={16}
                      preview={false}
                    />
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailsSection;
