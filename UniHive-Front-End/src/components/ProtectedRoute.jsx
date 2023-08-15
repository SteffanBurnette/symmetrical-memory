import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const userToken = useSelector((state) => state.auth.userToken);
  const navigate = useNavigate();

  if (userToken == null) {
    return (
      <div className="flex flex-col justify-center items-center h-screen ">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            Unauthorized Access
          </h1>
          <p className="mb-6 text-gray-500">
            You need to be logged in to view this content.
          </p>
          <NavLink
            to="/"
            className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </NavLink>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
