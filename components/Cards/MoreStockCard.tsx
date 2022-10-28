import { Card, Image, Typography } from "antd";
import React, { FC } from "react";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { SmallSpinLoader } from "../Shared/Loaders/Loaders";
import CustomButton from "../Shared/Button";

const { Text } = Typography;

type MoreStockCardTypes = {
  title: string;
  subTitle: string;
  count: number;
  isFetching: boolean;
};

const MoreStockCard: FC<MoreStockCardTypes> = ({
  title,
  subTitle,
  count,
  isFetching
}) => {
  return (
    <Card
      className="radius4 shadow-[0px_0px_19px_#00000008]"
      headStyle={{ border: "none", marginBottom: "0" }}
      bodyStyle={{ padding: "0 24px 24px 24px" }}
      style={{ width: "auto", border: "1px solid #EAEFF2" }}
      title={
        <Text className="text-base font-light">{`${title} (Type DUMMY)`}</Text>
      }
      actions={[
        <div className="flex justify-start" key="closeDate">
          <span className="italic text-xs">Close Exp: 14 Feb 2023</span>
        </div>,
        <div className="flex justify-end items-center gap-4" key="actionBtns">
          <CustomButton
            key="edit"
            // onClick={() => showEditModal(record)}
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
          <CustomButton
            key="toggle"
            // onClick={() => handleToggleSupplier(record?.id)}
            type="normal"
            size="icon"
            className="bg_danger"
            // disabled={record?.id === itemToToggle && isTogglingSupplier}
            // loading={record?.id === itemToToggle && isTogglingSupplier}
            icon={
              <Image
                src={`/icons/ic-media-stop.svg`}
                alt=""
                width={16}
                preview={false}
              />
            }
          />
        </div>
      ]}
    >
      <Text className="text-2xl font-semibold block yellow mb-3">
        {isFetching ? (
          <SmallSpinLoader />
        ) : (
          <>{count !== null ? <>{numbersFormatter(count)} KGS</> : "None"}</>
        )}
      </Text>
      <Text className="captionText">
        {isFetching ? `Hold on, getting you ${title}...` : subTitle}
      </Text>
    </Card>
  );
};

export default MoreStockCard;
