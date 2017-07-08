import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as problemsActions from '../actions/problemsActions';
import * as userActions from '../actions/userActions.js';

import ChooseUserName from './ChooseUserName';
import ProblemsList from './ProblemsList';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.chooseUserName = this.chooseUserName.bind(this);
  }
  componentDidMount() {
    if (this.props.problems.length == 0) {
      this.props.actions.getProblems();
    }
  }
  chooseUserName(userName) {
    this.props.actions.assignUserName(userName);
  }

  render() {
    return(
      <div>
        <ChooseUserName userName={this.props.userName} chooseUserName={this.chooseUserName} />
        <ProblemsList problems={this.props.problems} />
      </div>
    )
  }
}

HomePage.propTypes = {
  userName: PropTypes.string.isRequired,
  problems: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {problems: state.problems, userName: state.currentUser}
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators(Object.assign(userActions, problemsActions), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
