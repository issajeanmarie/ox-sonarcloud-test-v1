import { FC } from "react";
import Image from "next/image";

const Loader: FC = () => {
  return (
    <div className="w-full  h-[89vh] sticky left-0 top-0 flex items-center justify-center">
      <Image
        src="/oxloader.png"
        alt=""
        width="80px"
        height="80px"
        className="animate-spin duration-1000"
      />
    </div>
  );
};

export default Loader;
