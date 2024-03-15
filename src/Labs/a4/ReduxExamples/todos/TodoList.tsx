// ------------------ method 1

// import React, { useState } from "react";

// const TodoList = () => {
//   const [todos, setTodos] = useState([
//     {
//       id: "1",
//       title: "learn react",
//     },
//     {
//       id: "2",
//       title: "learn node",
//     },
//   ]);
//   const [todo, setTodo] = useState({
//     id: "-1",
//     title: "learn mongo",
//   });

//   // func 1: add
//   const addTodo = (todo: any) => {
//     const newTodos = [
//       ...todos,
//       { ...todo, id: new Date().getTime().toString() },
//     ];
//     // useState
//     setTodos(newTodos);
//     setTodo({ id: "-1", title: "" });
//   };

//   // func 2: delete
//   const deleteTodo = (id: string) => {
//     const newTodos = todos.filter((todo) => todo.id !== id);
//     // useState
//     setTodos(newTodos);
//   };

//   // func 3: update
//   const updateTodo = (todo: any) => {
//     const newTodos = todos.map((item) => (item.id === todo.is ? todo : item));
//     // useState
//     setTodos(newTodos);
//     setTodo({ id: "-1", title: "" });
//   };
//   return (
//     <div>
//       <h2>Todo List</h2>
//       <ul className="list-group">
//         <li className="list-group-item">
//           <button onClick={() => addTodo(todo)}>Add</button>
//           <button onClick={() => updateTodo(todo)}>Update</button>
//           <input
//             value={todo.title}
//             onChange={(e) => setTodo({ ...todo, title: e.target.value })}
//           />
//         </li>
//         {todos.map((todo) => (
//           <li key={todo.id} className="list-group-item">
//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//             <button onClick={() => setTodo(todo)}>Edit</button>
//             {todo.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default TodoList;

// ------------------ method 2

// import React, { useState } from "react";
// import TodoForm from "./TodoForm";
// import TodoItem from "./TodoItem";

// const TodoList = () => {
//   const [todos, setTodos] = useState([
//     {
//       id: "1",
//       title: "learn react",
//     },
//     {
//       id: "2",
//       title: "learn node",
//     },
//   ]);
//   const [todo, setTodo] = useState({
//     id: "-1",
//     title: "learn mongo",
//   });

//   // func 1: add
//   const addTodo = (todo: any) => {
//     const newTodos = [
//       ...todos,
//       { ...todo, id: new Date().getTime().toString() },
//     ];
//     // useState
//     setTodos(newTodos);
//     setTodo({ id: "-1", title: "" });
//   };

//   // func 2: delete
//   const deleteTodo = (id: string) => {
//     const newTodos = todos.filter((todo) => todo.id !== id);
//     // useState
//     setTodos(newTodos);
//   };

//   // func 3: update
//   const updateTodo = (todo: any) => {
//     const newTodos = todos.map((item) => (item.id === todo.is ? todo : item));
//     // useState
//     setTodos(newTodos);
//     setTodo({ id: "-1", title: "" });
//   };
//   return (
//     <div>
//       <h2>Todo List</h2>
//       <ul className="list-group">
//         <TodoForm
//           todo={todo}
//           setTodo={setTodo}
//           addTodo={addTodo}
//           updateTodo={updateTodo}
//         />
//         {todos.map((todo) => (
//           <TodoItem todo={todo} deleteTodo={deleteTodo} setTodo={setTodo} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;

// ------------------ method 3
import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { LabState, TodoType } from "../../../store";
function TodoList() {
  const { todos } = useSelector((state: LabState) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm />
        {todos.map((todo: TodoType) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
