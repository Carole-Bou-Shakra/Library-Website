// eslint-disable-next-line no-unused-vars
import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa'; // Importing user icon

const NavBar = () => {
  return (
    <div className="py-4 bg-white/20 backdrop-blur-3xl  z-10 fixed w-full"> {/* Added fixed and z-10 classes */}
      <div className="container flex justify-between items-center">
        {/* logo section */}
        <div>
          <p className="text-4xl font-bold text-[white]">
            Bookish Bliss <span className="text-[white]">Library</span>
          </p>
        </div>
        {/* Menu section */}
        <div className="flex items-center justify-center gap-10">
          <ul className="flex gap-8">
            <li className="hover:text-[#66110a] uppercase text-[white] font-bold text-xl">Home</li>
            <li className="hover:text-[#66110a] uppercase text-[white] font-bold text-xl">About</li>
            <li className="hover:text-[#66110a] uppercase text-[white] font-bold text-xl">Menu</li>
            <li className="hover:text-[#66110a] uppercase text-[white] font-bold text-xl">Contact Us</li>
          </ul>
          {/* user icon */}
          <div className="ml-2 flex gap-4 items-center">
            <FaUserCircle className="w-8 h-8" /> {/* User icon from React Icons */}
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
