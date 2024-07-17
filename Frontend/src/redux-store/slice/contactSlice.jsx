import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { domain } from '../../configue';

const initialState = {
    isLoading : false,
    conatctData : null,
    isError : false
}

export const fetchContactData = createAsyncThunk('fetchContactData', async () => {
    const response = await fetch(`${domain}/api/contact/contact-info`, {
        method : 'GET'
    });
    const jsonData = await response.json()
    return jsonData.data;
});

const contactSlice = createSlice({
    name : 'contact',
    initialState,
    //builder variable of extrareduer's arrow fn returns an initial value of state
    extraReducers : ( builder ) => {
        builder.addCase(fetchContactData.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchContactData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.conatctData = action.payload;
            state.isError = false;
        })
        .addCase(fetchContactData.rejected, (state, action) => {
            console.log("Error" + action.payload);
            state.isError = true
        })
    }
})

export default contactSlice.reducer;