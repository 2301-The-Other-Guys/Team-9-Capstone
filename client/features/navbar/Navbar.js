import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center justify-between h-full bg-blue-900 p-4">
    <nav>
      {isLoggedIn ? (
        <div>
          <Link
            to="/home"
            title="Home" 
            className="flex items-center justify-center w-20 h-20 mb-10 bg-white rounded-full transform hover:scale-110 transition-transform"
          >
            <img className="text-white w-10 h-10" src="home.png" />
          </Link>
          <Link
            to="/calendar"
            title="Calendar"
            className="flex items-center justify-center w-20 h-20 mb-10 bg-white rounded-full transform hover:scale-110 transition-transform"
          >
            <img className="text-white w-10 h-10" src="calendar.png" />
          </Link>
          <Link
            to="/newtasks"
            title="New Tasks"
            className="flex items-center justify-center w-20 h-20 mb-10 bg-white rounded-full transform hover:scale-110 transition-transform"
          >
            <img className="text-white w-10 h-10" src="add.png" />
          </Link>
          <Link
            to="/profile"
            title="Profile"
            className="flex items-center justify-center w-20 h-20 mb-10 bg-white rounded-full transform hover:scale-110 transition-transform"
          >
            <img className="text-white w-10 h-10" src="user.png" />
          </Link>
          <button
            type="button"
            title="Logout"
            onClick={logoutAndRedirectHome}
            className="flex items-center justify-center w-20 h-20 mb-10 bg-white rounded-full transform hover:scale-110 transition-transform"
          >
            <img className="text-white w-10 h-10" src="exit_480.png" />
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
  );
};

export default Navbar;
