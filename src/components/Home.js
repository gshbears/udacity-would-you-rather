import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import Avatar from '@material-ui/core/Avatar';
import { avatars } from './../images/index';

class Home extends Component {
  state = {
    questionid: [],
  };

  componentDidMount() {
    const { questionid } = this.props;

    this.setState({
      questionid: questionid,
    });
  }

  handleAnswered = () => {
    const { answered } = this.props;

    this.setState({
      questionid: answered,
    });
  };

  handleUnAnswered = () => {
    const { unAnswered } = this.props;

    this.setState({
      questionid: unAnswered,
    });
  };

  handleALL = () => {
    const { questionid } = this.props;

    this.setState({
      questionid: questionid,
    });
  };

  handleView = (id) => {
    const { history, answered } = this.props;

    if (answered.join().indexOf(id) !== -1) {
      history.push('/viewPoll/' + id);
    } else {
      history.push('/doPoll/' + id);
    }
  };

  getAvatarURL = (userid) => {
    const { users } = this.props;

    return avatars[users[userid].avatarURL].image;
  };

  getCreatedDate = (timestamp) => {
    let ts = new Date(timestamp);
    return ts.toLocaleDateString();
  };

  render() {
    const { questions, answered, users } = this.props;

    return (
      <div>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => this.handleALL()}>All</Button>
          <Button onClick={() => this.handleAnswered()}>Answered</Button>
          <Button onClick={() => this.handleUnAnswered()}>
            Unanswered{' '}
            <AssignmentLateIcon style={{ color: 'f90', fontSize: 30 }} />
          </Button>
        </ButtonGroup>
        <div className="homegrid">
          {this.state.questionid.map((id) => (
            <form
              className={
                answered.join().indexOf(id) !== -1 ? 'homepoll' : 'homepollU'
              }
              key={id}
            >
              <div className="addBarPoll">
                {answered.join().indexOf(id) !== -1 ? (
                  <div></div>
                ) : (
                  <AssignmentLateIcon
                    className="appIcon"
                    style={{ color: 'f90', fontSize: 30 }}
                  />
                )}
                <h3 className="center">
                  {users[questions[id].author].name} asks
                </h3>
              </div>
              <div className="pollheader">
                <Avatar
                  alt={id}
                  style={{
                    width: 100,
                    height: 100,
                    margin: 20,
                  }}
                  src={this.getAvatarURL(questions[id].author)}
                />
                <div className="homeQuestion">
                  <span className="homehead">Would You Rather : </span>
                  <span className="hometxt">
                    {questions[id].optionOne.text.substr(0, 14)} ...
                  </span>
                  <Button
                    className="viewbtn"
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleView(id)}
                  >
                    View Poll
                  </Button>
                </div>
              </div>
              <div className="pollfooter">
                <span>
                  Created on {this.getCreatedDate(questions[id].timestamp)}
                </span>
              </div>
            </form>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, authid, users }) {
  const questionid = questions
    ? Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
      )
    : undefined;

  const answered =
    users && authid && questions
      ? questionid.filter((key) => {
          return users[authid].answers[key] !== undefined;
        })
      : undefined;

  const unAnswered =
    users && authid && questions
      ? questionid.filter((key) => {
          return users[authid].answers[key] === undefined;
        })
      : undefined;

  return {
    questionid: questionid,
    questions: questions,
    authid: authid,
    users: users,
    answered: answered,
    unAnswered: unAnswered,
  };
}

export default connect(mapStateToProps)(Home);
