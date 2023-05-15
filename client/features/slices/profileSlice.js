import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

export const ProfileImage = createAsyncThunk("profileImage", async (Image) => {
  const token = window.localStorage.getItem(TOKEN);
  console.log(Image);
  const response = await axios.put(`/api/users/${Image}`, uploadImage, {
    headers: {
      authorization: token,
    },
  });
  return response.data;
});
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileImageUrl: null,
    email: "",
  },
  reducers: {
    setProfileImageUrl: (state, action) => {
      state.profileImageUrl = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ProfileImage.pending, (state) => {
        console.log("pending");
      })
      .addCase(ProfileImage.fulfilled, (state, action) => {
        state.profileImageUrl = action;
      })
      .addCase(ProfileImage.rejected, (state, action) => {
        console.log("rejected", action.payload);
      });
  },
});

// Export the reducer and actions
// export const { selectProfileImageUrl } = (state) => profileSlice.actions;
// Define the selector to retrieve the profile image
export const { setProfileImageUrl, setEmail } = profileSlice.actions;
export const selectProfileImageUrl = (state) => state.profile.profileImageUrl;
export const selectEmail = (state) => state.profile.email;

// Export the profile reducer
export default profileSlice.reducer;