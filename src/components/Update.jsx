import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById, modifyTask } from "../redux/tasksSlice";
import "./Update.css";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.task);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getTaskById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (task) {
      setTaskText(task.text);
    }
  }, [task]);

  const handleUpdateTask = () => {
    if (taskText.trim()) {
      const updatedTask = { ...task, text: taskText };
      dispatch(modifyTask({ taskId: id, updatedTask }));
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="update-container">
      <h1>Edit Notes</h1>
      <textarea
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button className="update-btn" onClick={handleUpdateTask}>
        Update
      </button>
      <button className="cancel-btn" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}

export default Update;
