import React from 'react';
import { ListGroupItem, Button, Input, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  display: flex;
  width: 100%;
`;

export default class SeriesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
    this.toggle = this.toggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  toggle() {
    this.setState({ edit: !this.state.edit });
  }

  handleEdit(e) {
    e.preventDefault();
    const { id, editSeries, token } = this.props;
    const name = this.newNameInput.value;
    editSeries(token, { id, name });
    this.setState({ edit: false });
  }

  render() {
    return (
      <div>
        {this.state.edit
          ? <ListGroupItem>
              <StyledForm onSubmit={this.handleEdit}>
                <Input type="text" getRef={(i) => this.newNameInput = i}
                  defaultValue={this.props.name}
                  placeholder="Enter New Name..."
                  className="col-md-8"
                />
                <div className="ml-auto">
                  <Button color="success" type="submit">
                    Save
                  </Button>
                  <Button color="secondary" onClick={this.toggle} type="button">
                    Cancel
                  </Button>
                </div>
              </StyledForm>
            </ListGroupItem>
          : <ListGroupItem>
              {this.props.name}
              <div className="ml-auto">
                <Link to={`/admin/series/${this.props.id}`}>
                  <Button color="warning" size="sm">View</Button>
                </Link>
                <Button color="primary" size="sm" onClick={this.toggle}>Edit</Button>
                <Button color="danger" size="sm"
                  onClick={this.props.removeSeries.bind(this, this.props.token, this.props.id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroupItem>}
      </div>
    );
  }
}
