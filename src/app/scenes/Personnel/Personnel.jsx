import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
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
    this.state = {open: false};
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({ open: false });
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
      },
      drawer: {
        backgroundColor: '#11222D',
        paddingTop: '80px'
      }
    };

    return (
      <div>
        <Helmet title="Personnel" />
        <MenuIc onTouchTap={ ::this.handleToggle } color={ lightWhite } style={ styles.contentHeaderMenuLink } />
          <Hero heroImage={ styles.heroStyle }
            temperature={ this.props.hero.temperature }
            titleImg={ this.props.hero.title }
            isLoading={ this.props.hero.loading }
          />
          <Drawer
            docked={false}
            width={200}
            open={ this.state.open }
            onRequestChange={(open) => this.setState({open})}
            containerStyle={ styles.drawer }
          >
            <MenuItem className="nav__item"><Link to="/">Employee Search</Link></MenuItem>
            <MenuItem className="nav__item"><Link to="/">Financial Report</Link></MenuItem>
            <MenuItem className="nav__item"><Link to="/taskorder">Task Order Archives</Link></MenuItem>
          </Drawer>
          <Toolbar people={ this.props.people } />
          <Sider />
         <People nasaContacts={ this.props.nasaContacts } people={ this.props.people } env={ this.props.env } loading={ this.props.loading } filter={ this.props.filter } />
      </div>
    );
  }
}

export default Personnel;
