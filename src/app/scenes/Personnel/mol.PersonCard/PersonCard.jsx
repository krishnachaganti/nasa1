import React from 'react';
import { CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import PersonImage from '../atm.PersonImage';

// const cardStyle = {
//   marginLeft: '15px',
//   marginRight: '15px',
//   marginTop: '20px',
//   marginBottom: '20px',
//   display: 'flex',
//   flexDirection: 'column',
//   overflow: 'hidden',
//   width: '380px'
// };

const insideCard = {
  display: 'flex',
  flexDirection: 'row',
  flex: '1 1 auto'
};

const cardImg = {
  width: '40%',
  paddingLeft: 0
};
const rightSide = {
  width: '60%'
};
const over = {
  opacity: 0.3
};
class PersonCard extends React.Component {
  state = {
    display: false
  };

  handleOpen = () => {
    this.setState({ display: true });
  };

  handleClose = () => {
    this.setState({ display: false });
  };

  render() {
    return (
          <div style={ insideCard } onTouchTap={ this.props.toggle }>
            <PersonImage style={ cardImg } increaseKudos={ this.props.handleIncrement } />
            <div style={ rightSide }>
              <CardTitle title={ this.props.person.PersonnelName } />
              <CardText>
                { this.props.person.PositionTitlePLC }
                <br />
                Org Code: { this.props.person.OrgCode }
                <br />
                Kudos: { this.props.count }
              </CardText>
            </div>
          </div>
    );
  }
}


export default PersonCard;
