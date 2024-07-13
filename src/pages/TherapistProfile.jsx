import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/user/userSlice";
import toast, { Toaster } from "react-hot-toast";
import SignUp_Page_img from "../../public/images/Signup.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { Oval } from 'react-loader-spinner';

const TherapistProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { loading, success, error } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(null);
  const [pronouns, setPronouns] = useState(user?.pronouns || "");
  const [dob, setDob] = useState({
    day: user?.dob?.split("-")[2] || "",
    month: user?.dob?.split("-")[1] || "",
    year: user?.dob?.split("-")[0] || "",
  });
  const [aboutMe, setAboutMe] = useState(user?.aboutme || "");

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dobFormatted = `${dob.year}-${dob.month}-${dob.day}`;

    dispatch(updateProfile({
      pronouns,
      dob: dobFormatted,
      aboutme: aboutMe,
      image: profileImage,
    }))
      .unwrap()
      .then(() => {
        console.log("Profile updated successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    if(success){
      navigate("/")
    }
    if (error) {
      toast.error(error.message || 'Failed to update profile. Please try again.');
      navigate("/profile")
    }
  }, [success, error]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-4xl gap-12 mt-32 w-full md:flex md:justify-center">
        <div className="md:w-1/2 md:order-1 mb-4 md:mb-0 p-4 h-1/2">
          <img src={SignUp_Page_img} alt="Signup Image" className="w-full" />
        </div>

        <div className="md:w-1/2 md:order-2 px-4 h-1/2">
          <h2 className="text-4xl font-bold mb-2" style={{ color: "#D3674A" }}>
            Let’s build your profile
          </h2>
          <p className="mb-8 font-semibold">Add the details about you</p>
          {loading && (
        <div className="loader-container">
          <Oval color="#00BFFF" height={80} width={80} />
        </div>
      )}

          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Upload your portrait
              </label>
              <div className="flex items-center">
                <div className="relative mr-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center">
                    {profileImage && (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="w-full border-2 border-dotted border-gray-400 p-4 rounded-lg relative">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleUpload}
                  />
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Upload
                    </button>
                    <span className="text-gray-500 ml-4">
                      or drag file here
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Supported file .jpg, .png, .svg. File size should be less than 5
                mb.
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Pronouns
              </label>
              <input
                type="text"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                placeholder="Your pronouns"
                className="border border-gray-400 p-2 rounded-lg w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Date of Birth
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={dob.day}
                  onChange={(e) => setDob({ ...dob, day: e.target.value })}
                  placeholder="DD"
                  className="border border-gray-400 p-2 rounded-lg w-1/3"
                />
                <input
                  type="text"
                  value={dob.month}
                  onChange={(e) => setDob({ ...dob, month: e.target.value })}
                  placeholder="MM"
                  className="border border-gray-400 p-2 rounded-lg w-1/3"
                />
                <input
                  type="text"
                  value={dob.year}
                  onChange={(e) => setDob({ ...dob, year: e.target.value })}
                  placeholder="YYYY"
                  className="border border-gray-400 p-2 rounded-lg w-1/3"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                About Me
              </label>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="A brief description about yourself"
                className="border border-gray-400 p-2 rounded-lg w-full"
              ></textarea>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
              >
                Save & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default TherapistProfile;
