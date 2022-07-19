/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC } from "react";
import Dropdown from "antd/lib/dropdown";
import Space from "antd/lib/space";
import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../../../lib/redux/slices/authSlice";
import { routes } from "../../../config/route-config";
import { getLoggedInUser } from "../../../helpers/getLoggedInUser";
import { Avatar } from "antd";
import { abbreviator } from "../../../helpers/abbreviator";

/**
 * @author Kundwa Bruno M <kundwabruno@gmail.com> and
 * @authorTwo Patrick Tunezerwane <tunezepatrick@awesomity.rw>
 * @since July 2022
 */

const { Text } = Typography;

interface ProfileBoxProps {
  user: {
    names: string;
    sub: string;
  };
}

const ProfileBox: FC<ProfileBoxProps> = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = getLoggedInUser();

  const logout = () => {
    dispatch(removeCredentials());
    Router.replace(routes.login.url);
  };

  const userProfile = (
    <Space className="bg-white radius5 ">
      <Row gutter={24} align="middle" className="pad24 mb-3">
        <Col>
          {loggedInUser?.profilePic ? (
            <Image
              className="rounded img_fit"
              width={64}
              height={64}
              src="/icons/Social media icon.jpg"
              preview={false}
              alt=""
            />
          ) : (
            <Avatar size={60} className="bg_dark" shape="square">
              <span className="font-bold">
                {abbreviator(loggedInUser?.names)}
              </span>
            </Avatar>
          )}
        </Col>

        <Col>
          <Text className="heading2 block">{loggedInUser?.names}</Text>
          <Text className="text14 dark fowe400 opacity_56">
            {loggedInUser?.sub}
          </Text>
        </Col>
      </Row>

      <Row gutter={16} className="px-5 pb-2">
        <Col>
          <Image
            width={14}
            src="/icons/ic-actions-user_black.svg"
            preview={false}
            alt=""
          />
        </Col>
        <Col>
          <Text className="text14 dark fowe400 ">My account</Text>
        </Col>
      </Row>

      <Row gutter={16} className="px-5">
        <Col>
          <Image
            width={14}
            src="/icons/ic-editor-block.svg"
            preview={false}
            alt=""
          />
        </Col>
        <Col>
          <Text className="text14 dark fowe400 pb-2">Help</Text>
        </Col>
      </Row>

      <div
        onClick={logout}
        className="border-t w-full flex items-center gap-3 px-7 py-4 hover:bg-gray-100"
      >
        <Image
          width={14}
          src="/icons/ic-actions-log-out.svg"
          preview={false}
          alt=""
          className="opacity-30"
        />
        <Text className="opacity-30">Logout</Text>
      </div>
    </Space>
  );

  return (
    <Dropdown overlay={userProfile} className="pointer" trigger={["click"]}>
      <div className="flex items-center gap-2">
        {loggedInUser?.profilePic ? (
          <Image
            className="rounded img_fit"
            width={30}
            height={30}
            src="/icons/Social media icon.jpg"
            preview={false}
            alt=""
          />
        ) : (
          <Avatar className="bg_dark" shape="square">
            <span className="font-bold">
              {abbreviator(loggedInUser?.names)}
            </span>
          </Avatar>
        )}

        <Text className="heading2">{loggedInUser?.names}</Text>

        <Image
          className="ml-1 img_fit"
          width={8}
          src="/icons/expand_more_black_24dp.svg"
          preview={false}
          alt=""
        />
      </div>
    </Dropdown>
  );
};

export default ProfileBox;
