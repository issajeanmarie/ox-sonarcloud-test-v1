/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import { createSlice } from "@reduxjs/toolkit";

interface DisplayTrucks {
  message: object;
  content: any;
  totalPages: number;
  totalElements: number;
}

type TrucksState = {
  displayTrucks: DisplayTrucks;
  displayTrucksFuelRecords: object;
  displayTruckIssues: DisplayTrucks;
  displayTrucksRepairLogs: DisplayTrucks;
  displaySingleTruck: any;
};

const slice = createSlice({
  name: "trucks",
  initialState: {
    displayTrucks: { content: [], message: {}, totalPages: 0 },
    displayTrucksFuelRecords: {},
    displayTruckIssues: {},
    displayTrucksRepairLogs: {},
    displaySingleTruck: {}
  } as TrucksState,
  reducers: {
    displayTrucks: (state, { payload }) => {
      if (payload?.payload) {
        // UPDATE STATE WHEN COMPONENT HAS MOUNTED
        if (payload.onReder) {
          state.displayTrucks = payload.payload;

          return;
        }

        // CHECK IF YOU HAVE TO REPLACE STATE WITH NEW STATE (EX: AFTER FILTERING, SORTING...)
        if (payload.replace) {
          state.displayTrucks = payload?.payload;
          return;
        }

        // CHECK IF YOU ARE PAGINATING TO ADD NEW DATA TO THE CURRENT ONES
        if (payload.paginate) {
          state.displayTrucks.totalElements = payload?.payload?.totalElements;
          state.displayTrucks.content = [
            ...state?.displayTrucks?.content,
            ...payload?.payload?.content
          ];
          (state.displayTrucks.message = payload?.message),
            (state.displayTrucks.totalPages = payload?.payload?.totalPages);

          return;
        }

        // DO THIS OTHERWISE - LIKE WHEN YOU ADDED NEW ELEMENT
        state.displayTrucks.content = [
          payload?.payload,
          ...state?.displayTrucks?.content
        ];
      }
    },

    displayFuelRecords: (state, { payload }) => {
      state.displayTrucksFuelRecords = { ...payload };
    },

    displayTruckIssues: (state, { payload }) => {
      if (payload?.replace) {
        state.displayTruckIssues = { ...payload.payload };
        return;
      } else if (payload?.toggle) {
        state.displayTruckIssues.content = payload.payload;
      } else {
        state.displayTruckIssues.content = [
          ...state.displayTruckIssues.content,
          payload?.payload?.payload
        ];
      }
    },

    displayRepairLogs: (state, { payload }) => {
      if (payload.add) {
        state.displayTrucksRepairLogs.content = [
          payload.payload.payload,
          ...state.displayTrucksRepairLogs.content
        ];
        return;
      }
      state.displayTrucksRepairLogs = { ...payload };
    },

    displaySingleTruck: (state, { payload }) => {
      state.displaySingleTruck = { ...payload };
    }
  }
});

export const {
  displayTrucks,
  displayFuelRecords,
  displayTruckIssues,
  displayRepairLogs,
  displaySingleTruck
} = slice.actions;
export default slice.reducer;
