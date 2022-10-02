import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  getUser = (token) => {
    const Username = localStorage.getItem('user');
    axios
      .get(`https://jackie-chan-movie-api.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getUserFavs = (token) => {
    axios
      .get(
        'https://jackie-chan-movie-api.herokuapp.com/users/' +
          localStorage.getItem('user'),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies,
        });
      });
  };

  removeFav(movie) {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    axios
      .delete(
        `https://jackie-chan-movie-api.herokuapp.com/users/${Username}/favorites/remove/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert('Removed from favorites!');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Update user
  editUser = (e) => {
    // e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .put(
        `https://jackie-chan-movie-api.herokuapp.com/users/${Username}/edit`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert('Profile updated successfully.');
        window.open(`/users/${Username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Delete user
  onDeleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(
        `https://jackie-chan-movie-api.herokuapp.com/users/${Username}/remove`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Your profile has been deleted. We're sad to see you go!");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open(`/`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Set user values
  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  render() {
    const { movies } = this.props;
    const { FavoriteMovies, Username, Email, Birthday } = this.state;

    return (
        <Row>
          <Col>
            <p></p>
            <Card className='user-profile'>
              <Card.Header>Profile Details</Card.Header>
              <Card.Body>
                <>
                  <p>Username: {Username}</p>
                  <p>Email: {Email}</p>
                  <p>Birthday: {Birthday}</p>
                </>
              </Card.Body>
            </Card>
            <p></p>
            <Card className='update-profile'>
              <Card.Header>Update Profile</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form
                    className='update-form'
                    onSubmit={(e) =>
                      this.editUser(
                        e,
                        this.Username,
                        this.Password,
                        this.Email,
                        this.Birthday
                      )
                    }
                  >
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type='text'
                        name='Username'
                        placeholder='New Username'
                        onChange={(e) => this.setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        name='Password'
                        placeholder='New Password'
                        onChange={(e) => this.setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        name='Email'
                        placeholder='New Email'
                        onChange={(e) => this.setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control
                        type='date'
                        name='Birthday'
                        onChange={(e) => this.setBirthday(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button
                        variant='warning'
                        type='submit'
                        onClick={() => this.editUser()}
                      >
                        Update Profile
                      </Button>{' '}
                      <Button
                        className='delete-button'
                        variant='danger'
                        onClick={() => this.onDeleteUser()}
                      >
                        Delete User
                      </Button>
                    </Form.Group>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
            <p></p>

            <Card>
              <Card.Header>Favorite Movies</Card.Header>
              <Card.Body>
              {FavoriteMovies.length === 0 && (
                <div className="text-center text-dark m-auto">
                  Your don`t have favorite movies yet!
                </div>
              )}

              <Row className="d-flex justify-content-center">
                {movies.map((movie) => {
                  if (
                    movie._id === FavoriteMovies.find((m) => m === movie._id)
                  ) {
                    return (
                      <Col
                        sm={12}
                        lg={6}
                        xl={4}
                        className="text-center justify-content-center"
                        key={movie._id}
                      >
                        <Row>
                          <Col
                            className="m-auto image-container-profile"
                            sm={12}
                            md={6}
                          >
                            <img
                              className="w-100 m-auto mt-2"
                              src={movie.ImagePath}
                            />
                            <p>{movie.Title}</p>

                            <Button
                              className="remove-favorite w-50 px-6 mt-5 m-auto mt-2 custom-remove"
                              variant="danger"
                              value={movie._id}
                              onClick={() => {
                                this.removeFav(movie);
                              }}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    );
                  }
                })}
              </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    );
  }
}

ProfileView.propTypes = {
  username: PropTypes.shape({
    FavoriteMovies: PropTypes.array.isRequired,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }),
};