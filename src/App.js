import React, { Component } from 'react';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyAKZOAZNymyQKxT6KyigRNtqS6vS6PV1Gs",
  authDomain: "priority-e6356.firebaseapp.com",
  databaseURL: "https://priority-e6356.firebaseio.com",
  storageBucket: "priority-e6356.appspot.com",
  messagingSenderId: "508701423635"
});
var FBref = firebase.database().ref('/');

class App extends Component {
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
  fetchTasks() {
    FBref.child('tasks').once('value').then(snapshot => {
      this.setState(({tasks}) => {
        tasks = snapshot.val();
        let id = tasks.length - 1;
        console.log(snapshot.val(), id);
        return {id, tasks}
      });
    });
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
      FBref.child('tasks').set(tasks);
      return {id, tasks};
    })
  }
  render() {
    let taskItems = this.state.tasks.map(task => {
      return <TaskItem task={task} key={task.id} />
    });

    return (
      <div>
        <NewTask update={this.createTask.bind(this)} />
        <ul>
          {taskItems}
        </ul>
      </div>
    )
  }
}

class NewTask extends Component {
  handleKeyPress(e) {
    if (e.key === 'Enter') this.handleSubmit();
  }
  handleSubmit() {
    this.props.update(this.refs.input.value);
    this.refs.input.value = '';
  }
  render() {
    return (
      <div>
        <input ref="input" onKeyPress={this.handleKeyPress.bind(this)} />
        <button onClick={this.handleSubmit.bind(this)}>Create Task</button>
      </div>
    );
  }
};

class TaskItem extends Component {
  constructor() {
    super();
    this.state = {
      editable: false
    }
  }
  edit() {
    this.setState(({editable}) => {
      return {editable: !editable};
    });
  }
  render() {
    let item;
    if (!this.state.editable) {
      item = (
        <li>
          {this.props.task.text}
          <button onClick={this.edit.bind(this)}>edit</button>
        </li>
      );
    }
    else {
      item = (
        <li>
          <input value={this.props.task.text} />
          <button onClick={this.edit.bind(this)}>cancel</button>
          <button onClick={this.edit.bind(this)}>save</button>
        </li>
      );
    }
    return item;
  }
}

export default App;
