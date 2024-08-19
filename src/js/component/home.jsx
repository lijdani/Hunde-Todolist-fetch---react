import React, { useState, useEffect } from 'react';
import '../../styles/index.css'; // Adjust the path as needed

const Home = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  return (
    <div className="app">
      <h1>My TODOs</h1>
      <input
        type="text"
        value={task}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Add a task and press Enter"
      />
      <ul>
        {tasks.length === 0 ? (
          <p id="noTasksMessage">No tasks, add a task</p>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button className="delete-button" onClick={() => handleDelete(index)}>
                <i className="fas fa-trash-alt"></i> {/* Font Awesome trashcan icon */}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
