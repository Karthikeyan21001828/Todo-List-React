import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const editTask = (index) => {
        setIsEditing(true);
        setCurrentTaskIndex(index);
        setNewTask(tasks[index].text);
    };

    const updateTask = () => {
        const updatedTasks = tasks.map((task, index) => 
            index === currentTaskIndex ? { ...task, text: newTask } : task
        );
        setTasks(updatedTasks);
        setNewTask('');
        setIsEditing(false);
        setCurrentTaskIndex(null);
    };

    const removeTask = (index) => {
        const filteredTasks = tasks.filter((_, i) => i !== index);
        setTasks(filteredTasks);
    };

    const toggleCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <input 
                type="text" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                placeholder="Enter a task"
            />
            {isEditing ? (
                <button onClick={updateTask}>Update Task</button>
            ) : (
                <button onClick={addTask}>Add Task</button>
            )}
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? 'completed' : ''}>
                        <span onClick={() => toggleCompletion(index)}>{task.text}</span>
                        <button onClick={() => editTask(index)}>Edit</button>
                        <button onClick={() => removeTask(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
