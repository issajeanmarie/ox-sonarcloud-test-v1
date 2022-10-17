/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";
import { isValidToken } from "../../../lib/util/jwt";
import {
  removeCredentials,
  setCredentials
} from "../../../lib/redux/slices/authSlice";
import { routes } from "../../../config/route-config";
import { baseAPI } from "../../../lib/api/api";

const WithPrivateRoute = (Wrapped: any) => {
  return (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.payload);
    const localToken = localStorage.getItem("_ox_tkn_");

    if (!token && localToken) dispatch(setCredentials({ payload: localToken }));

    if (!token && !localToken) {
      dispatch(removeCredentials());
      dispatch(baseAPI.util.resetApiState());
      router.replace(routes.login.url);
      return null;
    }
    if (
      (token && !isValidToken(token)) ||
      (localToken && !isValidToken(localToken))
    ) {
      dispatch(removeCredentials());
      dispatch(baseAPI.util.resetApiState());
      router.replace(routes.login.url);
      return null;
    }
    return <Wrapped {...props} />;
  };
};

export default WithPrivateRoute;
