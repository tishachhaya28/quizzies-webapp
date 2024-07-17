import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { domain } from '../../configue';

const initialState = {
    isLoading : false,
    categoriesData : null,
    isError : false
}

export const fetchCategoriesData = createAsyncThunk('fetchCategoriesData', async () => {
    const response = await fetch(`${domain}/api/quiz-category/get-quiz-categories`, {
        method : 'GET'
    });
    const jsonData = await response.json()
    return jsonData.data;
});

const categoriesSlice = createSlice({
    name : 'categories',
    initialState,
    //builder variable of extrareduer's arrow fn returns an initial value of state
    extraReducers : ( builder ) => {
        builder.addCase(fetchCategoriesData.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchCategoriesData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categoriesData = action.payload;
            state.isError = false;
        })
        .addCase(fetchCategoriesData.rejected, (state, action) => {
            console.log("Error" + action.payload);
            state.isError = true
        })
    }
})

export default categoriesSlice.reducer;