import { ErrorMessage } from "../components/Shared/Messages/ErrorMessage";
import { SuccessMessage } from "../components/Shared/Messages/SuccessMessage";
import { errorCodes } from "../config/errorCodes";
import { GenericResponse } from "../lib/types/shared";

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

type Types = {
  showSuccess?: boolean;
  showFailure?: boolean;
  successMessage?: string | object | any;
  request: (value: any) => any;
  handleSuccess: (res: GenericResponse) => any;
  handleFailure: (error: Errors) => any;
};

type Errors = {
  message: string;
  data: { message: string };
  status: number;
};

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

type Types = {
  showSuccess?: boolean;
  showFailure?: boolean;
  successMessage?: string | object | any;
  request: (value: any) => any;
  handleSuccess: (res: GenericResponse) => any;
  handleFailure: (error: Errors) => any;
};

type Errors = {
  message: string;
  data: { message: string };
  status: number;
};

export const handleAPIRequests = ({
  showSuccess = false,
  showFailure = true,
  successMessage,
  request,
  handleSuccess = () => null,
  handleFailure = () => null,
  ...props
}: Types | any) => {
  request({ ...props })
    .unwrap()
    .then((res: GenericResponse) => {
      handleSuccess(res);

      if (showSuccess) {
        SuccessMessage(res.message || successMessage || "Operation successful");
      }

      return res;
    })
    .catch((error: Errors) => {
      handleFailure(error);

      if (showFailure) {
        if (error?.data?.message) {
          ErrorMessage(error?.data?.message);
        } else if (error?.message) {
          ErrorMessage(error?.message);
        } else if (typeof error !== "object") {
          ErrorMessage(error);
        } else {
          if (error.status === 403) {
            SuccessMessage("Please login to perform any action!");
            window.location.href = "/";
          }

          errorCodes.filter(
            (errorCode) =>
              errorCode.code === error.status && ErrorMessage(errorCode.message)
          );
        }
      }

      return error;
    });
};
