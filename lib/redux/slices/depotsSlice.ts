import { createSlice } from "@reduxjs/toolkit";

type Payload = {
  depotId: number | undefined;
  depotName: string | undefined;
};

type State = {
  payload: Payload;
};

const slice = createSlice({
  name: "depots",
  initialState: { payload: { depotId: 0, depotName: "All depots" } } as State,
  reducers: {
    getDepots: (state, { payload }) => {
      state.payload = payload;
    }
  }
});

export const { getDepots } = slice.actions;
export default slice.reducer;
