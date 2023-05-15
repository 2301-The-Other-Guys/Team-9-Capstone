import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../slices/profileSlice";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    dispatch(setProfileImage(selectedImage));
    // Logic to upload the selected image goes here
    const data = new FormData();
  data.append('image', selectedImage);
  data.append('userId', user.id); // replace 'user.id' with the id of the user

  // o: change this to async / await
  axios.post('/api/users/upload-image', data)
    .then(response => {
      console.log('Image uploaded successfully');
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
  };

  return (
    <div>
      <form>
        <input
          type="file"
          id="profile-image"
          name="profile-image"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
      </form>
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected Profile" />
        </div>
      )}
    </div>
  );
};

export default Profile;
