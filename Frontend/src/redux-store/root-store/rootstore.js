import { combineReducers } from '@reduxjs/toolkit';
import homeSlice from '../slice/homeSlice'; // Adjust the path as necessary
import categoriesSlice from '../slice/categoriesSlice'; // Adjust the path as necessary
import contactSlice from '../slice/contactSlice';
import leadeboardSlice from '../slice/leadeboardSlice';
import profileSlice from '../slice/profileSlice';

const rootStore = combineReducers({
    home: homeSlice,
    category: categoriesSlice,
    contact : contactSlice,
    leaderBoard : leadeboardSlice,
    profile : profileSlice
});

export default rootStore;