import {createSlice} from "@reduxjs/toolkit";

const initialState = {value : {user: null}}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
          state.value = action.payload
        },
        logout: () => initialState
    }
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer;