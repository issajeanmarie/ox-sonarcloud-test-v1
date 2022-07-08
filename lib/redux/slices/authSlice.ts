import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * @author Kundwa Bruno M <kundwabruno@gmail.com>
 * @since July 2022
 */

type AuthState = {
  token: string | undefined;
};

const slice = createSlice({
  name: "auth",
  initialState: {
    token: undefined
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { refreshToken } }: PayloadAction<{ refreshToken: string }>
    ) => {
      state.token = refreshToken;
      localStorage.setItem("gizToken", refreshToken);
    },
    removeCredentials: (state) => {
      state.token = undefined;
      localStorage.removeItem("gizToken");
    }
  }
});

export const { setCredentials, removeCredentials } = slice.actions;

export default slice.reducer;
