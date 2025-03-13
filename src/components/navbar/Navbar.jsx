import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  return (
    <nav className="flex justify-between sticky top-0   bg-slate-700  text-white py-2">
      <Sidebar />
      {/* <div class="flex items-center flex-1"> */}
      {/* <div className="logo"> */}
      <span className="text-left font-bold text-xl mx-9  ">iTask</span>
      {/* </div> */}

      {/* <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all duration-500">
          Home
        </li>
        <li className="cursor-pointer hover:font-bold transition-all duration-600">
          Your Tasks
        </li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
