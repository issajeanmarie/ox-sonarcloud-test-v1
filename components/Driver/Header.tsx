/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Image as AntDImage } from "antd";
import { useRouter } from "next/router";
import { routes } from "../../config/route-config";
import Navbar from "../Shared/Content/Navbar";

const Header = () => {
  const router = useRouter();

  const LeftSide = (
    <div className="flex items-center gap-4 ">
      <AntDImage
        onClick={() => router.push(routes.Accounts.url)}
        className="pointer"
        src="/icons/keyboard_backspace_black_24dp.svg"
        alt="Backspace icon"
        width={20}
        height={20}
        preview={false}
      />
      <span className="text-md font-bold">Driver</span>
      <span className="normalText">/</span>
      <span className="text-gray-400">Khadafi</span>
    </div>
  );

  const RightSide = (
    <Col className="flex gap-8 items-center">
      <AntDImage
        className="pointer"
        src="/icons/receipt.svg"
        alt="Backspace icon"
        width={18}
        height={18}
        preview={false}
      />

      <AntDImage
        className="pointer"
        src="/icons/ic-media-stop.svg"
        alt="Backspace icon"
        width={18}
        height={18}
        preview={false}
      />
      <AntDImage
        className="pointer"
        src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
        alt=""
        width={22}
        height={22}
        preview={false}
      />
    </Col>
  );

  return (
    <>
      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="FULL" />
    </>
  );
};

export default Header;
