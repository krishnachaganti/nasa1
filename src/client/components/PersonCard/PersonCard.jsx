import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CardImage from './CardImage';
import classes from './Card.scss';

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

const PersonCard = props => (
  <Card className="col-xs" style={ cardStyle }>
    <div style={ insideCard }>
      <CardImage style={ cardImg } />
      <div style={ rightSide }>
      <CardTitle title={ props.person.PersonnelName } />
      <CardText>
       { props.person.PositionTitlePLC }
       <br />
       Org Code: { props.person.OrgCode }
       <br />
       Kudos:
      </CardText>
      </div>
      </div>
  </Card>
);

export default PersonCard;
