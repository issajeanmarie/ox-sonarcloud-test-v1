import Image from "next/image";
import { localeString } from "../../../utils/numberFormatter";
import TextLight from "../../Shared/Text/TextLight";
import { userType } from "../../../helpers/getLoggedInUser";
import { paymentStatus } from "../../../utils/orderStatus";

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
      editAction: editAction
    },
    {
      key: 1,
      label: "Branch",
      value: details?.office?.location || "N/A",
      editable: false,
      editAction: () => null
    },
    {
      key: 2,
      label: "Recipient code",
      value: details?.deliveryCode || "N/A",
      editable: false,
      editAction: () => null
    }
  ];

  const orderDetails = [
    {
      key: 0,
      label: "Recipient",
      value: details?.depot.name,
      editable: false,
      editAction: () => null
    },
    {
      key: 1,
      label: "Category",
      value: details?.category?.name,
      editable: false,
      editAction: () => null
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
      editAction: () => null
    },
    {
      key: 3,
      label: "Depot",
      value: details?.depot?.name,
      editable: user.isSuperAdmin,
      editAction: editAction
    }
  ];

  const summaryDetails = [
    {
      key: 0,
      label: "Job value",
      value: `${localeString(details?.totalAmount)} Rwf`,
      editable: user.isSuperAdmin || user.isAdmin || user.isDispatcher,
      editAction: editAction
    },

    {
      key: 1,
      label: "Payment status",
      value: details?.paymentStatus?.replaceAll("_", " "),
      editable: false,
      editAction: editAction
    },

    {
      key: 2,
      label: "Duration",
      value: `${details?.duration || "N/A"}`,
      editable: false,
      editAction: editAction
    },

    {
      key: 3,
      label: "Distance",
      value: details?.distance,
      editable: false,
      editAction: editAction
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
              <span
                className={`${
                  detail.label === "Payment status" ? "font-bold" : ""
                } text-ox-${
                  detail.label === "Payment status" && paymentStatusClass
                }`}
              >
                {detail.value}
              </span>

              {detail.editable && (
                <span className="cursor-pointer">
                  <Image
                    onClick={() => detail?.editAction(true)}
                    className="pointer"
                    src="/icons/ic-contact-edit.svg"
                    alt="Backspace icon"
                    width={13}
                    height={13}
                  />
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailsSection;
