import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

const Dashboards = () => {
  const [showGroups, setShowGroups] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [formData, setFormData] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    return navigator("/login");
  }

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://nt-shopping-list.onrender.com/api/groups",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      console.log("test:", res.data);

      if (Array.isArray(res.data)) {
        setGroupList(res.data);
      } else if (Array.isArray(res.data.res)) {
        setGroupList(res.data.res);
      } else {
        console.error("group:", res.data);
      }
    } catch (err) {
      console.error("eror:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://nt-shopping-list.onrender.com/api/groups",
        formData,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log("test", res.data);
      setFormData({ name: "", password: "" });
      fetchGroups();
    } catch (err) {
      console.error("err", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white border-r shadow-sm px-4 py-6">
        <div className="flex flex-col space-y-6">
          {/* Profile Link */}
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition ${
                isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            <FaUser size={18} />
            <span>Profil</span>
          </NavLink>

          {/* Group Section */}
          <div className="text-gray-700">
            <button
              onClick={() => setShowGroups((p) => !p)}
              className="flex items-center gap-2 text-sm font-medium hover:text-blue-600"
            >
              <FaUserGroup size={18} />
              Guruhlar
            </button>

            {showGroups && (
              <div className="ml-4 mt-3 space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-xs text-blue-500 hover:underline">
                      + Yangi guruh
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4 space-y-3">
                    <form onSubmit={handleSubmit}>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Guruh nomi"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <Input
                        type="password"
                        name="password"
                        placeholder="Parol"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <Button type="submit" className="w-full mt-2">
                        Yaratish
                      </Button>
                    </form>
                  </PopoverContent>
                </Popover>

                <div className="space-y-1">
                  {groupList.length > 0 ? (
                    groupList.map((group) => (
                      <NavLink
                        key={group._id}
                        to={`groups/${group._id}`}
                        className={({ isActive }) =>
                          `block text-sm pl-2 border-l-2 ${
                            isActive
                              ? "border-blue-500 text-blue-600 font-semibold"
                              : "border-transparent text-gray-600 hover:text-blue-500"
                          }`
                        }
                      >
                        {group.name}
                      </NavLink>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">Guruhlar yo'q</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboards;
