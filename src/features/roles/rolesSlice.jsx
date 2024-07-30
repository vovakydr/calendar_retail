import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//test url
//const URL = "/custom_web_template.html?object_id=7042022170616100721";
//prod url
const URL = "/custom_web_template.html?object_id=7054651845607447548";

export const fetchUserRoles = createAsyncThunk(
    "roles/fetchUserRoles",
    async(userId) => {
        const response = await fetch(`${URL}&user_id=${userId}`);
        const data = await response.json();
        if(!data.roles) {
            throw new Error('Failed to fetch user roles');
        }
        return data.roles;
    }
);

const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserRoles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserRoles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.roles = action.payload;
            })
            .addCase(fetchUserRoles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default rolesSlice.reducer;
