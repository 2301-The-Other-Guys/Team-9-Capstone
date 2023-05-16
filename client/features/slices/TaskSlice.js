import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/
const TOKEN = "token";
/*
  THUNKS
*/
export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const token = window.localStorage.getItem(TOKEN);
  const { data } = await axios.get("/api/tasks", {
    headers: {
      authorization: token,
    },
  });
  return data;
});

export const fetchOptions = createAsyncThunk("fetchOptions", async () => {
  const { data } = await axios.get("/api/tasks/options");
  return data;
});

export const addTasks = createAsyncThunk("addTasks", async (props) => {
  const response = await axios.post("/api/tasks", props);
  return response.data;
});
export const updateTask = createAsyncThunk(
  "updateTask",
  async (updatedTask) => {
    const token = window.localStorage.getItem(TOKEN);
    console.log(updatedTask);
    const response = await axios.put(
      `/api/tasks/${updatedTask.id}`,
      updatedTask,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  }
);
export const deleteTask = createAsyncThunk("deleteTask", async (taskId) => {
  await axios.delete(`tasks/${taskId}`);
  return taskId;
});
/*
  SLICE
*/
export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    options: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        console.log("pending");
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        console.log("rejected", action.payload);
      })
      .addCase(addTasks.pending, (state) => {
        console.log("pending");
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        return state;
      })
      .addCase(addTasks.rejected, (state, action) => {
        console.log("rejected", action.payload);
      })
      .addCase(fetchOptions.pending, (state) => {
        console.log("pending");
      })
      .addCase(fetchOptions.fulfilled, (state, action) => {
        state.options = action.payload;
      })
      .addCase(fetchOptions.rejected, (state, action) => {
        console.log("rejected", action.payload);
      })
      .addCase(updateTask.pending, (state) => {
        console.log("pending");
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(deleteTask.pending, (state) => {
        console.log("pending");
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload;
        return state.tasks.filter((task) => task.id !== taskId);
      });
  },
});

export const selectTasks = (state) => state.tasks.tasks;
export const selectOptions = (state) => state.tasks.options;
export default taskSlice.reducer;
