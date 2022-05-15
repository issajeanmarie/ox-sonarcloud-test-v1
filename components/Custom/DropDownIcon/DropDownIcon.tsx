import React from "react";
import PropTypes from "prop-types";
import Image from "antd/lib/image";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { DropIconTypes } from "../../../lib/types/globalTypes";

const Icon = styled(Image)`
  padding: 4px;
  width: ${(props) => props.width || "1.2rem"};
`;

const DropIcon = ({ focused, loading, showSearch, width }: DropIconTypes) => {
  if (focused && showSearch && !loading) return <SearchOutlined />;

  if (loading && showSearch && focused) return <LoadingOutlined />;

  return (
    <Icon
      src="/icons/expand_more_black_24dp.svg"
      preview={false}
      width={width}
    />
  );
};

DropIcon.propTypes = {
  focused: PropTypes.bool,
  loading: PropTypes.bool,
  showSearch: PropTypes.bool,
  width: PropTypes.string
};
export default DropIcon;
