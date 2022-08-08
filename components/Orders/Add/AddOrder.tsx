import { FC } from "react";
import Header from "./header";
import AddOrderForm from "../../Forms/Orders/AddEdit";

const AddOrder: FC = () => {
  return (
    <div>
      <Header />
      <div className="w-[800px] m-auto bg-white shadow-[0px_0px_19px_#00000008] mt-5 p-14">
        <AddOrderForm mode="edit" title="CREATE A NEW ORDER" />
      </div>
    </div>
  );
};

export default AddOrder;
