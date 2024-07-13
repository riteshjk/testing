import React, { useState } from "react";
import SignUp_Page_img from "../../public/images/Signup.jpg";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpMail = () => {
  const phonenumber = useSelector((state) => state.user.phonenumber);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-z0-9]+$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password } = formData;

    const newErrors = {
      email: "",
      username: "",
      password: "",
    };

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!validateUsername(username)) {
      newErrors.username = "Ensure the username is unique.";
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.username && !newErrors.password) {
      try {
        const response = await axios.post(
          "http://tbuddy-beta-env.eba-mbgj5krz.ap-south-1.elasticbeanstalk.com/api/v1/users/sign-up",
          { ...formData, phonenumber }
        );
        console.log(response); // Handle successful response
        toast.success(response.data.message);
        navigate("/login");
      } catch (err) {
        console.error(err.response); // Handle error response
        if (err.response.data.message === "Email already exists") {
          toast.error("Email already exists, you can login directly.");
        } else {
          toast.error(err.response.data.message);
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl gap-12 mt-32 w-full md:flex md:justify-center"
      >
        {/* Left Side (Image) */}
        <div className="md:w-1/2 md:order-1 mb-4 md:mb-0 p-4">
          <img src={SignUp_Page_img} alt="Signup Image" className="w-full" />
        </div>

        {/* Right Side (Form) */}
        <div className="md:w-1/2 md:order-2 px-4">
          <h2 className="text-4xl font-bold mb-2" style={{ color: "#D3674A" }}>
            Sign up with email
          </h2>
          <p className="mb-8 font-semibold">
            Fill your details to move forward
          </p>

          {/* Email Input */}
          <div className="mb-8 mt-8">
            <label htmlFor="email" className="font-bold block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Username Input */}
          <div className="mb-8 mt-8">
            <label htmlFor="username" className="font-bold block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your Username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
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
                value={formData.password}
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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Sign Up with Email Button */}
          <button
            type="submit"
            className="w-full mt-12 bg-blue-500 text-white py-2 rounded-lg"
            style={{ backgroundColor: "#D3674A" }}
          >
            {`Sign Up ${" >"}`}
          </button>

          {/* Already have an account? Login */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Log in
            </a>
          </p>
        </div>
      </form>
      <Toaster /> {/* Add Toaster component here */}
    </div>
  );
};

export default SignUpMail;