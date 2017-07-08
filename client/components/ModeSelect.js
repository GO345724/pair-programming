import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';

class ModeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modes : ['javascript', 'java', 'python', 'xml', 'ruby', 'sass', 'markdown', 'mysql', 'json', 'html', 'handlebars', 'golang', 'csharp', 'elixir', 'typescript', 'css']
    }
    this.triggerChangeMode = this.triggerChangeMode.bind(this);
  }

  triggerChangeMode(e) {
    this.props.changeMode(e.target.value);
  }
  render() {
    const { modes } = this.state;
    const selectMode = modes.map((mode, index) => {
      if(mode === this.props.mode) {
        return <option key={index} value={mode} selected>{mode}</option>
      } else {
        return <option key={index} value={mode}>{mode}</option>
      }
    })
    return(
      <FormGroup controlId="formControlsSelect" onChange={this.triggerChangeMode}>
        <ControlLabel>change language</ControlLabel>
        <FormControl componentClass="select">
          {selectMode}
        </FormControl>
      </FormGroup>
    )
  }
}
ModeSelect.propTypes = {
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired
}
export default ModeSelect;
