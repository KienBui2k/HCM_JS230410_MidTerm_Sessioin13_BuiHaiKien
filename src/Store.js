import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../src/Redux/TodoSlice"
const store = configureStore({
    reducer: {
        ListToDo: todoSlice
    }
})
export default store