import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class NoMatchUrl extends Component {

  handleHome = () => {
    const { history } = this.props;

    history.push('/');
  };


  render() {

    return (
      <div>
        <form className="addpoll">
          <div className="addbar">
            <h3 className="center">404 Page Not Found</h3>
          </div>
          <div className="nomatchbtn">
            <Button
              className="btn"
              variant="contained"
              color="primary"
              onClick={() => this.handleHome()}
            >
              Take Me Home
            </Button>
          </div>
        </form>
      </div>
    );
  }
}


export default NoMatchUrl;
