import React from 'react';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.clearToken}>logout</button>
      </div>
    );
  }
}
