import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';

class ChooseUserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
    this.updateState = this.updateState.bind(this);
    this.triggerChooseUserName = this.triggerChooseUserName.bind(this);
  }

  updateState(event) {
    let userName = event.target.value;
    this.setState({userName});
  }

  triggerChooseUserName(event) {
    event.preventDefault();
    this.props.chooseUserName(this.state.userName);
  }
  render() {
    return(
      <div>
        <Form inline>
          <FormGroup controlId="formInlineUserName">
            <FormControl type="text" defaultValue={this.props.userName} onChange={this.updateState}/>
            {' '}
            <Button type="submit" onClick={this.triggerChooseUserName} disabled={!this.state.userName}>
              Choose Username
            </Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
ChooseUserName.propTypes = {
  userName: PropTypes.string.isRequired,
  chooseUserName: PropTypes.func.isRequired
}
export default ChooseUserName;
