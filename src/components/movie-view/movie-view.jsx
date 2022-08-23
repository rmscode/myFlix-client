import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export class MovieView extends React.Component {
  
  render() {
    const { movieData, onBackClick} = this.props;
    
    return (
      <Card>
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title} - {movieData.Genre.Name}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Card.Title>Directed by {movieData.Director.Name}</Card.Title>
          <Card.Text>D.O.B. {movieData.Director.Birth}</Card.Text>
          <Card.Text>{movieData.Director.Bio}</Card.Text>
          <Button 
          variant="primary" 
          onClick={() => onBackClick(null)} >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Actors: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};