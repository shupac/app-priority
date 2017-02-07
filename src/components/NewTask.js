import React, { Component } from 'react';
import Input from './Input';
import './NewTask.css'

class NewTask extends Component {
  handleSubmit(e) {
    const task = e.target.elements[0].value;
    const time = e.target.elements[1].value;
    if (!task) return;
    this.props.update(task, time);
    this.form.reset();
  }
  submitForm() {
    this.form.submit();
  }
  render() {
    return (
      <form className="new-task" ref={n => this.form = n} onSubmit={this.handleSubmit.bind(this)}>
        <Input className="task-field" submit={this.submitForm.bind(this)} placeholder="New task"/>{' '}
        <Input className="time-field" submit={this.submitForm.bind(this)} placeholder="Time"/>{' '}
        <button type="submit">Create Task</button>
      </form>
    );
  }
}

export default NewTask;
