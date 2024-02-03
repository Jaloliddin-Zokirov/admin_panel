import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
  name: "user",
  initialState: {
    userList: [],
  },
  reducers: {
    editUser: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const { editUser } = User.actions;

export default User.reducer;
