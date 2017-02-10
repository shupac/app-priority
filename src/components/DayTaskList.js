import React, { Component } from 'react';
import FBref from '../common/firebase';
import NewTask from './NewTask';
import TaskItem from './TaskItem';
import './DayTaskList.css';

class DayTaskList extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    }
  }
  componentWillMount() {
    this.fetchTasks();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({tasks: []})
    this.fetchTasks(nextProps.date);
  }
  fetchTasks(date) {
    date = date || this.props.date;
    FBref.child('tasks').child(date).once('value').then(snapshot => {
      this.setState(({tasks}) => {
        if (snapshot.val()) tasks = snapshot.val();
        else tasks = [];
        return {tasks};
      });
    });
  }
  saveTasks(tasks) {
    FBref.child('tasks').child(this.props.date).set(tasks);
  }
  createTask(text, time) {
    this.setState(({tasks}) => {
      let newTask = {
        id: this.props.id,
        text,
        time,
        status: 'incomplete'
      };
      tasks.push(newTask);
      this.saveTasks(tasks);
      this.props.updateId();
      return {tasks};
    });
  }
  updateTask(id, text, time) {
    this.setState(({tasks}) => {
      let task = tasks.find(t => t.id === id);
      if (text !== null) task.text = text;
      task.time = time;
      this.saveTasks(tasks);
      return {tasks}
    });
  }
  toggleTask(id, event) {
    const status = event.target.checked ? 'complete' : 'incomplete'
    this.setState(({tasks}) => {
      let task = tasks.find(t => t.id === id);
      task.status = status
      this.saveTasks(tasks);
      return {tasks}
    });
  }
  deleteTask(id) {
    this.setState(({tasks}) => {
      tasks = tasks.filter(t => t.id !== id);
      this.saveTasks(tasks);
      return {tasks}
    });
  }
  render() {
    const incompleteTaskItems = [];
    const completeTaskItems = [];
    var totalHours = 0;

    this.state.tasks.forEach(task => {
      let taskItem = <TaskItem
        task={task}
        key={task.id}
        update={this.updateTask.bind(this, task.id)}
        handleToggle={this.toggleTask.bind(this, task.id)}
        deleteTask={this.deleteTask.bind(this, task.id)} />;
      if (task.status === 'incomplete') {
        incompleteTaskItems.push(taskItem);
        totalHours += task.time
      }
      if (task.status === 'complete') completeTaskItems.push(taskItem);
    });

    return (
      <div className="day-task-list">
        <NewTask update={this.createTask.bind(this)} />
        <ul className="task-list">
          {incompleteTaskItems}
          {incompleteTaskItems.length ?
            <li className="task-total">
              <span className="task-field">Total Hours</span>{' '}
              <span className="time-field">{totalHours}</span>
            </li> : null}
        </ul>
        {completeTaskItems.length ? <h3>Completed Tasks</h3> : null}
        <ul className="task-list">
          {completeTaskItems}
        </ul>
      </div>
    )
  }
}

export default DayTaskList;
