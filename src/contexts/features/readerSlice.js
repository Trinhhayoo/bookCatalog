import { createSlice } from '@reduxjs/toolkit';
import { useState } from 'react';
debugger
const initialState = {
    publicationYear: true,
    selectedAuthor: [],
    ratingSlider: 0
};

const playerSlice = createSlice({
  name: 'player',
  initialState,

  reducers: {
    setFilterPublicationYear: (state, action) => {
      state.publicationYear = action.payload;
    },
    setFilterAuthor: (state, action) => {
        state.selectedAuthor = action.payload;
      },
      setFilterRating: (state, action) => {
        state.ratingSlider = action.payload;
      },
    
  },
});

export const { setFilterPublicationYear, setFilterAuthor, setFilterRating} = playerSlice.actions;

export default playerSlice.reducer;