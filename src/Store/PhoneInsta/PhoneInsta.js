import { createSlice } from "@reduxjs/toolkit";

const PhoneInsta = createSlice({
  name: "PhoneInsta",
  initialState: {
    phoneInsta: [],
  },
  reducers: {
    editPhoneInsta: (state, action) => {
      state.phoneInsta = action.payload;
    },
  },
});

export const { editPhoneInsta } = PhoneInsta.actions;

export default PhoneInsta.reducer;
