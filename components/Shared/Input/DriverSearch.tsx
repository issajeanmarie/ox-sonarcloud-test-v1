import React, { FC, useState } from "react";
import Select from "antd/lib/select";
import Input from ".";
import { useLazySearchDriverQuery } from "../../../lib/api/endpoints/Accounts/driversEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { SearchDriverTypes } from "../../../lib/types/pageTypes/Analytics/Inputs";
import Spin from "antd/lib/spin";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";

const { Option } = Select;

const antIcon = (
  <LoadingOutlined style={{ fontSize: 16, color: "black" }} spin />
);

const DriverSearch: FC<SearchDriverTypes> = ({
  name = "driver",
  label,
  rules,
  existingValue,
  isDriverInitialFetching
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchDriver, { data: drivers }] = useLazySearchDriverQuery();

  const handleSearchDriverSuccess = () => {
    setIsLoading(false);
  };

  const handleSearchDriverFailure = () => {
    setIsLoading(false);
  };

  const handleDriverLiveSearch = (value: string) => {
    setIsLoading(true);

    handleAPIRequests({
      request: searchDriver,
      search: value,
      handleSuccess: handleSearchDriverSuccess,
      handleFailure: handleSearchDriverFailure
    });
  };

  return (
    <Input
      name={name}
      type="select"
      label={label}
      placeholder="Type to search"
      disabled={isDriverInitialFetching}
      onKeyUp={handleDriverLiveSearch}
      isGroupDropdown
      isLoading={isLoading || isDriverInitialFetching}
      allowClear
      rules={rules}
      notFoundContent={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0"
          }}
        >
          {isLoading ? (
            <Spin indicator={antIcon} />
          ) : (
            <span>Type to search</span>
          )}
        </div>
      }
    >
      {existingValue && (
        <Option
          value={existingValue?.id}
          key={existingValue?.id}
          title={existingValue?.names}
        >
          {existingValue?.names}
        </Option>
      )}

      {drivers?.payload?.content?.map(
        (driver: { names: string; id: number }) => (
          <Option value={driver.id} key={driver.names}>
            {driver.names}
          </Option>
        )
      )}
    </Input>
  );
};

export default DriverSearch;
