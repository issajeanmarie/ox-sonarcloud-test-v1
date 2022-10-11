/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import { createSlice } from "@reduxjs/toolkit";

interface displayPaginatedData {
  message: object;
  content: any;
  totalPages: number;
  totalElements: number;
  payload: any;
}

type PaginatedDataState = {
  displayPaginatedData: displayPaginatedData;
};

const slice = createSlice({
  name: "PaginatedData",
  initialState: {
    displayPaginatedData: { content: [], message: {}, totalPages: 0 }
  } as PaginatedDataState,
  reducers: {
    displayPaginatedData: (state, { payload }) => {
      if (payload?.payload) {
        // UPDATE STATE WHEN COMPONENT HAS MOUNTED
        if (payload.onRender) {
          state.displayPaginatedData = payload.payload;

          return;
        }

        // CHECK IF YOU HAVE TO REPLACE STATE WITH NEW STATE (EX: AFTER FILTERING, SORTING...)
        if (payload.replace) {
          state.displayPaginatedData = payload?.payload;
          return;
        }

        // CHECK IF YOU ARE PAGINATING TO ADD NEW DATA TO THE CURRENT ONES
        if (payload.paginate) {
          state.displayPaginatedData.payload.totalElements =
            payload?.payload?.totalElements;

          state.displayPaginatedData.payload.content = [
            ...state?.displayPaginatedData?.payload?.content,
            ...payload?.payload?.content
          ];
          (state.displayPaginatedData.message =
            payload?.message || state.displayPaginatedData.message),
            (state.displayPaginatedData.payload.totalPages =
              payload?.payload?.totalPages);

          return;
        }

        // DO dispatch(displayPaginatedData({deleted: true, payload: {id: 1}}))
        // WHEN YOU WANT TO REMOVE AN ELEMENT FROM THE LIST
        // THIS SLICE HAS TO RECEIVE ID AS A PROP TO BASE ON REMOVING IT FROM THE LIST
        if (payload.deleted) {
          const newPaginatedDataList =
            state.displayPaginatedData.payload.content.filter(
              (data: { id: number }) => data.id !== payload?.payload?.id
            );

          state.displayPaginatedData.payload.content = [
            ...newPaginatedDataList
          ];

          return;
        }

        // DO THIS OTHERWISE - LIKE WHEN YOU ADDED NEW ELEMENT
        // DO dispatch(displayPaginatedData({payload: {name: "Issa", id: 12, age: 56}}))
        // WHEN YOU WANT TO ADD THE ELEMENT ON THE TOP OF THE LIST
        state.displayPaginatedData.payload.content = [
          payload?.payload,
          ...state?.displayPaginatedData?.payload?.content
        ];
      }
    }
  }
});

export const { displayPaginatedData } = slice.actions;
export default slice.reducer;
