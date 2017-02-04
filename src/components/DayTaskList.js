import React, { Component } from 'react';
import FBref from '../common/firebase';
import NewTask from './NewTask';
import TaskItem from './TaskItem';

class DayTaskList extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      tasks: [
        // {
        //   id,
        //   date,
        //   text,
        //   status,
        //   priority,
        //   duration
        // }
      ]
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
        tasks = snapshot.val();
        let id = tasks.length - 1;
        return {id, tasks}
      });
    });
  }
  saveTasks(tasks) {
    FBref.child('tasks').set(tasks);
  }
  createTask(text) {
    this.setState(({ id, tasks }) => {
      id += 1;
      let newTask = {
        id: id,
        date: new Date(),
        text,
        status: 'incomplete'
      };
      tasks.push(newTask);
      this.saveTasks(tasks);
      return {id, tasks};
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
  render() {
    let incompleteTaskItems = [];
    let completeTaskItems = [];
    this.state.tasks.forEach(task => {
      let taskItem = <TaskItem
        task={task}
        key={task.id}
        update={this.updateTask.bind(this, task.id)}
        completeTask={this.completeTask.bind(this, task.id)} />;
      if (task.status === 'incomplete') incompleteTaskItems.push(taskItem);
      if (task.status === 'complete') completeTaskItems.push(taskItem);
    });

    return (
      <div>
        <NewTask update={this.createTask.bind(this)} />
        <ul>
          {incompleteTaskItems}
          {completeTaskItems}
        </ul>
      </div>
    )
  }
}

export default DayTaskList;
