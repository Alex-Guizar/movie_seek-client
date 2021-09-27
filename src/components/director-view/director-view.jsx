import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    
    return (
      <Card>
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <Card.Text>Birth Year: {director.Birth}</Card.Text>
          {director.Death !== null && <Card.Text>Death: {director.Death}</Card.Text>}
          <Button onClick={() => onBackClick()}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    Death: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ])
  }),
  onBackClick: PropTypes.func.isRequired
};