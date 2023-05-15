import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// o: is this file being used? ... if not remove
export const fetchSubTasks = createAsyncThunk("fetchSubTasks", async (id) => {
  try {
    console.log(id);
    const { data } = await axios.get("/api/subtasks", {
      params: { parentId: id },
    });
    console.log(data);
    return data;
  } catch (err) {
    next(err);
  }
});

export const addSubTasks = createAsyncThunk("addSubTasks", async (props) => {
  try {
    const response = await axios.post("/api/subtasks", props);
    console.log(response.data);
    return response.data;
  } catch (err) {
    next(err);
  }
});

export const subTaskSlice = createSlice({
  name: "subTasks",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubTasks.pending, (state) => {
        console.log("pending");
      })
      .addCase(fetchSubTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addSubTasks.pending, (state) => {
        console.log("pending");
      })
      .addCase(addSubTasks.fulfilled, (state, action) => {
        state.push(action.payload);
        return state;
      });
  },
});

export const selectSubTasks = (state) => state.tasks;

export default subTaskSlice.reducer;
