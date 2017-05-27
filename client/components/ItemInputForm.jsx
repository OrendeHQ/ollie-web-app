import React from 'react';
import {
  Form, Input, Label, FormGroup, Button, Col, Row
} from 'reactstrap';

export default class ItemInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('model_number', this.modelNoInput.value);
    formData.append('description', this.descriptionInput.value);
    formData.append('wattage', this.wattInput.value);
    formData.append('lamp_base', this.baseInput.value);
    formData.append('lamp_life', this.lifeInput.value);
    formData.append('color_temp', this.tempInput.value);
    formData.append('price', this.priceInput.value);
    if (this.fileInput.files.length === 1) {
      formData.append('picture', this.fileInput.files[0], this.fileInput.files[0].name);
    }
    formData.append('series_id', this.props.series);
    if (this.props.edit) formData.append('id', this.props.defaultValue.id);
    this.props.onSubmit(this.props.token, formData);
    this.props.onCancel();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Model Number</Label>
          <Input type="text" getRef={(i) => this.modelNoInput = i}
            placeholder="Model Number..."
            defaultValue={
              this.props.edit
                ? this.props.defaultValue.model_number
                : ''
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input type="textarea" getRef={(i) => this.descriptionInput = i}
            placeholder="Description..."
            defaultValue={
              this.props.edit
                ? this.props.defaultValue.description
                : ''
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Wattage</Label>
          <Input type="number" getRef={(i) => this.wattInput = i}
            step="0.1"
            placeholder="Wattage..."
            defaultValue={
              this.props.edit
                ? this.props.defaultValue.wattage
                : null
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Lamp Base</Label>
          <Input type="text" getRef={(i) => this.baseInput = i}
            placeholder="Lamp Base..."
            defaultValue={
              this.props.edit
                ? this.props.defaultValue.lamp_base
                : null
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Lamp Life</Label>
          <Input type="number" getRef={(i) => this.lifeInput = i}
            placeholder="Lamp Life..."
            defaultValue={
              this.props.edit
                ? this.props.defaultValue.lamp_life
                : null
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Color Temperature</Label>
          <Input type="string" getRef={(i) => this.tempInput = i}
            placeholder="Color Temperature..."
            defaultValue={
              this.props.edit
                ? this.props.defaultValue.color_temp
                : ''
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input type="number" getRef={(i) => this.priceInput = i}
            placeholder="Price..."
            step="0.01"
            defaultValue={
              this.props.edit
                ? this.props.defaultValue.price
                : null
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Picture</Label>
          <Row>
            <Col md="6">
              <Input type="file" getRef={(i) => this.fileInput = i} accept="image/*" />
            </Col>
            <Col md="6">
              {this.props.edit &&
                <img className="img-fluid" src={this.props.defaultValue.picture} />}
            </Col>
          </Row>
        </FormGroup>
        <Button color="success" type="submit">Submit</Button>
        <Button color="secondary" type="button" onClick={this.props.onCancel}>
          Cancel
        </Button>
      </Form>
    );
  }
}
