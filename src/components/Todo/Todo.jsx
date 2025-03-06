// import React from "react";
// import { useState } from "react";

// import { v4 as uuidv4 } from "uuid";
// uuidv4();

// function Todoo() {
//   const [todo, setTodo] = useState(""); // Input text
//   const [todos, setTodos] = useState([]); // Array to hold all todos

//   const handleEdit = (id) => {
//     const newTodo = prompt(
//       "Edit your todo:",
//       todos.find((item) => item.id === id)?.todo
//     );
//     if (newTodo !== null) {
//       setTodos(
//         todos.map((item) =>
//           item.id === id ? { ...item, todo: newTodo } : item
//         )
//       );
//     }
//   };

//   const handleDelete = (id) => {
//     const updatedTodos = todos.filter((item) => item.id !== id);
//     setTodos(updatedTodos);
//   };

//   const handleAdd = () => {
//     if (todo.trim() !== "") {
//       setTodos([...todos, { id: uuidv4, todo, isCompleted: false }]);
//       setTodo("");
//     }
//   };

//   const handleChange = (e) => {
//     setTodo(e.target.value); // Input change
//   };

//   // Function to toggle completion status
//   const handleCheckbox = (id) => {
//     setTodos(
//       todos.map((item) =>
//         item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
//       )
//     );
//   };

//   return (
//     <>
//       <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh]">
//         <div className="addTodo my-5">
//           <h2 className="text-lg font-bold">Add ToDo</h2>
//           <input
//             name="todos.index"
//             onChange={handleChange}
//             value={todo}
//             type="text"
//             className="w-1/2 bg-amber-50 p-2 border border-gray-300 rounded"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-6"
//           >
//             Add
//           </button>
//         </div>
//         <h2 className="text-lg font-bold">Your TODOS</h2>
//         <div className="todos space-y-3">
//           {todos.map((item, index) => (
//             <div
//               key={item.id}
//               className="flex justify-between bg-white p-3 rounded-md shadow-md"
//             >
//               <input
//                 className="mr-2"
//                 onChange={handleCheckbox(item.id)}
//                 type="checkbox"
//                 value={item.isCompleted}
//               />
//               <div
//                 className={item.isCompleted ? "line-through text-gray-500" : ""}
//               >
//                 {item.todo}
//               </div>
//               <div className="buttons">
//                 <button
//                   onClick={() => handleEdit(index)}
//                   className="bg-blue-600 hover:bg-blue-700 p-2 text-xs font-bold text-white rounded-md mx-1"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(index)}
//                   className="bg-red-600 hover:bg-red-700 p-2 text-xs font-bold text-white rounded-md mx-1"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

//export default Todoo;
// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid"; // Import uuid

// function Todoo() {
//   const [todo, setTodo] = useState(""); // Input text
//   const [todos, setTodos] = useState([]); // Array to hold all todos

//   // Function to add a new todo
//   const handleAdd = () => {
//     if (todo.trim() !== "") {
//       setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]); // Assign unique ID
//       setTodo(""); // Clear input field
//     }
//   };

//   // Function to edit a todo
//   // Function to edit a todo
//   const handleAddOrUpdate = () => {
//     if (todo.trim() === "") return;

//     if (editId) {
//       // Update existing todo
//       setTodos(
//         todos.map((item) => (item.id === editId ? { ...item, todo } : item))
//       );
//       setEditId(null); // Reset edit state after updating
//     } else {
//       // Add new todo
//       setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
//     }

//     setTodo(""); // Clear input field
//   };

//   // Function to delete a todo
//   const handleDelete = (id) => {
//     setTodos(todos.filter((item) => item.id !== id));
//   };

//   // Function to handle input change
//   const handleChange = (e) => {
//     setTodo(e.target.value);
//   };

//   // Function to toggle completion status
//   const handleCheckbox = (id) => {
//     setTodos(
//       todos.map((item) =>
//         item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
//       )
//     );
//   };

