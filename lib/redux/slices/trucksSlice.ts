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
  displayTrucksFuelRecords: object;
  displayTruckIssues: DisplayTrucks;
  displayTrucksRepairLogs: DisplayTrucks;
  displaySingleTruck: any;
};

const slice = createSlice({
  name: "trucks",
  initialState: {
    displayTrucksFuelRecords: {},
    displayTruckIssues: {},
    displayTrucksRepairLogs: {},
    displaySingleTruck: {}
  } as TrucksState,
  reducers: {
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
  displayFuelRecords,
  displayTruckIssues,
  displayRepairLogs,
  displaySingleTruck
} = slice.actions;
export default slice.reducer;
