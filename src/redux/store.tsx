import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer,persistStore } from "redux-persist";
import studentReducer from './student/studentSlice'
import adminReducer from './admin/adminSlice'
import tutorReducer from "./tutor/tutorSlice";
const persistConfig = {
    key : 'root',
    storage,
    // whitelist: ['student', 'admin', 'tutor'],
}

const persistedStudentReducer = persistReducer(persistConfig,studentReducer)
const persistedAdminReducer = persistReducer(persistConfig, adminReducer) 
const persistedTutorReducer = persistReducer(persistConfig, tutorReducer) 
export const store = configureStore({
    reducer : {
        student : persistedStudentReducer,
        admin : persistedAdminReducer,
        tutor : persistedTutorReducer
    }
 })

 export const persistor = persistStore(store)