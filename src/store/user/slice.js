import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  id: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    resetUser(state) {
      state.email = "";
      state.name = "";
      state.id = undefined;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
