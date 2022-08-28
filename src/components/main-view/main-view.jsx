import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

  // componentDidMount(){
  //   axios.get('https://jackie-chan-movie-api.herokuapp.com/movies')
  //     .then(response => {
  //       this.setState({
  //         movies: response.data
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
    }
    this.getMovies(accessToken);
  }

  getMovies(token) {
    axios.get('https://jackie-chan-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
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
      <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movieData={selectedMovie} onBackClick=   {newSelectedMovie => { this.setSelectedMovie  (newSelectedMovie); }} />
              </Col>
              )
              : movies.map(movie => (
                  <Col md={3}>
                    <MovieCard key={movie._id} movieData={movie}  onMovieClick={newSelectedMovie => { this.  setSelectedMovie(newSelectedMovie); }} />
                  </Col>
              ))
          }
      </Row>
    );
  }
}

export default MainView;