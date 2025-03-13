// import React, { useState, useEffect } from "react";
// import { db } from "../../firebaseConfig";
// import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
// import { toast } from "react-toastify";

// function Completed() {
//   const [completedTodos, setCompletedTodos] = useState([]);

//   useEffect(() => {
//     const todosCollectionRef = collection(db, "todos");

//     const unsubscribe = onSnapshot(todosCollectionRef, (snapshot) => {
//       const completed = snapshot.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }))
//         .filter((todo) => todo.completed); // Fetch only completed tasks

//       setCompletedTodos(completed);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleUndoComplete = async (id) => {
//     try {
//       const todoDocRef = doc(db, "todos", id);
//       await updateDoc(todoDocRef, { completed: false });

//       // Optimistically update local state
//       setCompletedTodos((prev) => prev.filter((todo) => todo.id !== id));

//       toast.success("Task moved back to Incomplete!");
//     } catch (error) {
//       console.error("Error updating todo:", error);
//       toast.error("Failed to update task. Please try again.");
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-200 w-64">
//       <h2 className="text-xl font-bold mb-4">✅ Completed Tasks</h2>
//       <ul>
//         {completedTodos.length === 0 ? (
//           <p className="text-gray-500">No completed tasks yet.</p>
//         ) : (
//           completedTodos.map((todo) => (
//             <li
//               key={todo.id}
//               className="mb-2 flex items-center justify-between p-2 bg-white rounded shadow"
//             >
//               <span className="line-through text-gray-500">{todo.text}</span>
//               <button
//                 onClick={() => handleUndoComplete(todo.id)}
//                 className="bg-purple-600 text-white px-2 py-1 rounded"
//               >
//                 Undo
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// }

// export default Completed;

import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Navbar from "../navbar/Navbar";

function Completed() {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const todosCollectionRef = collection(db, "todos");

    const unsubscribe = onSnapshot(todosCollectionRef, (snapshot) => {
      const completed = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((todo) => todo.completed); // Fetch only completed tasks

      setCompletedTodos(completed);
    });

    return () => unsubscribe();
  }, []);

  const handleUndoComplete = async (id) => {
    try {
      const todoDocRef = doc(db, "todos", id);
      await updateDoc(todoDocRef, { completed: false });

      // Optimistically update local state
      setCompletedTodos((prev) => prev.filter((todo) => todo.id !== id));

      toast.success("Task moved back to Incomplete!");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-lg w-2/3 max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-8">✅ Completed Tasks</h2>
          <ul>
            {completedTodos.length === 0 ? (
              <p className="text-gray-500">No completed tasks yet.</p>
            ) : (
              completedTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="mb-4 flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow"
                >
                  <span className="line-through text-gray-600 text-lg">
                    {todo.text}
                  </span>
                  <button
                    onClick={() => handleUndoComplete(todo.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                  >
                    Undo
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

export default Completed;
