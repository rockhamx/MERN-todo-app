import React from "react";
import Axios from "axios";
const server = "http://localhost:4000";

class EditTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      responsible: "",
      priority: "",
      completed: false,
    };
    this.id = props.match.params.id;
  }

  componentDidMount() {
    Axios.get(`${server}/todos/${this.id}`)
      .then((res) => {
        this.setState({
          description: res.data.description,
          responsible: res.data.responsible,
          priority: res.data.priority,
          completed: res.data.completed,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeDescription = (event) =>
    this.setState({ description: event.target.value });

  onChangeResponsible = (event) =>
    this.setState({ responsible: event.target.value });

  onChangePriority = (event) => this.setState({ priority: event.target.value });

  onChangeComplted = (event) =>
    this.setState({ completed: event.target.checked === true });

  onSubmit = (event) => {
    event.preventDefault();

    const todo = this.state;
    Axios.put(`${server}/todos/${this.id}`, todo).then((res) => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div className="mt-3">
        <h1>更新待办事项</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="description">描述</label>
            <input
              className="form-control"
              type="text"
              id="description"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label htmlFor="responsible">负责人</label>
            <input
              className="form-control"
              type="text"
              id="responsible"
              value={this.state.responsible}
              onChange={this.onChangeResponsible}
            />
          </div>
          <div className="form-group">
            <span>优先级：</span>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="prorityOptions"
                value="Low"
                className="form-check-input"
                id="priority-low"
                checked={this.state.priority === "Low"}
                onChange={this.onChangePriority}
              />
              <label htmlFor="priority-low" className="form-check-label">
                低
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="prorityOptions"
                value="Medium"
                className="form-check-input"
                id="priority-medium"
                checked={this.state.priority === "Medium"}
                onChange={this.onChangePriority}
              />
              <label htmlFor="priority-medium" className="form-check-label">
                中
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="prorityOptions"
                value="High"
                className="form-check-input"
                id="priority-high"
                checked={this.state.priority === "High"}
                onChange={this.onChangePriority}
              />
              <label htmlFor="priority-high" className="form-check-label">
                高
              </label>
            </div>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              id="completedCheckbox"
              className="form-check-input"
              checked={this.state.completed}
              onChange={this.onChangeComplted}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              完成
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-outline-success">更新</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditTodo;
