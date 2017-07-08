import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';

class ThemeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themes : ['monokai', 'github', 'tomorrow', 'kuroir', 'twilight', 'xcode', 'textmate', 'solarized_dark', 'solarized_light', 'terminal']
    }
    this.triggerChangeTheme = this.triggerChangeTheme.bind(this);
  }

  triggerChangeTheme(e) {
    this.props.changeTheme(e.target.value);
  }

  render() {
    const { themes } = this.state;
    const selectTheme = themes.map((theme, index) => {
      if (theme == this.props.theme) {
        return <option key={index} value={theme} selected>{theme}</option>
      } else {
        return <option key={index} value={theme}>{theme}</option>
      }
    })
    return(
      <FormGroup controlId="formControlsSelect" onChange={this.triggerChangeTheme}>
        <ControlLabel>change theme</ControlLabel>
        <FormControl componentClass="select">
          {selectTheme}
        </FormControl>
      </FormGroup>
    )
  }
}
ThemeSelect.propTypes = {
  theme: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired
}
export default ThemeSelect;
