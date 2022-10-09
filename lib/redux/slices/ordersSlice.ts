/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import { createSlice } from "@reduxjs/toolkit";

interface DisplayOrders {
  message: object;
  content: any;
  totalPages: number;
  totalElements: number;
  payload: any;
}

type OrdersState = {
  displayOrders: DisplayOrders;
};

const slice = createSlice({
  name: "orders",
  initialState: {
    displayOrders: { content: [], message: {}, totalPages: 0 }
  } as OrdersState,
  reducers: {
    displayOrders: (state, { payload }) => {
      if (payload?.payload) {
        // UPDATE STATE WHEN COMPONENT HAS MOUNTED
        if (payload.onRender) {
          state.displayOrders = payload.payload;

          return;
        }

        // CHECK IF YOU HAVE TO REPLACE STATE WITH NEW STATE (EX: AFTER FILTERING, SORTING...)
        if (payload.replace) {
          state.displayOrders = payload?.payload;
          return;
        }

        // CHECK IF YOU ARE PAGINATING TO ADD NEW DATA TO THE CURRENT ONES
        if (payload.paginate) {
          state.displayOrders.payload.totalElements =
            payload?.payload?.totalElements;

          state.displayOrders.payload.content = [
            ...state?.displayOrders?.payload?.content,
            ...payload?.payload?.content
          ];
          (state.displayOrders.message =
            payload?.message || state.displayOrders.message),
            (state.displayOrders.payload.totalPages =
              payload?.payload?.totalPages);

          return;
        }

        // DO THIS OTHERWISE - LIKE WHEN YOU ADDED NEW ELEMENT
        state.displayOrders.content = [
          payload?.payload,
          ...state?.displayOrders?.content
        ];
      }
    }
  }
});

export const { displayOrders } = slice.actions;
export default slice.reducer;
