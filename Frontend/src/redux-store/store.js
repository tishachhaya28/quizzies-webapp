import { configureStore } from '@reduxjs/toolkit';
import rootStore from './root-store/rootstore'; // Adjust the path as necessary

export const store = configureStore({
  reducer : rootStore
});
