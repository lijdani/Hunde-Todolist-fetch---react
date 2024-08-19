import React, { useState, useEffect } from 'react';
import '../../styles/index.css';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/user/lijdani')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.error('Expected an array but got:', data);
          setTodos([]);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const syncWithServer = (updatedTodos) => {
    fetch('https://playground.4geeks.com/todo/user/lijdani', {
      method: 'PUT',
      body: JSON.stringify(updatedTodos),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code = 200 or code = 400, etc.
        console.log(resp.text()); // Will try to return the exact result as a string
        return resp.json(); // Returns a promise that you can .then for results
      })
      .then((data) => {
        console.log(data); // Logs the exact object received from the server
        if (Array.isArray(data)) {
          setTodos(data); // Update state with the data received from the server
        }
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const addTask = () => {
    if (newTask.trim() === '') return; // Prevent adding empty tasks

    const updatedTodos = [...todos, { label: newTask, done: false }];

    // Optimistically update the UI
    setTodos(updatedTodos);

    // Sync with server
    syncWithServer(updatedTodos);

    // Clear the input field
    setNewTask('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const removeTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);

    // Update state
    setTodos(updatedTodos);

    // Sync with server
    syncWithServer(updatedTodos);
  };

  const cleanAllTasks = () => {
    // Clear the tasks on the front-end
    setTodos([]);

    // Sync with server by sending an empty array
    syncWithServer([]);
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyPress} // Detect "Enter" key press
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <button onClick={cleanAllTasks}>Clean All Tasks</button>
      <ul>
        {todos.map((task, index) => (
          <li key={index}>
            {task.label}
            <button onClick={() => removeTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
