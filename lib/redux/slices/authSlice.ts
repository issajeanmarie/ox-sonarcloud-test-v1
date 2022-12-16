import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  message: string;
  payload: string;
};

const slice = createSlice({
  name: "auth",
  initialState: {
    payload: ""
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { payload }
      }: PayloadAction<{
        payload: string;
      }>
    ) => {
      state.payload = payload;
      localStorage.setItem("_ox_tkn_", payload);
    },

    setResetPasswordToken: (
      state,
      { payload: { payload } }: PayloadAction<{ payload: string }>
    ) => {
      state.payload = payload;
    },
    removeCredentials: (state) => {
      state.payload = "";
      localStorage.removeItem("_ox_tkn_");
    }
  }
});

export const { setCredentials, removeCredentials, setResetPasswordToken } =
  slice.actions;
export default slice.reducer;
