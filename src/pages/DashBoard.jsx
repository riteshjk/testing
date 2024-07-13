import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
          <Link to="/edit-profile" className="text-blue-500 hover:underline">
            Edit Profile
          </Link>
        </div>

        <div className="flex items-center mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex justify-center items-center overflow-hidden">
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-32 h-32 object-cover"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold text-gray-800">{user?.username || 'Username'}</h2>
            <p className="text-gray-600">{user?.email || 'Email'}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800">About Me</h3>
          <p className="text-gray-600">{user?.aboutme || 'No information provided'}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800">Pronouns</h3>
          <p className="text-gray-600">{user?.pronouns || 'Not specified'}</p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800">Date of Birth</h3>
          <p className="text-gray-600">{user?.dob || 'Not specified'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
