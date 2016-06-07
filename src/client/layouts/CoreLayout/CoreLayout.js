import React, { Component, PropTypes } from 'react';
import Header from '../../components/Header';
import Toolbar from '../../components/Toolbar';
import Sider from '../../components/Sider';
import Sidebar from 'react-sidebar';
import { connect } from 'react-redux';
import SidebarContent from '../../components/Sidebar/SidebarContent';
import Weather from '../../components/Weather';
import classes from './CoreLayout.scss';
import '../../styles/core.scss';

import { getIotd, fetchWeather } from '../../actions/header';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    position: 'absolute',
    top: '20px',
    left: '30px'
  }
};

class CoreLayout extends Component {
  static loadAsyncData(dispatch) {
    dispatch(getIotd());
    dispatch(fetchWeather());
  }
  constructor(props) {
    super(props);
    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30
    };
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
  }

  componentDidMount(dispatch) {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  onSetOpen(open) {
    this.setState({ open });
  }
  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  render() {
    const contentHeader = (
      <span>
        { !this.state.docked &&
         <a onClick={ this.menuButtonClick } href="#" style={ styles.contentHeaderMenuLink }>=</a> }
      </span>);
    const sidebar = <SidebarContent />;

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen
    };
    const headerStyle = {
      height: '465px',
      width: '100%',
      backgroundImage: 'url(' + this.props.header.iotd + ')',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    };
    return (
      <div>
        <Sidebar { ...sidebarProps }>
          <Header title={ contentHeader } headerImage={ headerStyle } weatherWidget={
            <Weather temperature={ this.props.header.temperature } />
            }
          />
          <Toolbar />
          <Sider />
          { this.props.children }
        </Sidebar>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    header: state.header,
    loading: state.header.loading
  };
};

CoreLayout.propTypes = {
  children: React.PropTypes.element,
  dispatch: React.PropTypes.func,
  header: React.PropTypes.object
};
export default connect(mapStateToProps, null)(CoreLayout);
