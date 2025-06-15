import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(
          "https://nt-shopping-list.onrender.com/api/auth",
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        setState(res.data);
        console.log(data.data, "profile");
      } catch (err) {
        console.error("Auth error", err);
      }
    })();
  }, []);

  const OnDelete = async () => {
    let res = await axios.delete(
      "https://nt-shopping-list.onrender.com/api/users",
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.status === 200) {
      localStorage.removeItem("token");
      navigate("/register");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 to-white p-6 flex flex-col justify-start items-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 flex justify-between items-center">
        <div className="flex items-center space-x-5">
          <FaUser className="text-5xl text-red-500 bg-red-100 p-2 rounded-full shadow-sm" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Your Profile
            </h1>
            <h2 className="text-lg font-semibold text-gray-700">
              {state?.name}
            </h2>
            <p className="text-gray-500">@{state?.username}</p>
          </div>
        </div>

        <button
          onClick={OnDelete}
          className="px-5 py-2 bg-red-500 text-white rounded-xl font-medium shadow hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Profile;
