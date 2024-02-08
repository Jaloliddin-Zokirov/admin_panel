import { createSlice } from "@reduxjs/toolkit";

const PhoneInsta = createSlice({
  name: "PhoneInsta",
  initialState: {
    phoneInsta: [],
    putPhoneInstaList: true,
    successUpload: false,
  },
  reducers: {
    editPhoneInsta: (state, action) => {
      state.phoneInsta = action.payload;
    },
    putPhoneInsta: (state, action) => {
      state.putPhoneInstaList = action.payload;
    },
    successUploadPhoneInsta: (state, action) => {
      state.successUpload = action.payload;
    },
  },
});

export const { editPhoneInsta, putPhoneInsta, successUploadPhoneInsta } =
  PhoneInsta.actions;

export default PhoneInsta.reducer;
