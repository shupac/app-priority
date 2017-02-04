import React, { Component } from 'react';
import Input from './Input';
import './TaskItem.css';

class TaskItem extends Component {
  constructor() {
    super();
    this.state = {
      editable: false
    }
  }
  toggleEdit() {
    this.setState(({editable}) => {
      return {editable: !editable};
    });
  }
  save() {
    this.props.update(this.input.input.value);
    this.toggleEdit();
  }
  render() {
    let item;
    let className = 'task-item ' + this.props.task.status;
    if (!this.state.editable) {
      item = (
        <li className={className}>
          <span onClick={this.props.completeTask}>{this.props.task.text}</span>
          <button onClick={this.toggleEdit.bind(this)}>edit</button>
        </li>
      );
    }
    else {
      item = (
        <li>
          <Input ref={n => this.input = n} defaultValue={this.props.task.text} submit={this.save.bind(this)} />
          <button onClick={this.save.bind(this)}>save</button>
        </li>
      );
    }
    return item;
  }
}

export default TaskItem;
