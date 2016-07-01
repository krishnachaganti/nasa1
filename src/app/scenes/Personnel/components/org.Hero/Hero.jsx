import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import { white } from 'material-ui/styles/colors';
import PhotoCamera from 'material-ui/svg-icons/action/camera-enhance';
import { Popover, PopoverAnimationVertical } from 'material-ui/Popover';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import nasaLogo from './nasalogo.png';
import Heading from 'shared/atm.Heading';
import Weather from 'shared/mol.Weather';
import FileIcn from 'material-ui/svg-icons/file/file-download';
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
    display: 'flex',
    justifyContent: 'center'
  }
};

@connect(state => ({ hero: state.heroReducer }))
export default class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
        <div className="row">
          <div className="col-xs">

          </div>
          <div className="col-xs">
            <img src={ nasaLogo } style={ inlineStyles.logoStyle } />
          </div>
          <div className="col-xs">
            <Weather temperature={ this.props.temperature } />
          </div>
        </div>
        <div className="row center-xs">
          <div className="col-xs">
          <Heading size={ 2 } color="#fff" align="center" top="150">
          Search our Listing of Current Employees and Training Status <br />
          Regarding Treatment of Sensitive Information</Heading>
          { this.props.searchField }

          <Heading size={ 4 } color="#fff" align="center" top="50">
          <a href="#" className="header__link"><FileIcn color="#fff" /> Download Org Chart</a></Heading>
          </div>
        </div>
        <div className="row center-xs">
         <div className="col-xs-6">
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
      </div>
    </div>
    );
  }
}

Hero.propTypes = {
  heroImage: React.PropTypes.object,
  weatherWidget: React.PropTypes.element
};
