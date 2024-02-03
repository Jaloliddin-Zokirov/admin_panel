import { createSlice } from "@reduxjs/toolkit";

const Hero = createSlice({
  name: "hero",
  initialState: {
    heroList: [],
  },
  reducers: {
    editHero: (state, action) => {
      state.heroList = action.payload;
    },
  },
});

export const { editHero } = Hero.actions;

export default Hero.reducer;
