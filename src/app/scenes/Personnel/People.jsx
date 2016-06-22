import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SearchInput, { createFilter } from 'react-search-input';
import { getIotd, fetchWeather } from 'state/index';
import * as sidebarActions from 'state/sidebar/sidebar';
import { setFilter } from 'state/people/people';
import { Toolbar, Sidebar, Weather, SubToolbar, BossCard, Loader } from 'components/index';
import OrgGroup from './org.OrgGroup';
import fallbackimg from './org.Hero/fallback-hero.jpg';
import Hero from './org.Hero';
import { toggleCardFn } from 'scenes/Personnel/state/card';

const People = (props) => {
  const styles = {
    contentHeaderMenuLink: {
      textDecoration: 'none',
      color: 'white',
      position: 'absolute',
      top: '20px',
      left: '30px',
      zIndex: '1000'
    },
    search: {
      width: '600px',
      height: '60px'
    }
  };
  return (
      <div className="wrap">
        {
         props.loading ? <Loader /> :
          Object.keys(props.people.people).sort().map((groupName, index) => {
            const peopleList = props.people.people[groupName];
            const toolBarCode = `${groupName}:`;
            if (!props.filter || groupName === props.filter) {
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
            } else {
              return '';
            }
          })
        }
      </div>
    );
};

export default People;
