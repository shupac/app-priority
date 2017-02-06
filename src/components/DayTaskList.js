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
  createTask(text) {
    this.setState(({tasks}) => {
      let newTask = {
        id: this.props.id,
        date: new Date(),
        text,
        status: 'incomplete'
      };
      tasks.push(newTask);
      this.saveTasks(tasks);
      this.props.updateId();
      return {tasks};
    });
  }
  updateTask(id, text) {
    this.setState(({tasks}) => {
      let task = tasks.find(t => t.id === id);
      if (text !== null) task.text = text;
      this.saveTasks(tasks);
      return {tasks}
    });
  }
  completeTask(id) {
    this.setState(({tasks}) => {
      let task = tasks.find(t => t.id === id);
      if (task.status === 'incomplete') task.status = 'complete';
      else if (task.status === 'complete') task.status = 'incomplete';
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
    let incompleteTaskItems = [];
    let completeTaskItems = [];
    this.state.tasks.forEach(task => {
      let taskItem = <TaskItem
        task={task}
        key={task.id}
        update={this.updateTask.bind(this, task.id)}
        completeTask={this.completeTask.bind(this, task.id)}
        deleteTask={this.deleteTask.bind(this, task.id)} />;
      if (task.status === 'incomplete') incompleteTaskItems.push(taskItem);
      if (task.status === 'complete') completeTaskItems.push(taskItem);
    });

    return (
      <div>
        <NewTask update={this.createTask.bind(this)} />
        <ul className="task-list">
          {incompleteTaskItems}
          {completeTaskItems}
        </ul>
      </div>
    )
  }
}

export default DayTaskList;
