import Image from "antd/lib/image";
import { localeString } from "../../../utils/numberFormatter";
import TextLight from "../../Shared/Text/TextLight";
import { userType } from "../../../helpers/getLoggedInUser";
import { paymentStatus } from "../../../utils/orderStatus";
import { Typography } from "antd";
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
      url: details?.office?.client?.id
    },
    {
      key: 1,
      label: "Branch",
      value: details?.office?.location || "N/A",
      editable: false,
      editAction: () => null,
      url: null
    },
    {
      key: 2,
      label: "Recipient code",
      value: details?.deliveryCode || "N/A",
      editable: false,
      editAction: () => null,
      url: null
    }
  ];

  const orderDetails = [
    {
      key: 0,
      label: "Recipient",
      value: details?.depot.name,
      editable: false,
      editAction: () => null,
      url: null
    },
    {
      key: 1,
      label: "Category",
      value: details?.category?.name,
      editable: false,
      editAction: () => null,
      url: null
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
      url: null
    },
    {
      key: 3,
      label: "Depot",
      value: details?.depot?.name,
      editable: user.isSuperAdmin,
      editAction: editAction,
      url: details?.depot?.id
    }
  ];

  const summaryDetails = [
    {
      key: 0,
      label: "Job value",
      value: `${localeString(details?.totalAmount)} Rwf`,
      editable: user.isSuperAdmin || user.isAdmin || user.isDispatcher,
      editAction: editAction,
      url: null
    },

    {
      key: 2,
      label: "Suggested price",
      value: details?.suggestedAmount
        ? `${localeString(details?.suggestedAmount)} Rwf`
        : "N/A",
      editable: false,
      editAction: editAction,
      url: null
    },

    {
      key: 1,
      label: "Payment status",
      value: details?.paymentStatus?.replaceAll("_", " "),
      editable: false,
      editAction: editAction,
      url: null
    },

    {
      key: 2,
      label: "Duration",
      value: `${details?.duration || "N/A"}`,
      editable: false,
      editAction: editAction,
      url: null
    },

    {
      key: 3,
      label: "Distance",
      value: details?.distance,
      editable: false,
      editAction: editAction,
      url: null
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
                    height={13}
                    preview={false}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailsSection;
