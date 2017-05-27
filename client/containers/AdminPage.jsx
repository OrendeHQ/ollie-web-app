import React from 'react';
import {
  Container, Row, Col, Input, InputGroup, Button, InputGroupButton,
  Form
} from 'reactstrap';

import { LOADING, SUCCESS, FAIL } from '../constants/ajaxStatus';
import SeriesListItem from '../components/SeriesListItem.jsx';

export default class AdminPage extends React.Component {
  componentWillMount() {
    this.props.getSeries(this.props.token.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.seriesInput.value;
    this.props.addSeries(this.props.token.value, name);
    this.seriesInput.value = '';
  }

  render() {
    return (
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col xs="12">
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <InputGroup>
                <Input type="text" getRef={(i) => this.seriesInput = i}
                  placeholder="Enter New Series Name..."
                />
                <InputGroupButton>
                  <Button type="submit" color="success">Add</Button>
                </InputGroupButton>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs="12">
            {this.props.series.status === LOADING &&
              <h4 className="text-center">Loading...</h4>}
            {this.props.series.status ===  FAIL &&
              <h4 className="text-center">Error! {this.props.series.error}</h4>}
            {this.props.series.status === SUCCESS &&
              this.props.series.value.map((s) =>
                <SeriesListItem key={s.id}
                  {...s}
                  token={this.props.token.value}
                  removeSeries={this.props.removeSeries}
                  editSeries={this.props.editSeries}
                />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
