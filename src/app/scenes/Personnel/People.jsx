import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

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
import OrgGroup from './org.OrgGroup';
import fallbackimg from './org.Hero/fallback-hero.jpg';
import Hero from './org.Hero';

class People extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func
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
          <Row>
            <OrgGroup boss={
                <BossCard nasaName="Lisa Barber" position="Boss" orgCode="IT-A" />
              } toolbar={
                <SubToolbar orgCode="IT-A:" orgTitle="Business Office" />
              } orgType="a" addRow={ ::this.toggle }
            />
          </Row>
          <Row>
            <OrgGroup boss={
                <BossCard nasaName="Henry Yu" position="Boss" orgCode="IT-B" />
              } toolbar={ <SubToolbar orgCode="IT-B:" orgTitle="IT Security Office" /> } orgType="b" addRow={ ::this.toggle } />
          </Row>
          <Row>
            <OrgGroup boss={
                <BossCard nasaName="Henry Yu" position="Boss" orgCode="IT-C" />
              } toolbar={ <SubToolbar orgCode="IT-C:" orgTitle="IT Security Office" /> } orgType="c" addRow={ ::this.toggle } />
          </Row>
          <Row>
          <OrgGroup boss={
              <BossCard nasaName="Henry Yu" position="Boss" orgCode="IT-D" />
            } toolbar={ <SubToolbar orgCode="IT-D:" orgTitle="IT Security Office" /> } orgType="d" addRow={ ::this.toggle } />
          </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hero: state.heroReducer,
    loading: state.heroReducer.loading,
    people: state.peopleReducer,
    sidebar: state.sidebarReducer
  };
}

export default connect(mapStateToProps)(People);
