import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { setFilter } from 'state/people/people';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
function mapStateToProps(state) {
  return {
    filter: state.peopleReducer.filter
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
      value: 1
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
    const inline = {
      padding: 0,
      border: 'none',
      backgroundColor: '#D8D8D8'
    };
    return (
      <div className="sider">
        <ul>
        <Menu width="50px" value={ this.state.value } onItemTouchTap={ ::this.handleChange }>
          <li>
           <span className="sider__square">
            <MenuItem style={ inline } primaryText="IT-A" value="IT-A" />
           </span>
          </li>
         <li>
          <span className="sider__square">
           <MenuItem style={ inline } primaryText="IT-B" value="IT-B" />
          </span>
         </li>
          <li>
           <span className="sider__square">
            <MenuItem style={ inline } primaryText="IT-C" value="IT-C" />
           </span>
          </li>
          <li>
           <span className="sider__square">
            <MenuItem style={ inline } primaryText="IT-D" value="IT-D" />
           </span>
          </li>
          <li>
            <span className="sider__square">
              <MenuItem style={ inline } primaryText="IT-E" value="IT-E" />
            </span>
          </li>
          <li>
           <span className="sider__square">
            <MenuItem style={ inline } primaryText="IT-F" value="IT-F" />
           </span>
          </li>
          <li>
           <span className="sider__square">
            <MenuItem style={ inline } primaryText="IT-G" value="IT-G" />
           </span>
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
