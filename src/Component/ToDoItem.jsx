import React, { useEffect, useState } from 'react';
import ModalUpdate from './ModalUpdate';
import { useDispatch } from 'react-redux';
import { removeTask, updateCheck } from '../Redux/TodoSlice';
import toast, { Toaster } from 'react-hot-toast';
export default function ToDoItem({ task }) {
  
  const [isComplete, setIsComplete] = useState(task.status);
    const toastRemove = () => {
        toast.success('Remove task success!', {
        position: 'top-center',
    });
    }
    const toastSuccess = () => {
        toast.success('one more task completed!', {
        position: 'top-center',
    });
    }
  useEffect(() => {
    setIsComplete(task.status);
  }, [task.status]);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    const updatedTask = {
      id: task.id,
      name: task.name,
      status: !isComplete,
      date: task.date
    };
    toastSuccess();
    setIsComplete(!isComplete);
    dispatch(updateCheck(updatedTask));
  };

  const handleDelete = () => {
    dispatch(removeTask(task.id));
    toastRemove();
  };

  return (
    <div className='task__item__container'>
      <div className='task__item__detail'>
        <input
          type="checkbox"
          checked={isComplete}
          value={isComplete}
          onChange={handleCheckboxChange}
        />
        <div className='task__item__info'>
          <p style={isComplete ? { textDecoration: "line-through" } : {}}>{task.name}</p>
          <p>{task.date}</p>
        </div>
      </div>
      <div className='task__item_option'>
        <div className='task__delete__btn'>
          <i onClick={handleDelete} className="fa-solid fa-trash-can"></i>
        </div>
        <div className='task__edit__btn'>
          <ModalUpdate task={task} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
