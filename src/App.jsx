import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Signup from "./components/Sign/Signin"; // Adjust path if necessary
import Login from "./components/Login/Login";
import Todoo from "./components/Todo/Todo";
import TaskForm from "./components/Sidebar/AddTask";
import Completed from "./components/Sidebar/Completed";
import Today from "./components/Sidebar/Today";
import Tomorrow from "./components/Sidebar/Tomorrow";
import UpcomingTasks from "./components/Sidebar/Upcoming";
import SignOut from "./components/Sidebar/Signout";
import About from "./components/Sidebar/About";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./Privateroute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/todoo"
            element={
              <PrivateRoute>
                <Todoo />
              </PrivateRoute>
            }
          />
          <Route
            path="/addt"
            element={
              <PrivateRoute>
                <TaskForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/compl"
            element={
              <PrivateRoute>
                <Completed />
              </PrivateRoute>
            }
          />
          <Route
            path="/today"
            element={
              <PrivateRoute>
                <Today />
              </PrivateRoute>
            }
          />
          <Route
            path="/tom"
            element={
              <PrivateRoute>
                <Tomorrow />
              </PrivateRoute>
            }
          />
          <Route
            path="/upcoming"
            element={
              <PrivateRoute>
                <UpcomingTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/signout"
            element={
              <PrivateRoute>
                <SignOut />
              </PrivateRoute>
            }
          />
          <Route
            path="/abt"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
