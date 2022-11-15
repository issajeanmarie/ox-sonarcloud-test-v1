import React, { FC, useState } from "react";
import Select from "antd/lib/select";
import Input from ".";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { ClientSearchTypes } from "../../../lib/types/clients";
import { useLazyClientsQuery } from "../../../lib/api/endpoints/Clients/clientsEndpoint";
import Spin from "antd/lib/spin";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";

const { Option } = Select;

const antIcon = (
  <LoadingOutlined style={{ fontSize: 16, color: "black" }} spin />
);

const ClientSearch: FC<ClientSearchTypes> = ({
  name = "clientId",
  label,
  rules,
  existingValue,
  isInitialFetching
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clients, { data: clientsList }] = useLazyClientsQuery();

  const handleSearchClientSuccess = () => {
    setIsLoading(false);
  };

  const handleSearchClientFailure = () => {
    setIsLoading(false);
  };

  const handleClientLiveSearch = (value: string) => {
    setIsLoading(true);

    handleAPIRequests({
      request: clients,
      q: value,
      handleSuccess: handleSearchClientSuccess,
      handleFailure: handleSearchClientFailure
    });
  };

  return (
    <Input
      name={name}
      type="select"
      label={label}
      placeholder="Select Client"
      onKeyUp={handleClientLiveSearch}
      isGroupDropdown
      disabled={isInitialFetching}
      isLoading={isLoading || isInitialFetching}
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

      {clientsList?.payload?.content?.map(
        (client: { names: string; id: number }) => {
          if (client.id !== existingValue?.id) {
            return (
              <Option value={client.id} key={client.id} title={client.names}>
                {client.names}
              </Option>
            );
          }
        }
      )}
    </Input>
  );
};

export default ClientSearch;
