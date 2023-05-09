import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../slices/TaskSlice";
import { selectTasks } from "../slices/TaskSlice";
/**
 * COMPONENT
 */
const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.me);
  const username = useSelector((state) => state.auth.me.username);
  const tasks = useSelector(selectTasks);
  const currentDate = new Date().toLocaleDateString();
  console.log("tasks", tasks);

  useEffect(() => {
    dispatch(fetchTasks(currentUser.id));
  }, []);

  return (
    <div>
      <span>
        <h3>Welcome, {username}</h3>
        <h3>{currentDate}</h3>
        <h3>Total Tasks Completed: </h3>
      </span>
      <div className="scroll-box">
        <ul>
          {/*
            o: change this to tasks.length > 0 to check if tasks exist
          */}
          {tasks ? (
            tasks.map((task) => {
              return <li key={task.id}>{task.title}</li>;
            })
          ) : (
            <li>No Tasks</li>
          )}
        </ul>
        <p>Scroll box content goes here</p>
      </div>
    </div>
  );
};

export default Home;
