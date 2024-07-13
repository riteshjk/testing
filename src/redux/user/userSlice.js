import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialState = {
  user: null,
  otpStatus: "idle",
  error: null,
  loading: false,
  orderId: null,
  sessionToken: null,
  phonenumber: "",
};

export const sendOtp = createAsyncThunk(
  "user/sendOtp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://tbuddy-beta-env.eba-mbgj5krz.ap-south-1.elasticbeanstalk.com/api/v1/users/send-otp",
        userData
      );
      toast.success("OTP sent successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://tbuddy-beta-env.eba-mbgj5krz.ap-south-1.elasticbeanstalk.com/api/v1/users/verify-otp",
        otpData
      );
      toast.success("OTP verified successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

// Add this new thunk for profile update
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ pronouns, dob, aboutme, image }, { getState, rejectWithValue }) => {
    const { user } = getState().user;
    try {
      const formData = new FormData();
      formData.append('email', user.user.email); // Include email in form data
      formData.append('pronouns', pronouns);
      formData.append('dob', dob);
      formData.append('aboutme', aboutme);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post(
        'https://tbuddy-beta-env.eba-mbgj5krz.ap-south-1.elasticbeanstalk.com/api/v1/users/build-profile',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      toast.success('Profile updated successfully!');
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 413) {
        // Handle specific error for large image size
        toast.error('Image size is too large. Please upload a smaller image.');
      } else {
        // Handle other errors
        toast.error('Failed to update profile. Please try again.');
      }
      return 
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phonenumber = action.payload;
    },
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.otpStatus = "loading";
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otpStatus = "succeeded";
        state.orderId = action.payload.data.orderId;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.otpStatus = "failed";
        state.error = action.payload.message || action.error.message;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.otpStatus = "loading";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.otpStatus = "verified";
        state.sessionToken = action.payload.sessionToken;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpStatus = "failed";
        state.error = action.payload.message || action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const {
  setPhoneNumber,
  signInStart,
  signInSuccess,
  signInFailure,
  signoutSuccess,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
