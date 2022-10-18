import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import axios from 'axios';

import './movie-view.scss';

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
      <Row className="movie-view mt-5 m-auto ">
        <Col md={12} lg={6} className="movie-poster ">
          <img className="w-100" src={movie.ImagePath} />
        </Col>
        <Col md={12} lg={6} className="movie-body text-light my-auto">
          <div className="movie-title">
            <span className="label"> </span>
            <h1 className="value soft-violet">{movie.Title}</h1>
          </div>
          <div className="movie-genre">
            <span className="label"></span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button className="custom-link " variant="link">
                  <h4>{movie.Genre.Name}</h4>
                </Button>
              </Link>
          </div>
          <div className="movie-description">
            <span className="label"> </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-director mt-5">
            <span className="label">Directed by:</span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button className="custom-link " variant="link">
                  <h3>{movie.Director.Name}</h3>
                </Button>
              </Link>
          </div>
          
          <Button
            className="mx-2 mt-4"
            variant="outline-light"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
          <Button
            className="mx-2 mt-4"
            variant="outline-success"
            onClick={() => this.addFavorite(movie)}
          >
            ❤️ Add To Favorites
          </Button>
        </Col>
      </Row>
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
