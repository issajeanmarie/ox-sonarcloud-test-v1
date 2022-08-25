/* eslint-disable no-unsafe-optional-chaining */
import { createSlice } from "@reduxjs/toolkit";

type TrucksState = {
  message: object;
  content: any;
  totalPages: number;
};

const slice = createSlice({
  name: "trucks",
  initialState: { content: [], message: {}, totalPages: 0 } as TrucksState,
  reducers: {
    displayTrucks: (state, { payload }) => {
      // CHECK IF YOU ARE LOADING DATA, FILTERING, OR PAGINATING
      if (payload.payload.content) {
        //CHECKING IF YOU FILTERED TO REPLACE CURRENT STATE DATA WITH NEW DATA
        if (payload?.replace) {
          state.content = [...payload?.payload?.content];
          (state.message = payload?.message),
            (state.totalPages = payload?.payload?.totalPages);

          return;
        }

        state.content = [...state?.content, ...payload?.payload?.content];
        (state.message = payload?.message),
          (state.totalPages = payload?.payload?.totalPages);
      }
      // CHECKING IF YOU YOU ADDED NEW TRUCK
      else {
        state.content = [payload?.payload, ...state?.content];
      }
    }
  }
});

export const { displayTrucks } = slice.actions;
export default slice.reducer;
