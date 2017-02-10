import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const counter = (state = 0, action) => {
  if (action.type === 'INCREMENT') return state + 1;
  else if (action.type === 'DECREMENT') return state - 1;
  else return state;
}

const store = createStore(counter);

const onIncrement = () => {
  store.dispatch({type: 'INCREMENT'});
};

const onDecrement = () => {
  store.dispatch({type: 'DECREMENT'});
};

const Counter = () => (
  <div>
    <h1>{store.getState()}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)

const render = () => {
  ReactDOM.render(<Counter />, document.getElementById('root'));
}
store.subscribe(render);

render();
// export default Counter
