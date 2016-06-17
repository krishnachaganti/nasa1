import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import { Grid, Row, Col } from 'react-bem-grid';
import { Toolbar, Sidebar, Weather, SubToolbar, BossCard } from 'components/index';
import * as sidebarActions from 'state/sidebar/sidebar';
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
class TaskOrder extends Component {
  menuButtonClick(ev) {
    ev.preventDefault();
    this.props.dispatch(sidebarActions.toggleSideBar());
  }

  render() {

    return (
            <div>
              <Helmet title="Task Order" />
              <MenuIc onTouchTap={ ::this.menuButtonClick } color={ lightWhite } style={ styles.contentHeaderMenuLink } />
              <Sidebar />
            </div>
            )
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

export default connect(mapStateToProps)(TaskOrder);
