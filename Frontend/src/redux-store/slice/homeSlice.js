import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { domain } from '../../configue';
//To-Do : check the reducers and state and take explination from chat GPT
const initialState = {
    isLoading : false,
    homeData : null,
    isError : false
}

export const fetchHomeData = createAsyncThunk('fetchHomeData', async () => {
    const response = await fetch(`${domain}/api/home/home-info`, {
        method : 'GET'
    });
    const data = await response.json();
    return data.data
});

const homeSlice = createSlice({
    name : 'home',
    initialState,
    //builder variable of extrareduer's arrow fn returns an initial value of state
    extraReducers : ( builder ) => {
        builder.addCase(fetchHomeData.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchHomeData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.homeData = action.payload;
            state.isError = false;
        })
        .addCase(fetchHomeData.rejected, (state, action) => {
            console.log("Error" + action.payload);
            state.isError = true
        })
    }
})

export default homeSlice.reducer;