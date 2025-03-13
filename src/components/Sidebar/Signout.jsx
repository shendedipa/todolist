import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig"; // Adjust the import path as needed
import { signOut } from "firebase/auth";

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page after sign-out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Sign Out</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
        <button
          onClick={handleSignOut}
          className="w-full bg-purple-600 text-white py-2 rounded-lg shadow-md text-lg font-semibold transition duration-300 hover:bg-purple-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SignOut;
