import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import { Grid, Row, Col } from 'react-bem-grid';
import SearchInput, { createFilter } from 'react-search-input';
import { getIotd, fetchWeather } from 'state/index';
import { getPeople } from 'state/people/people';
import * as sidebarActions from 'state/sidebar/sidebar';
import { Toolbar, Sidebar, Weather, Sider, SubToolbar, BossCard } from 'components/index';
import OrgGroup from './org.OrgGroup';
import fallbackimg from './org.Hero/fallback-hero.jpg';
import Hero from './org.Hero';

class Personnel extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    hero: React.PropTypes.object
  }

  static loadAsyncData(dispatch) {
    return Promise.all([
      dispatch(getIotd()),
      dispatch(fetchWeather()),
      dispatch(getPeople())
    ]);
  }
  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  menuButtonClick(ev) {
    ev.preventDefault();
    this.props.dispatch(sidebarActions.toggleSideBar());
  }
  render() {
    const styles = {
      contentHeaderMenuLink: {
        textDecoration: 'none',
        color: 'white',
        position: 'absolute',
        top: '20px',
        left: '30px',
        zIndex: '1000'
      }
    };
    const HERO_IMG = this.props.hero.iotd || fallbackimg;
    const heroStyle = {
      height: '465px',
      width: '100%',
      backgroundImage: 'url(' + HERO_IMG + ')', // eslint-disable-line
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    };
    const search = {
      width: '600px',
      height: '60px'
    };

    return (
      <div>
        <Helmet title="Personnel" />
        <MenuIc onTouchTap={ ::this.menuButtonClick } color={ lightWhite } style={ styles.contentHeaderMenuLink } />
          <Hero heroImage={ heroStyle } temperature={ this.props.hero.temperature } titleImg={ this.props.hero.title }
          />
          <Sidebar />
          <Toolbar />
          <Sider />
         { this.props.children }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hero: state.heroReducer,
    loading: state.peopleReducer.loading,
    people: state.peopleReducer,
    sidebar: state.sidebarReducer
  };
}

export default connect(mapStateToProps)(Personnel);
