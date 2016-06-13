import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CardImage from './CardImage';
import classes from './Card.scss';
import Dialog from 'material-ui/Dialog';
const cardStyle = {
  marginLeft: '15px',
  marginRight: '15px',
  marginTop: '20px',
  marginBottom: '20px',
  paddingLeft: 0
};

const insideCard = {
  display: 'flex',
  flexDirection: 'row',
  flex: 1
};

const cardImg = {
  width: '40%'
};
const rightSide = {
  width: '60%'
};
const over = {
  opacity: 0.3
};
class PersonCard extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
  <div className="col-xs">
    <Card style={ cardStyle } onTouchTap={ ::this.handleOpen }>
      <div style={ insideCard }>
        <CardImage style={ cardImg } increaseKudos={ this.props.handleIncrement }
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
    <Dialog
      title={ this.props.person.PersonnelName }
      modal={false}
      open={this.state.open}
      onRequestClose={this.handleClose}
      overlayStyle={ over }
    >
    <div className="row">
    <div className="col-xs">
    <strong>Position Title</strong><br />
    { this.props.person.PositionTitlePLC }<br />
    <strong>Org Code</strong> <br />
    { this.props.person.OrgCode }<br />
    <strong>Task Order Technical Monitor</strong> <br />
    { this.props.person.TO_TechnicalMonitor }<br />
    </div>
      <div className="col-xs">
    Date of Hire <br />
    { this.props.person.DoH }<br />
    Task Order #<br />
    { this.props.person.TO_Number }<br />
    NASA Contact<br />
    { this.props.person.NASAContactName }<br />
    </div>
    Task Order Name<br />
    { this.props.person.TO_Name }<br />
    NASA Contact Phone # <br />
    { this.props.person.NASAContactPhone }
    </div>
    </Dialog>
  </div>
);
}
}


export default PersonCard;
