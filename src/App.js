import React, { Component } from 'react';
import './common/firebase';
import moment from 'moment';
import DayTaskList from './components/DayTaskList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: moment().format('YYYY-MM-DD')
    }
  }
  render() {
    return (
      <div>
        {this.state.date}
        <DayTaskList date={this.state.date} />
      </div>
    )
  }
}

export default App;
