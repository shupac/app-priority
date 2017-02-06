import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import moment from 'moment';
import FBref from './common/firebase';
import DayTaskList from './components/DayTaskList';
import LongTermGoals from './components/LongTermGoals';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentWillMount() {
    this.setDateState(this.props.params.date);
    FBref.child('id').once('value').then(snapshot => {
      this.setState({id: snapshot.val()});
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setDateState(nextProps.params.date);
  }
  setDateState(date) {
    if (date) this.setState({date});
    else hashHistory.push(moment().format('YYYY-MM-DD'));
  }
  goToPrevDate() {
    this.setState(({date}) => {
      const newDate = moment(date).subtract(1, 'd').format('YYYY-MM-DD')
      hashHistory.push(newDate);
    });
  }
  goToNextDate() {
    this.setState(({date}) => {
      const newDate = moment(date).add(1, 'd').format('YYYY-MM-DD')
      hashHistory.push(newDate);
    });
  }
  updateId() {
    this.setState(({id}) => {
      id += 1;
      FBref.child('id').set(id);
      return {id};
    });
  }
  render() {
    if (!this.state.date) return;
    return (
      <div>
        <LongTermGoals />
        <h2>Daily Priorities</h2>
        <DaySelector
          date={moment(this.state.date).format('ddd, M/D')}
          handlePrevDay={this.goToPrevDate.bind(this)}
          handleNextDay={this.goToNextDate.bind(this)}/>
        <DayTaskList date={this.state.date} id={this.state.id} updateId={this.updateId.bind(this)} />
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
