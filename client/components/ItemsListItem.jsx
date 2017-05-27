import React from 'react';
import {
  ListGroupItem, Button, Modal, ModalBody, ModalHeader
} from 'reactstrap';

import ItemInputForm from './ItemInputForm.jsx';

export default class ItemsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.toggle = this.toggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  handleRemove() {
    this.props.removeItem(this.props.token, this.props.id);
  }

  render() {
    return (
      <ListGroupItem>
        {this.props.model_number}
        <div className="ml-auto">
          <Button color="primary" size="sm" onClick={this.toggle}>Edit</Button>
          <Button color="danger" size="sm" onClick={this.handleRemove}>
            Delete
          </Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
            <ItemInputForm edit defaultValue={this.props}
              onCancel={this.toggle}
              onSubmit={this.props.editItem}
              token={this.props.token}
              series={this.props.series}
            />
          </ModalBody>
        </Modal>
      </ListGroupItem>
    );
  }
}
