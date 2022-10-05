import Image from "next/image";
import { localeString } from "../../../utils/numberFormatter";
import TextLight from "../../Shared/Text/TextLight";

const DetailsSection = ({
  title,
  details,
  type,
  editAction
}: {
  title: string;
  details: any;
  type: string;
  editAction: any;
  totalWeightCounter?: any;
}) => {
  const totalWeight = details.stops.reduce(
    (accumulator: any, value: { weight: number }) => {
      return accumulator + value.weight;
    },
    0
  );

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
      label: "Recipeint",
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
      value: `${totalWeight} KGs ${
        details?.paymentPlan === "PAY_BY_KG"
          ? `- ${Math.round(details.totalAmount / totalWeight)} Rwf / KG`
          : ""
      }`,
      editable: false,
      editAction: () => null
    },
    {
      key: 3,
      label: "Depot",
      value: details?.depot?.name,
      editable: false,
      editAction: () => null
    }
  ];

  const summaryDetails = [
    {
      key: 0,
      label: "Job value",
      value: `${localeString(details?.totalAmount)} Rwf`,
      editable: true,
      editAction: editAction
    },

    {
      key: 1,
      label: "Payment status",
      value: details?.paymentPlan.replaceAll("_", " "),
      editable: false,
      editAction: editAction
    },

    {
      key: 2,
      label: "Duration",
      value: `${details?.duration || 0} Hour(s)`,
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

  return (
    <div className="my-16">
      <TextLight className="mb-6">{title && `${title} details`}</TextLight>

      {displayDetails.map((detail) => (
        <div key={detail.key} className="flex items-center mb-5">
          <div className="w-[150px] font-bold">{detail.label}: </div>

          <div className="font-light flex items-center gap-5">
            <span>{detail.value}</span>

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
      ))}
    </div>
  );
};

export default DetailsSection;
