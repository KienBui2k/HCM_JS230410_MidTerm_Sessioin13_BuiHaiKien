import React from 'react'
import { useSelector } from 'react-redux'
import ToDoItem from './ToDoItem'

export default function ListToDo(props) {
    const ListToDo = useSelector(state => state.ListToDo)
    function filterData(arrayData) {
      let result = []
      if(props.filterStatus === null || props.filterStatus === 'ALL'){
        result = arrayData
      }
      if(props.filterStatus === "true"){
        result = arrayData.filter(item => item.status === true)
      }
      if(props.filterStatus === "false") {
        result = arrayData.filter(item => item.status === false)
      }
      return result
    }
  return (
    <div className='list__todo'>
          <h1>List Task </h1>
          {ListToDo?.length > 0 ? (filterData(ListToDo).map((task) =>              
              <ToDoItem task={task} key={task.id}></ToDoItem>
            )) : (<div>No To List </div>)
          }          
    </div>
  )
}
