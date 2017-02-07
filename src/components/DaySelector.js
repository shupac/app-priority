import React from 'react';

export default (props) => {
  return (
    <div>
      <button onClick={props.handlePrevDay}>prev</button>
      <span>{props.date}</span>
      <button onClick={props.handleNextDay}>next</button>
    </div>
  );
}