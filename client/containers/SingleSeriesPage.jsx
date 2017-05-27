import React from 'react';

export default class SingleSeriesPage extends React.Component {
  render() {
    return (
      <div>{this.props.computedMatch.params.id}</div>
    );
  }
}
