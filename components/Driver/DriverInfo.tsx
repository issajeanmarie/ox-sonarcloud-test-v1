/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Divider, Row } from "antd";
import { abbreviator } from "../../helpers/abbreviator";
import MediumAvatar from "../Avatars/MediumAvatar";
import ClientInfoWrapper from "../Clients/Client/Right/ClientInfoWrapper";
import { YellowEditIcon } from "../Icons";
import CustomButton from "../Shared/Button";

const DriverInfo = () => {
  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008]">
      <Col span={24}>
        <Row justify="space-between" align="middle" className="w-full p-8">
          <Col flex="auto">
            <div className="flex items-center gap-4">
              <MediumAvatar>
                <span className="dark font-semibold text-lg opacity-90">
                  {abbreviator("Issa Jean Marie")}
                </span>
              </MediumAvatar>
              <span className="font-bold text-lg">Issa Jean Marie</span>
            </div>
          </Col>

          <Col flex="none">
            <CustomButton type="secondary" size="small">
              <span className="text-sm">{YellowEditIcon}</span>
            </CustomButton>
          </Col>
        </Row>
      </Col>
      <Divider style={{ padding: 0, margin: 0 }} />

      <Col span={24} w-full>
        <div className="w-full p-8">
          <ClientInfoWrapper title="Phone number" infoItem="+250 788 734 295" />

          <ClientInfoWrapper title="Source" infoItem="This will be the value" />
        </div>
      </Col>
    </Row>
  );
};

export default DriverInfo;
