import { FC, useEffect } from "react";
import { Form } from "antd";
import Button from "../../../Shared/Button";
import { useEditOrderMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { Query } from "../../../../lib/types/shared";
import ModalWrapper from "../../../Modals/ModalWrapper";
import { requiredField } from "../../../../lib/validation/InputValidations";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";
import Input from "../../../Shared/Input";
import { useDepotsQuery } from "../../../../lib/api/endpoints/Depots/depotEndpoints";

interface EditOrderDepotProps {
  orderId: Query;
  existingDepot: { id: number };
  closeModal: () => void;
  isEditDepotModal: boolean;
  setIsEditDepotModal: any;
}

const EditOrderDepot: FC<EditOrderDepotProps> = ({
  orderId,
  existingDepot,
  closeModal,
  isEditDepotModal,
  setIsEditDepotModal
}) => {
  const [editOrder, { isLoading }] = useEditOrderMutation();
  const [form] = Form.useForm();

  const { data: depots, isLoading: isGettingDepots } = useDepotsQuery();

  const handleEditOrderSuccess = () => {
    closeModal();
  };

  const handleOnFinish = (values: { depotId: number }) => {
    handleAPIRequests({
      request: editOrder,
      orderId,
      data: values,
      showSuccess: true,
      handleSuccess: handleEditOrderSuccess
    });
  };

  useEffect(() => {
    form.setFieldsValue({ depotId: existingDepot?.id });
  }, [existingDepot, form]);

  return (
    <ModalWrapper
      footerContent={
        <Button
          form="EditOrderDepot"
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isGettingDepots}
        >
          Save
        </Button>
      }
      title="EDIT ORDER DEPOT"
      loading={isLoading}
      isModalVisible={isEditDepotModal}
      setIsModalVisible={setIsEditDepotModal}
    >
      <Form id="EditOrderDepot" form={form} onFinish={handleOnFinish}>
        <Input
          rules={requiredField("Depot")}
          type="select"
          label="Depots"
          placeholder="Select depot"
          options={depots?.payload?.map((depot) => ({
            label: depot.name,
            value: depot.id
          }))}
          name="depotId"
          disabled={isGettingDepots}
        />
      </Form>
    </ModalWrapper>
  );
};

export default EditOrderDepot;
