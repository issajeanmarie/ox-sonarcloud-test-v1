/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { routes } from "../../../config/route-config";
import { RootState } from "../../../lib/redux/store";
import { isValidToken } from "../../../lib/util/jwt";

const WithPublicRoute = (Wrapped: any) => {
  return (props: any) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.payload);
    const localToken = localStorage.getItem("_ox_tkn_");

    if (
      (token && isValidToken(token)) ||
      (localToken && isValidToken(localToken))
    ) {
      router.replace(routes.Orders.url);
      return null;
    }
    return <Wrapped {...props} />;
  };
};

export default WithPublicRoute;
