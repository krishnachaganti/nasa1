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
import { getITB } from 'state/org/org';
import { getPeople } from 'state/people/people';
import * as sidebarActions from 'state/sidebar/sidebar';
import { Toolbar, Sidebar, Weather, SubToolbar, BossCard } from 'components/index';
import OrgGroup from '../org.OrgGroup';

class itB extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func
  }
  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(getITB())
    ]);
  }

  componentDidMount() {
    itB.readyOnActions(this.props.dispatch);
  }

  toggle() {
    this.setState({
      display: !this.state.display
    });
  }
  render() {
    return (
      <div className="wrap">
         {
            this.props.itb.map(p =>
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
    people: state.peopleReducer,
    sidebar: state.sidebarReducer,
    itb: state.orgReducer.itb,
    loading: state.orgReducer.loading
  };
}

export default connect(mapStateToProps)(itB);
