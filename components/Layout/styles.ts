import styled from "styled-components";
import { Layout, Row } from "antd";
import { color } from "../../themes/constants";
import { device } from "../../themes/device";
import { Flex } from "../../themes/globalStyles";
import { styledComponentsTypes } from "../../lib/types/styledComponentsTypes";

const { Sider } = Layout;

export const DashboardLayout = styled(Layout)`
  height: ${(props: styledComponentsTypes) => props.height || ""};
`;

export const DashboardSider = styled(Sider)`
  background: ${color.dark};
  color: ${color.white};
  height: 100vh;
`;

export const TopSider = styled(Row)`
  padding: 1.2rem 2rem;
  border-bottom: ${`0.95px solid ${color.black}`};
`;

export const DashboardContents = styled.section`
  overflow-y: auto;
  height: calc(100vh - 4.8rem);
  padding: ${(props: styledComponentsTypes) => props.padding || "0"};
  animation: animateDashboard 1s ease-in-out;
  background: ${color.white};

  @media ${device.mobileL} {
    height: calc(100vh - 7rem);
    padding: 1rem;
  }

  @keyframes animateDashboard {
    0% {
      opacity: 0;
      width: 50%;
    }

    40% {
      width: 100%;
    }

    100% {
      opacity: 100%;
    }
  }
`;

export const StyledHelpDesk = styled(Flex)`
  width: 90%;
  background: #000000 0% 0% no-repeat padding-box;
  border-radius: 5px;
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 24px;
  cursor: pointer;
`;
