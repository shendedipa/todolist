import React, { useState, useEffect } from "react"; // Import the upcoming task component

import { format } from "date-fns";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Navbar from "../navbar/Navbar";
import { db } from "../../firebaseConfig";
import UpcomingTasks from "../Sidebar/Upcoming";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todoo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newTodoDate, setNewTodoDate] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const todosCollectionRef = collection(db, "todos");

  //  Real-time Firestore listener - Avoids manual fetching
  useEffect(() => {
    const q = query(todosCollectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() === "" || newTodoDate.trim() === "") {
      toast.warn("Please enter both a todo and a date.");
      return;
    }
    try {
      const docRef = await addDoc(todosCollectionRef, {
        text: newTodo,
        date: newTodoDate,
        completed: false,
        createdAt: serverTimestamp(),
      });

      // ✅ Update local state instead of fetching again
      setTodos((prev) => [
        { id: docRef.id, text: newTodo, date: newTodoDate, completed: false },
        ...prev,
      ]);

      setNewTodo("");
      setNewTodoDate("");
      toast.success("Todo added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo. Please try again.");
    }
  };

  // const handleCompleteTodo = async (id, text, date) => {
  //   try {
  //     const todoDocRef = doc(db, "todos", id);
  //     const completedTodosCollectionRef = collection(db, "completedTodos");

  //     // Move the task to "Completed"
  //     await addDoc(completedTodosCollectionRef, {
  //       text,
  //       date,
  //       completed: true,
  //       createdAt: serverTimestamp(),
  //     });

  //     // Remove from the main todo list
  //     await deleteDoc(todoDocRef);

  //     // ✅ Optimistically remove from state
  //     setTodos((prev) => prev.filter((todo) => todo.id !== id));

  //     toast.success("Task marked as completed!");
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //     toast.error("Failed to mark as completed.");
  //   }
  // };

  const handleCompleteTodo = async (id) => {
    try {
      const todoDocRef = doc(db, "todos", id);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      await updateDoc(todoDocRef, {
        completed: !todos.find((t) => t.id === id).completed,
      });

      // ✅ Optimistically update local state
      setTodos(updatedTodos);

      toast.success("Todo status updated!");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo. Please try again.");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));

      // ✅ Update local state instead of fetching again
      setTodos((prev) => prev.filter((todo) => todo.id !== id));

      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo. Please try again.");
    }
  };

  const handleEditTodo = (id, text, date) => {
    setEditingTodoId(id);
    setEditText(text);
    setEditDate(date);
  };

  const handleUpdateTodo = async () => {
    if (!editingTodoId) return;

    try {
      const todoDocRef = doc(db, "todos", editingTodoId);
      await updateDoc(todoDocRef, { text: editText, date: editDate });

      // ✅ Update local state
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingTodoId
            ? { ...todo, text: editText, date: editDate }
            : todo
        )
      );

      setEditingTodoId(null);
      toast.success("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo. Please try again.");
    }
  };

  const handleFilterChange = (newFilter) => setFilter(newFilter);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">
            Purple Light Todo
          </h1>

          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Add a todo..."
              className="border rounded w-full p-2"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <input
              type="date"
              className="border rounded p-2"
              value={newTodoDate}
              onChange={(e) => setNewTodoDate(e.target.value)}
            />
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>

          <div className="flex space-x-2 mb-4">
            {["all", "completed", "incomplete"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded ${
                  filter === type ? "bg-purple-300" : "bg-gray-200"
                }`}
                onClick={() => handleFilterChange(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <ul>
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-2 bg-gray-100 rounded mb-2"
              >
                {editingTodoId === todo.id ? (
                  <>
                    <input
                      type="text"
                      className="border p-1 mr-2"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <input
                      type="date"
                      className="border p-1 mr-2"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                    />
                    <button
                      className="bg-purple-500 text-white px-3 py-1 rounded"
                      onClick={handleUpdateTodo}
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCompleteTodo(todo.id)}
                    />
                    <span
                      className={`ml-2 ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <span className="text-gray-600">
                      {format(new Date(todo.date), "MMM dd, yyyy")}
                    </span>
                    <button
                      onClick={() =>
                        handleEditTodo(todo.id, todo.text, todo.date)
                      }
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Todoo;
// import React, { useState, useEffect } from "react";
// import { ref, set, push, onValue, remove, update } from "firebase/database";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { db, auth } from "../../firebaseConfig";
// import { FaInbox, FaBars } from "react-icons/fa";
// import { MdToday, MdOutlineTaskAlt } from "react-icons/md";
// import { IoMdAddCircle } from "react-icons/io";
// import { IoTodayOutline, IoArrowBack } from "react-icons/io5";
// import { HiMiniCalendarDays } from "react-icons/hi2";
// import { CiBookmarkRemove } from "react-icons/ci";
// import { useNavigate } from "react-router-dom";

// const TodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [user, setUser] = useState(null);
//   const [showInputContainer, setShowInputContainer] = useState(false);
//   const [inputFields, setInputFields] = useState({
//     title: "",
//     description: "",
//     priority: "Priority 1",
//     date: "",
//   });
//   const [filter, setFilter] = useState("Inbox");
//   const [priorityFilter, setPriorityFilter] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const unLogin = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         navigate("/");
//       }
//     });

//     return () => unLogin();
//   }, [navigate]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         fetchTodos(currentUser.uid);
//       } else {
//         setUser(null);
//         setTodos([]);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const fetchTodos = (userId) => {
//     const todosRef = ref(db, `todos/${userId}`);
//     onValue(todosRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const loadedTodos = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setTodos(loadedTodos);
//       } else {
//         setTodos([]);
//       }
//     });
//   };

//   const handleAddTodo = () => {
//     if (!inputFields.title.trim()) return;

//     const userId = user.uid;
//     const todosRef = ref(db, `todos/${userId}`);
//     const newTodoRef = push(todosRef);
//     set(newTodoRef, {
//       ...inputFields,
//       completed: false,
//       comments: [],
//     });
//     setInputFields({
//       title: "",
//       description: "",
//       priority: "Priority 1",
//       date: "",
//     });
//     setShowInputContainer(false);
//     if (isSidebarOpen === true) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleDeleteTodo = (id) => {
//     const userId = user.uid;
//     const todoRef = ref(db, `todos/${userId}/${id}`);
//     remove(todoRef);
//   };

//   const handleEditTodo = (id) => {
//     const todo = todos.find((t) => t.id === id);
//     setInputFields({
//       title: todo.title,
//       description: todo.description,
//       priority: todo.priority,
//       date: todo.date,
//     });
//     setShowInputContainer(true);
//     handleDeleteTodo(id); // Remove old entry before editing
//   };

//   const handleToggleComplete = (id) => {
//     const userId = user.uid;
//     const todoRef = ref(db, `todos/${userId}/${id}`);
//     const todo = todos.find((t) => t.id === id);
//     update(todoRef, { completed: !todo.completed });
//   };

//   const handleAddComment = (id, comment) => {
//     if (!comment || !comment.trim()) return;

//     const userId = user.uid;
//     const todoRef = ref(db, `todos/${userId}/${id}/comments`);
//     const newCommentRef = push(todoRef);
//     set(newCommentRef, comment);
//   };

//   const handleDeleteComment = (todoId, commentId) => {
//     const userId = user.uid;
//     const commentRef = ref(
//       db,
//       `todos/${userId}/${todoId}/comments/${commentId}`
//     );
//     remove(commentRef);
//   };

//   const filteredTodos = todos
//     .filter((todo) => {
//       const today = new Date().toISOString().split("T")[0];
//       const tomorrow = new Date(Date.now() + 86400000)
//         .toISOString()
//         .split("T")[0];
//       if (filter === "Inbox") return !todo.completed;
//       if (filter === "Completed") return todo.completed;
//       if (filter === "Today") return !todo.completed && todo.date === today;
//       if (filter === "Tomorrow")
//         return !todo.completed && todo.date === tomorrow;
//       if (filter === "Upcoming") {
//         if (selectedDate) {
//           return todo.date === selectedDate;
//         }
//         return todo.date > tomorrow;
//       }
//       return true;
//     })
//     .filter((todo) =>
//       priorityFilter ? todo.priority === priorityFilter : true
//     );

//   const searchedTasks = filteredTodos.filter((todo) =>
//     todo.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleFilterClick = (filterName) => {
//     setFilter(filterName);
//     setIsSidebarOpen(false);
//   };

//   const onBackBtn = () => {
//     navigate(-1);
//   };

//   const onLogoutTodo = async () => {
//     try {
//       await signOut(auth);
//       navigate("/");
//     } catch (error) {
//       alert("Error signing out");
//     }
//   };

//   return (
//     <div className="h-screen bg-gray-200">
//       <div className="flex flex-row h-screen overflow-hidden md:flex-row">
//         {/* Mobile Toggle Button */}
//         <button
//           className="absolute top-2 left-2 z-50 block md:hidden p-2 bg-purple-600 text-white rounded"
//           onClick={toggleSidebar}
//         >
//           <FaBars />
//         </button>

//         {/* Sidebar */}
//         <div
//           className={`fixed md:relative top-0 left-0 z-40 h-full w-full md:w-1/5 min-w-60 bg-gray-50 p-6 transition-transform duration-300 ease-in-out
//             ${
//               isSidebarOpen
//                 ? "translate-x-0"
//                 : "-translate-x-full md:translate-x-0"
//             }`}
//         >
//           {/* User Profile */}
//           <div className="flex items-center mb-6">
//             <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
//             <div className="ml-3 font-medium">Guest</div>
//           </div>

//           {/* Add Task Button */}
//           <button
//             onClick={() => setShowInputContainer(true)}
//             className="flex items-center py-2 px-4 mb-4 w-full rounded hover:bg-gray-100"
//           >
//             <IoMdAddCircle className="text-purple-600 text-xl mr-2" />
//             Add task
//           </button>

//           {/* Search Box */}
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Search by title"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
//             />
//           </div>

//           {/* Navigation Options */}
//           <div className="space-y-1 mb-6">
//             <button
//               onClick={() => handleFilterClick("Inbox")}
//               className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md"
//             >
//               <FaInbox className="mr-3 text-blue-600" /> Inbox
//             </button>
//             <button
//               onClick={() => handleFilterClick("Completed")}
//               className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md"
//             >
//               <MdOutlineTaskAlt className="mr-3 text-green-600" /> Completed
//             </button>
//             <button
//               onClick={() => handleFilterClick("Today")}
//               className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md"
//             >
//               <MdToday className="mr-3 text-yellow-600" /> Today
//             </button>
//             <button
//               onClick={() => handleFilterClick("Tomorrow")}
//               className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md"
//             >
//               <HiMiniCalendarDays className="mr-3 text-orange-600" /> Tomorrow
//             </button>
//             <button
//               onClick={() => handleFilterClick("Upcoming")}
//               className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md"
//             >
//               <IoTodayOutline className="mr-3 text-red-600" /> Upcoming
//             </button>
//           </div>

//           {/* Filters */}
//           <div className="mb-4">
//             {filter === "Upcoming" && (
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="w-full px-3 py-2 mb-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
//               />
//             )}
//             <select
//               onChange={(e) => setPriorityFilter(e.target.value)}
//               value={priorityFilter}
//               className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
//             >
//               <option value="">All Priorities</option>
//               <option value="Priority 1">Priority 1</option>
//               <option value="Priority 2">Priority 2</option>
//               <option value="Priority 3">Priority 3</option>
//               <option value="Priority 4">Priority 4</option>
//             </select>
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={onLogoutTodo}
//             className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//           >
//             Log Out
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-6 pt-16 md:pt-6 overflow-y-auto ml-0 md:ml-60 bg-gray-200">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold">{filter}</h2>
//             <div className="flex space-x-2">
//               <button
//                 onClick={onBackBtn}
//                 className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//               >
//                 <IoArrowBack className="mr-2" /> Back
//               </button>
//               <button
//                 onClick={() => setShowInputContainer(true)}
//                 className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 md:hidden"
//               >
//                 <IoMdAddCircle className="mr-2" /> Add task
//               </button>
//             </div>
//           </div>

//           {/* Task List */}
//           <ul className="space-y-3">
//             {searchedTasks.map((todo) => (
//               <li
//                 key={todo.id}
//                 className={`${todo.completed ? "opacity-70" : ""}`}
//               >
//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                   <div className="flex flex-col md:flex-row justify-between">
//                     <div className="flex flex-1">
//                       <div className="pr-3 pt-1">
//                         <input
//                           type="checkbox"
//                           checked={todo.completed}
//                           onChange={() => handleToggleComplete(todo.id)}
//                           className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <h3
//                           className={`font-medium ${
//                             todo.completed
//                               ? "line-through text-gray-500"
//                               : "text-gray-900"
//                           }`}
//                         >
//                           {todo.title}
//                         </h3>
//                         <p className="text-gray-600 mt-1">{todo.description}</p>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                           <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs font-medium rounded-md">
//                             Date: {todo.date || "No date"}
//                           </span>
//                           <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-xs font-medium text-purple-800 rounded-md">
//                             {todo.priority}
//                           </span>
//                         </div>

//                         {/* Comments Section */}
//                         <div className="mt-3">
//                           <p className="text-sm text-gray-500 font-medium">
//                             Comments:
//                           </p>
//                           {todo.comments &&
//                           Object.keys(todo.comments).length > 0 ? (
//                             <ul className="mt-1 space-y-1 text-sm">
//                               {Object.keys(todo.comments).map((commentId) => (
//                                 <li
//                                   key={commentId}
//                                   className="flex items-center"
//                                 >
//                                   <button
//                                     onClick={() =>
//                                       handleDeleteComment(todo.id, commentId)
//                                     }
//                                     className="text-purple-700 mr-1"
//                                   >
//                                     <CiBookmarkRemove size={16} />
//                                   </button>
//                                   <span className="text-gray-700">
//                                     {todo.comments[commentId]}
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           ) : (
//                             <p className="text-sm text-gray-400 italic">
//                               No comments
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex flex-row md:flex-col justify-end mt-3 md:mt-0 space-x-3 md:space-x-0 md:space-y-2">
//                       <button
//                         onClick={() => handleEditTodo(todo.id)}
//                         className="text-sm text-green-600 hover:underline"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteTodo(todo.id)}
//                         className="text-sm text-red-600 hover:underline"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() =>
//                           handleAddComment(todo.id, prompt("Enter comment:"))
//                         }
//                         className="text-sm text-blue-600 hover:underline"
//                       >
//                         Comment
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))}

