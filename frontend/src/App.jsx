import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editDesc, setEditDesc] = useState('');

  const API_URL = 'https://mthreeproject-1.onrender.com/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    if (!newTask) return;
    try {
      const res = await axios.post(API_URL, { description: newTask });
      setTasks([...tasks, res.data]);
      setNewTask('');
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id) => {
    if (!editDesc) return;
    try {
      const res = await axios.put(`${API_URL}/${id}`, { description: editDesc });
      setTasks(tasks.map(t => t.id === id ? res.data : t));
      setEditingTask(null);
      setEditDesc('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1>Todo List</h1>
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task..."
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul className="task-list">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`task-item ${task.done ? 'completed' : ''}`}
            >
              {editingTask === task.id ? (
                <div className="edit-group">
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                  <button className="save" onClick={() => updateTask(task.id)}>
                    Save
                  </button>
                  <button className="cancel" onClick={() => setEditingTask(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="task-content">
                  <span>{task.description}</span>
                  <div className="button-group">
                    <button
                      className="edit"
                      onClick={() => { setEditingTask(task.id); setEditDesc(task.description); }}
                    >
                      Edit
                    </button>
                    <button className="delete" onClick={() => deleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;