import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ todos, setTodos }) => {
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteATodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${todoId}`, {
        method: "DELETE",
      });
      // getTodos();
      setTodos(todos.filter((todo) => todo.todo_id !== todoId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() =>
    //use effect is interesting, it basically runs 'side effects' when the component that 'useEffect' is in runs. In our case, our side effect(s) is getTodos
    {
      getTodos();
    }, []); // this empty brackets tells the useEffect to only run the side effect once.

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_Id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteATodo(todo.todo_id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
