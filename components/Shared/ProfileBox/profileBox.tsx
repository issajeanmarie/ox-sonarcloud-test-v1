import { FC } from "react";
import Dropdown from "antd/lib/dropdown";
import Space from "antd/lib/space";
import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Layout from "antd/lib/layout";
import Typography from "antd/lib/typography";

const { Header } = Layout;
const { Title, Text } = Typography;

interface ProfileBoxProps {
  user: {
    email: string;
    username: string;
  };
}

const ProfileBox: FC<ProfileBoxProps> = ({ user }) => {
  const userProfile = (
    <Space className="bg-white radius5 ">
      <Row gutter={24} align="middle" className="pad24">
        <Col>
          <Image
            className="radius8 img_fit"
            width={64}
            height={64}
            src="/icons/Social media icon.jpg"
            preview={false}
            alt=""
          />
        </Col>

        <Col>
          <Text className="heading2 block">{user.username}</Text>
          <Text className="text14 dark fowe400 opacity_56">{user.email}</Text>
        </Col>
      </Row>

      <Row gutter={16} className="px-7 pb-2">
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

      <Row gutter={16} className="px-7">
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

      <div className="border-t w-full flex items-center gap-3 px-7 py-4 hover:bg-gray-100">
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
    <Dropdown overlay={userProfile} className="pointer">
      <div className="flex items-center gap-2">
        <Image
          className="rounded img_fit"
          width={30}
          height={30}
          src="/icons/Social media icon.jpg"
          preview={false}
          alt=""
        />

        <Text className="heading2">Yves honore</Text>

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
