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

export const { editUserCard } = UserCard.actions;

export default UserCard.reducer;
