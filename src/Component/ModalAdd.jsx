import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addTask, sortToOption } from '../Redux/TodoSlice';
import { randomId } from "@mieuteacher/meomeojs";
import toast, { Toaster } from 'react-hot-toast';
function NewModal(props) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [task, setTask] = useState("")
    const [status, setStatus] = useState("Incomplete")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toastAdd = (text) => {
        toast.success(text, {
        position: 'top-center',
    });
  };
      const toastAddError = (text) => {
        toast.error(text, {
        position: 'top-center',
    });
  };
function getCurrentTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    var currentTime = hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm + " " + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    return currentTime;
  }

  return (
    <>
        <div className='toDoList__container'> 
            <div className='toDoList__title'> 
                 <h1>ToDo List</h1>
            </div>
            <div className='toDoList__content'>
                <div className='toDoList__modal'> 
                <Button variant="primary" onClick={handleShow}>
                    Add ToDo List
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task"
                            autoFocus
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Status</Form.Label>
                    <select name="" id="" style={{ width: "100%" }} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Incomplete">Incomplete</option>
                        <option value="Complete">Complete</option>
                    </select>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick = { () => {
                        handleClose()
                        if (task !== ""){ 
                        if(status === "Complete"){
                           dispatch(addTask(
                                {
                                    id:randomId(),
                                    name:task,
                                    date:getCurrentTime(),
                                    status: true,
                                }))
                            setStatus("Incomplete") 
                            setTask("")
                            toastAdd('Add task success!')
                        }else if (status === "Incomplete"){
                            dispatch(addTask(
                                {
                                    id:randomId(),
                                    name:task,
                                    date:getCurrentTime(),
                                    status:false
                                }))
                            setTask("")
                            setStatus("Complete") 
                            toastAdd('Add task success!')
                        }
                         } else {
                            toastAddError("Add task falied!")
                         }
                        
                    }
                  
                    }>
                        Add Todo
                    </Button>
                    </Modal.Footer>
                </Modal>
                  
                </div> 
                <div className='sort__opTion'>
                    <select onChange={(e) =>{
                            props.setFilterStatus(e.target.value)
                        }}>
                        <option value={null}>ALL</option>
                        <option value={false}>Incomplete</option>
                        <option value={true}>Complete</option>
                    </select>
                </div>
            </div> 
            <Toaster />
        </div>
    </>
  );
}

export default NewModal;