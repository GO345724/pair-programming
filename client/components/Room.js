import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import Codemirror from 'react-codemirror';
import brace from 'brace';
import AceEditor from 'react-ace';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button } from 'react-bootstrap';
import * as actions from '../actions/problemsActions';
import io from 'socket.io-client';

import ModeSelect from './ModeSelect';
import ThemeSelect from './ThemeSelect';
import SaveButton from './SaveButton';
import UserList from './UserList';

import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/mode/xml';
import 'brace/mode/ruby';
import 'brace/mode/sass';
import 'brace/mode/markdown';
import 'brace/mode/mysql';
import 'brace/mode/json';
import 'brace/mode/html';
import 'brace/mode/handlebars';
import 'brace/mode/golang';
import 'brace/mode/csharp';
import 'brace/mode/elixir';
import 'brace/mode/typescript';
import 'brace/mode/css';

import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      mode: 'javascript',
      theme: 'monokai',
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
    this.joinUser = this.joinUser.bind(this);
    this.sendUsersAndCode = this.sendUsersAndCode.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.updateCodeInState = this.updateCodeInState.bind(this);
    this.updateUsersAndCodeInState = this.updateUsersAndCodeInState.bind(this);
  }

componentDidMount() {
  this.socket = io('/');
  if(this.props.problem.id === undefined) {
    this.props.actions.getProblems();
  } else {
    const user = this.props.currentUser
    sessionStorage.setItem('currentUser', user)
    const users = [...this.state.users, this.props.currentUser]
    this.socket.emit('room', {room: this.props.problem.id, user: user});
    this.setState({users: users})
  }
  this.socket.on('receive code', this.updateCodeInState);
  this.socket.on('new user join', this.joinUser);
  this.socket.on('load users and code', this.sendUsersAndCode);
  this.socket.on('receive users and code', this.updateUsersAndCodeInState);
  this.socket.on('user left room', this.removeUser);
  this.socket.on('receive change mode', this.updateModeInState);
}

joinUser(user) {
    const combinedUsers = [...this.state.users, user];
    const newUsers = Array.from(new Set(combinedUsers));
    const cleanUsers = newUsers.filter(user => {return user.length > 1});
    this.setState({users: cleanUsers});
}
updateUsersAndCodeInState(payload) {
  console.log(payload);
  const combinedUsers = this.state.users.concat(payload.users)
  const newUsers = Array.from(new Set(combinedUsers));
  const cleanUsers = newUsers.filter(user => {return user.length > 1})
  this.setState({users: cleanUsers, code: payload.code})
}
sendUsersAndCode() {
    this.socket.emit('send users and code', {room: this.props.problem.id, users: this.state.users, code: this.state.code})
}
removeUser(user) {
    const newUsers = Object.assign([], this.state.users);
    const indexOfUserToDelete = this.state.users.findIndex(Olduser => {return Olduser == user.user})
    newUsers.splice(indexOfUserToDelete, 1);
    this.setState({users: newUsers})
}
updateCodeInState(payload) {
  console.log(payload);
  this.setState({
    code: payload.code,
    currentlyTyping: payload.currentlyTyping
  });
}
componentWillReceiveProps(nextProps) {
    const user = nextProps.currentUser
    const users = [...this.state.users, user]
    this.socket.emit('room', {room: nextProps.problem.id, user: user});
    this.setState({users: users})
  }

changeMode(newMode) {
    this.updateModeInState(newMode)
    this.socket.emit('change mode', {mode: newMode, room: this.props.problem.id})
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
    this.socket.emit('coding event', {code: newCode, room: this.props.problem.id, currentlyTyping: this.props.currentUser})
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
    this.socket.emit('coding event', {code: '', room: this.props.problem.id})
  }

  render() {
    var options = {
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      enableSnippets: false,
      showLineNumbers: true
    };
    return(
      <div>
      <div className="row">
        <h1>{this.props.problem.title}</h1>
      </div>
      <div className="row">
        <p>{this.props.problem.description}</p>
      </div>
      <div className="row">
        <div className="col-xs-6 col-md-6 col-lg-6">
          <ModeSelect mode={this.state.mode} changeMode={this.changeMode} />
        </div>
        <div className="col-xs-6 col-md-6 col-lg-6">
          <ThemeSelect theme={this.state.theme} changeTheme={this.changeTheme}/>
        </div>
      </div>
      <div className="row">
      <div className="col-xs-3 col-md-3 col-lg-3">
        <div className="row">
          <UserList users={this.state.users} currentlyTyping={this.state.currentlyTyping}/>
        </div>
        <div className="row">
          <SaveButton text={this.state.code} lang={this.state.mode} title={this.props.problem.title}/>
        </div>
        <div className="row">
          <Button onClick={this.clearCode} className="col-lg-12">Clear Code</Button>
        </div>
      </div>
      <div className="col-xs-9 col-md-9 col-lg-9">
        <AceEditor
          value={this.state.code}
          mode={this.state.mode}
          theme={this.state.theme}
          onChange={this.codeIsHappening}
          setOptions={options}
          fontSize={18}
          width="100%"
        />
      </div>
      </div>
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
