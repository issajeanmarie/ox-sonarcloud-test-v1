import { useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Select } from "antd";
import Image from "antd/lib/image";
import Table from "antd/lib/table";
import Layout from "../../components/Layout";
import { DropDownIcon, DashboardNavigation } from "../../components/Custom";
import { analyticsMenu } from "../../utils/menus";
import CircleCheckbox from "../../components/Custom/CircleCheckbox";
import {
  DashboardHeader,
  Container,
  Heading,
  SubHeading,
  StyledSpan,
  Text,
  StyledButton,
  StyledLink,
  StyledInput,
  StyledFormItem,
  StyledDatePicker,
  StyledAddIcon,
  StyledCloseButton,
  StyledDayCircle,
  TextSmall,
  StyledTableActionButton,
  StyledViewButton,
  Flex,
  StyledCard,
  StyledUploadInput,
  StyledOrderColumn,
  StyledOrderTopRow,
  StyledOrderBottomRow,
  StyledWhiteSelectContainer
} from "../../themes/globalStyles";

const { Option } = Select;
const { Column } = Table;

const menus = analyticsMenu("MAP");

const tableData = [
  {
    key: 1,
    name: "BISEMAGE Yves Honore",
    phone: "0788734295",
    email: "yves@gmail.com",
    status: "STATUS"
  },
  {
    key: 2,
    name: "BISEMAGE Yves Honore",
    phone: "0788734295",
    email: "yves@gmail.com",
    status: "STATUS"
  }
];

const orderData = [
  {
    key: 1,
    plate: "RAF 003 A",
    driver: "Yves Lionel",
    weight: "1000 KG",
    unitPrice: "20 Rwf / Kg",
    from: "Musanze",
    to: "Nyamasheke",
    price: "60, 000 Rwf",
    supporting: ""
  },
  {
    key: 2,
    plate: "RAF 003 A",
    driver: "Yves Lionel",
    weight: "1000 KG",
    unitPrice: "20 Rwf / Kg",
    from: "Musanze",
    to: "Nyamasheke",
    price: "60, 000 Rwf",
    supporting: "Supporting order"
  }
];

