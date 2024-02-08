import { createSlice } from "@reduxjs/toolkit";

const Hero = createSlice({
  name: "hero",
  initialState: {
    heroList: [],
    putHeroList: true,
    successUpload: false,
  },
  reducers: {
    editHero: (state, action) => {
      state.heroList = action.payload;
    },
    putHero: (state, action) => {
      state.putHeroList = action.payload;
    },
    successUploadHero: (state, action) => {
      state.successUpload = action.payload;
    },
  },
});

export const { editHero, putHero, successUploadHero } = Hero.actions;

export default Hero.reducer;
