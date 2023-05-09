import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/

/*
  THUNKS
*/
// o: you don't want try catches usually in your thunks
export const fetchTasks = createAsyncThunk("fetchTasks", async (id) => {
  try {
    console.log(id);
    // o: you should not be passing the userId... remember you can retrieve it
    //  from the token on the backend
    const { data } = await axios.get("/api/tasks", { params: { userId: id } });
    console.log(data);
    return data;
  } catch (err) {
    next(err);
  }
});
export const addTasks = createAsyncThunk("addTasks", async (props) => {
  try {
    const response = await axios.post("/api/tasks", props);
    console.log(response.data);
    return response.data;
  } catch (err) {
    next(err);
  }
});
/*
  SLICE
*/
export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        console.log("pending");
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTasks.pending, (state) => {
        console.log("pending");
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.push(action.payload);
        return state;
      });
  },
});

export const selectTasks = (state) => state.tasks;

export default taskSlice.reducer;
