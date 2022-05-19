import React from "react";
import { ACTIONS } from "./App";

const Todo = ({ todo, dispatch }) => {
  return (
    <div
      className="todo"
      style={{ backgroundColor: todo.complete ? "lightgray" : "white" }}
    >
      <li
        onClick={() => {
          dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } });
        }}
        style={{ textDecorationLine: todo.complete ? "line-through" : "" }}
      >
        {todo.name}
      </li>
      <div>
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
          }
        >
          Del
        </button>
      </div>
    </div>
  );
};

export default Todo;
