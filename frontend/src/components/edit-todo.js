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
    this.priorities = [
      { level: "Low", value: "低" },
      { level: "Medium", value: "中" },
      { level: "High", value: "高" },
    ];
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
            {this.priorities.map((prio) => (
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  value={prio.value}
                  name="prorityOptions"
                  className="form-check-input"
                  id={`priority-${prio.level}`}
                  checked={this.state.priority === prio.value}
                  onChange={this.onChangePriority}
                />
                <label
                  htmlFor={`priority-${prio.level}`}
                  className="form-check-label"
                >
                  {prio.value}
                </label>
              </div>
            ))}
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
