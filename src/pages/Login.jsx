import React, { useState } from "react";
import SignUp_Page_img from "../../public/images/Signup.jpg";
import google_logo from "../../public/images/google_logo.jpg";
import apple_logo from "../../public/images/apple_logo.png";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phonenumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({});
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleMobileNumberChange = (value) => {
    setPhoneNumber(value);
    setIsMobileValid(value && value.length >= 13); // Adjust length based on country code if needed
  };

  const handleEmailLogin = async () => {
    dispatch(signInStart());
    try {
      const response = await fetch(
        "https://tbuddy-beta-env.eba-mbgj5krz.ap-south-1.elasticbeanstalk.com/api/v1/users/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(signInSuccess(data));
        toast.success("Login successful!");
        navigate("/profile");
      } else {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error("Login failed. Please try again.");
    }
  };

  const handleMobileLogin = async () => {
    dispatch(signInStart());
    try {
      const response = await fetch(
        "https://tbuddy-beta-env.eba-mbgj5krz.ap-south-1.elasticbeanstalk.com/api/v1/users/sign-in-mobilenumber",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phonenumber }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(signInSuccess(data));
        toast.success("Login successful!");
        navigate("/profile");
      } else {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-4xl gap-12 mt-32 w-full md:flex md:justify-center">
        {/* Left Side (Image) */}
        <div className="md:w-1/2 md:order-1 mb-4 md:mb-0">
          <img src={SignUp_Page_img} alt="Signup Image" className="w-full" />
        </div>

        {/* Right Side (Form) */}
        <div className="md:w-1/2 md:order-2 px-4">
          <h2 className="text-4xl font-bold mb-2" style={{ color: "#D3674A" }}>
            Login to your account
          </h2>
          <p className="mb-8 font-semibold">Start from where you left</p>

          <form>
            {/* Email Input */}
            <div className="mb-4 mt-4">
              <label htmlFor="email" className="font-bold block mb-1">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password Input */}

            <div className="mb-8 mt-8">
              <label htmlFor="password" className="font-bold block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
              </div>
              {/* {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>} */}
            </div>

            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
              style={{ backgroundColor: "#D3674A" }}
              onClick={handleEmailLogin}
            >
              {`Login ${" >"}`}
            </button>
          </form>

          <div className="flex items-center justify-center mt-6">
            <hr className="my-2 w-1/3 border-gray-300" />
            <p className="mx-4">or</p>
            <hr className="my-2 w-1/3 border-gray-300" />
          </div>

          {/* Mobile Number Input */}
          <div className="mb-4">
            <label htmlFor="mobile" className="font-bold block mb-1">
              Mobile Number
            </label>
            <div className="flex">
              <PhoneInput
                defaultCountry="IN"
                placeholder="Enter your mobile number"
                value={phonenumber}
                onChange={handleMobileNumberChange}
                className="w-full px-3 py-2 border rounded-l-lg focus:outline-none focus:border-blue-500"
              />
              <button
                className={`w-24 px-4 py-2 flex text-white rounded-r-lg ml-2 ${
                  !isMobileValid && "cursor-not-allowed"
                }`}
                style={{
                  backgroundColor: isMobileValid ? "#D3674A" : "#A4A4A4",
                }}
                onClick={handleMobileLogin}
              >
                <span>Login</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <hr className="my-2 w-1/3 border-gray-300" />
            <p className="mx-4">or</p>
            <hr className="my-2 w-1/3 border-gray-300" />
          </div>

          {/* Sign Up with Google and Apple Buttons */}
          <div className="flex flex-col md:flex-row justify-center p-2">
            <button className="w-full md:w-1/2 text-sm text-gray-800 border py-2 rounded-lg mb-2 md:mb-0 md:mr-2 flex items-center justify-center">
              <img
                src={google_logo}
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              Sign Up with Google
            </button>
            <button className="w-full md:w-1/2 text-sm bg-black text-white border py-2 rounded-lg mb-2 md:mb-0 md:mr-2 flex items-center justify-center">
              <img src={apple_logo} alt="Apple Logo" className="w-5 h-5 mr-2" />
              Sign Up with Apple
            </button>
          </div>

          <p className="text-center text-sm ">
            Don't have an account?{" "}
            <Link to="/signup"  className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
