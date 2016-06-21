import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import { white } from 'material-ui/styles/colors';
import PhotoCamera from 'material-ui/svg-icons/action/camera-enhance';
import { Popover, PopoverAnimationVertical } from 'material-ui/Popover';
import Heading from 'shared/atm.Heading';
import nasaLogo from './nasalogo.png';
import Weather from 'shared/mol.Weather';

const inlineStyles = {
  cameraStyle: {
    position: 'absolute',
    top: '410px',
    right: '2.5rem'
  },
  popO: {
    padding: '10px'
  },
  search: {
    width: '600px',
    height: '60px',
    top: '325px'
  },
  logoStyle: {
    width: '80px',
    height: '63px',
    margin: '0 auto',
    position: 'absolute',
    left: '43%',
    top: '15px',
    justifyContent: 'center'
  }
}

@connect(state => ({ hero: state.heroReducer }))
export default class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleTouchTap = event => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
  render() {
    return (
      <div style={ this.props.heroImage }>
      <div className="container-fluid">
        <img src={ nasaLogo } style={ inlineStyles.logoStyle } />
        <Weather temperature={ this.props.temperature } />

        <Heading size={ 2 } color="#fff" align="center" top="150">
          Search our Listing of Current Employees and Training Status <br />
          Regarding Treatment of Sensitive Information</Heading>

         <PhotoCamera style={ inlineStyles.cameraStyle } color={ white } onTouchTap={ this.handleTouchTap } />

         <Popover open={ this.state.open } anchorEl={ this.state.anchorEl }
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            style={ inlineStyles.popO }
            onRequestClose={ this.handleRequestClose }
            animation={ PopoverAnimationVertical }
          >
            { this.props.titleImg }
          </Popover>
          </div>
      </div>
    );
  }
}

Hero.propTypes = {
  heroImage: React.PropTypes.object,
  weatherWidget: React.PropTypes.element
};
