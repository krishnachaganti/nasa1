import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, Sidebar, SubToolbar, BossCard, Loader } from 'components/index';
import Weather from 'shared/mol.Weather';
import * as sidebarActions from 'state/sidebar/sidebar';
import { getIotd, fetchWeather } from 'state/index';
import Heading from 'shared/atm.Heading';
import Textblock from 'shared/atm.Textblock';
import ListGroup from './org.ListGroup';
import ListPanel from './atm.ListPanel';

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
        <ListGroup>
          <ListPanel dateCircle="MAR 2016"
            dateRange="03/01/2016 - 03/31/2016"
            preparer="Wendy Mizerek-H"
            link="/somewhere"
          />
          <ListPanel dateCircle="MAR 2016"
            dateRange="03/01/2016 - 03/31/2016"
            preparer="Wendy Mizerek-H"
            link="/somewhere"
          />
          <div className="row center-xs">
            <div className="col-xs">
              <RaisedButton label="Load more for IT-A"
                backgroundColor="#D8D8D8"
                style={ styles.btnStyle }
                labelStyle={ styles.labelStyle }
              />
           </div>
          </div>
        </ListGroup>
        </div>
        )
     })
        }
      </div>
      )
  }

export default TaskOrderListing;
