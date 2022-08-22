import React from 'react';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';  
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView} from '../registration-view/registration-view';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: null
    };
  }

  componentDidMount(){
    axios.get('https://jackie-chan-movie-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistration(registered) {
    this.setState({
      registered
    });
  }
  
  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!registered) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;

    if (movies.length === 0) return <div className='main-view' />;
  
    return (
      <div className='main-view'>
        {selectedMovie
          ? (
            <Row>
              <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Row>
            )
            : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
        ))
      }
      </div>
    );
  }
}

export default MainView;