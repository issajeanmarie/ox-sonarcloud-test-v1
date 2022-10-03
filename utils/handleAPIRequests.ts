import info from "antd/lib/message";
import { errorCodes } from "../config/errorCodes";

/**
 * This function handles all API requests,
 * @param {Boolean} showSuccess - Shows/hides success message from API/User - False by default as we don't need it that much
 * @param {Boolean} showFailure - Shows/hides success message from API/User - True by default as we always need to knwo when something is wrong
 * @param {String} successMessage - User defined success message in case API's success message isn't clear to the end-users
 * @param {Function} request - The requst to make, endpoint
 * @param {Function} handleSuccess - A function that runs when the request succeeds, it passes the result as a pram
 * @param {Function} handleFailure - A function that runs when the request fails, it passes the error as a pram
 * @param {any} props - All of the other values you want to pass to the request function/enndpoint
 */

export const handleAPIRequests = ({
  showSuccess = false,
  showFailure = true,
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
        info.success(res.message || successMessage || "Operation successful");
      }

      return res;
    })
    .catch((error: any) => {
      handleFailure(error);

      if (showFailure) {
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
      }

      return error;
    });
};
