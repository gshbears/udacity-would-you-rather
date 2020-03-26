import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { handleAddQuestion } from '../actions/questions'

class Add extends Component {
  state={
    optionOne: '',
    optionTwo: '',
  }

  handleAdd = () => {
    const { dispatch } = this.props
    const { optionOne, optionTwo } = this.state

    dispatch(handleAddQuestion(optionOne, optionTwo))
    this.setState({
      optionOne: '',
      optionTwo: '',
    });
  }

  handleTextChange = e => {

    if(e.target.id === 'option-one'){
      this.setState({
        optionOne: e.target.value,
      });
    }else{
      this.setState({
        optionTwo: e.target.value,
      });
    }
  }

  render() {
    const { optionOne, optionTwo} = this.state

    return(
      <div>
        <form className='addpoll' >
          <div className='addbar' >
            <h3 className='center' >Would You Rather? Add Poll</h3>
          </div>
          <div className='addfields'>
            <TextField id='option-one' label='Option One' onChange={this.handleTextChange} value={optionOne} />
            <span className="dot">Or</span>
            <TextField id='option-two' label='Option Two' onChange={this.handleTextChange} value={optionTwo} />
          </div>
          <div className="addbtn" >
            <Button
              className="btn"
              variant="contained"
              color="primary"
              onClick={() => this.handleAdd()}
              disabled={optionOne ==='' || optionTwo ===''}
            >
              Add Poll
            </Button>
          </div>
       </form>
      </div>
    )
  }
}

function mapStateToProps({users}){
  return{
    users: users
  }
}

export default connect(mapStateToProps)(Add)
