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
  save(task, time) {
    this.props.update(task, time);
    this.toggleEdit();
  }
  render() {
    let item;
    let className = 'task-item ' + this.props.task.status;
    if (!this.state.editable) {
      item = (
        <li className={className}>
          <input className="task-status" type="checkbox" checked={this.props.task.status === 'complete'} onChange={this.props.handleToggle} />
          <span className="task-field" onClick={this.props.completeTask}>{this.props.task.text}</span>{' '}
          <span className="time-field" onClick={this.props.completeTask}>{this.props.task.time}</span>{' '}
          <button onClick={this.toggleEdit.bind(this)}>edit</button>{' '}
          <button onClick={this.props.deleteTask.bind(this)}>delete</button>
        </li>
      );
    }
    else {
      item = (
        <li className={className}>
          <EditForm {...this.props} submit={this.save.bind(this)}/>
        </li>
      );
    }
    return item;
  }
}

class EditForm extends Component {
  componentDidMount() {
    this.input.input.focus()
  }
  handleSubmit(e) {
    this.props.submit(e.target.elements[0].value, parseFloat(e.target.elements[1].value))
  }
  submitForm() {
    this.form.submit();
  }
  render() {
    return (
      <form ref={n => this.form = n} onSubmit={this.handleSubmit.bind(this)}>
        <Input className="task-field"
          ref={n => this.input = n}
          defaultValue={this.props.task.text}
          submit={this.submitForm.bind(this)} />{' '}
        <Input className="time-field"
          defaultValue={this.props.task.time}
          submit={this.submitForm.bind(this)} />{' '}
        <button type="submit">save</button>
      </form>
    )
  }
}

export default TaskItem;
