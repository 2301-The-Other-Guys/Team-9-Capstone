import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { addTasks } from "../slices/TaskSlice";

const AddTask = () => {
  const dispatch = useDispatch("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  //using react datepicker to grab current date
  const [dueDate, setDueDate] = useState(new Date());

  //grabbing current user to attach userId to task
  const currentUser = useSelector((state) => state.auth.me);
  const userId = currentUser.id;

  const handleSubmit = async (e) => {
    await e.preventDefault();
    dispatch(addTasks({ title, description, dueDate, priority, userId }));
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
  };

  return (
    <div>
      <h1>add task here</h1>
      <form id="task-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DatePicker
          className="border rounded"
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
        />
        <label htmlFor="priority">Priority:</label>
        {/* o: you may want to think about retrieving this list from the backend (nice to have) */}
        <select
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddTask;
