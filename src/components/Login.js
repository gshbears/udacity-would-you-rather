import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { setAuthedUser } from '../actions/authedUser';
import InputLabel from '@material-ui/core/InputLabel';
import { avatars } from './../images/index';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  state = {
    id: '',
    avatarURL: 0,
    answers: {},
    questions: [],
  };

  handleLogin = (username) => {
    const { dispatch, history } = this.props;

    dispatch(setAuthedUser(this.state.id));
    history.push('/');
  };

  handleUserSelect = (e) => {
    this.setState({
      id: e.target.value,
    });
  };

  render() {
    const { id } = this.state;
    const { users, userkeys } = this.props;

    return (
      <div>
        <form className="login">
          <div className="bar">
            <h3 className="center">Would You Rather? Login</h3>
          </div>
          <div className="logincons">
            <InputLabel id="userName">User Name</InputLabel>
            <Select
              className="loginsel"
              onChange={this.handleUserSelect}
              value={id}
            >
              <MenuItem value={''}></MenuItem>
              {userkeys.map((userid) => (
                <MenuItem value={userid} key={userid} className="menuitem">
                  <div className="loginmenu">
                    <Avatar
                      alt={users[userid].name}
                      src={avatars[users[userid].avatarURL].image}
                    />
                    <span className="menuitem">{users[userid].name}</span>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="logbtn">
            <Button
              className="loginbtn"
              variant="contained"
              color="primary"
              onClick={() => this.handleLogin()}
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: users,
    userkeys: Object.keys(users),
  };
}

export default withRouter(connect(mapStateToProps)(Login));
