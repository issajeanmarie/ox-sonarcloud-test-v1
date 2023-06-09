import { FC } from "react";
import Image from "antd/lib/image";

const Loader: FC = () => {
  return (
    <div className="w-full  h-[89vh] sticky left-0 top-0 flex items-center justify-center">
      <Image
        src="/oxloader.png"
        alt=""
        width="120px"
        height="120px"
        preview={false}
        className="animate-spin duration-1000"
      />
    </div>
  );
};

export default Loader;
