import { useState } from "react";
// import Navbar from "../navbar/Navbar";

// function TaskForm({ onClose }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("Priority 1");
//   const [date, setDate] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const taskData = { title, description, priority, date };
//     console.log("Task Submitted:", taskData);
//     alert("Task Added Successfully!");
//     setTitle("");
//     setDescription("");
//     setPriority("Priority 1");
//     setDate("");
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-16">
//         <h2 className="text-xl font-semibold mb-4">Add Task</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Title Input */}
//           <input
//             type="text"
//             placeholder="Title"
//             className="w-full p-2 border border-gray-300 rounded-md mb-3"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           {/* Description Input */}
//           <textarea
//             placeholder="Description"
//             className="w-full p-2 border border-gray-300 rounded-md mb-3"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>

//           {/* Priority Dropdown */}
//           <select
//             className="w-full p-2 border border-gray-300 rounded-md mb-3"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//           >
//             <option value="Priority 1">Priority 1</option>
//             <option value="Priority 2">Priority 2</option>
//             <option value="Priority 3">Priority 3</option>
//           </select>

//           {/* Date Picker */}
//           <input
//             type="date"
//             className="w-full p-2 border border-gray-300 rounded-md mb-4"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />

//           {/* Buttons */}
//           <div className="flex justify-end space-x-3">
//             <button
//               type="submit"
//               className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
//             >
//               Add
//             </button>
//             <button
//               type="button"
//               className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
//               onClick={onClose}
//             >
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default TaskForm;import { useState } from "react";
import Navbar from "../navbar/Navbar";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

function TaskForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Priority 1");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !date.trim()) {
      toast.warn("Please enter a title and date.");
      return;
    }

    const taskData = {
      text: title,
      description,
      priority,
      date,
      completed: false,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "todos"), taskData);
      toast.success("Task Added Successfully!");

      // Reset form fields
      setTitle("");
      setDescription("");
      setPriority("Priority 1");
      setDate("");

      if (onClose) onClose(); // Close the form if needed
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-16">
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <select
            className="w-full p-2 border border-gray-300 rounded-md mb-3"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Priority 1">Priority 1</option>
            <option value="Priority 2">Priority 2</option>
            <option value="Priority 3">Priority 3</option>
          </select>

          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              onClick={() => console.log("Task Added")}
            >
              Add
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
