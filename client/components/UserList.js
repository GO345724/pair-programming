import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import PropTypes from 'prop-types';

const styles = {
  textGlow : {
    textShadow: "#6AD8C9 0 0 10px"
  },
  typing : {
    fontSize: '14px',
    fontStyle: 'italic',
    opacity: '.5'
  },
  spanStyle: {
    padding: "5px"
  },
  iconStyle: {
    fontSize: "15px",
    color: "#056709"
  }
}

class UserList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const list = this.props.users.map((user, index) => {
      if(user === this.props.currentlyTyping) {
        return <ListGroupItem key={index} style={styles.textGlow}><span style={styles.spanStyle}><i className="material-icons" style={styles.iconStyle}>mode_edit</i></span>{user}   <span style={styles.typing}>typing...</span></ListGroupItem>
      } else {
        return <ListGroupItem key={index}><span style={styles.spanStyle}><i className="material-icons" style={styles.iconStyle}>computer</i></span>{user}</ListGroupItem>
      }
    })
    return(
      <ListGroup>{list}</ListGroup>
    )
  }
}
UserList.propTypes = {
  users: PropTypes.array.isRequired,
  currentlyTyping: PropTypes.string
}
export default UserList;
