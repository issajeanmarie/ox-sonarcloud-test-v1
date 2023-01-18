import { Row } from "antd";
import { useState } from "react";
import Content from "../Shared/Content";
import WithPrivateRoute from "../Shared/Routes/WithPrivateRoute";
import Header from "./Header";
import DriverLeftSide from "./DriverLeftSide";
import DriverRightSide from "./DriverRightSide";

const ViewClient = () => {
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  return (
    <>
      <Header />

      <div className="mx-4 relative">
        <Content isOverflowHidden={false} navType="FULL">
          <Row className="p-5 justify-between gap-5">
            <DriverLeftSide
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            <DriverRightSide />
          </Row>
        </Content>
      </div>
    </>
  );
};

export default WithPrivateRoute(ViewClient);
