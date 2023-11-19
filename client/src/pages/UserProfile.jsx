import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";
import { toast } from "react-toastify";

const UserProfile = () => {
  const router = useNavigate();
  const { user, setUser } = useUserData();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return router("/login");

    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data?.user);
        } else {
          throw new Error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        toast.success("Logout successful");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error("Error logging out", error);
      toast.error("Error logging out");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {userData ? (
        <div className="bg-yellow-100 text-center w-full  md:w-96 px-2 py-2 shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4 text-black">
            {userData?.username}
          </h1>
          <p className="text-gray-600">{userData.email}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