//   return (
//     <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh]">
//       <div className="addTodo my-5">
//         <h2 className="text-lg font-bold">Add ToDo</h2>
//         <input
//           onChange={handleChange}
//           value={todo}
//           type="text"
//           className="w-1/2 bg-amber-50 p-2 border border-gray-300 rounded"
//         />
//         <button
//           onClick={handleAdd}
//           className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-6"
//         >
//           Save
//         </button>
//       </div>

//       <h2 className="text-lg font-bold">Your TODOS</h2>
//       <div className="todos space-y-3">
//         {todos.length === 0 && <div className="m-5"> No Todos to display</div>}
//         {todos.map((item) => (
//           <div
//             key={item.id}
//             className="flex justify-between bg-white p-3 rounded-md shadow-md"
//           >
//             <div className="flex gap-5">
//               <input
//                 type="checkbox"
//                 checked={item.isCompleted}
//                 onChange={() => handleCheckbox(item.id)}
//                 className="mr-2"
//               />
//               <div
//                 className={item.isCompleted ? "line-through text-gray-500" : ""}
//               >
//                 {item.todo}
//               </div>
//             </div>
//             <div className="buttons">
//               <button
//                 onClick={() => handleAddOrUpdate(item.id)}
//                 className="bg-blue-600 hover:bg-blue-700 p-2  py-1 text-s font-bold text-white rounded-md mx-1"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={(e) => handleDelete(e, item.id)}
//                 className="bg-red-600 hover:bg-red-700 p-2 text-xs font-bold text-white rounded-md mx-1"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Todoo;

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // For unique IDs
import { format, parseISO } from "date-fns"; // For date formatting
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"; // Icons

function Todoo() {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage on initial render
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [newTodo, setNewTodo] = useState("");
  const [newTodoDate, setNewTodoDate] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Save todos to localStorage whenever the todos state changes
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "" && newTodoDate.trim() !== "") {
      setTodos([
        ...todos,
        { id: uuidv4(), text: newTodo, date: newTodoDate, completed: false },
      ]);
      setNewTodo("");
      setNewTodoDate("");
    }
  };

  const handleCompleteTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, text, date) => {
    setEditingTodoId(id);
    setEditText(text);
    setEditDate(date);
  };

  const handleUpdateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingTodoId
          ? { ...todo, text: editText, date: editDate }
          : todo
      )
    );
    setEditingTodoId(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    }
    if (filter === "incomplete") {
      return !todo.completed;
    }
    return true; // 'all' filter
  });

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">
          Purple Light Todo List
        </h1>

        {/* Add Todo */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Add a todo..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <input
            type="date"
            className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newTodoDate}
            onChange={(e) => setNewTodoDate(e.target.value)}
          />
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-4">
          <button
            className={`bg-purple-200 hover:bg-purple-300 text-purple-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              filter === "all" ? "bg-purple-300" : ""
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`bg-green-200 hover:bg-green-300 text-green-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              filter === "completed" ? "bg-green-300" : ""
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
          <button
            className={`bg-yellow-200 hover:bg-yellow-300 text-yellow-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              filter === "incomplete" ? "bg-yellow-300" : ""
            }`}
            onClick={() => handleFilterChange("incomplete")}
          >
            Incomplete
          </button>
        </div>

        {/* Todo List */}
        <ul>
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between py-2 px-4 mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
            >
              {editingTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                  <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleUpdateTodo}
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`todo-${todo.id}`}
                      className="mr-2 leading-tight text-purple-600 h-5 w-5"
                      checked={todo.completed}
                      onChange={() => handleCompleteTodo(todo.id)}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`text-gray-800 ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <div className="text-gray-600 ml-4">
                    {format(parseISO(todo.date), "MMM dd, yyyy")}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleEditTodo(todo.id, todo.text, todo.date)
                      }
                    >
                      <PencilIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todoo;
