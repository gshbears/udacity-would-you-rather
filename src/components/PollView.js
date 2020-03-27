import React, { Component } from 'react'
import { connect } from 'react-redux'
import { avatars } from './../images/index'
import Avatar from '@material-ui/core/Avatar'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

class PollView extends Component {
    getAvatarURL = (userid) => {
        const { users } = this.props

        return avatars[users[userid].avatarURL].image
    }

    getCreatedDate = (timestamp) => {
        let ts = new Date(timestamp)
        return ts.toLocaleDateString()
    }

    checkMyVote = (votes) => {
        const { users, authid } = this.props

        if (votes.join().indexOf(authid) !== -1) {
            return (
                <div>
                    <div className="userchip">
                        <Avatar
                            alt={users[authid].name}
                            src={this.getAvatarURL(authid)}
                            style={{ width: 22, height: 22, margin: 5 }}
                        />
                        <span className="chipWAtxt">Your Vote</span>
                        <CheckCircleIcon className="smallIcon" />
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    votersChoice = (percent) => {
        if (percent > 50) {
            return (
                <div>
                    <div className="userchip">
                        <span className="chiptxt ">Voters Choice</span>
                        <CheckCircleIcon className="smallIcon" />
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    render() {
        const { users, questions, id } = this.props

        let optOne = questions[id].optionOne.votes.length
        let optTwo = questions[id].optionTwo.votes.length
        let total = optOne + optTwo

        let optionOne = Math.round((optOne / total) * 100)
        let optionTwo = Math.round((optTwo / total) * 100)

        return (
            <div>
                <form className="viewpoll">
                    <div className="addBarPoll">
                        <h3 className="center">
                            {users[questions[id].author].name} asks
                        </h3>
                    </div>
                    <div className="pollheader">
                        <div className="authorinfo">
                            <Avatar
                                alt={id}
                                style={{ width: 100, height: 100, margin: 10 }}
                                src={this.getAvatarURL(questions[id].author)}
                            />
                            <div className="polldate">
                                <span>
                                    Created on{' '}
                                    {this.getCreatedDate(
                                        questions[id].timestamp
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="pollQuestions">
                            <h2>Results </h2>
                            <div className="optionOneGroup">
                                <span className="pollinfo">
                                    Would you rather{' '}
                                    {questions[id].optionOne.text}
                                </span>
                                <div className="optionOneBar">
                                    {optionOne !== 0 ? (
                                        <div
                                            className="optionOneCount"
                                            style={{
                                                width: optionOne + '%',
                                            }}
                                        >
                                            {optionOne}%{' '}
                                        </div>
                                    ) : (
                                        <div>0%</div>
                                    )}
                                </div>
                                <span className="pollct">
                                    {optOne} out of {total} votes
                                </span>
                                <div className="voterGroup">
                                    {this.votersChoice(optionOne)}
                                    {this.checkMyVote(
                                        questions[id].optionOne.votes
                                    )}
                                </div>
                            </div>
                            <div className="optionTwoGroup">
                                <span className="pollinfo">
                                    Would you rather{' '}
                                    {questions[id].optionTwo.text}
                                </span>
                                <div className="optionTwoBar">
                                    {optionTwo !== 0 ? (
                                        <div
                                            className="optionTwoCount"
                                            style={{
                                                width: optionTwo + '%',
                                            }}
                                        >
                                            {optionTwo}%{' '}
                                        </div>
                                    ) : (
                                        <div>0%</div>
                                    )}
                                </div>
                                <span className="pollct">
                                    {optTwo} out of {total} votes
                                </span>
                                <div className="voterGroup">
                                    {this.votersChoice(optionTwo)}
                                    {this.checkMyVote(
                                        questions[id].optionTwo.votes
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authid }, props) {
    const { id } = props.match.params

    return {
        id,
        users,
        questions,
        authid,
    }
}

export default connect(mapStateToProps)(PollView)
