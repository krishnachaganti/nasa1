import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import PersonCard from '../mol.PersonCard';
import CardGroup from 'shared/org.CardGroup';
import Card from 'shared/atm.Card';
import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import { Grid, Row, Col } from 'react-bem-grid';
import SearchInput, { createFilter } from 'react-search-input';
import { getIotd, fetchWeather } from 'state/index';
import { getITA, getITB, getITC, getITD } from 'state/org/org';
import { getPeople } from 'state/people/people';
import * as sidebarActions from 'state/sidebar/sidebar';
import { Toolbar, Sidebar, Weather, SubToolbar, BossCard } from 'components/index';
import OrgGroup from '../org.OrgGroup';

class Filtered extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func
  }
  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(getITA()),
      dispatch(getITB()),
      dispatch(getITC()),
      dispatch(getITD())
    ]);
  }

  constructor(props) {
    super(props);

    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.state = {
      searchTerm: 'IT-A',
       display: false,
       normal: true
    };
  }

  componentDidMount() {
    Filtered.readyOnActions(this.props.dispatch);
  }
  menuButtonClick(ev) {
    ev.preventDefault();
    this.props.dispatch(sidebarActions.toggleSideBar());
  }

  toggle() {
    this.setState({
      display: !this.state.display
    });
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
      <div className="wrap">
         {
            this.props.ita.map(p =>
              <Card>
                <PersonCard toggle={ this.props.addRow } key={ p.id } person={ p } />
              </Card>
              )
         }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hero: state.heroReducer,
    loading: state.heroReducer.loading,
    people: state.peopleReducer,
    sidebar: state.sidebarReducer,
    org: state.orgReducer,
    ita: state.orgReducer.ita,
    itb: state.orgReducer.itb,
    itc: state.orgReducer.itc,
    itd: state.orgReducer.itd
  };
}

export default connect(mapStateToProps)(Filtered);
