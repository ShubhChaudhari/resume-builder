import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  // show initials of name
  const getInitials = (name) => {
  if (!name) return "U";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

  return (
    <div className="flex items-center">
      {/* <img
        src={user?.profileImageUrl}
        alt=""
        className="w-11 h-11 bg-gray-300 rounded-full mr-3"
      /> */}
      <div className="w-11 h-11 rounded-full mr-3 bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-semibold">
    {getInitials(user?.name)}
  </div>

      <div>
        <div className="text-[15px] font-bold leading-3">
          {user?.name || ""}
        </div>

        <button
          className="text-purple-500 text-xs font-semibold cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;