import info from "antd/lib/message";
import { errorCodes } from "../config/errorCodes";

export const handleAPIRequests = ({
  showSuccess = false,
  successMessage,
  request,
  handleSuccess = () => null,
  handleFailure = () => null,
  ...props
}: any) => {
  request({ ...props })
    .unwrap()
    .then((res: any) => {
      handleSuccess(res);

      if (showSuccess) {
        info.success(successMessage || "Operation successful");
      }

      return res;
    })
    .catch((error: any) => {
      handleFailure(error);

      if (error?.data?.message) {
        info.warning(error?.data?.message);
      } else if (error?.message) {
        info.warning(error?.message);
      } else if (typeof error !== "object") {
        info.warning(error);
      } else {
        if (error.status === 403) {
          info.warn("Please login to perform any action!");
          window.location.href = "/";
        }

        errorCodes.filter(
          (errorCode) =>
            errorCode.code === error.status && info.warning(errorCode.message)
        );
      }

      return error;
    });
};
