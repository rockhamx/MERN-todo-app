// @ts-nocheck
import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
const server = "http://localhost:4000";

export default class TodoList extends Component {
  state = {
    todoList: [],
  };

  componentDidMount() {
    console.log("fetching...");
    Axios.get(`${server}/todos/`)
      .then((response) => {
        const todoList = response.data;
        this.setState({ todoList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDelete = (id) => {
    Axios.delete(`${server}/todos/${id}`).then((response) => {
      if (response.status === 204) {
        this.state.todoList.filter((todo) => todo._id !== id);
      }
    });
  };

  toggleCompleted = (id) => {
    // How to find the todo item more effectively?
    const todoList = this.state.todoList;
    todoList.some((todo) => {
      if (todo._id === id) {
        todo.completed = todo.completed ? false : true;
        Axios.put(`${server}/todos/${id}`, todo).then((res) => {
          if (res.status !== 200) {
            throw new Error(res.status);
          }
        });
        return true;
      }
    });
    this.setState({
      todoList,
    });
  };

  render() {
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
            {this.state.todoList.map((todo) => (
              <TodoTableRow
                {...todo}
                key={todo._id}
                onDelete={this.handleDelete}
                onToggleCompleted={this.toggleCompleted}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const TodoTableRow = (todo) => {
  return (
    <tr className={todo.completed ? "completed" : ""}>
      <td>{todo.description}</td>
      <td>{todo.responsible}</td>
      <td>{todo.priority}</td>
      <td>
        <button
          className="btn btn-outline-success"
          onClick={(eve) => {
            let target = eve.target;
            eve.target.closest("tr").classList.toggle("completed");
            todo.onToggleCompleted(todo._id);
          }}
        >
          {todo.completed ? "未完成" : "完成"}
        </button>
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
