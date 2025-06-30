import { useState } from "react";
import {Fragment} from "react";
 
const InputTodo = ({description, setDescription, setTodos}) => {
 
    const getTodos = async () => {
        try{
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json();
            setTodos(jsonData);
        }

        catch (err) {
            console.log(err);
        }
    };

    const onSubmitForm = async (e) => {
          e.preventDefault();
          try {
            const body = {description: description};
            const response = await fetch("http://localhost:5000/todos", {
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(body)
            }
          );
            getTodos(); 
            setDescription("");
          }
           catch (err) {
            console.log(err)
          }
          return 
     }
   
    return (
    <Fragment>
    <h1 className="text-center mt-5">To Do List</h1>
    <form onSubmit = {onSubmitForm}>
        <input type ="text"
        className="form-control"
        value = {description}
        onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success mt-3">Add</button>
    </form>
    </Fragment>
    );    
}
export default InputTodo;
