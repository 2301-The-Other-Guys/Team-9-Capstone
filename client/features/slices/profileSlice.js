import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (avatarFile) => {
    const token = window.localStorage.getItem(TOKEN);
    const formData = new FormData();
    formData.append("file", avatarFile);
    console.log("FILE", avatarFile);
    // const file = formData.get("file");
    // console.log("File", file);
    const response = await axios.put(`/api/users/uploadImage`, formData, {
      headers: {
        authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);
export const fetchUserImage = createAsyncThunk("fetchUserImage", async () => {
  const token = window.localStorage.getItem(TOKEN);
  const { data } = await axios.get("/api/users", {
    headers: {
      authorization: token,
    },
  });
  return data;
});

const profileSlice = createSlice({
  name: "profile",
  initialState: { profileImageUrl: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        console.log("pending");
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log(action.payload);
        state.profileImageUrl = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        console.log("rejected", action);
      })
      .addCase(fetchUserImage.pending, (state) => {
        console.log("pending");
      })
      .addCase(fetchUserImage.fulfilled, (state, action) => {
        console.log(action.payload);
        state.profileImageUrl = action.payload;
      })
      .addCase(fetchUserImage.rejected, (state, action) => {
        console.log("rejected", action);
      });
  },
});

// Export the reducer and actions
// export const { selectProfileImageUrl } = (state) => profileSlice.actions;
// Define the selector to retrieve the profile image
// export const { setProfileImageUrl, setEmail } = profileSlice.actions;
export const selectProfileImageUrl = (state) => state.profile.profileImageUrl;

// Export the profile reducer
export default profileSlice.reducer;
