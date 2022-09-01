import { Col } from "antd";
import React from "react";
import ClientAdminNotes from "./ClientAdminNotes";
import ClientLocations from "./ClientLocations";
import ClientTages from "./ClientTages";
import ClientOrderDays from "./ClientOrderDays";
import ClientOrderRecipient from "./ClientOrderRecipient";
import ClientIndo from "./ClientIndo";

const SingleClientRight = () => {
  return (
    <Col flex="auto">
      <ClientIndo />
      <ClientLocations />
      <ClientOrderRecipient />
      <ClientOrderDays />
      <ClientTages />
      <ClientAdminNotes />
    </Col>
  );
};

export default SingleClientRight;
