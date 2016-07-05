import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { setFilter } from 'state/people/people';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
function mapStateToProps(state, ownProps) {
  return {
    filter: state.peopleReducer.filter,
    filterActive: state.peopleReducer.filterActive
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setFilter }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Sider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      isActive: false
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleChange = (event, index, value) => {
    if (value === 0) {
      this.props.actions.setFilter('IT-A');
    }
    if (value === 1) {
      this.props.actions.setFilter('IT-B');
    }
    if (value === 2) {
      this.props.actions.setFilter('IT-C');
    }
    if (value === 3) {
      this.props.actions.setFilter('IT-D');
    }
    if (value === 4) {
      this.props.actions.setFilter('IT-E');
    }
    if (value === 5) {
      this.props.actions.setFilter('IT-F');
    }
    if (value === 6) {
      this.props.actions.setFilter('IT-G');
    }
  }

  render() {
    const siderNavClass = classNames({
      'sider__nav': true
    });
    return (
      <div className="sider">
        <ul>
        <Menu width="50px" value={ this.state.value } onItemTouchTap={ ::this.handleChange }>
          <li className="sider__square">
            <MenuItem className={ siderNavClass } primaryText="IT-A" value="IT-A" />
          </li>
         <li className="sider__square">
          <MenuItem className={ siderNavClass } primaryText="IT-B" value="IT-B" />
         </li>
          <li className="sider__square">
            <MenuItem className={ siderNavClass } primaryText="IT-C" value="IT-C" />
          </li>
          <li className="sider__square">
            <MenuItem className={ siderNavClass } primaryText="IT-D" value="IT-D" />
          </li>
          <li className="sider__square">
           <MenuItem className={ siderNavClass } primaryText="IT-E" value="IT-E" />
          </li>
          <li className="sider__square">
            <MenuItem className={ siderNavClass } primaryText="IT-F" value="IT-F" />
          </li>
          <li className="sider__square">
            <MenuItem className={ siderNavClass } primaryText="IT-G" value="IT-G" />
          </li>
          </Menu>
        </ul>
      </div>
    );
  }
}

export default Sider;

Sider.propTypes = {

};
