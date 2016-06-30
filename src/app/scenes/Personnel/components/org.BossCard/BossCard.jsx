import React from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { toggleBossCard } from 'scenes/Personnel/state/card';
import { getNasaContactData, getNasaContractors } from 'state/ncontacts/ncontacts';
import { BossIcon, BossImage, BossDetails } from 'scenes/Personnel/components';
import shallowCompare from 'react-addons-shallow-compare';

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
    float: 'right'
  }
};
function mapStateToProps(state) {
  return {
    card: state.card,
    people: state.peopleReducer,
    nasaContacts: state.nasaContacts,
    contractors: state.nasaContacts.contractors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ toggleBossCard }, dispatch),
    nactions: bindActionCreators({ getNasaContactData, getNasaContractors }, dispatch)
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

  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  handleClickage() {
    this.setState({
      isOpened: !this.state.isOpened
    });
    const ncontact = this.props.contactID;
    const contactName = this.props.nasaName;
    this.props.nactions.getNasaContactData(contactName);
    this.props.nactions.getNasaContractors(contactName);
    this.props.actions.toggleBossCard(ncontact);
  }
  render() {
    return (
        <div>
          <div className="card-body" style={ inlineStyle.insideCard } onClick={ ::this.handleClickage }>
            <BossImage style={ inlineStyle.cardImg } />
              <div style={ inlineStyle.rightSide }>
              <div style={ inlineStyle.bossIconstyle }>
              <BossIcon />
              </div>
                <CardTitle title={ this.props.nasaName } />
                <CardText>
                 { this.props.position }
                 <br />
                 Org Code: { this.props.orgCode }
                 <br />
                </CardText>
            </div>
        </div>
         <BossDetails
            closeExpand={ ::this.handleClickage }
            isOpened={ this.state.isOpened }
            closeExpand={ ::this.handleClickage }
            contactID={ this.props.contactID }
            surveys={ this.props.nasaContacts.surveys }
            contractors={ this.props.nasaContacts.contractors }
          />
      </div>
    );
  }
}
export default BossCard;
