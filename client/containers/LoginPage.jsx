import React from 'react';

export default class Login extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;
    this.props.getToken(username, password);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" ref={(i) => this.usernameInput = i} />
        <input type="password" ref={(i) => this.passwordInput = i} />
        <button type="submit">submit</button>
      </form>
    );
  }
}
