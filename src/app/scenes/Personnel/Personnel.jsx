import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import { getIotd, fetchWeather } from 'state/index';
import { getPeople } from 'state/people/people';
import * as sidebarActions from 'state/sidebar/sidebar';
import { getNcontact } from 'state/ncontacts/ncontacts';
import Sidebar from 'shared/org.Sidebar';
import Sider from 'shared/atm.Sider';
import Toolbar from 'shared/mol.Toolbar';
import fallbackimg from './components/org.Hero/fallback-hero.jpg';
import { People, Hero, OrgGroup } from 'scenes/Personnel/components';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import shallowCompare from 'react-addons-shallow-compare';

const mapStateToProps = (state) => {
  return {
    hero: state.heroReducer,
    loading: state.peopleReducer.loading,
    people: state.peopleReducer,
    filter: state.peopleReducer.filter,
    sidebar: state.sidebarReducer,
    nasaContacts: state.nasaContacts,
    card: state.card,
    env: state.environment
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
      dispatch(getPeople()),
      dispatch(getNcontact())
    ]);
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
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
         <People people={ this.props.people } env={ this.props.env } loading={ this.props.loading } filter={ this.props.filter } />
      </div>
    );
  }
}

export default Personnel;
