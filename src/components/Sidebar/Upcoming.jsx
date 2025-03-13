import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { toast } from "react-toastify";
import Navbar from "../navbar/Navbar";

function UpcomingTasks() {
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const todosCollectionRef = collection(db, "todos");

    const unsubscribe = onSnapshot(todosCollectionRef, (snapshot) => {
      const dayAfterTomorrow = moment().add(2, "days").format("YYYY-MM-DD"); // Get day after tomorrow's date

      const tasks = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((todo) => todo.date >= dayAfterTomorrow); // Show tasks for the day after tomorrow and beyond

      setUpcomingTasks(tasks);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleComplete = async (id, completed) => {
    try {
      const todoDocRef = doc(db, "todos", id);
      await updateDoc(todoDocRef, { completed: !completed });

      setUpcomingTasks((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );

      toast.success("Task status updated!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-4 pt-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center text-pink-950">
            📅 Upcoming Tasks
          </h2>
          {upcomingTasks.length === 0 ? (
            <p className="text-gray-500 text-center">
              No upcoming tasks after tomorrow.
            </p>
          ) : (
            <ul>
              {upcomingTasks.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded mb-2"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      handleToggleComplete(todo.id, todo.completed)
                    }
                    className="mr-2"
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.text} - {moment(todo.date).format("MMM DD, YYYY")}
                  </span>
                  <button
                    onClick={() =>
                      handleToggleComplete(todo.id, todo.completed)
                    }
                    className={`px-3 py-1 rounded ${
                      todo.completed
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default UpcomingTasks;
