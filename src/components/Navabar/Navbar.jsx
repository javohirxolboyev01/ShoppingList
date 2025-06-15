import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
  };
  return (
    <header className="bg-slate-900 shadow px-6 py-4 flex justify-between items-center ">
      <div className="text-xl font-bold text-white">Shopping</div>
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        Logout
      </button>
    </header>
  );
};

export default Navbar;
