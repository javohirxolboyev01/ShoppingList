import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Group = () => {
  const { _id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    if (_id) {
      axios
        .get(`https://nt-shopping-list.onrender.com/api/groups`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "content-type": "application/json",
          },
        })
        .then((res) => {
          const allGroups = res.data;
          const foundGroup = allGroups.find((g) => g._id === _id);
          setGroup(foundGroup);
        })
        .catch((err) => {
          console.error("Xatolik:", err);
        });
    }
  }, [_id]);

  console.log("Group ID (from URL):", _id);

  if (!group) {
    return (
      <div className="p-6 text-center text-gray-500">
        Guruh topilmadi yoki yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      {/* Guruh avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
          {group.name?.charAt(0).toUpperCase()}
        </div>

        {/* Guruh nomi va a'zolar soni */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{group.name}</h1>
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <FaUsers className="text-gray-500" />
            <span>{group.members?.length || 0} ta a'zo</span>
          </div>
        </div>
      </div>

      {/* Qo‘shimcha info */}
      <div className="mt-6 text-sm text-gray-700 space-y-2">
        {group.description && (
          <p>
            <span className="font-semibold">Tavsif:</span> {group.description}
          </p>
        )}
        {group.createdAt && (
          <p>
            <span className="font-semibold">Yaratilgan:</span>{" "}
            {new Date(group.createdAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Group;
