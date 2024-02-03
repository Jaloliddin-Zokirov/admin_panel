import { createSlice } from "@reduxjs/toolkit";

const Lang = createSlice({
  name: "lang",
  initialState: {
    lang: "ru",
  },
  reducers: {
    editLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { editLang } = Lang.actions;

export default Lang.reducer;