//             {searchedTasks.length === 0 && (
//               <li className="text-center py-8 text-gray-500">
//                 No tasks found. Add a new task to get started!
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>

//       {/* Add/Edit Task Modal */}
//       {showInputContainer && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-lg overflow-hidden">
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-4">
//                 {inputFields.title ? "Edit Task" : "Add New Task"}
//               </h2>

//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={inputFields.title}
//                 onChange={(e) =>
//                   setInputFields({ ...inputFields, title: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-1 focus:ring-purple-600"
//               />

//               <textarea
//                 placeholder="Description"
//                 value={inputFields.description}
//                 onChange={(e) =>
//                   setInputFields({
//                     ...inputFields,
//                     description: e.target.value,
//                   })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-1 focus:ring-purple-600"
//                 rows="3"
//               ></textarea>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//                 <select
//                   value={inputFields.priority}
//                   onChange={(e) =>
//                     setInputFields({ ...inputFields, priority: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
//                 >
//                   <option value="Priority 1">Priority 1</option>
//                   <option value="Priority 2">Priority 2</option>
//                   <option value="Priority 3">Priority 3</option>
//                   <option value="Priority 4">Priority 4</option>
//                 </select>

//                 <input
//                   type="date"
//                   value={inputFields.date}
//                   onChange={(e) =>
//                     setInputFields({ ...inputFields, date: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
//                 />
//               </div>

//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowInputContainer(false)}
//                   className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddTodo}
//                   className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//                   disabled={!inputFields.title.trim()}
//                 >
//                   {inputFields.title ? "Update" : "Add"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TodoList;
