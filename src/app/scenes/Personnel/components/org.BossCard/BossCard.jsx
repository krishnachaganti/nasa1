import React from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { toggleBossCard } from 'scenes/Personnel/state/card';
import { BossIcon, BossImage, BossDetails } from 'scenes/Personnel/components';

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
  },
  bossIconstyle: {
    float: 'right',
    marginLeft: '-60px'
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
    return (
      <div className="card-wrapper">
        <div style={ inlineStyle.bossIconstyle }>
          <BossIcon />
        </div>
        <div className="card-wrapper-inner">
          <div className="card-body" style={ inlineStyle.insideCard } onClick={ ::this.handleClickage }>
            <BossImage style={ inlineStyle.cardImg } />
              <div style={ inlineStyle.rightSide }>
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
