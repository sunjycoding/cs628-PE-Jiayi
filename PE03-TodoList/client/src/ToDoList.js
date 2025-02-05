import React, { useState } from 'react';
import ToDoTask from './ToDoTask';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    const handleAddTask = () => {
        if (taskInput.trim() !== '') {
            setTasks([...tasks, taskInput]);
            setTaskInput('');  // Clear the input after adding a task
        }
    };

    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div>
            <h1>ToDo List App</h1>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter task description"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <div>
                {tasks.map((task, index) => (
                    <ToDoTask
                        key={index}
                        task={task}
                        onDelete={() => handleDeleteTask(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ToDoList;
