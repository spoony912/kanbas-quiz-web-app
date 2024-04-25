import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithArrays() {
  // interface Todo {
  //   id: number;
  //   title: string;
  //   completed: boolean;
  // }
  interface Todo {
    id?: number;
    title?: string;
    description?: string;
    due?: string;
    completed?: boolean;
  }
  const initialState = {
    id: 1, // Consider using a neutral value here if resetting
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  };
  const API = "http://localhost:4000/a5/todos";
  // move to upper
  // const [todo, setTodo] = useState({
  //   id: 1,
  //   title: "NodeJS Assignment",
  //   description: "Create a NodeJS server with ExpressJS",
  //   due: "2021-09-09",
  //   completed: false, // default
  // });
  const [todo, setTodo] = useState(initialState);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);
  // post todo: create
  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };
  // todo: fetch
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  // todo: delete
  const removeTodo = async (todo: any) => {
    const response = await axios.get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };
  // new: todo: delete
  const deleteTodo = async (todo: any) => {
    try {
      // const response = await axios.delete(`${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      const message =
        (error as any).response?.data?.message || "An unknown error occurred";
      setErrorMessage(message);
      console.log(error);
    }
  };

  // todo: create
  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };
  // fetch by id
  const fetchTodoById = async (id: any) => {
    const response = await axios.get(`${API}/${id}`);
    setTodos(response.data);
  };
  // update title
  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };
  // update todo
  const updateTodo = async () => {
    try {
      // const response = await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      const blankState = {
        id: 0,
        title: "",
        description: "",
        due: "",
        completed: false,
      };
      setTodo(blankState);
    } catch (error) {
      // Directly casting error to any to bypass strict type checks
      const message =
        (error as any).response?.data?.message || "An unknown error occurred";
      setErrorMessage(message);
      console.log(error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      {/* ********************************************** */}
      <h2>Working with Arrays</h2>
      <h4>Retrieving Arrays</h4>
      <button className="btn btn-primary">
        <a href={API} style={{ color: "white" }}>
          Get Todos
        </a>
      </button>
      <h4>Retrieving an Item from an Array by ID Part 1</h4>
      {/* id */}
      <input
        className="form-control"
        value={todo.id}
        type="number"
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      {/* description */}
      <input
        className="form-control"
        type="text"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <input
        value={todo.due}
        type="date"
        onChange={(e) =>
          setTodo({
            ...todo,
            due: e.target.value,
          })
        }
      />

      {/* <button className="btn btn-primary">
        <a
          href={`${API}/${todo.id}/description/${todo.description}`}
          style={{ color: "white" }}
        >
          Update Description
        </a>
      </button> */}
      <br />
      {/* completed */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
      {/* post */}
      <button className="btn btn-primary" onClick={postTodo}>
        Post Todo
      </button>
      <button className="btn btn-primary" onClick={updateTodo}>
        Update Todo
      </button>
      {/* ul */}
      <ul className="list-group">
        {todos.map((todo: any) => (
          <li key={todo.id} className="list-group-item">
            <input checked={todo.completed} type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
            <button
              onClick={() => fetchTodoById(todo.id)}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button onClick={() => removeTodo(todo)} className="btn btn-danger">
              Remove
            </button>
            <button
              onClick={() => deleteTodo(todo)}
              className="btn btn-danger float-end ms-2"
            >
              Delete
            </button>
            {/* {todo.title} */}
          </li>
        ))}
      </ul>
      <br />
      <button className="btn btn-primary">
        <a
          href={`${API}/${todo.id}/description/${todo.completed}`}
          style={{ color: "white" }}
        >
          Update Completed Status
        </a>
      </button>
      {/* titile */}
      <input
        className="form-control"
        value={todo.title}
        type="text"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <h3>Updating an Item in an Array</h3>

      <button className="btn btn-primary">
        <a
          href={`${API}/${todo.id}/title/${todo.title}`}
          style={{ color: "white" }}
        >
          Update Title to {todo.title}
        </a>
      </button>
      <br />
      <button className="btn btn-primary">
        <a href={`${API}/${todo.id}`} style={{ color: "white" }}>
          Get Todo by ID
        </a>
      </button>
      <h4>Retrieving an Item from an Array by ID Part 2</h4>
      <button className="btn btn-primary">
        <a href={`${API}?completed=true`} style={{ color: "white" }}>
          Get Completed Todos
        </a>
      </button>
      <h3>Creating new Items in an Array</h3>
      <button className="btn btn-primary">
        <a href={`${API}/create`} style={{ color: "white" }}>
          Create Todo
        </a>
      </button>
      <h3>Deleting from an Array</h3>
      <button className="btn btn-primary">
        <a href={`${API}/${todo.id}/delete`} style={{ color: "white" }}>
          Delete Todo with ID = 1
        </a>
      </button>
      {/* ---------------------------- axios ---------------------------- */}
      <h4>new added</h4>
      {/* id */}
      <input
        className="form-control"
        value={todo.id}
        type="number"
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      {/* title */}
      <input
        className="form-control"
        value={todo.title}
        type="text"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <h4>---------------------------------------</h4>
      {/* new */}

      <div>
        {errorMessage && (
          <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
        )}
        {/* id */}
        <input
          className="form-control"
          value={todo.id}
          type="number"
          onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
        />
        <br />
        {/* titile */}
        <input
          className="form-control"
          value={todo.title}
          type="text"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />{" "}
        <br />
        {/* description */}
        <textarea
          className="form-control"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <br />
        {/* due */}
        <input
          className="form-control"
          value={todo.due}
          type="date"
          onChange={(e) =>
            setTodo({
              ...todo,
              due: e.target.value,
            })
          }
        />
        <br />
        <label>
          {/* completed */}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
          />
        </label>
        <button className="btn btn-primary" onClick={postTodo}>
          Post Todo
        </button>
        <button className="btn btn-danger" onClick={updateTodo}>
          Update Todo
        </button>
        <button className="btn btn-primary " onClick={createTodo}>
          Create Todo
        </button>
        <button className="btn btn-danger" onClick={updateTitle}>
          Update Title
        </button>
        <ul className="list-group">
          {todos.map((todo) => (
            <li key={todo.id} className="list-group-item">
              <input checked={todo.completed} type="checkbox" readOnly />
              {todo.title}
              <p>{todo.description}</p>
              <p>{todo.due}</p>
              <button className="btn btn-danger" onClick={removeTodo}>
                Remove
              </button>
              <button
                className="btn btn-primary"
                onClick={() => fetchTodoById(todo.id)}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo)}
                className="btn btn-danger float-end ms-2"
              >
                New Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* <button onClick={updateTitle} className="btn btn-danger">
        Update Title
      </button>
      <ul className="list-group">
        {todos.map((todo: any) => (
          <li key={todo.id} className="list-group-item">
            <button
              onClick={() => fetchTodoById(todo.id)}
              className="btn btn-primary"
            >
              New Edit
            </button>
            <button onClick={() => removeTodo(todo)} className="btn btn-danger">
              New Remove
            </button>
            {todo.title}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default WorkingWithArrays;
