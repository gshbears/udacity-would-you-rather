import React, { Component } from 'react'
import { connect } from 'react-redux'
import { avatars } from './../images/index'
import { grey, brown, amber } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  body: {
    fontSize: 18,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const getBoardData = (users, userids) => {

  let data = []
  let rank = 0
  let prevTotal = 0

  //initalize leaderBoard calculate numbers
  userids.forEach(function(user) {
    let answered = Object.keys(users[user].answers).length;
    let created = Object.keys(users[user].questions).length;
       data.push({
         ranked: 0,
         name: users[user].name,
         avatarURL: users[user].avatarURL,
         answered: answered,
         created: created,
         total:  answered + created})
   });
  // Sort on totals to determine ranking
  data.sort((a, b) => (b.total > a.total) ? 1 : (a.total === b.total) ? ((b.created > a.created) ? 1 : -1) : -1 )

  data.forEach((item, i) => {
    if (prevTotal === item.total) {
         // This is a tie and ranking would be same and skip next rank
       item.ranked = getRankstring(rank)
       rank += 1
    }else{
      rank += 1
      item.ranked = getRankstring(rank)
    }
    prevTotal = item.total;
  });

 return data;
}

const getRankstring =(rank) =>{
  switch (rank) {
    case 1:
      return '1st'
    case 2:
        return '2nd'
    case 3:
      return '3rd'

    default:
      return (rank + 'th')
  }
}


class LeaderBoard extends Component {


  getTrophyColor = (ranked) =>{
    switch (ranked) {
      case '1st':
        return amber[600];
     case '2nd':
        return grey[600];
     case '3rd':
       return brown[600];
     default:
       return grey[100];
    }
  }

  render() {
    const { usersid, users } = this.props

    let boarddata = getBoardData(users, usersid)

    return(
      <div className="table" >
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <StyledTableRow >
                <StyledTableCell align="left">Ranked</StyledTableCell>
                <StyledTableCell align="left">Player Name</StyledTableCell>
                <StyledTableCell align="center">Polls Created</StyledTableCell>
                <StyledTableCell align="center">Polls Answered</StyledTableCell>
                <StyledTableCell align="center">Total</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {boarddata.map(row => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    <div className="pollitem">
                      {row.ranked === '1st' || row.ranked === '2nd' || row.ranked === '3rd' ?
                          <EmojiEventsIcon style={{ color: this.getTrophyColor(row.ranked), fontSize: 40}}  />
                          : <div></div> }
                      <span className="leader">{row.ranked}</span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="pollitem">
                      <Avatar
                        variant="square"
                        alt={row.name}
                        src={avatars[row.avatarURL].image}
                       />
                       <span className="leader">{row.name}</span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.created}</StyledTableCell>
                  <StyledTableCell align="center">{row.answered}</StyledTableCell>
                  <StyledTableCell align="center">{row.total}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

function mapStateToProps({users, questions}){
  return{
    usersid: Object.keys(users),
    users: users,
  }
}

export default connect(mapStateToProps)(LeaderBoard)
