import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, fetchTaskById, updateTask } from '../services/Api';

export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
    const response = await fetchTasks();
    return response;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
    const response = await addTask(task);
    return response;
});

export const removeTask = createAsyncThunk('tasks/removeTask', async (taskId) => {
    await deleteTask(taskId);
    return taskId;
});

export const getTaskById = createAsyncThunk('tasks/getTaskById', async (taskId) => {
    const response = await fetchTaskById(taskId);
    return response;
});

export const modifyTask = createAsyncThunk('tasks/modifyTask', async ({ taskId, updatedTask }) => {
    const response = await updateTask(taskId, updatedTask);
    return response;
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        task: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            .addCase(getTaskById.fulfilled, (state, action) => {
                state.task = action.payload;
            })
            .addCase(modifyTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            });
    },
});

export default tasksSlice.reducer;
