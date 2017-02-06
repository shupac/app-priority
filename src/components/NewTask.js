import React, { Component } from 'react';
import Input from './Input';

class NewTask extends Component {
  handleSubmit() {
    const task = this.input.input.value;
    if (!task) return;
    this.props.update(task);
    this.input.input.value = '';
  }
  render() {
    return (
      <div>
        <Input ref={n => this.input = n} submit={this.handleSubmit.bind(this)} />
        <button onClick={this.handleSubmit.bind(this)}>Create Task</button>
      </div>
    );
  }
}

export default NewTask;
