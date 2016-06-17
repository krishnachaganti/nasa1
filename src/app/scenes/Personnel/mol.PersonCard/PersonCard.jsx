import React from 'react';
import { CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Portal from 'react-portal';
import PersonDetails from '../org.PersonDetails';
import PersonImage from '../atm.PersonImage';

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
      isPortalOpened: false,
      someValue: 'init'
    };
  }

  handleCardClick(e) {
    const bodyRect = document.body.getBoundingClientRect();
          const targetRect = e.target.getBoundingClientRect();
          this.setState({
            isOpened: true,
            top: targetRect.top - bodyRect.top,
            left: targetRect.left - bodyRect.left,
            width: targetRect.width,
          });
  }
  onClose() {
    /* eslint no-console: 0 */
    console.log('Portal closed');
  }

  render() {

    return (
        <div>
          <div style={ insideCard } onTouchTap={ this.props.toggle } onClick={ ::this.handleCardClick }>
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
            <Portal
              closeOnOutsideClick
              isOpened={this.state.isOpened}
              onClose={() => { this.setState({ isOpened: false }); this.onClose(); }}
            >
              <PersonDetails
                person={ this.props.person }
                left={this.state.left}
                top={this.state.top}
                width={this.state.width}
              />
            </Portal>
       </div>
    );
  }
}


export default PersonCard;
