import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CardImage from './CardImage';
import classes from './Card.scss';
import BossImg from './BossImg';
const cardStyle = {
  marginLeft: '15px',
  marginRight: '15px',
  marginTop: '20px',
  marginBottom: '20px',
  paddingLeft: 0,
  paddingRight: 0
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
const bossimgstyle = {
  float: 'right'
};
const BossCard = props => (
  <Card className="col-xs col-sm-4" style={ cardStyle }>
  <div style={ bossimgstyle }>
  <BossImg />
  </div>
    <div style={ insideCard }>
      <CardImage style={ cardImg } />
      <div style={ rightSide }>
      <CardTitle title={ props.nasaName } />
      <CardText>
       { props.position }
       <br />
       Org Code: { props.orgCode }
       <br />
      </CardText>
      </div>
      </div>
  </Card>
);

export default BossCard;
