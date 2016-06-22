import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { CardTitle, CardText } from 'material-ui/Card';
import PersonDetails from '../org.PersonDetails';
import PersonImage from '../atm.PersonImage';
import { toggleCard } from 'scenes/Personnel/state/card';

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
    actions: bindActionCreators({ toggleCard }, dispatch)
  };
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
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleClickage() {
    this.setState({
      isOpened: !this.state.isOpened
    });
    const persn = this.props.person.id;
    this.props.actions.toggleCard(persn);
  }

  render() {
    return (
        <div>
          <div className="card-body" style={ inlineStyle.insideCard } onClick={ ::this.handleClickage }>
            <PersonImage style={ inlineStyle.cardImg } increaseKudos={ this.props.handleIncrement } />
            <div style={ inlineStyle.rightSide }>
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
          <PersonDetails person={ this.props.person }
              closeExpand={ ::this.handleClickage }
              personID={this.props.person.id}
              isOpened={ this.state.isOpened }
            />
       </div>
    );
  }
}

PersonCard.propTypes = {
  person: PropTypes.object.isRequired,
  inlineStyle: PropTypes.object,
  handleClickage: PropTypes.func
};

export default PersonCard;
