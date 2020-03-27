import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import Home from '@material-ui/icons/Home'
import AddComment from '@material-ui/icons/AddComment'
import StarsIcon from '@material-ui/icons/Stars'

const StyledTabs = withStyles({
    indicator: {
        height: 5,
        backgroundColor: '#FFFFFF',
    },
})(Tabs)

const StyledTab = withStyles({
    labelIcon: {
        minHeight: 53,
        '& $wrapper > *:first-child': {
            marginBottom: 0,
        },
    },
})(Tab)

class Nav extends Component {
    state = {
        tabIndex: 0,
    }

    handleTabChange = (newValue) => (event) => {
        const { history } = this.props
        this.setState({ ...this.state, tabIndex: newValue })

        switch (newValue) {
            case 0:
                history.push('/')
                break
            case 1:
                history.push('/add')
                break
            case 2:
                history.push('/leaderBoard')
                break
            default:
                history.push('/')
        }
    }

    render() {
        const { authid } = this.props

        return (
            <Router>
                <StyledTabs
                    variant="fullWidth"
                    value={this.state.tabIndex}
                    aria-label="nav tabs"
                >
                    <StyledTab
                        icon={<Home />}
                        disabled={authid === ''}
                        label="Home"
                        variant="fullWidth"
                        onClick={this.handleTabChange(0)}
                    />
                    <StyledTab
                        icon={<AddComment />}
                        disabled={authid === ''}
                        label="New Poll"
                        variant="fullWidth"
                        onClick={this.handleTabChange(1)}
                    />
                    <StyledTab
                        icon={<StarsIcon />}
                        disabled={authid === ''}
                        label="Leader Board"
                        variant="fullWidth"
                        onClick={this.handleTabChange(2)}
                    />
                </StyledTabs>
            </Router>
        )
    }
}

function mapStateToProps({ authid }) {
    return {
        authid: authid,
    }
}
export default withRouter(connect(mapStateToProps)(Nav))
