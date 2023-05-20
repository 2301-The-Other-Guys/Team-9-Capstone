import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../slices/profileSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.me);
  const email = currentUser.email;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setProfileImageUrl(imageUrl);
  };

  const handleUpload = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      dispatch(updateProfile(file));
    }
  };
  //theme changing buttons
  const changeGradient = (newClassName) => {
    const backgroundDiv = document.getElementById("background-theme");
    if (backgroundDiv) {
      backgroundDiv.className = newClassName;
    }
  };
  return (
    <div className="flex flex-col min-h-screen md:px-10">
      <header className="flex justify-center items-center mt-10 mb-5">
        <h1 className="text-4xl text-white text-center underline">
          Profile Management
        </h1>
      </header>

      <main className="overflow-auto md:p-6 md:mt-5 md:w-1/2 m-1 max-h-81 md:mx-auto rounded-md shadow-darker bg-gray-800">
        <div className="flex justify-center">
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt="Profile Image"
              className="w-20 h-20 rounded-full m-5"
            />
          )}
        </div>

        <form encType="multipart/form-data" className="space-y-4">
          <div>
            <label
              htmlFor="profile-image"
              className="block text-lg font-medium text-white mb-2"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profile-image"
              name="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="bg-gray-600 mt-1 block w-full text-white rounded-md border-b-2 border-white outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-lg font-medium text-white">
              User Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-600 rounded-md border-b-2 border-white p-2 outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            />

            <label htmlFor="age" className="text-lg font-medium text-white">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="bg-gray-600 rounded-md border-b-2 border-white p-2 outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            />

            <button
              type="button"
              onClick={handleUpload}
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            >
              Upload
            </button>
          </div>
        </form>

        {currentUser.profileImageUrl && (
          <div className="flex justify-center mt-4">
            <img
              src={profileImageUrl}
              alt="Profile Image"
              className="w-16 h-16 rounded-full"
            />
          </div>
        )}
      </main>
      <div>
        <div
          id="background-theme"
          className="h-screen-viewport w-screen-viewport m-10"
        >
          {/* Content */}
        </div>
        <div className="flex justify-center mt-4 items-center m-5 grid gap-5 lg:grid-cols-4 md:grid-cols-2 ">
          <button
            onClick={() =>
              changeGradient("bg-gradient-to-r from-red-600 to-yellow-400")
            }
            className="bg-gradient-to-r from-red-600 to-yellow-400 hover:from-red-500 hover:to-yellow-300 text-white font-semibold py-2 px-4 rounded-md shadow-md border-2"
          >
            DEFAULT
          </button>
          <button
            onClick={() =>
              changeGradient("bg-gradient-to-t from-yellow-600 to-red-600")
            }
            className="bg-gradient-to-t from-yellow-600 to-red-600 hover:from-red-500 hover:to-yellow-300 text-white font-semibold py-2 px-4 rounded-md shadow-md border-2"
          >
            BURNING SUNRISE
          </button>

          <button
            onClick={() =>
              changeGradient(
                "bg-gradient-to-t from-blue-700 via-blue-800 to-gray-900"
              )
            }
            className="bg-gradient-to-t from-blue-700 via-blue-800 to-gray-900 hover:from-gray-900 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md border-2"
          >
            MIDNIGHT
          </button>
          <button
            onClick={() =>
              changeGradient(
                "bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r"
              )
            }
            className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r hover:from-gray-600 hover:to-gray-900 text-white font-semibold py-2 px-4 rounded-md shadow-md border-2"
          >
            SPACE
          </button>
          <button
            onClick={() =>
              changeGradient(
                "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600"
              )
            }
            className="bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 hover:from-violet-600 hover:to-gray-900 text-white font-semibold py-2 px-4 rounded-md shadow-md border-2"
          >
            SALEM
          </button>
          <button
            onClick={() =>
              changeGradient(
                "bg-gradient-to-b from-gray-900 via-green-800 to-green-600"
              )
            }
            className="bg-gradient-to-b from-gray-900 via-green-800 to-green-600 hover:from-green-600 hover:to-gray-900 text-white font-semibold py-2 px-4 rounded-md shadow-md border-2"
          >
            GREEN
          </button>
          <button
            onClick={() =>
              changeGradient(
                "bg-gradient-to-b from-gray-800 via-orange-800 to-orange-500"
              )
            }
            className="bg-gradient-to-b from-gray-900 via-orange-800 to-orange-500 hover:from-orange-500 hover:to-gray-900 text-white font-semibold py-2 px-4 rounded-md shadow-md border-2"
          >
            ORANGE
          </button>
          <button
            onClick={() =>
              changeGradient(
                "bg-gradient-to-b from-gray-800 via-red-800 to-red-600"
              )
            }
            className="bg-gradient-to-b from-gray-800 via-red-800 to-red-600 hover:from-red-600 hover:to-gray-900 text-white font-semibold py-2 px-4 rounded-md shadow-md border-2"
          >
            RED
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
