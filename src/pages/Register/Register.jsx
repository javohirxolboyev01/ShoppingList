import axios from 'axios'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const Register = () => {
    const navigate = useNavigate();
 
  
  const onSubmit = async (e) => {
    e.preventDefault();
    let newUser = {
      name: e.target[0].value,
      username: e.target[1].value,
      password: e.target[2].value,
    };
    let res = await axios.post(
      "https://nt-shopping-list.onrender.com/api/users",
      newUser
    );
    localStorage.setItem("token", res.data.token);
    console.log(res);
    if (localStorage.getItem("token")) {
      return navigate("/");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 pt-10">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Create an account
    </h2>
  
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
          </div>
  
          <div>
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
            />
          </div>
  
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        <NavLink to="/login">SignIn</NavLink>
      </div>
    </div>
  </div>
  )
}

export default Register