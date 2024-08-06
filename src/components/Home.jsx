import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTasks, createTask, removeTask } from "../redux/tasksSlice";
import "./Home.css";

function Home() {
  const [taskInput, setTaskInput] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim()) {
      dispatch(createTask({ text: taskInput }));
      setTaskInput("");
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  return (
    <div className="containeri">
      <h3>TODO APP</h3>

      <div className="add-task">
        <input
          type="text"
          placeholder="What is the task today?"
          className="input"
          value={taskInput}
          onChange={handleInputChange}
        />
        <button className="button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p>Error fetching tasks: {error}</p>}

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <span>{task.text}</span>
            <div>
              <Link to={`/update/${task.id}`} className="button edit">
                <i className="fas fa-edit"></i>
              </Link>
              <button
                className="button delete"
                onClick={() => handleDeleteTask(task.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
