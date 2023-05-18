import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../slices/profileSlice";

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

  return (
    <div className="flex flex-col min-h-screen px-10">
      <header className="flex justify-center items-center mt-10 mb-5">
        <h1 className="text-4xl text-white underline">Profile Management</h1>
      </header>

      <main className="overflow-auto p-6 mt-5 w-1/2 max-h-81 mx-auto rounded-md shadow-darker bg-blue-900">
        <div className="flex justify-center">
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt="Profile Image"
              className="w-16 h-16 rounded-full mb-4"
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
              className="bg-blue-900 mt-1 block w-full rounded-md border-b-2 border-white outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-lg font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-blue-900 rounded-md border-b-2 border-white p-2 outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            />

            <label htmlFor="age" className="text-lg font-medium text-white">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="bg-blue-900 rounded-md border-b-2 border-white p-2 outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            />

            <button
              type="button"
              onClick={handleUpload}
              className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
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
    </div>
  );
};
export default Profile;
