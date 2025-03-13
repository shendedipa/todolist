import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import moment from "moment"; // Import moment.js for date handling
import Navbar from "../navbar/Navbar";

function Today() {
  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    const todosCollectionRef = collection(db, "todos");

    const unsubscribe = onSnapshot(todosCollectionRef, (snapshot) => {
      const todayDate = moment().format("YYYY-MM-DD"); // Get today's date

      const tasks = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((todo) => todo.date === todayDate); // Filter tasks for today

      setTodayTasks(tasks);
    });

    return () => unsubscribe();
  }, []);

  const handleComplete = async (id) => {
    try {
      const todoDocRef = doc(db, "todos", id);
      await updateDoc(todoDocRef, { completed: true });

      // Optimistically update local state
      setTodayTasks((prev) => prev.filter((todo) => todo.id !== id));

      toast.success("Task marked as completed!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-lg w-2/3 max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">📅 Today's Tasks</h2>
          <ul>
            {todayTasks.length === 0 ? (
              <p className="text-gray-500">No tasks for today!</p>
            ) : (
              todayTasks.map((todo) => (
                <li
                  key={todo.id}
                  className="mb-4 flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow"
                >
                  <span className="text-gray-700 text-lg">{todo.text}</span>
                  <button
                    onClick={() => handleComplete(todo.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Complete
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Today;