const Components = () => {
  const [checkbox, setCheckbox] = useState(false);

  return (
    <Layout>
      {/* DASHBOARD HEADER MENU */}
      <DashboardHeader>
        <DashboardNavigation menus={menus} />
      </DashboardHeader>

      {/* INPUTS, BUTTONS, TYPOGRAPHY AND OTHERS */}

      <Container padding="2.2rem">
        <Row gutter={64}>
          <Col span={12}>
            <Row align="bottom" gutter={24}>
              <Col span={12}>
                <StyledFormItem mb="12px">
                  <Text weight="700" margin="0 0 4px 0">
                    Label
                  </Text>
                  <StyledInput.Password
                    className="styledInput"
                    placeholder="*** *** ***"
                    getPopupContainer={(trigger) => trigger.parentNode}
                  />
                </StyledFormItem>
              </Col>

              <Col span={7}>
                <StyledFormItem mb="12px">
                  <StyledInput
                    height="2.8rem"
                    className="styledInput"
                    placeholder="Placeholder"
                    suffix={
                      <Image
                        width={14}
                        src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                        preview={false}
                        alt=""
                      />
                    }
                    getPopupContainer={(trigger) => trigger.parentNode}
                  />
                </StyledFormItem>
              </Col>
            </Row>

            <Row align="bottom" gutter={24}>
              <Col span={12}>
                <StyledFormItem mb="12px">
                  <Text weight="700" margin="0 0 4px 0">
                    Label
                  </Text>

                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select someone"
                    size="large"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    getPopupContainer={(trigger) => trigger.parentNode}
                    suffixIcon={<DropDownIcon />}
                  >
                    <Option value="yves">Yves Bisemage</Option>
                    <Option value="lionel">Lionel Mpfizi</Option>
                    <Option value="issa">Issa Jean Marie</Option>
                  </Select>
                </StyledFormItem>
              </Col>

              <Col span={7}>
                <StyledFormItem mb="12px">
                  <Text weight="700" margin="0 0 4px 0">
                    Label
                  </Text>

                  <StyledWhiteSelectContainer gap="4px">
                    <Col span={6}>
                      <TextSmall weight="700">Metric:</TextSmall>
                    </Col>

                    <Col span={15}>
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        className="except"
                        placeholder="Select someone"
                        size="large"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        getPopupContainer={(trigger) => trigger.parentNode}
                        suffixIcon={false}
                      >
                        <Option value="yves">Yves Bisemage</Option>
                        <Option value="lionel">Lionel Mpfizi</Option>
                        <Option value="issa">Issa Jean Marie</Option>
                      </Select>
                    </Col>

                    <DropDownIcon />
                  </StyledWhiteSelectContainer>
                </StyledFormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <StyledFormItem mb="12px">
                  <Text weight="700" margin="0 0 4px 0">
                    Label
                  </Text>
                  <StyledInput.TextArea
                    style={{ minHeight: "124px" }}
                    placeholder="Text area"
                  />
                </StyledFormItem>
              </Col>
            </Row>

            <Row align="bottom" gutter={24}>
              <Col span={12}>
                <StyledFormItem mb="12px">
                  <Text weight="700" margin="0 0 4px 0">
                    Date picker
                  </Text>
                  <StyledDatePicker
                    allowClear={false}
                    name="date"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    suffixIcon={
                      <Image
                        width={22}
                        src="/icons/ic-actions-calendar.svg"
                        preview={false}
                        alt=""
                      />
                    }
                  />
                </StyledFormItem>
              </Col>

              <Col span={7}>
                <StyledFormItem mb="12px">
                  <StyledDatePicker
                    height="2.8rem"
                    allowClear={false}
                    name="date"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    suffixIcon={
                      <Image
                        width={18}
                        src="/icons/ic-actions-calendar.svg"
                        preview={false}
                        alt=""
                      />
                    }
                  />
                </StyledFormItem>
              </Col>
            </Row>

            <Row align="bottom" gutter={24}>
              <Col span={12}>
                <StyledFormItem mb="12px">
                  <Text weight="700" margin="0 0 4px 0">
                    Phone number
                  </Text>

                  <StyledDatePicker
                    allowClear={false}
                    name="date"
                    getPopupContainer={(trigger) => trigger.parentNode}
                  />
                </StyledFormItem>
              </Col>

              <Col span={7}>
                <Row align="top" gutter={24} wrap={false}>
                  <Col>
                    <StyledFormItem mb="12px">
                      <StyledAddIcon align="center" justify="center">
                        <Image
                          width={18}
                          src="/icons/ic-actions-add-simple.svg"
                          preview={false}
                          alt=""
                        />
                      </StyledAddIcon>
                    </StyledFormItem>
                  </Col>

                  <Col>
                    <StyledCloseButton>
                      <StyledSpan
                        weight="700"
                        font="12px"
                        style={{ marginTop: "4px" }}
                      >
                        BUTTON
                      </StyledSpan>

                      <Image
                        width={12}
                        src="/icons/ic-actions-close-simple.svg"
                        preview={false}
                        alt=""
                      />
                    </StyledCloseButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          {/* BUTTONS  */}
          <Col span={12}>
            <Row gutter="24" align="bottom">
              <Col>
                <StyledButton
                  primary="true"
                  margin="0 0 2rem 0"
                  padding="1rem 10rem"
                >
                  BUTTON
                </StyledButton>
              </Col>

              <Col>
                <StyledButton
                  height="45px"
                  primary="true"
                  margin="0 0 2rem 0"
                  padding=".5rem 5rem"
                  fontSize="0.875rem"
                >
                  BUTTON
                </StyledButton>
              </Col>
            </Row>

            <Row gutter="24" align="bottom">
              <Col>
                <StyledButton margin="0 0 1rem 0" padding="1rem 10rem">
                  BUTTON
                </StyledButton>
              </Col>

              <Col flex="none">
                <StyledButton
                  height="45px"
                  margin="0 0 1rem 0"
                  padding=".5rem 5rem"
                  fontSize="0.875rem"
                >
                  BUTTON
                </StyledButton>
              </Col>
            </Row>

            <Row>
              <Col>
                <StyledLink weight="400" underline="true" margin="0 0 128px 0">
                  Forgot password?
                </StyledLink>
              </Col>
            </Row>

            <Row gutter={32} align="bottom">
              <Col md={12} xl={8}>
                <Heading weight="700" margin="0 0 6px 0">
                  HEADING 1
                </Heading>
                <SubHeading weight="300" margin="6px 0">
                  Heading two
                </SubHeading>

                <Text weight="400" margin="6px 0">
                  Normal Text
                </Text>

                <StyledSpan
                  fontStyle="italic"
                  weight="300"
                  margin="6px 0"
                  style={{ opacity: "0.56" }}
                >
                  Caption Text
                </StyledSpan>

                <Text weight="400" margin="6px 0">
                  Normal Text
                </Text>
              </Col>

              <Col>
                <CircleCheckbox
                  defaultChecked={true}
                  checked={checkbox}
                  setState={setCheckbox}
                  state={checkbox}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={24}>
              {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                <Col key={day}>
                  <StyledDayCircle margin="64px 0 0 0">{day}</StyledDayCircle>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* DRIVERS SECTION */}
      <DashboardHeader
        justify="space-between"
        align="center"
        padding="12px 32px"
      >
        <Row gutter={20} align="middle">
          <Col>
            <Image
              className="pointer"
              src="/icons/keyboard_backspace_black_24dp.svg"
              alt="OX Delivery Logo"
              width={24}
              preview={false}
            />
          </Col>

          <Col>
            <Text weight="700">Level 1</Text>
          </Col>

          <Col>
            <Text weight="700">/</Text>
          </Col>

          <Col>
            <Text weight="700">Level 2</Text>
          </Col>

          <Col>
            <Text weight="700">/</Text>
          </Col>

          <Col>
            <StyledSpan font="16px" style={{ opacity: "0.5" }}>
              Current
            </StyledSpan>
          </Col>
        </Row>

        <StyledButton
          height="45px"
          primary="true"
          margin="0 0 0 0"
          padding=".5rem 4rem"
          fontSize="0.875rem
"
        >
          ACTION
        </StyledButton>
      </DashboardHeader>

      {/* TABLE */}
      <Container padding="2.2rem">
        <Table
          className="data_table"
          dataSource={tableData}
          rowKey={(record) => record.key}
          pagination={false}
          bordered={false}
          scroll={{ x: 0 }}
        >
          <Column
            width="5%"
            key="key"
            title="#"
            render={(text, record) => {
              const child = (
                <TextSmall
                  weight="normal"
                  phoneAlign="right"
                  className="no_text"
                  style={{ opacity: "0.56", color: "#2A3548" }}
                >
                  {record.key}
                </TextSmall>
              );
              return { children: child, props: { "data-label": "#" } };
            }}
          />

          <Column
            width="25%"
            key="key"
            title="Name"
            render={(text, record) => {
              const child = (
                <TextSmall weight="700" phoneAlign="right">
                  {record.name}
                </TextSmall>
              );
              return { children: child, props: { "data-label": "Name" } };
            }}
          />

          <Column
            width="20%"
            key="key"
            title="Phone number"
            render={(text, record) => {
              const child = (
                <TextSmall
                  weight="normal"
                  phoneAlign="right"
                  style={{ opacity: "0.56", color: "#2A3548" }}
                >
                  {record.phone}
                </TextSmall>
              );
              return {
                children: child,
                props: { "data-label": "Phone number" }
              };
            }}
          />

          <Column
            width="20%"
            key="key"
            title="Email"
            render={(text, record) => {
              const child = (
                <TextSmall
                  weight="normal"
                  phoneAlign="right"
                  style={{ opacity: "0.56", color: "#2A3548" }}
                >
                  {record.email}
                </TextSmall>
              );
              return { children: child, props: { "data-label": "Email" } };
            }}
          />

          <Column
            width="15%"
            key="key"
            title="Status"
            render={(text, record) => {
              const child = (
                <TextSmall
                  transform="uppercase"
                  weight="700"
                  phoneAlign="right"
                  style={{
                    color: `${record.key === 1 ? "#BD062D" : "#2A3548"}`
                  }}
                >
                  {record.status}
                </TextSmall>
              );
              return { children: child, props: { "data-label": "Status" } };
            }}
          />

          <Column
            width="20%"
            key="key"
            title="Action"
            render={() => {
              const child = (
                <Row align="middle" gutter={16} wrap={false}>
                  <Col>
                    <StyledTableActionButton>
                      <Image
                        src="/icons/ic-contact-edit.svg"
                        alt="OX Delivery Logo"
                        width={16}
                        preview={false}
                      />
                    </StyledTableActionButton>
                  </Col>

                  <Col>
                    <StyledTableActionButton color="red">
                      <Image
                        src="/icons/ic-actions-remove.svg"
                        alt="OX Delivery Logo"
                        width={16}
                        preview={false}
                      />
                    </StyledTableActionButton>
                  </Col>

                  <Col>
                    <StyledViewButton>
                      <StyledLink
                        to="#"
                        weight="700"
                        size="14px"
                        color="#E7B522"
                      >
                        View
                      </StyledLink>
                    </StyledViewButton>
                  </Col>
                </Row>
              );
              return { children: child, props: { "data-label": "Status" } };
            }}
          />
        </Table>
      </Container>

      <Flex justify="center">
        <StyledButton
          height="45px"
          margin="2rem 0"
          padding=".5rem 3.5rem"
          fontSize="0.875rem"
          transform="none"
        >
          Load more
        </StyledButton>
      </Flex>

      {/* ORDERS TABLE */}
      <Container padding="2.2rem">
        <DashboardHeader
          justify="space-between"
          align="center"
          padding="12px 32px"
        >
          {/* LEFT SIDE  */}
          <Row gutter={20} align="middle" wrap={false}>
            <Col span={5}>
              <Text weight="700">2,645 Orders</Text>
            </Col>

            <Col span={7}>
              <StyledFormItem>
                <StyledWhiteSelectContainer gap="6px">
                  <Col span={6}>
                    <TextSmall weight="700">Filter:</TextSmall>
                  </Col>

                  <Col span={14}>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      className="except"
                      placeholder="All orders"
                      size="large"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      getPopupContainer={(trigger) => trigger.parentNode}
                      suffixIcon={false}
                    >
                      <Option value="yves">All orders</Option>
                      <Option value="lionel">Order 1</Option>
                      <Option value="issa">Order 2</Option>
                    </Select>
                  </Col>

                  <DropDownIcon />
                </StyledWhiteSelectContainer>
              </StyledFormItem>
            </Col>

            <Col span={6}>
              <StyledFormItem mb="2px">
                <StyledDatePicker
                  placeholder="Start"
                  height="2.8rem"
                  allowClear={false}
                  name="date"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  suffixIcon={
                    <Image
                      width={18}
                      src="/icons/ic-actions-calendar.svg"
                      preview={false}
                      alt=""
                    />
                  }
                />
              </StyledFormItem>
            </Col>

            <Col span={6}>
              <StyledFormItem mb="2px">
                <StyledDatePicker
                  placeholder="End"
                  height="2.8rem"
                  allowClear={false}
                  name="date"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  suffixIcon={
                    <Image
                      width={18}
                      src="/icons/ic-actions-calendar.svg"
                      preview={false}
                      alt=""
                    />
                  }
                />
              </StyledFormItem>
            </Col>
          </Row>

          {/* RIGHT SIDE  */}
          <Row gutter={20} align="middle" justify="end" wrap={false}>
            <Col span={7}>
              <StyledFormItem>
                <StyledInput
                  height="2.8rem"
                  className="styledInput"
                  placeholder="Placeholder"
                  suffix={
                    <Image
                      width={14}
                      src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                      preview={false}
                      alt=""
                    />
                  }
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </StyledFormItem>
            </Col>

            <Col>
              <StyledButton
                height="45px"
                padding=".5rem 2rem"
                fontSize="0.875rem"
              >
                DOWNLOAD REPORT
              </StyledButton>
            </Col>

            <Col>
              <StyledButton
                height="45px"
                primary="true"
                margin="0 0 0 0"
                padding=".5rem 3rem"
                fontSize="0.875rem"
              >
                NEW ORDER
              </StyledButton>
            </Col>
          </Row>
        </DashboardHeader>
      </Container>

      <Container padding="0rem 2.2rem 1rem 2.2rem">
        {/* TOP ROW */}
        <StyledOrderColumn>
          <StyledOrderTopRow justify="space-between" align="middle">
            <Col span={12}>
              <Row align="middle" gutter={32}>
                <Col>
                  <Image
                    width={16}
                    src="/icons/ic-actions-user-yellow.svg"
                    preview={false}
                    alt=""
                  />
                </Col>

                <Col>
                  <SubHeading weight="700">Turatsinze Theoneste</SubHeading>
                </Col>

                <Col>
                  <Text weight="400" style={{ opacity: "0.56" }}>
                    0788734295
                  </Text>
                </Col>
              </Row>
            </Col>

            <Col span={12}>
              <Row align="middle" justify="end" gutter={64}>
                <Col>
                  <SubHeading weight="700" style={{ color: "#ED7818" }}>
                    70, 000 Rwf
                  </SubHeading>
                </Col>

                <Col span={9}>
                  <Row align="middle" gutter={12} justify="end" wrap={false}>
                    <Col>
                      <StyledSpan
                        whiteSpace="nowrap"
                        fontStyle="italic"
                        style={{ opacity: "0.56" }}
                      >
                        Order status:
                      </StyledSpan>
                    </Col>

                    <Col>
                      <StyledSpan weight="700" style={{ color: "#2A3548" }}>
                        PENDING
                      </StyledSpan>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </StyledOrderTopRow>

          {/* MIDDLE ROWS */}
          <Container padding="0 1rem 0">
            <Table
              className="data_table"
              dataSource={orderData}
              rowKey={(record) => record.key}
              pagination={false}
              showHeader={false}
              bordered={false}
              scroll={{ x: 0 }}
            >
              <Column
                key="key"
                title="Plate"
                render={(text, record) => {
                  const child = (
                    <Row align="middle" gutter={24} wrap={false}>
                      <Col>
                        <Image
                          width={22}
                          src="/icons/ic-ecommerce-delivery-yellow.svg"
                          preview={false}
                          alt=""
                        />
                      </Col>

                      <Col>
                        <Row align="middle" gutter={24}>
                          <Col>
                            <Text weight="700" phoneAlign="right">
                              {record.plate}
                            </Text>
                          </Col>

                          <Col>
                            <TextSmall
                              weight="normal"
                              phoneAlign="right"
                              style={{ opacity: "0.56", color: "#2A3548" }}
                            >
                              {record.driver}
                            </TextSmall>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                  return { children: child, props: { "data-label": "Name" } };
                }}
              />

              <Column
                key="key"
                title="Weight"
                render={(text, record) => {
                  const child = (
                    <Row align="middle" gutter={16}>
                      <Col>
                        <Text weight="700" phoneAlign="right">
                          {record.weight}
                        </Text>
                      </Col>

                      <Col>
                        <TextSmall
                          fontStyle="italic"
                          weight="normal"
                          style={{ opacity: "0.56" }}
                        >
                          {record.unitPrice}
                        </TextSmall>
                      </Col>
                    </Row>
                  );
                  return { children: child, props: { "data-label": "Email" } };
                }}
              />

              <Column
                key="key"
                title="From"
                render={(text, record) => {
                  const child = (
                    <Row align="middle" gutter={16}>
                      <Col>
                        <Text weight="700" phoneAlign="right">
                          From
                        </Text>
                      </Col>

                      <Col>
                        <TextSmall
                          weight="normal"
                          phoneAlign="right"
                          style={{ opacity: "0.56", color: "#2A3548" }}
                        >
                          {record.from}
                        </TextSmall>
                      </Col>
                    </Row>
                  );
                  return { children: child, props: { "data-label": "Name" } };
                }}
              />

              <Column
                key="key"
                title="From"
                render={(text, record) => {
                  const child = (
                    <Row align="middle" gutter={16}>
                      <Col>
                        <Text weight="700" phoneAlign="right">
                          To
                        </Text>
                      </Col>

                      <Col>
                        <TextSmall
                          weight="normal"
                          phoneAlign="right"
                          style={{ opacity: "0.56", color: "#2A3548" }}
                        >
                          {record.to}
                        </TextSmall>
                      </Col>
                    </Row>
                  );
                  return { children: child, props: { "data-label": "Name" } };
                }}
              />

              <Column
                key="key"
                title="Supporting"
                render={(text, record) => {
                  const child = (
                    <StyledSpan
                      fontStyle="italic"
                      whiteSpace="nowrap"
                      weight="normal"
                      phoneAlign="right"
                      style={{ opacity: "0.35", color: "#2A3548" }}
                    >
                      {record.supporting}
                    </StyledSpan>
                  );
                  return { children: child, props: { "data-label": "Name" } };
                }}
              />

              <Column
                width="20%"
                key="key"
                title="Action"
                render={() => {
                  const child = (
                    <Row align="middle" gutter={16} wrap={false}>
                      <Col>
                        <Text
                          whiteSpace="nowrap"
                          weight="700"
                          phoneAlign="right"
                          style={{ color: "#BD062D" }}
                          margin="0 5.6rem 0 0"
                        >
                          70, 000 Rwf
                        </Text>
                      </Col>

                      <Col>
                        <StyledTableActionButton>
                          <Image
                            src="/icons/ic-ecommerce-invoice.svg"
                            alt="OX Delivery Logo"
                            width={18}
                            preview={false}
                          />
                        </StyledTableActionButton>
                      </Col>

                      <Col>
                        <StyledTableActionButton color="red">
                          <Image
                            src="/icons/ic-actions-remove.svg"
                            alt="OX Delivery Logo"
                            width={16}
                            preview={false}
                          />
                        </StyledTableActionButton>
                      </Col>

                      <Col>
                        <StyledViewButton>
                          <StyledLink
                            to="#"
                            weight="700"
                            size="14px"
                            color="#E7B522"
                          >
                            View
                          </StyledLink>
                        </StyledViewButton>
                      </Col>
                    </Row>
                  );
                  return { children: child, props: { "data-label": "Status" } };
                }}
              />
            </Table>
          </Container>

          {/* BOTTOM ROW */}
          <StyledOrderBottomRow
            align="middle"
            style={{ opacity: "0.56", color: "#2A3548" }}
          >
            <Col flex="auto">
              <Row align="middle" gutter={12}>
                <Col>
                  <TextSmall style={{ color: "#2A3548" }} weight="400">
                    Created: 11th May 21
                  </TextSmall>
                </Col>

                <Col>
                  <TextSmall style={{ color: "#2A3548" }} weight="400">
                    -
                  </TextSmall>
                </Col>

                <Col>
                  <TextSmall weight="700" phoneAlign="right" fontStyle="italic">
                    Edited by Yves Honore
                  </TextSmall>
                </Col>
              </Row>
            </Col>

            <Col flex="none">
              <TextSmall weight="400" phoneAlign="right" fontStyle="italic">
                NYAMASHEKE Depot
              </TextSmall>
            </Col>
          </StyledOrderBottomRow>
        </StyledOrderColumn>
      </Container>

      {/* CARDS */}

      <Container padding="2.2rem">
        <Row gutter={32}>
          <Col>
            <StyledCard direction="column" mobile="column">
              <Flex
                justify="space-between"
                align="flex-start"
                width="100%"
                gap="140px"
              >
                <Text weight="400">Normal text</Text>

                <Image
                  width={18}
                  src="/icons/more_vert_FILL0_wght400_GRAD0_opsz48.svg"
                  preview={false}
                  alt=""
                />
              </Flex>

              <Heading
                weight="700"
                margin="4px 0 16px 0"
                style={{ color: "#E3B221" }}
              >
                5, 000, 000 Rwf
              </Heading>

              <StyledSpan fontStyle="italic" style={{ opacity: "0.56" }}>
                Caption Text
              </StyledSpan>
            </StyledCard>
          </Col>

          <Col>
            <StyledCard justify="space-between" padding="16px" gap="100px">
              <Row gutter={24}>
                <Col>
                  <Image
                    width={24}
                    src="/icons/description_FILL0_wght400_GRAD0_opsz48.svg"
                    preview={false}
                    alt=""
                  />
                </Col>

                <Col>
                  <Text weight="400">Yellow card</Text>
                </Col>
              </Row>

              <Image
                width={16}
                src="/icons/download.svg"
                preview={false}
                alt=""
              />
            </StyledCard>
          </Col>

          <Col>
            <StyledCard
              border="1px dashed #D8D8D8"
              align="center"
              justify="center"
              direction="column"
              padding="42px"
              gap="12px"
            >
              <StyledUploadInput type="file" />
              <Image
                width={32}
                src="/icons/add_photo_alternate_FILL0_wght400_GRAD0_opsz48.svg"
                preview={false}
                alt=""
              />

              <StyledSpan>Add image</StyledSpan>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Components;
