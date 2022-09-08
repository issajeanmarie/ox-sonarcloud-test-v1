/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import { createSlice } from "@reduxjs/toolkit";

interface DisplayTrucks {
  message: object;
  content: any;
  totalPages: number;
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
      // CHECK IF YOU ARE LOADING DATA, FILTERING, OR PAGINATING
      if (payload.payload.content) {
        //CHECKING IF YOU FILTERED TO REPLACE CURRENT STATE DATA WITH NEW DATA
        if (payload?.replace) {
          state.displayTrucks.content = [...payload?.payload?.content];
          (state.displayTrucks.message = payload?.message),
            (state.displayTrucks.totalPages = payload?.payload?.totalPages);

          return;
        }

        state.displayTrucks.content = [
          ...state?.displayTrucks?.content,
          ...payload?.payload?.content
        ];
        (state.displayTrucks.message = payload?.message),
          (state.displayTrucks.totalPages = payload?.payload?.totalPages);
      }
      // CHECKING IF YOU YOU ADDED NEW TRUCK
      else {
        state.displayTrucks.content = [
          ...state?.displayTrucks?.content,
          payload?.payload
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
