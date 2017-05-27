import React from 'react';
import {
  Container, Row, Col, Button, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { SUCCESS, LOADING, FAIL } from '../constants/ajaxStatus';
import ItemsListItem from '../components/ItemsListItem.jsx';
import ItemInputForm from '../components/ItemInputForm.jsx';

export default class SingleSeriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  componentWillMount() {
    if (this.props.series.status !== SUCCESS) this.props.getSeries(this.props.token.value);
    this.props.getItemsOfSeries(this.props.token.value, this.props.computedMatch.params.id);
  }

  render() {
    const id = parseInt(this.props.computedMatch.params.id);
    return (
      <Container style={{ marginTop: '50px' }}>
        <Row>
          <Col xs="12">
            <h1 className="text-center">
              {this.props.series.status === SUCCESS &&
                this.props.series.value.find((s) => s.id === id).name}
            </h1>
            <Button color="success" className="mx-auto block" onClick={this.toggle}>
              + Add New Item
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
              <ModalHeader toggle={this.toggle}>Add New Item</ModalHeader>
              <ModalBody>
                <ItemInputForm onCancel={this.toggle}
                  onSubmit={this.props.addNewItem}
                  token={this.props.token.value}
                  series={this.props.computedMatch.params.id}
                />
              </ModalBody>
            </Modal>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs="12">
            {this.props.items.status === LOADING &&
              <h4 className="text-center">Loading...</h4>}
            {this.props.items.status === FAIL &&
              <h4 className="text-center">Error! {this.props.items.error}</h4>}
            {this.props.items.status === SUCCESS &&
              this.props.items.value.map((i) =>
              <ItemsListItem key={i.id} {...i}
                removeItem={this.props.removeItem}
                editItem={this.props.editItem}
                token={this.props.token.value}
                series={this.props.computedMatch.params.id}
              />)}
          </Col>
        </Row>
      </Container>
    );
  }
}
