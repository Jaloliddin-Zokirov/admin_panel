import { createSlice } from "@reduxjs/toolkit";

const Logo = createSlice({
  name: "logo",
  initialState: {
    logoList: [],
    putLogoList: false,
    successUpload: false,
  },
  reducers: {
    editLogo: (state, action) => {
      state.logoList = action.payload;
    },
    putLogo: (state, action) => {
      state.putLogoList = action.payload;
    },
    successUploadLogo: (state, action) => {
      state.successUpload = action.payload;
    },
  },
});

export const { editLogo, putLogo, successUploadLogo } = Logo.actions;

export default Logo.reducer;
