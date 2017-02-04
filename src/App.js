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
  goToPrevDate() {
    this.setState(({date}) => {
      return {date: moment(date).subtract(1, 'd').format('YYYY-MM-DD')};
    });
  }
  goToNextDate() {
    this.setState(({date}) => {
      return {date: moment(date).add(1, 'd').format('YYYY-MM-DD')};
    });
  }
  render() {
    return (
      <div>
        <DaySelector
          date={this.state.date}
          handlePrevDay={this.goToPrevDate.bind(this)}
          handleNextDay={this.goToNextDate.bind(this)}/>
        <DayTaskList date={this.state.date} />
      </div>
    )
  }
}

const DaySelector = (props) => {
  return (
    <div>
      <button onClick={props.handlePrevDay}>prev</button>
      <span>{props.date}</span>
      <button onClick={props.handleNextDay}>next</button>
    </div>
  );
}

export default App;
