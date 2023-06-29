import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { updateTask } from '../Redux/TodoSlice';
import toast, { Toaster } from 'react-hot-toast';
function ModalUpdate({task}) {
  const [show, setShow] = useState(false);
    const [editTask, setEditTask] = useState(task.name)
    const [editStatus, setEditStatus]= useState(task.status ? "Complete" : "Incomplete")
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toastUpdate = () => {
        toast.success('Update task success!', {
        position: 'top-center',
    });
    }

  return (
    <>
        <div className='toDoList__update'> 

                <Button variant="primary" onClick={handleShow}>
                    <i class="fa-solid fa-pen"></i>
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Task"
                            autoFocus
                            value={editTask}
                            onChange={(e) => setEditTask(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Status</Form.Label>
                    <select name="" id="" style={{ width: "100%" }} onChange={(e) => setEditStatus(e.target.value)}  value={editStatus}>
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
                    <Button variant="primary" onClick={ () => {
                            handleClose()
                            if(editStatus === "Complete"){
                                dispatch(updateTask(
                                    {
                                        id:task.id,
                                        name: editTask,
                                        status:true,
                                    }
                                ))
                                toastUpdate();
                                setEditStatus("Incomplete")
                            }else if(editStatus === "Incomplete" ){
                                dispatch(updateTask(
                                    {
                                        id: task.id,
                                        name: editTask,
                                        status : false,
                                    }
                                ))
                                toastUpdate();
                                setEditStatus("Complete")
                            }
                        }}>
                        Save
                    </Button>
                    </Modal.Footer>
                </Modal>
            <Toaster />
        </div>
    </>
  );
}

export default ModalUpdate;