import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../slices/TaskSlice";
import { selectTasks } from "../slices/TaskSlice";
// import { subTaskSlice } from "../slices/SubTaskSlice";
import { updateTask } from "../slices/TaskSlice";
/**
 * COMPONENT
 */
const Home = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.me.username);
  const tasks = useSelector(selectTasks);
  const currentDate = new Date().toLocaleDateString();
  const totalTasksCompleted = tasks.filter((task) => task.isCompleted === true);
  const topLevelTasks = tasks.filter(
    (task) => !task.parentId && !task.isCompleted
  );
  const getSubtasks = (taskId) => {
    return tasks.filter(
      (task) => task.parentId === taskId && !task.isCompleted
    );
  };
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
    <div className="flex self-center">
      <span>
        <h3 className="self-center">Welcome, {username}</h3>
        <h3 className="self-center">{currentDate}</h3>
        <h3 className="self-center">
          Total Tasks Completed: {totalTasksCompleted.length}{" "}
        </h3>
      </span>
      <div className="self-center">
        {topLevelTasks.length > 0 ? (
          topLevelTasks.map((task) => {
            const subtasks = getSubtasks(task.id);
            return (
              <ul key={task.id} className="list-decimal">
                <li>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 border border-gray-300 rounded transition duration-150 ease-in-out bg-gray-200"
                    checked={task.isCompleted}
                    onChange={() => {
                      handleUpdate(task.id);
                    }}
                  />
                  {task.title}
                </li>
                {subtasks.length > 0 &&
                  subtasks.map((subtask) => (
                    <li key={subtask.id} className="list-none">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 border border-gray-300 rounded transition duration-150 ease-in-out bg-gray-200"
                        checked={task.isCompleted}
                        onChange={() => {
                          handleUpdate(task.id);
                        }}
                      />
                      {subtask.title}
                    </li>
                  ))}
              </ul>
            );
          })
        ) : (
          <p>No tasks</p>
        )}
      </div>
    </div>
  );
};

export default Home;
