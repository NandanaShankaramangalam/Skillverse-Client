import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    studUsername : '',
    studEmail: '',
    selectedCategory : '',
    selectedCourseId : '',
    studId : '',
}

const studentSlice = createSlice({
    name : 'student',
    initialState : INITIAL_STATE,
    reducers : {
        studentLogged : (state,action)=>{
            state.studUsername = action.payload.studUsername
            state.studEmail = action.payload.studEmail
            state.selectedCategory = action.payload.selectedCategory
            state.selectedCourseId = action.payload.selectedCourseId
            state.studId = action.payload.studId
        }
    }
})

export const {studentLogged} = studentSlice.actions
export default studentSlice.reducer