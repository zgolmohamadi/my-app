import React, { Component } from "react";
import Task from "./Task";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      list: [],
      doneList: [],
      editMode: false,
      editIndex: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.add = this.add.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.myInput = React.createRef();
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  keyPress(e) {
    if (this.state.value != "" && e.keyCode == 13) {
      this.setState({
        list: [...this.state.list, this.state.value],
        value: "",
      });
    }
  }

  add(e) {
    if (this.state.value != "") {
      this.setState({
        list: [...this.state.list, this.state.value],
        value: "",
      });
    }
  }
  removeTask = (index) => {
    const newArr = [...this.state.list];
    newArr.splice(index, 1);
    this.setState({
      list: newArr,
    });
  };

  editTask = (index) => {
    this.setState({
      value: this.state.list[index],
      editMode: true,
      editIndex: index,
    });

    this.myInput.current.focus();
  };
  editSave = () => {
    let newarr = this.state.list;
    newarr[this.state.editIndex] = this.state.value;
    this.setState({
      list: newarr,
      editMode: false,
      value: "",
    });
  };
  checkedHandle = (e, index) => {
    this.setState({
      doneList: [...this.state.doneList, this.state.list[index]],
    });
  };

  render() {
    const listLength=this.state.list.length - this.state.doneList.length;
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          onKeyDown={this.keyPress}
          value={this.state.value}
          ref={this.myInput}
        />
        {!this.state.editMode ? (
          <button onClick={this.add}>add</button>
        ) : (
          <button onClick={this.editSave}>editTask</button>
        )}

        <ul className="list">
          {this.state.list.map((task, index) => {
            return (
              <Task
                taskItem={task}
                key={index}
                taskIndex={index}
                removeTask={this.removeTask}
                editTask={this.editTask}
                checkedHandle={this.checkedHandle}
              />
            );
          })}
        </ul>
        {listLength > 0 && (
          <>
            <hr />
            <span>{listLength} items left</span>
          </>
        )}
      </div>
    );
  }
}
