import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import { FaRegTrashAlt } from "react-icons/fa";
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoText === "") {
      setErrorStatus(true);
      return;
    }
    const newTodo = {
      id: nanoid(),
      todoText: todoText,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    setTodos([...todos, newTodo]);
    console.log(todos);
    setTodoText("");
    setErrorStatus(false);
  };
  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };
  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    console.log(todos);
  };
  return (
    <div>
      <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
        <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Todo App
              </h1>
            </div>
            <div className="my-5">
              <form onSubmit={handleAddTodo}>
                <div className="flex gap-4">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        id="text"
                        name="text"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        onChange={(e) => {
                          setTodoText(e.target.value.trim());
                        }}
                        value={todoText}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Add
                  </button>
                </div>
              </form>
              {errorStatus && <p>Input is empty</p>}
            </div>
            <hr />
            {todos.length === 0 ? (
              <p>no todos yet</p>
            ) : (
              <ul className="divide-y divide-gray-200 px-4">
                {todos.map((todo) => {
                  return (
                    <li className="py-4" key={todo.id}>
                      <div className="flex items-center">
                        <input
                          id="todo1"
                          name="todo1"
                          type="checkbox"
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                          onChange={() => {
                            handleToggle(todo.id);
                          }}
                        />
                        <label
                          htmlFor="todo1"
                          className="ml-3 block text-gray-900"
                        >
                          <span
                            className="text-lg font-medium"
                            style={{
                              textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {todo.todoText}
                          </span>
                          <span className="text-sm font-light text-gray-500">
                            Created at:{todo.createdAt}
                          </span>
                          <FaRegTrashAlt
                            onClick={() => {
                              handleDeleteTodo(todo.id);
                            }}
                          />
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {todos.length > 0 && (
              <button
                className="bg-red-600 p-3"
                onClick={() => {
                  setTodos([]);
                }}
              >
                Delete All
              </button>
            )}
            <div></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TodoApp;
