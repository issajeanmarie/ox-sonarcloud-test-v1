import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import info from "antd/lib/message";
import ViewTruck from "../../../components/Analytics/Trucks/ViewTruck";
import Layout from "../../../components/Shared/Layout";
import { useLazyGetSingleTruckQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { displaySingleTruck } from "../../../lib/redux/slices/trucksSlice";

const SingleTruck = () => {
  const router = useRouter();
  const { id: truckId } = router.query;
  const dispatch = useDispatch();

  const [getSingleTruck, { isLoading }] = useLazyGetSingleTruckQuery();
  const truckData = useSelector(
    (state: any) => state.trucks.displaySingleTruck
  );

  const componentDidMount = useRef(false);

  useEffect(() => {
    if (!componentDidMount.current && truckId) {
      getSingleTruck({ id: truckId })
        .unwrap()
        .then((res) => {
          dispatch(displaySingleTruck(res));
        })
        .catch((err) => info.error(err?.data?.message || "Something is wrong"));

      componentDidMount.current = true;
    }
  }, [truckId, getSingleTruck]);

  return (
    <Layout>
      <ViewTruck
        truckId={truckId}
        truckData={truckData}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default SingleTruck;
