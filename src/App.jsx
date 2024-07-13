import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUpMail from "./components/SignUpMail";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import DashBoard from "./pages/DashBoard";
import TherapistProfile from "./pages/TherapistProfile";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-mail" element={<SignUpMail />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<TherapistProfile />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
