import moment from "moment";
import Image from "next/image";
import { Stop } from "../../../lib/types/orders";
import { userType } from "../../../helpers/getLoggedInUser";

const StepDescription = ({
  st,
  setChosenId,
  setIsDeleteStopModal,
  setIsEditStopModal
}: {
  st: Stop;
  setChosenId: any;
  setIsDeleteStopModal: any;
  setIsEditStopModal: any;
}) => {
  const user = userType();

  return (
    <div>
      <div className="font-semibold" style={{ color: "black" }}>
        {st.location}
      </div>

      <div className="my-3 text-xs font-light">
        {st.arrivalDateTime && st.departureDateTime && (
          <>
            {moment(st.arrivalDateTime).format("HH:MM a")} -{" "}
            {moment(st.departureDateTime).format("HH:MM a")}
          </>
        )}
      </div>
      <div className="flex items-center mb-5">
        <div className="flex-1 flex items-center gap-8">
          {st.truck?.plateNumber ? (
            <span className="heading2">{st.truck?.plateNumber}</span>
          ) : (
            <span className="font-semibold italic text-gray-300">
              Truck Not found
            </span>
          )}
        </div>
        <div className="flex-2 text-gray-400 font-light">{st.driver.names}</div>
        <div className="flex-1 text-black font-light text-right">
          {st.weight} KGs
        </div>
        <div
          className={`flex-1 flex items-center gap-5 justify-end ${
            !user.isAdmin && !user.isSuperAdmin && "opacity-50"
          }`}
        >
          <Image
            className="pointer"
            src="/icons/ic-contact-edit.svg"
            alt="Backspace icon"
            onClick={() => {
              if (user.isAdmin || user.isSuperAdmin) {
                setChosenId(st);
                setIsEditStopModal(true);
              }
            }}
            width={15}
            height={15}
          />
          <Image
            className="pointer"
            src="/icons/ic-actions-remove.svg"
            alt="Backspace icon"
            onClick={() => {
              if (user.isAdmin || user.isSuperAdmin) {
                setChosenId(st);
                setIsDeleteStopModal(true);
              }
            }}
            width={15}
            height={15}
          />
        </div>
      </div>
    </div>
  );
};

export default StepDescription;
