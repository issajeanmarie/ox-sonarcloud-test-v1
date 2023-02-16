/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC } from "react";
import Dropdown from "antd/lib/dropdown";
import Space from "antd/lib/space";
import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import Router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../../../lib/redux/slices/authSlice";
import { routes } from "../../../config/route-config";
import { Avatar } from "antd";
import { abbreviator } from "../../../helpers/abbreviator";
import { useSettingsQuery } from "../../../lib/api/endpoints/settings/settingsEndpoints";
import { baseAPI } from "../../../lib/api/api";

/**
 * @author Kundwa Bruno M <kundwabruno@gmail.com> and
 * @authorTwo Patrick Tunezerwane <tunezepatrick@awesomity.rw>
 * @since July 2022
 */

const { Text } = Typography;

interface ProfileBoxProps {
  user: {
    names: string | undefined;
    sub: string | undefined;
  };
}

const ProfileBox: FC<ProfileBoxProps> = () => {
  const dispatch = useDispatch();
  const { data } = useSettingsQuery();

  const logout = () => {
    dispatch(removeCredentials());
    dispatch(baseAPI.util.resetApiState());
    Router.replace(routes.login.url);
  };

  const router = useRouter();

  const userProfile = (
    <Space
      direction="vertical"
      className="bg-white rounded-md p-4 shadow-md  transition ease-in-out delay-150"
    >
      <Row gutter={24} align="middle" className="pad24 mb-3">
        <Col>
          {data?.payload?.profilePic ? (
            <Image
              className="rounded img_fit"
              width={64}
              height={64}
              src={data?.payload?.profilePic}
              preview={false}
              alt=""
            />
          ) : (
            <Avatar size={60} className="bg_dark" shape="square">
              <span className="font-bold">
                {data?.payload?.names ? abbreviator(data.payload.names) : null}
              </span>
            </Avatar>
          )}
        </Col>

        <Col>
          <Text className="heading2 block">{data?.payload?.names}</Text>
          <Text className="text14 dark fowe400 opacity_56">
            {data?.payload?.email}
          </Text>
        </Col>
      </Row>

      <Row
        gutter={16}
        className="px-5 pb-2 pointer hover:bg-gray-200 hover:py-4"
      >
        <Col>
          <Image
            width={14}
            src="/icons/ic-actions-user_black.svg"
            preview={false}
            alt=""
          />
        </Col>
        <Col
          onClick={() => router.push(routes.Settings.url)}
          className="pointer"
        >
          <Text className="text14 dark fowe400">My account</Text>
        </Col>
      </Row>

      <Row
        onClick={() => router.push(routes.Policy.url)}
        gutter={16}
        className="px-5 pb-2 pointer hover:bg-gray-200 hover:py-4"
      >
        <Col>
          <Image width={20} src="/icons/policy.svg" preview={false} alt="" />
        </Col>

        <Col>
          <Text className="text14 dark fowe400 ">Privacy policy</Text>
        </Col>
      </Row>

      <Row gutter={16} className="px-5 pointer hover:bg-gray-200 hover:py-4">
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
        className="border-t w-full flex items-center gap-3 px-7 py-4 hover:bg-gray-100 pointer"
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
      <div className="flex items-center gap-2" data-test-id="profile-pic">
        {data?.payload?.profilePic ? (
          <Image
            className="rounded img_fit"
            width={30}
            height={30}
            src={data?.payload?.profilePic}
            preview={false}
            alt=""
          />
        ) : (
          <Avatar className="bg_dark" shape="square">
            <span className="font-bold">
              {data?.payload?.names ? abbreviator(data.payload.names) : null}
            </span>
          </Avatar>
        )}

        <Text className="heading2">{data?.payload?.names}</Text>

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
