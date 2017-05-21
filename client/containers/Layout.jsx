import React from 'react';

import StyleSheet from '../components/StyleSheet.jsx';

export default class Layout extends React.Component {
  render() {
    return (
      <StyleSheet>
        { React.cloneElement(this.props.children, this.props) }
      </StyleSheet>
    );
  }
}
