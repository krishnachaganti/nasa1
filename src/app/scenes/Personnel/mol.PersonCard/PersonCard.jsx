import React from 'react';
import { connect } from 'react-redux';
import { CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Portal from 'react-portal';
import PersonDetails from '../org.PersonDetails';
import PersonImage from '../atm.PersonImage';
import{ loadOpenCards } from 'state/people/people';

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

class PersonCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      someValue: 'init',
      personID: props.person.id
    };
  }

  handleCardClick(e, dispatch) {
    const bodyRect = document.body.getBoundingClientRect();
    const targetRect = e.target.getBoundingClientRect();
    this.setState({
      isOpened: !this.state.isOpened,
      top: targetRect.top - bodyRect.top,
      left: targetRect.left - bodyRect.left,
      width: targetRect.width,
    });
    console.log('got here')
    this.props.loadOpenCards();
  }

  onClose() {
    /* eslint no-console: 0 */
    console.log('Portal closed');
  }

  render() {

    return (
        <div>
          <div className="card-body" style={ insideCard } onTouchTap={ this.props.toggle } onClick={ ::this.handleCardClick }>
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
            {' '}
          </div>
          <PersonDetails person={ this.props.person } isOpened={this.state.isOpened} />
            {/*<Portal
              closeOnOutsideClick
              isOpened={this.state.isOpened}
              onClose={() => { this.setState({ isOpened: false }); this.onClose(); }}
            >*/}
            {/*</Portal>*/}
       </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    people: state.peopleReducer,
    sidebar: state.sidebarReducer
  };
}
const mapDispatchToProps = dispatch => {
  return {
    loadOpenCards: () => {
      dispatch(loadOpenCards())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonCard);
