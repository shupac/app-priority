import React, { Component } from 'react';
import moment from 'moment';
import FBref from './common/firebase';
import DayTaskList from './components/DayTaskList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      date: moment().format('YYYY-MM-DD')
    }
  }
  componentWillMount() {
    FBref.child('id').once('value').then(snapshot => {
      this.setState({id: snapshot.val()});
      console.log('id', snapshot.val());
    });
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
  updateId() {
    this.setState(({id}) => {
      id += 1;
      FBref.child('id').set(id);
      return {id};
    });
  }
  render() {
    return (
      <div>
        <DaySelector
          date={this.state.date}
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
