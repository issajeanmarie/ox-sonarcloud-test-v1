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
};

const slice = createSlice({
  name: "trucks",
  initialState: {
    displayTrucks: { content: [], message: {}, totalPages: 0 },
    displayTrucksFuelRecords: {}
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
          payload?.payload,
          ...state?.displayTrucks?.content
        ];
      }
    },

    displayFuelRecords: (state, { payload }) => {
      state.displayTrucksFuelRecords = { ...payload };
    }
  }
});

export const { displayTrucks, displayFuelRecords } = slice.actions;
export default slice.reducer;
