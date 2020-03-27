import React, { Component } from 'react'
import { connect } from 'react-redux'
import { avatars } from './../images/index'
import Avatar from '@material-ui/core/Avatar'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Button from '@material-ui/core/Button'
import { handleQuestionAnswer } from '../actions/questions'

class PollDo extends Component {
    state = {
        optionOne: true,
    }

    getAvatarURL = (userid) => {
        const { users } = this.props

        return avatars[users[userid].avatarURL].image
    }

    getCreatedDate = (timestamp) => {
        let ts = new Date(timestamp)
        return ts.toLocaleDateString()
    }

    handleOptionChange = () => {
        this.setState({
            optionOne: !this.state.optionOne,
        })
    }

    myVote = (question) => {
        return (
            <div>
                <div
                    className="userchip"
                    onClick={() => this.handleOptionChange()}
                >
                    <CheckCircleIcon className="smallIcon" />
                    <span className="chipWAtxt">I would rather</span>
                </div>
                <p>{question}</p>
            </div>
        )
    }

    noVote = (question) => {
        return (
            <div>
                <div
                    className="userchipno"
                    onClick={() => this.handleOptionChange()}
                >
                    <CheckCircleIcon className="smallIconNo" />
                    <span className="chipWAtxt">I'd rather not </span>
                </div>
                <p>{question}</p>
            </div>
        )
    }

    handleAdd = () => {
        const { optionOne } = this.state
        const { dispatch, id, history } = this.props

        let option = 'optionOne'

        if (!optionOne) {
            option = 'optionTwo'
        }

        dispatch(handleQuestionAnswer(option, id))
        history.push('/viewPoll/' + id)
    }

    render() {
        const { users, questions, id } = this.props
        const { optionOne } = this.state

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
                            <div className="optionOneGroup">
                                <div className="voterGroup">
                                    {optionOne
                                        ? this.myVote(
                                              questions[id].optionOne.text
                                          )
                                        : this.noVote(
                                              questions[id].optionOne.text
                                          )}
                                </div>
                            </div>
                            <div className="optionTwoGroup">
                                <div className="voterGroup">
                                    {!optionOne
                                        ? this.myVote(
                                              questions[id].optionTwo.text
                                          )
                                        : this.noVote(
                                              questions[id].optionTwo.text
                                          )}
                                </div>
                            </div>
                            <div className="addbtn">
                                <Button
                                    className="btn"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => this.handleAdd()}
                                >
                                    Submit Vote
                                </Button>
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
export default connect(mapStateToProps)(PollDo)
