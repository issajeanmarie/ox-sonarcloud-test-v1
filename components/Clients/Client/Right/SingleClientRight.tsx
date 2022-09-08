import { Col } from "antd";
import React, { FC } from "react";
import ClientAdminNotes from "./ClientAdminNotes";
import ClientLocations from "./ClientLocations";
import ClientTages from "./ClientTages";
import ClientOrderDays from "./ClientOrderDays";
import ClientOrderRecipient from "./ClientOrderRecipient";
import ClientInfo from "./ClientInfo";
import { SingleClientRightTypes } from "../../../../lib/types/pageTypes/Clients/SingleClientRightTypes";
import Loader from "../../../Shared/Loader";

const SingleClientRight: FC<SingleClientRightTypes> = ({
  client,
  isClientLoading,
  isClientFetching,
  clientOrders
}) => {
  return (
    <Col flex="auto">
      {isClientLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <ClientInfo
            client={client}
            isClientLoading={isClientLoading}
            isClientFetching={isClientFetching}
          />
          <ClientLocations
            client={client}
            isClientLoading={isClientLoading}
            isClientFetching={isClientFetching}
          />
          <ClientOrderRecipient
            client={client}
            isClientLoading={isClientLoading}
            isClientFetching={isClientFetching}
          />
          <ClientOrderDays
            client={client}
            isClientLoading={isClientLoading}
            isClientFetching={isClientFetching}
            orderDays={clientOrders?.orderDays}
          />
          <ClientTages
            client={client}
            isClientLoading={isClientLoading}
            isClientFetching={isClientFetching}
          />
          <ClientAdminNotes
            client={client}
            isClientLoading={isClientLoading}
            isClientFetching={isClientFetching}
          />
        </>
      )}
    </Col>
  );
};

export default SingleClientRight;
