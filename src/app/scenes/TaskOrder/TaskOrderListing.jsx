import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import RaisedButton from 'material-ui/RaisedButton';
import { Header, Toolbar, Sidebar, Sider, SubToolbar, BossCard } from 'components/index';
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
  }
};
const btnStyle = {
  margin: 12,
  color: '#fff',
  textTransform: 'initial'
};
const labelSty = {
  textTransform: 'initial'
};
class TaskOrderListing extends Component {
  render() {
    return (
      <div>
        <SubToolbar orgCode="IT-A:" orgTitle="Business Office" />
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
                style={ btnStyle }
                labelStyle={ labelSty }
              />
           </div>
          </div>
        </ListGroup>
        <SubToolbar orgCode="IT-B:" orgTitle="IT Security Office" />
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
              <RaisedButton label="Load more for IT-B"
                backgroundColor="#D8D8D8"
                style={ btnStyle }
                labelStyle={ labelSty }
              />
           </div>
          </div>
        </ListGroup>
        <SubToolbar orgCode="IT-C:" orgTitle="IT Security Office" />
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
              <RaisedButton label="Load more for IT-C"
                backgroundColor="#D8D8D8"
                style={ btnStyle }
                labelStyle={ labelSty }
              />
           </div>
          </div>
        </ListGroup>
        <SubToolbar orgCode="IT-D:" orgTitle="IT Security Office" />
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
              <RaisedButton label="Load more for IT-D"
                backgroundColor="#D8D8D8"
                style={ btnStyle }
                labelStyle={ labelSty }
              />
           </div>
          </div>
        </ListGroup>
        <SubToolbar orgCode="IT-E:" orgTitle="IT Security Office" />
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
              <RaisedButton label="Load more for IT-E"
                backgroundColor="#D8D8D8"
                style={ btnStyle }
                labelStyle={ labelSty }
              />
           </div>
          </div>
        </ListGroup>
        <SubToolbar orgCode="IT-F:" orgTitle="IT Security Office" />
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
              <RaisedButton label="Load more for IT-F"
                backgroundColor="#D8D8D8"
                style={ btnStyle }
                labelStyle={ labelSty }
              />
           </div>
          </div>
        </ListGroup>
        <SubToolbar orgCode="IT-G:" orgTitle="IT Security Office" />
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
              <RaisedButton label="Load more for IT-G"
                backgroundColor="#D8D8D8"
                style={ btnStyle }
                labelStyle={ labelSty }
              />
           </div>
          </div>
        </ListGroup>
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

export default connect(mapStateToProps)(TaskOrderListing);
