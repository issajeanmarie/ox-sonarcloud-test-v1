import { FC } from "react";
import Form from "antd/lib/form";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import { PAYMENT_STATUS } from "../../../../utils/options";

const FilterOrdersForm: FC = () => {
  return (
    <div>
      <Form name="Filter orders" layout="vertical" title="FILTER ORDERS">
        <div className="m-5 flex flex-col gap-6">
          <div className="heading1 mb-6">FILTER ORDERS</div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                name="paymentStatus"
                type="select"
                options={PAYMENT_STATUS}
                label="By payment status"
                placeholder="Choose payment status"
              />
            </div>
            <div className="flex-1">
              <Input
                name="MomoRef"
                type="text"
                label="By MoMo ref"
                placeholder="Enter momo ref"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex-1">
              <Input
                name="truck"
                type="select"
                label="By truck"
                placeholder="Choose payment status"
              />
            </div>
            <div className="flex-1">
              <Input
                name="driver"
                type="select"
                label="By Driver"
                placeholder="Enter momo ref"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex-1">
              <Input name="from" type="date" label="From" />
            </div>
            <div className="flex-1">
              <Input name="to" type="date" label="To" />
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <div className="min-w-[150px]">
              <Button type="secondary" className="mt-5" htmlType="submit">
                CLEAR FILTER
              </Button>
            </div>
            <div className="min-w-[150px]">
              <Button type="primary" className="mt-5" htmlType="submit">
                FILTER
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FilterOrdersForm;
