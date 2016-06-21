import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import PersonDetails from '../org.PersonDetails';
import PersonImage from '../atm.PersonImage';
import { toggleCardFn } from 'scenes/Personnel/state/card';
import { bindActionCreators } from 'redux';

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

function mapStateToProps(state) {
  return {
    card: state.card,
    people: state.peopleReducer
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ toggleCardFn }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
class PersonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      someValue: 'init',
      personID: props.person.id
    };
  }
handleClickage() {
  this.setState({
      isOpened: !this.state.isOpened,
    });
  const persn = this.props.person.id;
  this.props.actions.toggleCardFn(persn)
}

  render() {
    return (
        <div>
          <div className="card-body" style={ insideCard } onClick={ ::this.handleClickage }>
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
          <PersonDetails person={ this.props.person } personID={this.props.person.id} isOpened={ this.state.isOpened } />
       </div>
    );
      }
  }
export default PersonCard;
