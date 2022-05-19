import React, { useReducer, useState } from "react";
import Todo from "./Todo";
import "./App.css";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  CLEAR_ALL: "clear-all",
};

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
      });
    case ACTIONS.CLEAR_ALL:
      return (todos = []);
    default:
      return todos;
  }
};

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

const App = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  };

  return (
    <div className="container">
      <div className="todo-container">
        <h1>Todo App</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="enter task"
            value={name}
          />
          <button>ADD</button>
        </form>
        <ul>
          {todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
          })}
        </ul>
      </div>
      {todos.length > 0 && (
        <button
          className="clear-btn"
          onClick={() => {
            dispatch({ type: ACTIONS.CLEAR_ALL });
          }}
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default App;
