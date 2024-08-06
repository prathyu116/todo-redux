// service.js

import axios from "axios";

const baseURL = "http://localhost:3000/todos";

export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${baseURL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};

export const addTask = async (task) => {
    try {
        const response = await axios.post(`${baseURL}`, task);
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};
// export const addTask = (task) => {
//     return axios.post(`${baseURL}`, task)
//         .then(response => response.data)
//         .catch(error => {
//             console.error("Error adding task:", error);
//             throw error;
//         });
// };

export const deleteTask = async (taskId) => {
    try {
        const k =await axios.delete(`${baseURL}/${taskId}`);
        console.log(k)
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

export const fetchTaskById = async (taskId) => {
    try {
        const response = await axios.get(`${baseURL}/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
};

export const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await axios.put(`${baseURL}/${taskId}`, updatedTask);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};