import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-5xl text-center text-gray-900">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            About To-Do App
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our To-Do App is designed to simplify task management and boost
            productivity. Easily add, edit, and complete tasks with a
            user-friendly interface. Whether you're planning your day or
            managing a project, this app helps keep everything organized.
          </p>
          <div className="mt-6 space-y-3">
            <h3 className="text-xl font-semibold text-purple-700">
              ✨ Features ✨
            </h3>
            <ul className="text-gray-700 list-disc list-inside">
              <li>Easy task creation & completion</li>
              <li> Set due dates & reminders</li>
              <li> Organize tasks efficiently</li>
              <li> Secure authentication</li>
              <li>✅Mobile-friendly UI</li>
            </ul>
          </div>
          <div className="mt-6">
            <Link
              to="/todoo"
              className="px-6 py-2 text-lg font-semibold bg-purple-600 text-white rounded-lg shadow-md transition duration-300 hover:bg-purple-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
