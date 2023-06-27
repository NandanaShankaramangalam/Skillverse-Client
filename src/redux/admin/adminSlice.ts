import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    admUsername : '',
}

 const adminSlice = createSlice({
    name : 'admin',
    initialState : INITIAL_STATE,
    reducers : {
        adminLogged : (state,action)=>{
            state.admUsername = action.payload.admUsername
        }
    }
})

export const {adminLogged} = adminSlice.actions
export default adminSlice.reducer