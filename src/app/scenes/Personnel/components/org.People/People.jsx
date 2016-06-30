import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Loader from 'shared/atm.Loader';
import SubToolbar from 'shared/atm.SubToolbar';
import { OrgGroup, BossCard, Hero } from 'scenes/Personnel/components';
import fallbackimg from '../org.Hero/fallback-hero.jpg';
import { toggleCardFn } from 'scenes/Personnel/state/card';
import { getIotd, fetchWeather } from 'state/index';
import * as sidebarActions from 'state/sidebar/sidebar';
import { setFilter } from 'state/people/people';

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
                <div className="row onehun" key={ index } id={ groupName }>
                  <OrgGroup boss={
                      <BossCard nasaName={ peopleList[0].NASAContactName } position="Boss" contactID={ index } orgCode={ groupName } />
                    } toolbar={
                      <SubToolbar env={ props.env } orgCode={ toolBarCode } orgTitle={ peopleList[0].TO_Name } orgLength={ peopleList.length }  />
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
