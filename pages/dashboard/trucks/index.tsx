import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import info from "antd/lib/message";
import Layout from "../../../components/Shared/Layout";
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
  useGetTrucksMutation
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";

const { Text } = Typography;

interface Trucks {
  displayTrucks: { content: [] };
}

type State = {
  trucks: Trucks;
};

const Trucks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(0);
  const [paginatedPages, setPaginatedPages] = useState(1);
  const [loadMoreTrucks, { isLoading: loadMoreLoading }] =
    useLoadMoreTrucksMutation();
  const [getTrucks, { isLoading: getTrucksLoading }] = useGetTrucksMutation();
  const [filterTrucks, { isLoading: filterTrucksLoading }] =
    useFilterTrucksMutation();

  const dispatch = useDispatch();
  const trucksState = useSelector((state: State) => state.trucks.displayTrucks);
  const router = useRouter();
  const { browserStatus, browserSort, browserSearch } = router.query;

  useEffect(() => {
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
        dispatch(displayTrucks(res));
        setCurrentPages(res?.payload?.totalPages || 0);
      })
      .catch((err) => {
        if (err) info.error(err?.data?.message || "Something went wrong");
      });
  }, [dispatch, getTrucks]);

  const handleLoadMore = () => {
    loadMoreTrucks({
      size: pagination.trucks,
      page: paginatedPages,
      status: browserStatus,
      sort: browserSort,
      search: browserSearch
    })
      .unwrap()
      .then(
        (res: { payload: { totalPages: React.SetStateAction<number> } }) => {
          dispatch(displayTrucks(res));
          setPaginatedPages(paginatedPages + 1);
          setCurrentPages(res?.payload?.totalPages);
        }
      )
      .catch((err: { data: { message: string | object | [] } }) => {
        if (err) info.error(err?.data?.message || "Something went wrong");
      });
  };

  const showPaginationBtn =
    (currentPages > 1 && currentPages > paginatedPages) || loadMoreLoading;

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

        dispatch(displayTrucks({ ...res, replace: true }));
        setCurrentPages(res?.payload?.totalPages);
        setPaginatedPages(1);
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

        dispatch(displayTrucks({ ...res, replace: true }));
        setCurrentPages(res?.payload?.totalPages);
        setPaginatedPages(1);
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

        dispatch(displayTrucks({ ...res, replace: true }));
        setCurrentPages(res?.payload?.totalPages);
        setPaginatedPages(1);
      })
      .catch((err) => {
        if (err) info.error(err?.data?.message || "Something went wrong");
      });
  };

  return (
    <Layout>
      <NewTruckModal isVisible={isVisible} setIsVisible={setIsVisible} />

      <div
        style={{
          background: "#fcfcfc",
          padding: "6px 12px",
          width: "98%",
          margin: "auto",
          borderRadius: "4px"
        }}
        className="w-full shadow-[0px_-6px_24px_#0000001A] px-5 py-1 sticky top-4 z-50 flex justify-between items-center"
      >
        {/* LEFT SIDE  */}
        <div className="flex items-center gap-4">
          <Text className="heading2">
            {trucksState?.content?.length || 0} Trucks
          </Text>

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
          <CustomButton type="primary" onClick={() => setIsVisible(true)}>
            NEW TRUCK
          </CustomButton>
        </div>
      </div>

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
    </Layout>
  );
};

export default WithPrivateRoute(Trucks);
