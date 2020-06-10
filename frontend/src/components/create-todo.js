import React, { Component } from "react";

class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      responsible: "",
      priority: "",
      completed: false,
    };
  }

  onChangeTodoDesciption = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onChangeTodoResponsible = (event) => {
    this.setState({
      responsible: event.target.value,
    });
  };

  onChangeTodoPriority = (event) => {
    this.setState({
      priority: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state);

    fetch("http://localhost:4000/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          description: "",
          responsible: "",
          priority: "",
          completed: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="mt-3">
        <h1>创建新的待办事项</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="description">描述：</label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeTodoDesciption}
            />
          </div>
          <div className="form-group">
            <label htmlFor="responsible">负责人：</label>
            <input
              type="text"
              className="form-control"
              value={this.state.responsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                value="Low"
                name="prorityOptions"
                className="form-check-input"
                id="priority-low"
                onChange={this.onChangeTodoPriority}
              />
              <label htmlFor="priority-low" className="form-check-label">
                低
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                value="Medium"
                name="prorityOptions"
                className="form-check-input"
                id="priority-medium"
                onChange={this.onChangeTodoPriority}
              />
              <label htmlFor="priority-medium" className="form-check-label">
                中
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                value="High"
                name="prorityOptions"
                className="form-check-input"
                id="priority-high"
                onChange={this.onChangeTodoPriority}
              />
              <label htmlFor="priority-high" className="form-check-label">
                高
              </label>
            </div>
          </div>

          <div className="form-group">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTodo;
