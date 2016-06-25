import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';

import Loader from 'shared/atm.Loader';
import Weather from 'shared/mol.Weather';

import SubToolbar from 'shared/atm.SubToolbar';
import Heading from 'shared/atm.Heading';
import Textblock from 'shared/atm.Textblock';
import * as sidebarActions from 'state/sidebar/sidebar';
import { getIotd, fetchWeather } from 'state/index';
import { ListPanel, ListGroup } from 'scenes/TaskOrder/components';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    position: 'absolute',
    top: '20px',
    left: '30px',
    zIndex: '1000'
  },
  btnStyle: {
    margin: 12,
    color: '#fff',
    textTransform: 'initial'
  },
  labelStyle:  {
    textTransform: 'initial'
  }
};

const TaskOrderListing = (props) => {
    return (
      <div>
        { props.loading ? <Loader /> :
          Object.keys(props.reports.files).sort().map((groupName, index) => {
            const fileList = props.reports.files[groupName];
            const toolBarCode = `${groupName}:`;
            return (
              <div className="row" key={ index }>
                <SubToolbar orgCode={ toolBarCode } orgTitle="Business Office" />
                <ListGroup reportFiles={ fileList } orgC={ groupName } />
              </div>
            )
          })
        }
      </div>
    )
  }

export default TaskOrderListing;
