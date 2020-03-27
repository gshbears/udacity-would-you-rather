import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitalData } from '../actions/multiple'
import LoadingBar from 'react-redux-loading-bar'
import Nav from './Nav'
import AppBar from '@material-ui/core/AppBar'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import Add from './Add'
import Home from './Home'
import PollDo from './PollDo'
import PollView from './PollView'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { avatars } from './../images/index'
import { setAuthedUser } from '../actions/authedUser'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitalData())
    }

    handleLogoff = (username) => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(''))
    }

    render() {
        const { users, authid } = this.props
        let userName = ''
        let userAvatar = ''
        if (users && authid) {
            userName =
                users[authid].name === undefined ? '' : users[authid].name
            userAvatar =
                users[authid].avatarURL === undefined
                    ? ''
                    : avatars[users[authid].avatarURL].image
        }
        return (
            <Router>
                <Fragment>
                    <LoadingBar
                        style={{ backgroundColor: 'orange', height: '5px' }}
                    />
                    <div className="container">
                        <AppBar position="static" className="barcont">
                            <Toolbar className="appbar">
                                <Nav />
                                <div className="authuser">
                                    <p className="userName">{userName}</p>
                                    <Avatar alt={userName} src={userAvatar} />
                                    <Button
                                        color="inherit"
                                        onClick={() =>
                                            this.handleLogoff(userName)
                                        }
                                    >
                                        {userName ? 'sign off' : ''}
                                    </Button>
                                </div>
                            </Toolbar>
                        </AppBar>
                        {this.props.loading ? null : (
                            <div>
                                {authid === '' ? (
                                    <Login />
                                ) : (
                                    <div>
                                        <Route
                                            path="/"
                                            exact
                                            component={Home}
                                        />
                                        <Route
                                            path="/leaderBoard"
                                            exact
                                            component={LeaderBoard}
                                        />
                                        <Route
                                            path="/add"
                                            exact
                                            component={Add}
                                        />
                                        <Route
                                            path="/viewPoll/:id?"
                                            exact
                                            component={PollView}
                                        />
                                        <Route
                                            path="/doPoll/:id?"
                                            exact
                                            component={PollDo}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({ users, authid }) {
    return {
        loading: Object.keys(users).length === 0,
        authid: authid,
        users: users,
    }
}

export default connect(mapStateToProps)(App)
