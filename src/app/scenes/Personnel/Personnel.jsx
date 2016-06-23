import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import SearchInput, { createFilter } from 'react-search-input';
import { getIotd, fetchWeather } from 'state/index';
import { getPeople } from 'state/people/people';
import * as sidebarActions from 'state/sidebar/sidebar';
import { Toolbar, Sidebar, Weather, Sider, SubToolbar, BossCard } from 'components/index';
import OrgGroup from './org.OrgGroup';
import fallbackimg from './org.Hero/fallback-hero.jpg';
import Hero from './org.Hero';
import People from './People';

const mapStateToProps = (state) => {
  return {
    hero: state.heroReducer,
    loading: state.peopleReducer.loading,
    people: state.peopleReducer,
    filter: state.peopleReducer.filter,
    sidebar: state.sidebarReducer,
    card: state.card
  };
};

@connect(mapStateToProps)
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
    const HERO_IMG = this.props.hero.iotd || fallbackimg;
    const styles = {
      contentHeaderMenuLink: {
        textDecoration: 'none',
        color: 'white',
        position: 'absolute',
        top: '20px',
        left: '30px',
        zIndex: '1000'
      },
      heroStyle: {
        height: '465px',
        width: '100%',
        backgroundImage: 'url(' + HERO_IMG + ')', // eslint-disable-line
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      },
      search: {
        width: '600px',
        height: '60px'
      }
    };

    return (
      <div>
        <Helmet title="Personnel" />
        <MenuIc onTouchTap={ ::this.menuButtonClick } color={ lightWhite } style={ styles.contentHeaderMenuLink } />
          <Hero heroImage={ styles.heroStyle }
            temperature={ this.props.hero.temperature }
            titleImg={ this.props.hero.title }
            isLoading={ this.props.hero.loading }
          />
          <Sidebar />
          <Toolbar people={ this.props.people } />
          <Sider />
         <People people={ this.props.people } loading={ this.props.loading } filter={ this.props.filter } />
      </div>
    );
  }
}

export default Personnel;
