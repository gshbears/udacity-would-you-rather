import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { setAuthedUser } from '../actions/authedUser';
import { handleAddNewUser } from '../actions/users';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import { avatars } from './../images/index';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  state = {
    id: '',
    avatarURL: 0,
    answers: {},
    questions: [],
    newUser: false,
    newUserName: '',
    newAvatar: 0,
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

  handleNew = (value) => {
    this.setState({
      newUser: value,
    });
  };

  handleAddUserName = (e) => {
    this.setState({
      newUserName: e.target.value,
    });
  };

  handleNewUserSelect = (e) => {
    this.setState({
      newAvatar: e.target.value,
    });
  };

  handleAddUser = () => {
    const { newUserName, newAvatar } = this.state;
    const { dispatch } = this.props;

    let newId = newUserName.replace(' ', '').toLowerCase();

    dispatch(handleAddNewUser(newId, newAvatar, newUserName));
    this.setState({
      id: newId,
    });
  };

  render() {
    const { id, newUser, newUserName, newAvatar } = this.state;
    const { users, userkeys } = this.props;

    return (
      <div>
        {!newUser ? (
          <form className="login">
            <div className="bar">
              <h3 className="center">Would You Rather? Login</h3>
            </div>
            <div className="logincons">
              <InputLabel id="userName">User Name</InputLabel>
              <Select onChange={this.handleUserSelect} value={id}>
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
            <div className="btnnewUser">
              <Button
                color="primary"
                size="small"
                onClick={() => this.handleNew(true)}
              >
                New User
              </Button>
            </div>
            <div className="logbtn">
              <Button
                className="loginbtn"
                variant="contained"
                color="primary"
                disabled={id === ''}
                onClick={() => this.handleLogin()}
              >
                Sign In
              </Button>
            </div>
          </form>
        ) : (
          <form className="login">
            <div className="newuserbar">
              <h3 className="headerNew">Would You Rather? New User</h3>
              <CancelIcon
                color="primary"
                style={{ margin: 15, height: 30, width: 30 }}
                onClick={() => this.handleNew(false)}
              />
            </div>
            <div className="newlogincons">
              <div className="newAvatar">
                <InputLabel id="userName">Select Avatar</InputLabel>
                <Select
                  labelId="userName"
                  onChange={this.handleNewUserSelect}
                  value={newAvatar}
                >
                  <MenuItem value={''}></MenuItem>
                  {avatars.map((item, index) => (
                    <MenuItem value={index} key={item} className="menuitem">
                      <div className="newloginmenu">
                        <Avatar alt={String(item.image)} src={item.image} />
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="newUserField">
                <InputLabel id="userName">Enter User Name</InputLabel>
                <TextField id="username" onChange={this.handleAddUserName} />
              </div>
            </div>
            <div className="logbtn">
              <Button
                className="loginbtn"
                variant="contained"
                color="primary"
                disabled={newUserName === ''}
                onClick={() => this.handleAddUser()}
              >
                Create User
              </Button>
            </div>
          </form>
        )}
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
