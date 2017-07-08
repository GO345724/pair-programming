import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import PropTypes from 'prop-types';

class ProblemsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const list = this.props.problems.map((problem, i) => {
      return (<ListGroupItem key={i}>
                <Link to={`/rooms/${problem.id}`}>
                  {problem.title}
                </Link>
              </ListGroupItem>
            )
    });
    return(
      <ListGroup style={{height: '60%'}}>
        {list}
      </ListGroup>
    )
  }
}
ProblemsList.propTypes = {
  problems: PropTypes.array.isRequired
}
export default ProblemsList;
