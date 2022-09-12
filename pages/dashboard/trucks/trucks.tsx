/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import info from "antd/lib/message";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import CustomInput from "../../../components/Shared/Input";
import CustomButton from "../../../components/Shared/Button/button";
import { pagination } from "../../../config/pagination";
import TrucksTable from "../../../components/Analytics/Trucks/TrucksTable";
import { displayTrucks } from "../../../lib/redux/slices/trucksSlice";
import { NewTruckModal } from "../../../components/Modals";
import { useFilterTrucksMutation } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import {
  useLoadMoreTrucksMutation,
  useLazyGetTrucksQuery
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";

const { Text } = Typography;

interface Trucks {
  displayTrucks: {
    totalPages: number;
    content: [];
  };
}

type State = {
  trucks: Trucks;
};

const Trucks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [loadMoreTrucks, { isLoading: loadMoreLoading }] =
    useLoadMoreTrucksMutation();
  const [getTrucks, { isLoading: getTrucksLoading, data }] =
    useLazyGetTrucksQuery();
  const [filterTrucks, { isLoading: filterTrucksLoading }] =
    useFilterTrucksMutation();

  const dispatch = useDispatch();
  const trucksState = useSelector((state: State) => state.trucks.displayTrucks);
  const router = useRouter();
  const { browserStatus, browserSort, browserSearch } = router.query;

  useEffect(() => {
    dispatch(displayTrucks({}));
    router.push({
      query: {
        browserSort: "",
        browserStatus: "",
        browserSearch: ""
      }
    });

    getTrucks({
      size: pagination.trucks,
      page: 0
    })
      .unwrap()
      .then((res) => {
        res && dispatch(displayTrucks({ payload: res, onReder: true }));
      })
      .catch((err) => {
        if (err) info.error(err?.data?.message || "Something went wrong");
      });
  }, [dispatch, getTrucks]);

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);

    loadMoreTrucks({
      size: pagination.trucks,
      page: currentPages,
      status: browserStatus,
      sort: browserSort,
      search: browserSearch
    })
      .unwrap()
      .then((res: any) => {
        dispatch(displayTrucks(res));
      })
      .catch((err: { data: { message: string | object | [] } }) => {
        if (err) info.error(err?.data?.message || "Something went wrong");
      });
  };

  const showPaginationBtn =
    (trucksState?.totalPages > currentPages || loadMoreLoading) &&
    !(filterTrucksLoading || getTrucksLoading);

  const handleFilterTrucks = (status: string) => {
    filterTrucks({
      size: pagination.trucks,
      page: 0,
      status: status,
      sort: browserSort,
      search: browserSearch
    })
      .unwrap()
      .then((res) => {
        router.push({
          query: {
            browserSearch: browserSearch || "",
            browserSort: browserSort || "",
            browserStatus: status
          }
        });
        setCurrentPages(1);
        dispatch(displayTrucks({ ...res, replace: true }));
      })
      .catch((err) => {
        if (err) info.error(err?.data?.message || "Something went wrong");
      });
  };

  const handleSortTrucks = (sort: string) => {
    filterTrucks({
      size: pagination.trucks,
      page: 0,
      status: browserStatus,
      search: browserSearch,
      sort: sort
    })
      .unwrap()
      .then((res) => {
        router.push({
          query: {
            browserSort: sort,
            browserStatus: browserStatus || "",
            browserSearch: browserSearch || ""
          }
        });
        setCurrentPages(1);
        dispatch(displayTrucks({ ...res, replace: true }));
      })
      .catch((err) => {
        if (err) info.error(err?.data?.message || "Something went wrong");
      });
  };

  const handleSearchTruck = (search: string) => {
    filterTrucks({
      size: pagination.trucks,
      page: 0,
      status: browserStatus,
      sort: browserSort,
      search: search
    })
      .unwrap()
      .then((res) => {
        router.push({
          query: {
            browserSort: browserSort || "",
            browserStatus: browserStatus || "",
            browserSearch: search
          }
        });
        setCurrentPages(1);
        dispatch(displayTrucks({ ...res, replace: true }));
      })
      .catch((err: any) => {
        if (err) info.error(err?.data?.message || "Something went wrong");
      });
  };
  return (
    <>
      <NewTruckModal isVisible={isVisible} setIsVisible={setIsVisible} />

      <div className="flex items-center justify-between mt-6 bg-white py-2 rounded px-4 m-auto w-[98%] border_faded mb-4">
        {/* LEFT SIDE  */}
        <div className="flex items-center gap-12">
          <Text className="heading2">{data?.totalElements || 0} Trucks</Text>

          <CustomInput
            type="text"
            name="search"
            size="small"
            placeholder="Search plate number or modal"
            onChange={handleSearchTruck}
            suffixIcon={
              <Image
                width={14}
                src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                preview={false}
                alt=""
              />
            }
          />

          <CustomInput
            type="select"
            label=""
            placeholder="Filter: All trucks"
            options={[
              { label: "All", value: "ALL" },
              { label: "In use", value: "ACTIVE" },
              { label: "Out of service", value: "INACTIVE" }
            ]}
            name="sort"
            showSearch={false}
            onChange={handleFilterTrucks}
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />

          <CustomInput
            type="select"
            label=""
            placeholder="Sort: Date (New - Old)"
            options={[
              { label: "Date (New - Old)", value: "DATE_DESC" },
              { label: "Date (Old - New)", value: "DATE_ASC" },
              { label: "Name (A - Z)", value: "NAMES_ASC" },
              { label: "Name (Z - A)", value: "NAMES_DESC" }
            ]}
            name="sort"
            showSearch={false}
            onChange={handleSortTrucks}
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <CustomButton type="secondary" size="small">
            DOWNLOAD
          </CustomButton>

          <CustomButton type="primary" size="small">
            NEW ORDER
          </CustomButton>
        </div>
      </div>

      <div className="h-[82vh] overflow-scroll">
        <TrucksTable
          data={trucksState?.content}
          isLoading={getTrucksLoading || filterTrucksLoading}
        />

        {showPaginationBtn && (
          <div style={{ width: "12%", margin: "32px auto" }}>
            <CustomButton
              loading={loadMoreLoading}
              type="secondary"
              onClick={handleLoadMore}
            >
              Load more
            </CustomButton>
          </div>
        )}
      </div>
    </>
  );
};

export default WithPrivateRoute(Trucks);
