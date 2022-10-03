import React, { FC, useState } from "react";
import Select from "antd/lib/select";
import Input from ".";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { ClientSearchTypes } from "../../../lib/types/clients";
import { useLazyClientsQuery } from "../../../lib/api/endpoints/Clients/clientsEndpoint";

const { Option } = Select;

const ClientSearch: FC<ClientSearchTypes> = ({
  name = "clientId",
  label,
  rules
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
      search: value,
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
      isLoading={isLoading}
      allowClear
      rules={rules}
    >
      {clientsList?.payload?.content?.map(
        (client: { names: string; id: number }) => (
          <Option value={client.id} key={client.id} title={client.names}>
            {client.names}
          </Option>
        )
      )}
    </Input>
  );
};

export default ClientSearch;
