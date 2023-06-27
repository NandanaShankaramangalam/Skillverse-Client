import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    tutUsername : '',
    tutEmail: '',

}

const tutorSlice = createSlice({
    name : 'tutor',
    initialState : INITIAL_STATE,
    reducers : {
        tutorLogged : (state,action)=>{
            state.tutUsername = action.payload.tutUsername
            state.tutEmail = action.payload.tutEmail
        }
    }
})

export const {tutorLogged} = tutorSlice.actions
export default tutorSlice.reducer