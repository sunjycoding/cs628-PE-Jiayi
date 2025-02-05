import React from 'react';

function ToDoTask({ task, onDelete }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', padding: '10px', background: '#f0f0f0' }}>
            {task}
            <button onClick={onDelete} style={{ color: 'white', backgroundColor: 'red' }}>Delete</button>
        </div>
    );
}

export default ToDoTask;
