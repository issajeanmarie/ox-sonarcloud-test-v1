import { Image } from "antd";
import React from "react";
import CustomInput from "../../../../Shared/Input";

const RightSideKPIs = () => {
  return (
    <>
      <CustomInput
        type="select"
        label=""
        placeholder="Depot: All depots"
        options={[
          { label: "Tyazo", value: "t" },
          { label: "Kayove", value: "k" }
        ]}
        name="sort"
        suffixIcon={
          <Image
            preview={false}
            src="/icons/expand_more_black_24dp.svg"
            alt=""
            width={10}
          />
        }
      />
      <CustomInput
        type="select"
        label=""
        placeholder="Show: Last week"
        options={[
          { label: "Item one", value: "one" },
          { label: "Item two", value: "two" },
          { label: "Item three", value: "three" }
        ]}
        name="sort"
        suffixIcon={
          <Image
            preview={false}
            src="/icons/expand_more_black_24dp.svg"
            alt=""
            width={10}
          />
        }
      />
      <CustomInput
        type="date"
        name="Start"
        placeholder="Start"
        suffixIcon={
          <Image
            preview={false}
            src="/icons/ic-actions-calendar.svg"
            alt=""
            width={18}
          />
        }
      />
      <CustomInput
        type="date"
        name="End"
        placeholder="End"
        suffixIcon={
          <Image
            preview={false}
            src="/icons/ic-actions-calendar.svg"
            alt=""
            width={18}
          />
        }
      />
    </>
  );
};

export default RightSideKPIs;
