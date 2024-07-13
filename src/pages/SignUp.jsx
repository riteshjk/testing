import React, { useState, useEffect } from "react";
import SignUp_Page_img from "../../public/images/Signup.jpg";
import google_logo from "../../public/images/google_logo.jpg";
import apple_logo from "../../public/images/apple_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtp, setPhoneNumber } from "../redux/user/userSlice";
import { toast, Toaster } from "react-hot-toast";
import OTPInput from "otp-input-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const phonenumber = useSelector((state) => state.user.phonenumber);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otpStatus, error, orderId } = useSelector((state) => state.user);
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState(null);
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [otp, setOtp] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(300); // 300 seconds = 5 minutes

  const handleSendOtp = () => {
    if (phonenumber === mobile) {
      toast.success("Mobile number is already verified. You can sign up now.");
      return;
    }
    if (!fullname.trim()) {
      toast.error("Full name is required to send OTP.");
      return;
    }
    if (!mobile.trim()) {
      toast.error("Mobile number is required to send OTP.");
      return;
    }
    dispatch(sendOtp({ phonenumber: mobile, fullname }));
    dispatch(setPhoneNumber(mobile));
    setTimeRemaining(300); // Reset the timer to 5 minutes
  };

  const handleVerifyOtp = () => {
    dispatch(verifyOtp({ phonenumber: mobile, orderId, otp }));
    setOtp("");
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);
    console.log("OTP captured:", otp); // Debugging log
  };

  const handleMobileNumberChange = (value) => {
    setMobile(value);
    setIsMobileValid(value && value.length >= 13); // Adjust length based on country code if needed
  };

  useEffect(() => {
    if (otp.length === 4) {
      handleVerifyOtp();
    }
  }, [otp]);

  useEffect(() => {
    console.log("Mobile:", mobile);
    console.log("OrderId:", orderId);
    console.log("OTP:", otp);
    console.log("otpStatus", otpStatus);
  }, [mobile, orderId, otp, otpStatus]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSignUp = () => {
    if (otpStatus === "verified") {
      navigate("/signup-mail");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-4xl gap-12 mt-32 w-full md:flex md:justify-center">
        {/* Left Side (Image) */}
        <div className="md:w-1/2 md:order-1 mb-4 md:mb-0 p-4">
          <img src={SignUp_Page_img} alt="Signup Image" className="w-full" />
        </div>

        {/* Right Side (Form) */}
        <div className="md:w-1/2 md:order-2 px-4">
          <h2 className="text-4xl font-bold mb-2" style={{ color: "#D3674A" }}>
            Create your account
          </h2>
          <p className="mb-8 font-semibold">
            Fill your details to move forward
          </p>

          {/* Full Name Input */}
          <div className="mb-4 mt-4">
            <label htmlFor="fullname" className="font-bold block mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Mobile Number Input */}
          <div className="mb-4">
            <label htmlFor="mobile" className="font-bold block mb-1">
              Mobile Number
            </label>
            <div className="flex">
              <PhoneInput
                value={mobile}
                onChange={handleMobileNumberChange}
                defaultCountry="IN"
                placeholder="Enter your mobile number"
                className="w-full px-3 py-2 border rounded-l-lg focus:outline-none focus:border-blue-500"
              />
              <button
                className={`w-24 px-4 py-2 flex text-white rounded-r-lg ml-2 ${
                  !isMobileValid && "cursor-not-allowed"
                }`}
                style={{
                  backgroundColor: isMobileValid ? "#D3674A" : "#A4A4A4",
                }}
                onClick={handleSendOtp}
                disabled={!isMobileValid || otpStatus === "loading"}
              >
                <span>
                  {otpStatus === "loading" ? (
                    <CgSpinner size={20} className="animate-spin mx-4" />
                  ) : (
                    "Verify"
                  )}
                </span>
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Enter OTP Input */}
          <div className="mb-4">
            <label htmlFor="otp" className="font-bold block mb-1">
              Enter OTP
            </label>
            <div className="flex items-center justify-between">
              <OTPInput
                value={otp}
                onChange={handleOtpChange}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                secure
                inputStyles={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                }}
                className="otp-input"
              />

              {/* Resend Button */}
              <button
                className={`px-4 py-2 text-white rounded-lg ml-2 ${
                  timeRemaining > 0 && "cursor-not-allowed"
                }`}
                style={{ backgroundColor: "#D3674A" }}
                onClick={handleSendOtp}
                disabled={timeRemaining > 0 || otpStatus === "loading"}
              >
                Resend
              </button>
            </div>
            {
              otpStatus == "succeeded" && (
                <p className="text-sm mt-2 leading-5">
                {`We’ve sent an OTP to your mobile number ${mobile}`}
              </p>
              )
            }
           
            {otpStatus === "verified" && (
              <p className="text-green-500 text-sm mt-2 leading-5">
                Successfully verified mobile number
              </p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Timer Display */}
          {otpStatus === "succeeded" && (
            <div className="mb-4">
              <p className="font-bold block mb-1">
                Time Remaining: {formatTime(timeRemaining)}
              </p>
            </div>
          )}

          {/* Sign Up with Email Button */}
          <button
            className={`w-full bg-blue-500 text-white py-2 rounded-lg ${
              otpStatus !== "verified" ? "cursor-not-allowed" : ""
            }`}
            style={{ backgroundColor: "#D3674A" }}
            disabled={otpStatus !== "verified"}
            onClick={handleSignUp}
          >{`Sign Up with Mail ${" >"}`}</button>

          {/* Horizontal Line */}
          <div className="flex items-center justify-center">
            <hr className="my-6 w-1/3 border-gray-300" />
            <p className="mx-4">or</p>
            <hr className="my-6 w-1/3 border-gray-300" />
          </div>
          {/* Sign Up with Google and Apple Buttons */}
          <div className="flex flex-col md:flex-row justify-center p-2">
            <button
              className={`w-full md:w-1/2 text-sm text-gray-800 border py-2 rounded-lg mb-2 md:mb-0 md:mr-2 flex items-center justify-center ${
                otpStatus !== "verified" ? "cursor-not-allowed" : ""
              }`}
            >
              <img
                src={google_logo}
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              Sign Up with Google
            </button>
            <button
              className={`w-full md:w-1/2 text-sm text-gray-800 border py-2 rounded-lg flex items-center justify-center ${
                otpStatus !== "verified" ? "cursor-not-allowed" : ""
              }`}
            >
              <img src={apple_logo} alt="Apple Logo" className="w-5 h-5 mr-2" />
              Sign Up with Apple
            </button>
          </div>
          {/* Already have an account? Login */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login"  className="text-blue-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
      <Toaster /> {/* Add Toaster component here */}
    </div>
  );
};

export default SignUp;