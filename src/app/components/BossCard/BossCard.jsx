import React from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { toggleBossCard } from 'scenes/Personnel/state/card';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CardImage from './CardImage';
import classes from './Card.scss';
import BossDetails from 'scenes/Personnel/org.BossDetails/BossDetails';
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
const inlineStyle = {
  insideCard: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto'
  },
  cardImg: {
    width: '40%',
    paddingLeft: 0
  },
  rightSide: {
    width: '60%'
  }
};
function mapStateToProps(state) {
  return {
    card: state.card,
    people: state.peopleReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ toggleBossCard }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class BossCard extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      someValue: 'init',
      contactID: props.contactID
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleClickage() {
    this.setState({
      isOpened: !this.state.isOpened
    });
    const ncontact = this.props.contactID;
    this.props.actions.toggleBossCard(ncontact);
  }
  render() {
    return(
           <div>
          <div className="card-body" style={ inlineStyle.insideCard } onClick={ ::this.handleClickage }>
              <div style={ bossimgstyle }>
              <BossImg />
              </div>
                <div style={ insideCard }>
                  <CardImage style={ inlineStyle.cardImg }/>
                  <div style={ rightSide }>
                  <CardTitle title={ this.props.nasaName } />
                  <CardText>
                   { this.props.position }
                   <br />
                   Org Code: { this.props.orgCode }
                   <br />
                  </CardText>
                  </div>
                  </div>
              </div>
              <BossDetails
                  closeExpand={ ::this.handleClickage }
                  isOpened={ this.state.isOpened }
                  closeExpand={ ::this.handleClickage }
                  contactID={this.props.contactID}
                />
            </div>
            );
  }
}
export default BossCard;
