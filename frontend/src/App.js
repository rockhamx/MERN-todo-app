import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import EditTodo from "./components/edit-todo";
import CreateTodo from "./components/create-todo";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar navbar-light navbar-expand-lg bg-light">
          <a href="/" className="navbar-brand">
            <img src={logo} alt="brand" width="30" height="30" />
          </a>
          <Link to="/" className="navbar-brand">
            MERN 待办事项
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/todos/" className="nav-link">
                  列表
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  创建待办事项
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route exact path="/" component={TodoList} />
        <Route exact path="/todos/" component={TodoList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </div>
    </BrowserRouter>
  );
}

export default App;
