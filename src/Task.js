import React, { Component } from "react";
import "./styles.css";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false,
    };
  }
  checkedHandle = (e,taskIndex ) => {
    if (e.target.checked) {
      this.setState({ isDone: true });
    }
    this.props.checkedHandle(taskIndex)
  };
  render() {
    const {
      taskItem,
      taskIndex,
      removeTask,
      editTask,
      checkedHandle,
    } = this.props;

    return (
      <li key={taskIndex}>
        <label className={this.state.isDone ? "is-done" : ""}>
          <input
            type="checkbox"
            onChange={(e, taskIndex) => this.checkedHandle(e, taskIndex)}
          />
          {taskItem}
        </label>
        <label></label>
        <button onClick={() => removeTask(taskIndex)}>remove</button>
        {!this.state.isDone && (
          <button onClick={() => editTask(taskIndex)}>edit</button>
        )}
      </li>
    );
  }
}
