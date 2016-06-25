/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, MenuItem, Colors, List, ListItem, MakeSelectable } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import * as sidebarActions from 'state/sidebar/sidebar';
import NavLink from './NavLink';

let SelectableList = MakeSelectable(List);
const iconStyles = {
  marginRight: 12,
  position: 'relative',
  top: 6
};

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      children: React.PropTypes.node.isRequired,
      defaultValue: React.PropTypes.number.isRequired
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });

      this.props.routeToIndex(index); // eslint-disable-line
    };

    render() {
      return (
          <ComposedComponent
            value={ this.state.selectedIndex }
            onChange={ this.handleRequestChange }
          >
              { this.props.children }
          </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

@connect(state => ({ sidebar: state.sidebarReducer }))
class Sidebar extends React.Component {// eslint-disable-line

  handleToggle = () => {
    this.props.dispatch(sidebarActions.toggleSideBar());
  }

  render() {
    const sidebarMenuStyle = {
      backgroundColor: '#12222D'
    };
    const sidebarStyle = {
      backgroundColor: '#12222D'
    };
    const { sidebar, dispatch } = this.props;
    return (
      <Drawer onBlur={ this.handleToggle } width={ 240 } containerStyle={ sidebarStyle } open={ sidebar.isSideBarOpen } docked={ false }
        onRequestChange={ open => { this.handleToggle(); } }
      >

        <SelectableList nestedListStyle={ sidebarMenuStyle } defaultValue={ sidebar.selectedDrawerMenuListItem } sidebar={ sidebar }
          {...bindActionCreators(sidebarActions, dispatch)}
        >
          <ListItem style={ sidebarMenuStyle } primaryText="Employee Search" value={ 1 } />
          <ListItem style={ sidebarMenuStyle } primaryText="Financial Report" value={ 2 } />
          <ListItem style={ sidebarMenuStyle } primaryText="Task Order Actions"  value={ 3 } />
        </SelectableList>
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  sidebar: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  routeToIndex: React.PropTypes.string
};
export default Sidebar;
