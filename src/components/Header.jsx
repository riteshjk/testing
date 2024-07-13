import React from "react";
import websiteLogo from "../../public/images/new_webiste_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import {signoutSuccess, resetUser} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = async() =>{
    try {
      const res = await fetch("http://tbuddy-beta-env.eba-mbgj5krz.ap-south-1.elasticbeanstalk.com/api/v1/users/sign-out", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        console.log(data.message);
        
      } else {
        toast.success(data.message);
        dispatch(signoutSuccess());
        dispatch(resetUser());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const handleClick =() =>{
    navigate("/")
  }

  return (
    <div className="bg-cover bg-center w-full bg-fixed fixed z-50 ">
      <header
        className="text-white h-26 flex justify-between items-center p-5  w-full top-0 z-50"
        style={{ backgroundColor: "#E1D3B8" }}
      >
        {/* Logo */}
        <div onClick={handleClick} className="flex items-center gap-2">
          <div >
            <img
              className={`w-20 transition-transform duration-300 `}
              src={websiteLogo}
              alt="Buddy Up Logo"
            />
          </div>
        </div>

        <div className="hidden md:block">
          <p className="text-lg font-bold" style={{ color: "#D3674A" }}>
            support@therapybuddy.io
          </p>
          <p className="text-lg font-bold" style={{ color: "#D3674A" }}>
            +91-70057-06432
          </p>
        </div>
        {
          user ? (
            <Dropdown className="text-black bg-gray-100" arrowIcon={false} inline label={<Avatar className="w-16 h-16" img={user?.user?.image} rounded={true}/>}>

                <Dropdown.Header>
                  <span className="block text-sm text-black">@{user?.user?.username}</span>
                  <span className="block text-sm text-black font-medium truncate">@{user?.user?.email}</span>
                </Dropdown.Header>
                
                  <Link to="/profile">
                    <Dropdown.Item className="text-black">Profile</Dropdown.Item>
                  </Link>
                
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut} className="cursor-pointer text-black">Sign Out</Dropdown.Item>
              </Dropdown>
          ) : (
            <Link to="/login"><Button outline className="cursor-pointer text-black">Sign In</Button></Link>
          )
        }
        <FontAwesomeIcon
          icon={faBars}
          className="block md:hidden text-2xl cursor-pointer transition-transform duration-300 hover:scale-125"
          onClick={toggleMenu}
        />
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute h-26 left-0 w-full bg-black p-5 flex flex-col items-center md:hidden"
          style={{ zIndex: 49 }}
        >
          <div>
            <p className="text-lg font-bold" style={{ color: "#D3674A" }}>
              +91-70057-06432
            </p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-bold" style={{ color: "#D3674A" }}>
              support@therapybuddy.io
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;