import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import axios from 'axios';

// import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();
    this.stae = {};
  }

  addFavorite(movie) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios
      .post(
        `https://jackie-chan-movie-api.herokuapp.com/users/${user}` +
          '/favorites/add/' +
          this.props.movie._id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert(this.props.movie.Title + ' has been added to your favorites!');
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card>
        <Card.Img variant='top' src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>
            {movie.Title} -{' '}
            <Link to={`/genres/${movie.Genre.Name}`}>
              {movie.Genre.Name}
            </Link>
          </Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Title>
            Directed by{' '}
            <Link to={`/directors/${movie.Director.Name}`}>
              {movie.Director.Name}
            </Link>
          </Card.Title>
          <Card.Text>D.O.B. {movie.Director.Birth}</Card.Text>
          <Card.Text>{movie.Director.Bio}</Card.Text>
          <Button variant='primary' onClick={() => onBackClick(null)}>
            Back
          </Button>{' '}
          <Button
            variant="outline-success"
            onClick={() => this.addFavorite(movie)}
          >
            ❤️ Add To Favorites
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Actors: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
