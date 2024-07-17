import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './slice/homeSlice'; // Adjust the path as necessary

export const store = configureStore({
  reducer: {
    home: homeSlice,
  },
});
