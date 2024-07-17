import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { domain } from '../../configue';

const initialState = {
    isLoading : false,
    leaderBoardData : null,
    isError : false
}

export const fetchLeaderBoardData = createAsyncThunk('fetchLeaderBoardData', async () => {
    const response = await fetch(`${domain}/api/ldr-brd/leader-board`, {
        method : 'GET'
    });
    const jsonData = await response.json()
    return jsonData.data;
});

const leaderBoardSlice = createSlice({
    name : 'leader-board',
    initialState,
    //builder variable of extrareduer's arrow fn returns an initial value of state
    extraReducers : ( builder ) => {
        builder.addCase(fetchLeaderBoardData.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchLeaderBoardData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.leaderBoardData = action.payload;
            state.isError = false;
        })
        .addCase(fetchLeaderBoardData.rejected, (state, action) => {
            console.log("Error" + action.payload);
            state.isError = true
        })
    }
})

export default leaderBoardSlice.reducer;