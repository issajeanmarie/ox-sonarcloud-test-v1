import React, { FC, useState } from "react";
import Select from "antd/lib/select";
import Input from ".";
import { useLazySearchDriverQuery } from "../../../lib/api/endpoints/Accounts/driversEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { SearchDriverTypes } from "../../../lib/types/pageTypes/Analytics/Inputs";

const { Option } = Select;

const DriverSearch: FC<SearchDriverTypes> = ({
  name = "driver",
  label,
  rules
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
      placeholder="Select driver"
      onKeyUp={handleDriverLiveSearch}
      isGroupDropdown
      isLoading={isLoading}
      allowClear
      rules={rules}
    >
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
