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
      if (payload?.payload?.content) {
        if (payload.onReder) {
          state.displayTrucks = payload.payload;

          return;
        }

        if (payload.replace) {
          state.displayTrucks = payload?.payload;
          return;
        }

        state.displayTrucks.content = [
          ...state?.displayTrucks?.content,
          ...payload?.payload?.content
        ];
        (state.displayTrucks.message = payload?.message),
          (state.displayTrucks.totalPages = payload?.payload?.totalPages);
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
