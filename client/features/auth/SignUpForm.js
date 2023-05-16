import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../../app/store";
/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const SignUpForm = ({ name = "signup", displayName = "signup" }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ email, username, password, method: formName }));
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-yellow-400 h-screen-viewport w-screen-viewport items-center min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {displayName}
          </h2>
        </div>
        <form
          className="mt-8 space-y-6 border border-white rounded p-4"
          onSubmit={handleSubmit}
          name={name}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-t-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm bg-white"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray-900 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm bg-white "
                placeholder="Email@mail.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500  focus:z-10 sm:text-sm bg-white "
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-gray text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {displayName}
            </button>
            <button className="text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                {" "}
                Login here{" "}
              </Link>
            </button>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
