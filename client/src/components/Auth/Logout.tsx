import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">
          👋 Hey {user?.name || "User"} — Ready to Logout?
        </h2>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
