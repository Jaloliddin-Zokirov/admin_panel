import { createSlice } from "@reduxjs/toolkit";

const Theme = createSlice({
  name: "theme",
  initialState: {
    themeList: false,
  },
  reducers: {
    editTheme: (state, action) => {
      state.themeList = action.payload;
    },
  },
});

export const { editTheme } = Theme.actions;

export default Theme.reducer;
