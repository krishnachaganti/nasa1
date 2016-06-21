import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';

import SearchInput, { createFilter } from 'react-search-input';
import { getIotd, fetchWeather } from 'state/index';
import * as sidebarActions from 'state/sidebar/sidebar';

import { Toolbar, Sidebar, Weather, SubToolbar, BossCard, Loader } from 'components/index';
import OrgGroup from './org.OrgGroup';
import fallbackimg from './org.Hero/fallback-hero.jpg';
import Hero from './org.Hero';
import { toggleCardFn } from 'scenes/Personnel/state/card';

function mapStateToProps(state) {
  return {
    loading: state.peopleReducer.loading,
    people: state.peopleReducer,
    sidebar: state.sidebarReducer,
    card: state.card
  };
}

@connect(mapStateToProps)
class People extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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

    const search = {
      width: '600px',
      height: '60px'
    };

    return (
      <div className="wrap">
        {
          this.props.people.loading ? <Loader /> :
          Object.keys(this.props.people.people).map((groupName, index) => {
            const peopleList = this.props.people.people[groupName];
            const toolBarCode = `${groupName}:`;
            return (
              <div className="row" key={ index }>
                <OrgGroup boss={
                    <BossCard nasaName="Lisa Barber" position="Boss" orgCode={ groupName } />
                  } toolbar={
                    <SubToolbar orgCode={ toolBarCode } orgTitle="Business Office" />
                  } orgType={ groupName } persons={ peopleList }
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

People.propTypes = {
  dispatch: React.PropTypes.func
}

export default People;
