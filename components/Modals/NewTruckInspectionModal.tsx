import { useState } from "react";
import { Checkbox, Col, Progress, Row, Typography } from "antd";
import { PREVENTATIVE_MAINTENANCE_CHECKLIST as PMList } from "../../config/constants";
import Button from "../Shared/Button";
import ModalWrapper from "./ModalWrapper";
import { useCreateMaintenanceCheckMutation } from "../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import MaintenanceCheckSummary from "./MaintenanceCheckSummary";
import { Query } from "../../lib/types/shared";
import moment from "moment";

const { Text } = Typography;

type Types = {
  isVisible: boolean;
  setIsVisible: any;
  editTruckData?: any;
  setEditTruckData?: any;
  setIsUserEditing?: any;
  isUserEditing?: boolean;
  fromTruckProfile?: boolean | undefined;
  truckId: Query;
  currentTruckData: any;
  getTruckMaintenanceAction: ({ page }: { page: number }) => void;
};

const defaultSummary = {
  mileage: 0,
  observations: "string",
  recommendations: "string",
  overallCondition: null
};

const NewTruckInspectionModal = ({
  isVisible,
  setIsVisible,
  truckId,
  currentTruckData,
  getTruckMaintenanceAction
}: Types) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [checklistDate, setChecklistDate] = useState(moment());
  const [
    preventativeMaintenanceChecklist,
    setPreventativeMaintenanceChecklist
  ] = useState(PMList);
  const [summary, setSummary] = useState(defaultSummary);

  const [createMaintenanceCheck, { isLoading }] =
    useCreateMaintenanceCheckMutation();

  const handleCancel = () => {
    setIsVisible(false);
  };

  const canGoNext =
    currentStep < preventativeMaintenanceChecklist.steps.length - 1;
  const isNextDisabled =
    canGoNext &&
    preventativeMaintenanceChecklist.steps[currentStep].list.find(
      (el) => el.status === null
    );
  const canSubmit =
    currentStep === preventativeMaintenanceChecklist.steps.length;
  const canGoBack = currentStep > 0;

  const handleAddCheckSuccess = () => {
    setIsVisible(false);
    setPreventativeMaintenanceChecklist(PMList);
    setCurrentStep(0);
    setShowSummary(false);
    setSummary(defaultSummary);

    getTruckMaintenanceAction({ page: 0 });
  };

  const handleCreateMaintenanceCheck = () => {
    let dataToSave: any = {};

    preventativeMaintenanceChecklist.steps.forEach((step) => {
      step.list.forEach((list) => {
        dataToSave[step.name] = {
          ...dataToSave[step.name],
          [list.name]: list.status
        };
      });
    });

    dataToSave = {
      ...dataToSave,
      ...summary,
      date: moment(checklistDate).format("YYYY-MM-DDTHH:mm")
    };

    handleAPIRequests({
      request: createMaintenanceCheck,
      id: truckId,
      ...dataToSave,
      showSuccess: true,
      handleSuccess: handleAddCheckSuccess
    });
  };

  const handleNextStep = () => {
    if (canGoNext) {
      setCurrentStep(currentStep + 1);
    } else if (canSubmit) {
      handleCreateMaintenanceCheck();
    } else {
      setShowSummary(true);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (canGoBack) {
      setCurrentStep(currentStep - 1);
      showSummary && setShowSummary(false);
    }
  };

  interface SingleItemType {
    id: number;
    name: string;
    status: string | null;
  }

  const onStatusChange = ({
    status,
    item
  }: {
    status: string;
    item: SingleItemType;
  }) => {
    const newList: SingleItemType[] = [];
    preventativeMaintenanceChecklist.steps[currentStep].list.map((list) => {
      if (list.id === item.id) {
        newList.push({ ...list, status: status });
      } else {
        newList.push(list);
      }
    });

    const newPMList: any[] = [];

    preventativeMaintenanceChecklist.steps.forEach((step) => {
      if (step.id === currentStep) {
        newPMList.push({ ...step, list: newList });
      } else {
        newPMList.push(step);
      }
    });

    setPreventativeMaintenanceChecklist({
      ...preventativeMaintenanceChecklist,
      steps: newPMList
    });
  };

  const stepsPercentage =
    (currentStep * 100) / preventativeMaintenanceChecklist.steps.length;
  return (
    <ModalWrapper
      footerContent={
        <Row gutter={24} align="middle" justify="space-between">
          <Col span={12}>
            <Button
              onClick={handlePreviousStep}
              type="secondary"
              htmlType="submit"
              loading={false}
              disabled={!canGoBack || isLoading}
            >
              Back
            </Button>
          </Col>

          <Col span={12}>
            <Button
              onClick={handleNextStep}
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={
                !!isNextDisabled ||
                (canSubmit && !summary.mileage) ||
                !checklistDate
              }
            >
              {canSubmit ? "Submit" : "Next"}
            </Button>
          </Col>
        </Row>
      }
      title="PREVENTATIVE MAINTENANCE CHECKLIST"
      subTitle={currentTruckData?.plateNumber}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={false}
      onCancel={handleCancel}
      destroyOnClose
      width={700}
    >
      <Row wrap={false} gutter={12} align="middle">
        <Col flex="auto">
          <Progress
            percent={stepsPercentage}
            strokeColor="#A2B3D1"
            trailColor="#EAEFF2"
            showInfo={false}
          />
        </Col>

        <Col flex="none" className="text-sm">
          {currentStep + 1}/{preventativeMaintenanceChecklist.steps.length + 1}
        </Col>
      </Row>

      <Text className="text-lg font-normal my-4 block">
        {showSummary
          ? "Summary"
          : preventativeMaintenanceChecklist.steps[currentStep].title}
      </Text>

      {showSummary ? (
        <MaintenanceCheckSummary
          summary={summary}
          setSummary={setSummary}
          setChecklistDate={setChecklistDate}
        />
      ) : (
        <>
          <Row
            align="middle"
            gutter={32}
            justify="space-between"
            className="py-6 text-gray-400 font-bold mb-4"
          >
            {/* Right side */}
            <Col span={10}>
              <Row align="middle" gutter={32}>
                <Col>#</Col>
                <Col>Item</Col>
              </Row>
            </Col>

            {/* Left side */}
            <Col span={14}>
              <Row align="middle" gutter={32}>
                <Col span={4}>Ok</Col>
                <Col span={8} className="text_ellipsis">
                  Needs repair
                </Col>
                <Col span={7}>Repaired</Col>
                <Col span={5}>N/A</Col>
              </Row>
            </Col>
          </Row>

          {/* ACTUAL CHECKS */}
          {preventativeMaintenanceChecklist.steps[currentStep].list.map(
            (item, index) => (
              <Row
                key={item.name}
                align="middle"
                gutter={32}
                justify="space-between"
                className="border border-grey py-6 rounded mb-4"
              >
                {/* Right side */}
                <Col span={10}>
                  <Row align="middle" gutter={32} wrap={false}>
                    <Col className="text-gray-400">{index + 1}</Col>
                    <Col className="font-bold">{item.name}</Col>
                  </Row>
                </Col>

                {/* Left side */}
                <Col span={14}>
                  <Row align="middle" gutter={32}>
                    <Col span={4}>
                      <Checkbox
                        checked={item.status === "OK"}
                        onChange={() =>
                          onStatusChange({
                            status: "OK",
                            item: item
                          })
                        }
                      />
                    </Col>

                    <Col span={8}>
                      <Checkbox
                        checked={item.status === "NEEDS_REPAIR"}
                        onChange={() =>
                          onStatusChange({
                            status: "NEEDS_REPAIR",
                            item: item
                          })
                        }
                      />
                    </Col>

                    <Col span={7}>
                      <Checkbox
                        checked={item.status === "REPAIRED"}
                        onChange={() =>
                          onStatusChange({
                            status: "REPAIRED",
                            item: item
                          })
                        }
                      />
                    </Col>

                    <Col span={5}>
                      <Checkbox
                        checked={item.status === "NOT_APPLICABLE"}
                        onChange={() =>
                          onStatusChange({
                            status: "NOT_APPLICABLE",
                            item: item
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          )}
        </>
      )}
    </ModalWrapper>
  );
};

export default NewTruckInspectionModal;
