import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import PersonImage from '../atm.PersonImage';

const cardStyle = {
  marginLeft: '15px',
  marginRight: '15px',
  marginTop: '20px',
  marginBottom: '20px',

  width: '380px'
};

const insideCard = {
  display: 'flex',
  flexDirection: 'row',
  flex: 1
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
  toggle = () => {
    this.setState({
      display: !this.state.display
    });
  }
  render() {
    return (
        <Card style={ cardStyle }>
          <div style={ insideCard }>
            <PersonImage style={ cardImg } increaseKudos={ this.props.handleIncrement }
              decreaseKudos={ this.props.handleDecrement }
            />
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
        </Card>
    );
  }
}


export default PersonCard;
