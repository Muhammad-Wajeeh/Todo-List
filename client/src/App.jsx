import { Fragment, useState } from 'react'
import './App.css'

// components

import InputTodo from "./InputTodo"
import ListTodos from './ListTodos'

function App() {

  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]); 
  return (
    <Fragment>
      <InputTodo description={description} setDescription={setDescription} setTodos={setTodos}/>
      <ListTodos todos={todos} setTodos={setTodos}/>
    </Fragment>
 )
}

export default App
