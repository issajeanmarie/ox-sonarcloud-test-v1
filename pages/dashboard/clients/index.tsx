import React, { useState } from "react";
import ClientsTable from "../../../components/Tables/Clients/ClientsTable";
import ClientsTopNavigator from "../../../components/Clients/ClientsTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";

const Clients = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  //WARNING MODAL
  const showWarningModal = () => {
    setIsWarningModalVisible(true);
  };

  return (
    <Layout>
      <div className="p-5 sticky top-0 right-0 left-0 z-30 bg-[#f8f8f8]">
        <ClientsTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
      <div className="px-5">
        <ClientsTable
          isModalVisible={isWarningModalVisible}
          showModal={showWarningModal}
          setIsModalVisible={setIsWarningModalVisible}
        />
        <div className="flex justify-center items-center py-10">
          <div className="w-52">
            <CustomButton type="secondary">
              <span className="text-sm">Load More</span>
            </CustomButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Clients);
