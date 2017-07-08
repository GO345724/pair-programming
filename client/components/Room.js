import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Codemirror from 'react-codemirror';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button } from 'react-bootstrap';
import * as actions from '../actions/problemsActions';

import ModeSelect from './ModeSelect';
import ThemeSelect from './ThemeSelect';
import SaveButton from './SaveButton';
import UserList from './UserList';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/solarized.css';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/ruby/ruby.js';
import 'codemirror/mode/swift/swift.js';
import 'codemirror/mode/clojure/clojure.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/php/php.js';
import 'codemirror/mode/erlang/erlang.js';
import 'codemirror/mode/coffeescript/coffeescript.js';
import 'codemirror/mode/crystal/crystal.js';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      mode: 'javascript',
      theme: 'eclipse',
      users: [],
      currentlyTyping: null
    }
    this.changeMode = this.changeMode.bind(this);
    this.updateModeInState = this.updateModeInState.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.codeIsHappening = this.codeIsHappening.bind(this);
    this.updateCodeForCurrentUser = this.updateCodeForCurrentUser.bind(this);
    this.updateCurrentlyTyping = this.updateCurrentlyTyping.bind(this);
    this.clearCode = this.clearCode.bind(this);
  }

componentDidMount() {
  if(this.props.problem.id === undefined) {
    this.props.actions.getProblems();
  } else {
    const user = this.props.currentUser
    sessionStorage.setItem('currentUser', user)
    const users = [...this.state.users, this.props.currentUser]
    //socket.emit('room', {room: this.props.challenge.id, user: user});
    this.setState({users: users})
  }
  //socket.on('receive change mode', (newMode) => this.updateModeInState(newMode))
}

componentWillReceiveProps(nextProps) {
    const user = nextProps.currentUser
    const users = [...this.state.users, user]
    //socket.emit('room', {room: nextProps.challenge.id, user: user});
    this.setState({users: users})
  }

changeMode(newMode) {
    this.updateModeInState(newMode)
    //socket.emit('change mode', {mode: newMode, room: this.props.challenge.id})
  }

 updateModeInState(newMode) {
    this.setState({
      mode: newMode
    })
  }

  changeTheme(newTheme) {
      this.setState({theme: newTheme})
  }

  codeIsHappening(newCode) {
    this.updateCodeForCurrentUser(newCode)
    this.updateCurrentlyTyping()
    //socket.emit('coding event', {code: newCode, room: this.props.challenge.id, currentlyTyping: this.props.currentUser})
  }

  updateCodeForCurrentUser(newCode) {
    this.setState({
      code: newCode
    })
  }

  updateCurrentlyTyping() {
    this.setState({currentlyTyping: this.props.currentUser})
  }

  clearCode(e) {
    e.preventDefault();
    this.setState({code: ''})
    //socket.emit('coding event', {code: '', room: this.props.challenge.id})
  }

  render() {
    var options = {
        lineNumbers: true,
        mode: this.state.mode,
        theme: this.state.theme
    };
    return(
      <div>
        <h1>{this.props.problem.title}</h1>
        <p>{this.props.problem.description}</p>
        <UserList users={this.state.users} currentlyTyping={this.state.currentlyTyping}/>
        <ModeSelect mode={this.state.mode} changeMode={this.changeMode} />
        <ThemeSelect theme={this.state.theme} changeTheme={this.changeTheme}/>
        <Codemirror value={this.state.code} onChange={this.codeIsHappening} options={options}/>
        <br/>
        <SaveButton text={this.state.code} lang={this.state.mode} title={this.props.problem.title}/>
        <br/>
        <Button onClick={this.clearCode} className="col-lg-12">clear code</Button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.problems.length > 0) {
    const problem = state.problems.filter(problem => {
      return problem.id == ownProps.match.params.id
    })[0];
    const userName = sessionStorage.currentUser || state.currentUser;
    return {problem: problem, currentUser: userName}
  } else {
    return {problem: {id: '',title: '', description: '', source: ''}, currentUser: ''}
  }
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators(actions, dispatch)}
}

Room.propTypes = {
  problem: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(Room);
