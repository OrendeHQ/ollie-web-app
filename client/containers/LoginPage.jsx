import React from 'react';
import {
  Container, Row, Col, Form, Input, Button, FormGroup, Label
} from 'reactstrap';
import styled from 'styled-components';

import { LOADING } from '../constants/ajaxStatus';

const StyledContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class Login extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;
    this.props.getToken(username, password);
  }

  render() {
    return (
      <StyledContainer>
        <Row className="full-width">
          <Col md={{ size: 6, offset: 3 }}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup>
                <Label>Username</Label>
                <Input type="text" getRef={(i) => this.usernameInput = i}
                  placeholder="Username..."
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" getRef={(i) => this.passwordInput = i}
                  placeholder="Password..."
                />
              </FormGroup>
              <Button type="submit" color="success" className="full-width">
                {this.props.token.status === LOADING ? 'Logging In' : 'Login'}
              </Button>
            </Form>
          </Col>
        </Row>
      </StyledContainer>
    );
  }
}
