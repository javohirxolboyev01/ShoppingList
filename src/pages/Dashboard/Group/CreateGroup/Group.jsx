import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Group = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  useEffect(() => {
    axios
      .get(`https://nt-shopping-list.onrender.com/api/groups`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setGroup(res.data.filter((group) => group?._id === groupId)[0]);
      });
  }, [groupId]);
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Group Details
      </h2>

      {!group ? (
        <p className="text-gray-500">Loading group info...</p>
      ) : (
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">ID:</span>
            <span className="text-sm text-gray-600">{group._id}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Name:</span>
            <span>{group.name}</span>
          </div>
          {group.description && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Description:</span>
              <span>{group.description}</span>
            </div>
          )}
          {group.createdAt && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Created At:</span>
              <span>{new Date(group.createdAt).toLocaleString()}</span>
            </div>
          )}
          {Array.isArray(group.members) && (
            <div className="flex justify-between">
              <span className="font-medium">Members:</span>
              <span>{group.members.length} ta</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Group;
ы;
