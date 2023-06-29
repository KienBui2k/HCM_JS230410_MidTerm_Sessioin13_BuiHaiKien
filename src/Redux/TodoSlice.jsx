import { randomId } from "@mieuteacher/meomeojs";
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:"ListToDo",
    initialState: [
    ],
    reducers:{
        addTask(state,action){
            return [...state,action.payload]
        },
        removeTask(state,action){
            return state.filter(task => task.id !== action.payload)
        },
        updateTask(state, action) {
            console.log("action tra ve updatetask", action.payload);
        return state.map((task) => {
            if (task.id === action.payload.id) {
            return {
                ...task,
                name: action.payload.name,
                status: action.payload.status,
            };
            } else {
            return task;
            }
        });
        },
        updateCheck(state, action){
           console.log("action tra ve updatecheck", action.payload);
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return {
                        ...task, 
                        status:action.payload.status
                    }
                }else {
                    return task
                }
            })
        },
        sortToOption(state,action){
            console.log("dieu kien loc :", action);
            if(action.payload === ""){
                return state
            }else if (action.payload === "Complete"){
                return state.filter((task) => state.status === false)
            } else {
                return state.filter((task) => state.status === true )
            }
        }
    }
    
})
const {actions, reducer} = todoSlice
export const {addTask, removeTask,updateTask,updateCheck,sortToOption} = actions
export default reducer;