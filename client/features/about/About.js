import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-white underline align m-10">About Page</h1>
      <div className="m-5 grid gap-5 lg:grid-cols-4 md:grid-cols-2">
        <Link
          to="https://www.linkedin.com/in/rubintollinchi/"
          title="Profile"
          className="flex flex-col items-center justify-center w-40 h-40 mb-10 rounded-full transform hover:scale-110 transition-transform"
        >
          <img className="w-30 h-30" src="user.png" alt="User Icon" />
          <h3 className="text-white">Rubin Tollinchi</h3>
          <p className="text-white">Email: {email}</p>
        </Link>

        <Link
          to="https://www.linkedin.com/in/rodney-johnson-dwight/"
          title="Profile"
          className="flex flex-col items-center justify-center w-40 h-40 mb-10 rounded-full transform hover:scale-110 transition-transform"
        >
          <img className="w-30 h-30" src="user.png" alt="User Icon" />
          <h3 className="text-white">Rodney Johnson</h3>
          <p className="text-white">Email: {email}</p>
        </Link>
        <Link
          to="https://www.linkedin.com/in/emmanuel-lucero/"
          title="Profile"
          className="flex flex-col items-center justify-center w-40 h-40 mb-10 rounded-full transform hover:scale-110 transition-transform"
        >
          <img className="w-30 h-30" src="user.png" alt="User Icon" />
          <h3 className="text-white">Emmanuel Lucero</h3>
          <p className="text-white">Email: {email}</p>
        </Link>
        <Link
          to="https://www.linkedin.com/in/nicholas-treasure/"
          title="Profile"
          className="flex flex-col items-center justify-center w-40 h-40 mb-10 rounded-full transform hover:scale-110 transition-transform"
        >
          <img className="w-30 h-30" src="user.png" alt="User Icon" />
          <h3 className="text-white">Nicholas Treasure</h3>
          <p className="text-white">Email: {email}</p>
        </Link>
      </div>

      <div className="md:w-1/2 h-screen  rounded-md shadow-darker bg-gray-800 overflow-y-auto m-1 ">
        <div className="flex items-center justify-between mb-2 items-center m-5">
          <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full transform hover:scale-110 transition-transform flex-shrink-0">
            <img
              className="text-white w-6 h-6"
              src="home.png"
              alt="Home Icon"
            />
          </span>
          <p className="text-white m-5">
            This Home page is used to view all tasks and subtasks that you
            currently have. You can check off to complete them or if not
            applicable anymore the task can be deleted. There is also a daily
            motivational qoute at the top and your total tasks completed to keep
            you up on your game.
          </p>
        </div>
        <div className="flex items-center justify-between mb-2 items-center m-5">
          <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full transform hover:scale-110 transition-transform flex-shrink-0">
            <img className="w-6 h-6" src="calendar.png" alt="Calendar Icon" />
          </span>
          <p className="text-white m-5">
            Our calendar allows you to view all tasks and drag and drop to
            change the due dates and times. Whether you are using the monthly,
            weekly, or daily view, you can drag and drop your tasks to your
            heart's content.
          </p>
        </div>
        <div className="flex items-center justify-between mb-2 items-center m-5">
          <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full transform hover:scale-110 transition-transform flex-shrink-0">
            <img className="text-white w-6 h-6" src="add.png" alt="Add Icon" />
          </span>
          <p className="text-white m-5">
            Add a new task or subtask for a already created task. Can add a task
            name, due date, description and priority to help it stand out on
            your calendar. This new task can be added to a already created task
            if something is needed to be done/completed before the main task.
          </p>
        </div>
        <div className="flex items-center justify-between mb-2 items-center m-5">
          <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full transform hover:scale-110 transition-transform flex-shrink-0">
            <img
              className="text-white w-6 h-6"
              src="user.png"
              alt="User Icon"
            />
          </span>
          <p className="text-white m-5">
            Profile page allows you to personalize this To-Do Genie for you. Has
            multiple theme selections to choose from and caan upload your
            personal profile image.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
