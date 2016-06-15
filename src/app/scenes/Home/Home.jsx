import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import { Grid, Row, Col } from 'react-bem-grid';
import SearchInput, { createFilter } from 'react-search-input';
import { getIotd, fetchWeather } from 'state/index';
import { getPeople, getITA } from 'state/people/people';
import * as sidebarActions from 'state/sidebar/sidebar';
import { Header, Toolbar, Sidebar, Weather, PersonCard, SubToolbar, BossCard } from 'components/index';
import OrgGroup from './org.OrgGroup';

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

class Home extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    header: React.PropTypes.object
  }
  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(getIotd()),
      dispatch(fetchWeather()),
      dispatch(getPeople())
    ]);
  }
  constructor(props) {
    super(props);

    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.state = {
      searchTerm: 'IT-A'
    };
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  componentDidMount() {
    Home.readyOnActions(this.props.dispatch);
  }
  menuButtonClick(ev) {
    ev.preventDefault();
    this.props.dispatch(sidebarActions.toggleSideBar());
  }
  render() {
    const headerStyle = {
      height: '465px',
      width: '100%',

      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    };
    const search = {
      width: '600px',
      height: '60px'
    };
    return (
      <div>
        <Helmet title="Home" />
        <MenuIc onTouchTap={ ::this.menuButtonClick } color={ lightWhite } style={ styles.contentHeaderMenuLink } />
          <Header headerImage={ headerStyle }
          />
          <Sidebar />
          <Toolbar total={ this.props.people.people } />
          <Row>
            <OrgGroup boss={
                <BossCard nasaName="Lisa Barber" position="Boss" orgCode="IT-A" />
            } toolbar={ <SubToolbar orgCode="IT-A:" orgTitle="Business Office" /> } orgType="a" />
          </Row>
          <Row>
            <OrgGroup boss={
                <BossCard nasaName="Henry Yu" position="Boss" orgCode="IT-B" />
              } toolbar={ <SubToolbar orgCode="IT-B:" orgTitle="IT Security Office" /> } orgType="b" />
          </Row>
          <Row>
          <OrgGroup boss={
              <BossCard nasaName="Henry Yu" position="Boss" orgCode="IT-C" />
            } toolbar={ <SubToolbar orgCode="IT-C:" orgTitle="IT Security Office" /> } orgType="c" />
            </Row>
          <Row>
          <OrgGroup boss={
              <BossCard nasaName="Henry Yu" position="Boss" orgCode="IT-D" />
            } toolbar={ <SubToolbar orgCode="IT-D:" orgTitle="IT Security Office" /> } orgType="d" />
          </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.headerReducer,
    loading: state.headerReducer.loading,
    people: state.peopleReducer,
    sidebar: state.sidebarReducer
  };
}

export default connect(mapStateToProps)(Home);
