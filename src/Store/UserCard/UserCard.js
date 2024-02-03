import { createSlice } from "@reduxjs/toolkit";

const UserCard = createSlice({
  name: "userCard",
  initialState: {
    userCard: [],
  },
  reducers: {
    editUserCard: (state, action) => {
      state.userCard = action.payload;
    },
  },
});

export const { editUserCard, editUserId } = UserCard.actions;

export default UserCard.reducer;
