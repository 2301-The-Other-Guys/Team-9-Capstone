import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../slices/TaskSlice";
import { selectTasks } from "../slices/TaskSlice";
// import { subTaskSlice } from "../slices/SubTaskSlice";
import { updateTask } from "../slices/TaskSlice";
import profileSlice from "../slices/profileSlice";
/**
 * COMPONENT
 */
const Home = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.me.username);
  const avatarUrl = useSelector((state) => state.auth.me.avatarUrl);
  const tasks = useSelector(selectTasks);
  const currentDate = new Date().toLocaleDateString();
  const totalTasksCompleted = tasks.filter((task) => task.isCompleted === true);
  const [sortOption, setSortOption] = useState("");
  const [search, setSearch] = useState("");
  const topLevelTasks = tasks.filter(
    (task) => !task.parentId && !task.isCompleted
  );
  const [filteredTasks, setFilteredTasks] = useState(topLevelTasks);
  const getSubtasks = (taskId) => {
    return tasks.filter(
      (task) => task.parentId === taskId && !task.isCompleted
    );
  };

  useEffect(() => {
    const searchTasks = (tasks, searchTerm) => {
      const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      tasks.forEach((task) => {
        if (task.subtasks) {
          const filteredSubtasks = searchTasks(task.subtasks, searchTerm);
          filteredTasks.push(...filteredSubtasks);
        }
      });

      return filteredTasks.filter((task) => !task.isCompleted);
    };

    const updatedFilteredTasks = searchTasks(tasks, search);
    setFilteredTasks(updatedFilteredTasks);
  }, [search, tasks]);

  const handleUpdate = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...taskToUpdate, isCompleted: true };
    dispatch(updateTask(updatedTask));
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  console.log("tasks", tasks);

  return (
    <div className="flex flex-col h-screen  px-10">
      <header className="flex flex-col items-center mt-10 mb-5">
        <h1 className="text-2xl text-white underline">Welcome, {username}</h1>
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full my-4"
        />
        <h2 className="text-2xl text-white underline">{currentDate}</h2>
        <h3 className="text-2xl text-white underline">
          Total Tasks Completed: {totalTasksCompleted.length}
        </h3>
      </header>

      <main className="overflow-auto p-6 mt-5 w-1/2 max-h-80 mx-auto rounded-md shadow-darker bg-blue-900">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-grow">
            <input
              type="text"
              className="text-lg shadow rounded flex items-center justify-start p-2 border-b-2 border-white shadow-darker transition-colors"
              id="searchInput"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-4">
            <label
              htmlFor="Sort"
              className="block text-sm font-medium text-white"
            >
              Sort:
            </label>
            <div className="shadow-darker">
              <select
                id="Sort"
                name="Sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-lg bg-blue-900 mt-1 block rounded-md border-b-2 border-white outline-none shadow-darker"
              >
                <option>Sort</option>
                {/* Add your sort options here */}
              </select>
            </div>
          </div>
        </div>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              getSubtasks={getSubtasks}
              handleUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks</p>
        )}
      </main>
    </div>
  );
};

// Extracted TaskItem component
const TaskItem = ({ task, getSubtasks, handleUpdate }) => {
  const subtasks = getSubtasks(task.id);

  return (
    <ul className="list-none my-2 p-1">
      <li className="text-lg shadow- rounded flex items-center justify-start mb-2 p-2 border-b-2 border-white shadow-darker hover:bg-gray-500 transition-colors">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 rounded bg-gray-200 mr-4 shadow-darker"
          checked={task.isCompleted}
          onChange={() => handleUpdate(task.id)}
        />
        <span className="flex-1 text-white">{task.title}</span>
      </li>
      {subtasks.map((subtask) => (
        <li
          key={subtask.id}
          className="list-none text-center indent-2 text-sm ml-8"
        >
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-indigo-600 border border-gray-300 rounded transition duration-150 ease-in-out bg-gray-200 mr-2"
            checked={subtask.isCompleted}
            onChange={() => handleUpdate(subtask.id)}
          />
          {subtask.title}
        </li>
      ))}
    </ul>
  );
};

export default Home;
