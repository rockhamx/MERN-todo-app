import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
const server = "http://localhost:4000";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    console.log("fetching...");
    Axios.get(`${server}/todos/`)
      .then((response) => {
        setTodoList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    Axios.delete(`${server}/todos/${id}`).then((response) => {
      if (response.status === 204) {
        setTodoList(todoList.filter((todo) => todo._id !== id));
      }
    });
  };

  return (
    <div className="mt-3">
      <h1>待办事项列表</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>描述</th>
            <th>负责人</th>
            <th>优先级</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todo) => (
            <TodoTableRow {...todo} key={todo._id} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TodoTableRow = (todo) => {
  return (
    <tr>
      <td>{todo.description}</td>
      <td>{todo.responsible}</td>
      <td>{todo.priority}</td>
      <td>
        <button className="btn btn-outline-success">完成</button>
        <Link className="btn btn-outline-primary ml-2" to={`/edit/${todo._id}`}>
          编辑
        </Link>
        <button
          className="btn btn-outline-danger ml-2"
          onClick={() => todo.onDelete(todo._id)}
        >
          删除
        </button>
      </td>
    </tr>
  );
};

export default TodoList;
