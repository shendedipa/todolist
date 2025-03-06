import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // For unique IDs
import { format, parseISO } from "date-fns"; // For date formatting
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"; // Icons
import Navbar from "../navbar/Navbar";
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
    //
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
    <>
      <div className="fixed top-0 left-0 w-full">
        <Navbar />
      </div>
      <div className="bg-gray-100 h-80 py-8 mt-10">
        <div className="container mx-auto max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">
            Purple Light Todo
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
    </>
  );
}

export default Todoo;
