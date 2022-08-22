import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
  
  render() {
    const { movieData, onBackClick} = this.props;
    
    return (
      <div className='movie-view'>
        <div className='movie-poster'>
          <img src={movieData.ImagePath} />
        </div>
        <div className='movie-title'>
          <span className='label'>Title: </span>
          <span className='value'>{movieData.Title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description: </span>
          <span className='value'>{movieData.Description} </span>
        </div>
        <button onClick={() => { onBackClick(null);}}>Back</button>
      </div>
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