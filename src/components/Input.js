import React, { Component } from 'react';

class Input extends Component {
  handleKeyPress(e) {
    if (e.key === 'Enter') this.props.submit(this.input.value);
  }
  render() {
    return <input
      ref={n => this.input = n}
      onKeyPress={this.handleKeyPress.bind(this)}
      defaultValue={this.props.defaultValue} />
  }
}

export default Input;
