import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "depot",
  initialState: {
    depotData: {
      id: 1,
      name: "Tyazo Depot",
      location: "Tyazo",
      coordinates: null
    }
  },
  reducers: {
    setDepotData: (state, action) => {
      return {
        ...state,
        depotData: { ...action.payload }
      };
    }
  }
});

export const { setDepotData } = slice.actions;
export default slice.reducer;
