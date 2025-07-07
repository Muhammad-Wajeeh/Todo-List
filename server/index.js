const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//Create a todo

app.post("/todos", async (req, res) => {
  //await
  try {
    const description = req.body.description;
    // can also do this, its just a nicer way, i liek the one at the top :
    // const {description} = req.body;
    // const newToDo = await pool.query("INSERT INTO todo (description) VALUES($1)", [description]); // pg library allowing us to add dynamic data, can also jsut do a sql query to add data manually from terminal or soemthing. Also the $1 is saying that we are grabbing the first value in the array, which in this case happens to be the only value in the array, "description". Also the first 'description' in the query refers to the sql column and the second refers to the actual variable we created
    const newToDo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    ); //the returning * (all) returns everything including what was just inserted into the table
    res.json(newToDo); // send the query as a json reponse
  } catch (err) {
    console.error(err.message);
  }
});

//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(error.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    // res.json(todo);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const description = req.body.description;
    const todo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );
    // res.json(todo);
    // res.json(todo.rows[0]);
    res.json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    // res.json(todo);
    // res.json(todo.rows[0]);
    res.json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, "0.0.0.0", function () {
  console.log("listening has started");
});
