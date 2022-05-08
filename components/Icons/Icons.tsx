import { BsHeadset } from "react-icons/bs";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { RiLuggageDepositLine } from "react-icons/ri";
import { MdKeyboardArrowDown, MdNotificationsNone } from "react-icons/md";
import { color, text } from "../../themes/constants";

export const HeadsetIcon = (
  <BsHeadset style={{ color: color.yellow_faded_text, fontSize: "0.8rem" }} />
);

export const ArrowNarrowRightIcon = (
  <HiOutlineArrowNarrowRight style={{ color: "#9a9ea8", fontSize: "0.8rem" }} />
);

export const DepositLineIcon = (
  <RiLuggageDepositLine
    style={{
      color: color.yellow_faded_text,
      fontSize: text.sub_heading,
      marginTop: "6px"
    }}
  />
);

export const YellowArrowDownIcon = (
  <MdKeyboardArrowDown
    style={{
      color: color.yellow_faded_text,
      fontSize: "1.25rem",
      marginTop: "6px"
    }}
  />
);

export const NotificationsIcon = (
  <MdNotificationsNone style={{ color: "#000000", fontSize: "1.5rem" }} />
);
