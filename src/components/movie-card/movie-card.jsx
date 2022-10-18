import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className='card-container movie-card movie-card-col mb-2'>
        <Card.Body className='card p-0'>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img className='card-img' src={movie.ImagePath} />
          </Link>
        </Card.Body>
        <Link to={`/movies/${movie._id}`}>
          <div className='title-container text-white'>
            <p className='card-title'>
            {movie.Title}
            </p>
          </div>
        </Link> 
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func,
};
