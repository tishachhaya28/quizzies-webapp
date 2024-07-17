import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { domain } from '../../configue';

const initialState = {
    isLoading : false,
    profileData : null,
    isError : false
}

export const fetchProfileData = createAsyncThunk('fetchProfileData', async () => {
    const response = await fetch(`${domain}/api/user-profile/profile`, {
        method : 'GET',
        headers : {
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NjRjNTc4ODFkNWIzYzczMjY1MzdiIn0sImlhdCI6MTcyMTIyNTE5M30.AasfSb2EdCIGuN7zStQAvcVTr-W0O_w7oUukzoebJ9U' 
        }
    });
    const jsonData = await response.json()
    return jsonData.data;
});

const profileSlice = createSlice({
    name : 'profile',
    initialState,
    //builder variable of extrareduer's arrow fn returns an initial value of state
    extraReducers : ( builder ) => {
        builder.addCase(fetchProfileData.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchProfileData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profileData = action.payload;
            state.isError = false;
        })
        .addCase(fetchProfileData.rejected, (state, action) => {
            console.log("Error" + action.payload);
            state.isError = true
        })
    }
})

export default profileSlice.reducer;