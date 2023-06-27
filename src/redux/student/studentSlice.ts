import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    studUsername : '',
    studEmail: '',

}

const studentSlice = createSlice({
    name : 'student',
    initialState : INITIAL_STATE,
    reducers : {
        studentLogged : (state,action)=>{
            state.studUsername = action.payload.studUsername
            state.studEmail = action.payload.studEmail
        }
    }
})

export const {studentLogged} = studentSlice.actions
export default studentSlice.reducer