import Col from "antd/lib/col";
import Collapse from "antd/lib/collapse";
import Row from "antd/lib/row";
import Image from "antd/lib/image";
import DriverLeftHeader from "./DriverLeftHeader";
import DriverShiftHistoryTable from "./DriverShiftHistoryTable";
import LeftSideInnerHeader from "./LeftSideInnerHeader";

const { Panel } = Collapse;

const dumpData = [
  {
    id: 0,
    name: "Kelia"
  },
  {
    id: 1,
    name: "Kelia"
  },
  {
    id: 2,
    name: "Kelia"
  },
  {
    id: 3,
    name: "Kelia"
  }
];

const DriverLeftSide = ({ selectedFilter, setSelectedFilter }: any) => {
  return (
    <Col
      className="h-[86vh] overflow-auto"
      xs={24}
      sm={24}
      md={13}
      lg={13}
      xl={13}
      xxl={13}
    >
      <DriverLeftHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div className="mb-10">
        {dumpData.map((dump) => (
          <Collapse bordered={false} key={dump.id}>
            <Panel
              key={0}
              showArrow={false}
              header={
                <Row
                  align="middle"
                  justify="space-between"
                  className="w-[100%]"
                >
                  <Col span={12}>
                    <Row align="middle" gutter={32} wrap={false}>
                      <Col md={2} lg={2}>
                        <span className="text-gray-400">1</span>
                      </Col>

                      <Col md={14} lg={14} xl={14} xxl={12}>
                        <span className="text font-bold text-ox-dark">
                          Inspection name
                        </span>
                      </Col>

                      <Col md={6} lg={6} xl={10} xxl={10}>
                        <span className="text_ellipsis text-gray-400">
                          11-02-2022
                        </span>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={12} style={{ marginRight: "-12px" }}>
                    <Row align="middle" justify="end" gutter={32}>
                      <Col>
                        <Row align="middle" gutter={12}>
                          <Col>
                            <span className="text-gray-400">Results: </span>
                          </Col>

                          <Col>
                            <span className={`text font-bold `}>{98989}</span>
                            <span className="text-gray-400 font-bold">/10</span>
                          </Col>
                        </Row>
                      </Col>

                      <Col>
                        <Image
                          src="/icons/unfold_more_FILL0_wght400_GRAD0_opsz48.svg"
                          preview={false}
                          width={24}
                          alt=""
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              className="mabo6"
              style={{
                borderRadius: "4px",
                padding: "10px",
                background: "white",
                marginBottom: "12px"
              }}
            >
              <div className="border border-grey rounded p-2 m-2">
                <LeftSideInnerHeader />
                <DriverShiftHistoryTable isClientOrdersFetching={false} />
              </div>
            </Panel>
          </Collapse>
        ))}
      </div>
    </Col>
  );
};

export default DriverLeftSide;
