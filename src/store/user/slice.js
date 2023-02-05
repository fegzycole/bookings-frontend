import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    resetUser(state) {
      state.email = "";
      state.name = "";
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
