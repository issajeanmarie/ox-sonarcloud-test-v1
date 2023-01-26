import React from "react";
import Image from "antd/lib/image";
import { Col, Row, Skeleton, Spin, Space, Avatar, List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#e7b522" }} spin />
);
const mediumLoadingIcon = (
  <LoadingOutlined style={{ fontSize: 20, color: "#e7b522" }} spin />
);
const smallLoadingIcon = (
  <LoadingOutlined style={{ fontSize: 13, color: "#e7b522" }} spin />
);
const extraSmallLoadingIcon = (
  <LoadingOutlined style={{ fontSize: 8, color: "#e7b522" }} spin />
);

export const AppLoadingLoader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Image
        src="/oxloader.png"
        alt=""
        width="80px"
        height="80px"
        preview={false}
        className="animate-spin duration-1000"
      />
    </div>
  );
};

export const ComponentLoadingLoader = () => {
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image
        src="/oxloader.png"
        alt=""
        width="80px"
        height="80px"
        preview={false}
        className="animate-spin duration-1000"
      />
    </div>
  );
};

export const SmallSpinLoader = () => {
  return <Spin indicator={smallLoadingIcon} />;
};

export const MediumSpinLoader = () => {
  return <Spin indicator={mediumLoadingIcon} />;
};

export const ExtraSmallSpinLoader = () => {
  return <Spin indicator={extraSmallLoadingIcon} />;
};

export const TableOnActionLoading = (actionLoader: boolean) => {
  return {
    spinning: actionLoader,
    indicator: <Spin indicator={loadingIcon} />
  };
};

export const AnalyticCardsLoader = () => {
  return (
    <Col
      style={{
        background: "#ffffff",
        boxShadow: "0px 0px 19px #00000008",
        border: "1px solid #EAEFF2",
        borderRadius: "4px",
        minWidth: "15rem",
        minHeight: "7.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 1rem"
      }}
      flex="auto"
    >
      <span className="text28 primary_text fowe900 mabo8">
        <Skeleton title={{ width: "30%" }} active paragraph={{ rows: 0 }} />
      </span>
      <span className="fowe700 opa8 text13">
        <Skeleton title={{ width: "90%" }} active paragraph={{ rows: 0 }} />
      </span>
    </Col>
  );
};

export const CardsLoader = () => {
  return (
    <Col
      style={{
        background: "#ffffff",
        boxShadow: "0px 0px 19px #00000008",
        border: "1px solid #EAEFF2",
        borderRadius: "4px",
        minWidth: "15rem",
        minHeight: "7.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 1rem"
      }}
      flex="auto"
    >
      <span className="text28 primary_text fowe900 mabo8">
        <Skeleton title={{ width: "30%" }} active paragraph={{ rows: 0 }} />
      </span>
      <span className="fowe700 opa8 text13">
        <Skeleton title={{ width: "90%" }} active paragraph={{ rows: 0 }} />
      </span>
    </Col>
  );
};

export const ColsTableLoader = () => {
  return (
    <>
      <Row justify="space-between" gutter={[8, 8]}>
        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
      </Row>
    </>
  );
};

export const ResourcesTableLoader = () => {
  return (
    <Row
      gutter={[1, 1]}
      justify="space-between"
      className="mato8"
      style={{ background: "#fff", padding: "8px", paddingTop: "12px" }}
    >
      <Col>
        <Skeleton.Button active size="small" shape="square" />
      </Col>
      <Col md={4}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col md={3}></Col>
      <Col md={5}></Col>
      <Col md={3}></Col>
      <Col md={2}>
        <Row gutter={1}>
          <Space size="small">
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export const SettingsCategoriesTableLoader = () => {
  return (
    <Row justify="space-between" className="mato8">
      <Col md={1}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col md={8}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={5}>
        <Row gutter={17}>
          <Space size="small">
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export const SettingsProfileLoader = () => {
  return (
    <Skeleton avatar active>
      <List.Item.Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Card title"
        description="This is the description"
      />
    </Skeleton>
  );
};

export const SettingsKPILoader = () => {
  return (
    <div className="mabo24">
      <Row
        gutter={20}
        style={{
          background: "#fff",
          padding: "18px",
          paddingTop: "12px",
          borderBottom: "2px solid #f4f1f1"
        }}
      >
        <Col md={10}>
          <Space>
            <Col>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
          </Space>
        </Col>
        <Col span={3}></Col>
        <Col span={8}>
          <Space>
            <Col>
              <Skeleton.Input active size="default" />
            </Col>
            <Col>
              <Skeleton.Input active size="default" />
            </Col>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export const ChartSmallLoader = (title: string) => {
  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-4">
      <SmallSpinLoader />
      <span className="text-xs font-thin">{title}...</span>
    </div>
  );
};

export const OrdersTableLoader = () => {
  return (
    <div className="mabo24">
      <Row
        gutter={20}
        style={{
          background: "#fff",
          padding: "18px",
          paddingTop: "12px",
          borderBottom: "2px solid #f4f1f1"
        }}
      >
        <Col md={10}>
          <Space>
            <Col>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col>
              <Skeleton.Button active size="small" shape="circle" />
            </Col>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
          </Space>
        </Col>
        <Col span={9}></Col>
        <Col span={5}>
          <Space>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
          </Space>
        </Col>
      </Row>

      <Row
        gutter={20}
        style={{
          background: "#fff",
          padding: "18px",
          paddingTop: "12px",
          borderBottom: "2px solid #f4f1f1"
        }}
      >
        <Col md={9}>
          <Space style={{ paddingLeft: "45px" }}>
            <Col>
              <Skeleton.Button active size="small" shape="circle" />
            </Col>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
          </Space>
        </Col>
        <Col md={4}>
          <Skeleton.Input active size="small" block={true} />
        </Col>
        <Col md={3}>
          <Skeleton.Input active size="small" block={true} />
        </Col>
        <Col md={3}>
          <Skeleton.Input active size="small" block={true} />
        </Col>
        <Col md={3}>
          <Skeleton.Input active size="small" block={true} />
        </Col>
        <Col md={1}>
          <Row gutter={1}>
            <Space size="small">
              <Col xl={4}>
                <Skeleton.Button active size="small" shape="square" />
              </Col>
              <Col xl={4}>
                <Skeleton.Button active size="small" shape="square" />
              </Col>
              <Col xl={4}>
                <Skeleton.Button active size="small" shape="square" />
              </Col>
            </Space>
          </Row>
        </Col>
      </Row>

      <Row
        gutter={2}
        style={{ background: "#fff", padding: "18px", paddingTop: "12px" }}
      >
        <Col md={5} style={{ paddingLeft: "55px" }}>
          <Space>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
          </Space>
        </Col>
        <Col md={16}></Col>
        <Col md={3} style={{ paddingLeft: "40px" }}>
          <Skeleton.Input active size="small" block={true} />
        </Col>
      </Row>
    </div>
  );
};

export const ClientsTableLoader = () => {
  return (
    <Row
      gutter={[1, 1]}
      justify="space-between"
      className="mato8"
      style={{ background: "#fff", padding: "8px", paddingTop: "12px" }}
    >
      <Col>
        <Skeleton.Button active size="small" shape="square" />
      </Col>
      <Col md={4}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={5}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={1}>
        <Row gutter={1}>
          <Space size="small">
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export const TrucksTableLoader = () => {
  return (
    <Row
      gutter={1}
      justify="space-between"
      className="mato8"
      style={{ background: "#fff", padding: "8px", paddingTop: "12px" }}
    >
      <Col>
        <Skeleton.Button active size="small" shape="square" />
      </Col>
      <Col md={4}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col md={4}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col md={2}>
        <Row gutter={10}>
          <Space size="small">
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export const AccountsTableLoader = () => {
  return (
    <Row
      gutter={[1, 24]}
      justify="space-between"
      className="mato8"
      style={{ background: "#fff", padding: "8px", paddingTop: "12px" }}
    >
      <Col>
        <Skeleton.Button active size="small" shape="square" />
      </Col>
      <Col md={4}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={4}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Row gutter={1}>
          <Space size="small">
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export const WarehouseTableLoader = () => {
  return (
    <div className="mabo24">
      <Row
        gutter={20}
        style={{
          background: "#fff",
          padding: "18px",
          paddingTop: "12px",
          borderBottom: "2px solid #f4f1f1"
        }}
      >
        <Col md={9}>
          <Space>
            <Col>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
          </Space>
        </Col>
        <Col md={4}>
          <Skeleton.Input active size="small" block={true} />
        </Col>
        <Col md={3}>
          <Skeleton.Input active size="small" block={true} />
        </Col>
        <Col md={3}>
          <Skeleton.Input active size="small" block={true} />
        </Col>
        <Col md={3}>
          <Skeleton.Input active size="small" block={true} />
        </Col>
        <Col md={1} style={{ paddingLeft: "40px" }}>
          <Row gutter={1}>
            <Space size="small">
              <Col xl={4}>
                <Skeleton.Button active size="small" shape="square" />
              </Col>
              <Col xl={4}>
                <Skeleton.Button active size="small" shape="square" />
              </Col>
            </Space>
          </Row>
        </Col>
      </Row>

      <Row
        gutter={2}
        style={{ background: "#fff", padding: "18px", paddingTop: "12px" }}
      >
        <Col md={5} style={{ paddingLeft: "55px" }}>
          <Space>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
            <Col>
              <Skeleton.Input active size="small" />
            </Col>
          </Space>
        </Col>
        <Col md={16}></Col>
        <Col md={3} style={{ paddingLeft: "40px" }}>
          <Skeleton.Input active size="small" block={true} />
        </Col>
      </Row>
    </div>
  );
};

export const StockCardsLoader = () => {
  return (
    <Col
      style={{
        background: "#ffffff",
        boxShadow: "0px 0px 19px #00000008",
        border: "1px solid #EAEFF2",
        borderRadius: "4px",
        minWidth: "15rem",
        minHeight: "7.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem"
      }}
      flex="auto"
    >
      <Skeleton
        title={{ width: "30%" }}
        active
        paragraph={{ rows: 0 }}
        className="mato8"
      />
      <Skeleton title={{ width: "90%" }} active paragraph={{ rows: 0 }} />
      <Skeleton title={{ width: "20%" }} active paragraph={{ rows: 0 }} />
    </Col>
  );
};

export const StockTableLoader = () => {
  return (
    <Row
      gutter={[1, 24]}
      justify="space-between"
      className="mato8"
      style={{ background: "#fff", padding: "8px", paddingTop: "12px" }}
    >
      <Col>
        <Skeleton.Button active size="small" shape="square" />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={1}>
        <Row gutter={1}>
          <Space size="small">
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export const AnalyticsTruckLoader = () => {
  return (
    <Row
      gutter={[1, 24]}
      justify="space-between"
      className="mato8"
      style={{ background: "#fff", padding: "8px", paddingTop: "12px" }}
    >
      <Col>
        <Skeleton.Button active size="small" shape="square" />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
    </Row>
  );
};

export const ExpensesTableLoader = () => {
  return (
    <Row
      gutter={[1, 24]}
      justify="space-between"
      className="mato8"
      style={{ background: "#fff", padding: "8px", paddingTop: "12px" }}
    >
      <Col>
        <Skeleton.Button active size="small" shape="square" />
      </Col>
      <Col md={4}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={4}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={3}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={4}>
        <Skeleton.Input active size="small" block={true} />
      </Col>
      <Col md={2}>
        <Row gutter={1}>
          <Space size="small">
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
            <Col xl={4}>
              <Skeleton.Button active size="small" shape="square" />
            </Col>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export const DepotProfileLoader = () => {
  return (
    <Row justify="center" align="middle" className="w-[100%] h-[70vh]">
      <Col>{loadingIcon}</Col>
    </Row>
  );
};
