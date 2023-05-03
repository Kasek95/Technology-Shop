import {createSlice} from "@reduxjs/toolkit";



export const opinionSlice = createSlice({
    name: "opinions",
    initialState: {value : {opinions: []}},
    reducers: {
        getOpinions: (state, action) => {
            state.value = action.payload
        }
    }

})

export const {getOpinions} = opinionSlice.actions

export default opinionSlice.reducer;



