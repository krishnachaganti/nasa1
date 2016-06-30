import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Select from 'shared/atm.Select';
import { setFilter } from 'state/people/people';

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
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
//  { this.props.total.length }
  handleChange = (event, index, value) => {
    this.props.actions.setFilter(value);
    this.setState({ value });
  }

  render() {
    return (
      <div className="toolbar row">
      <div className="toolbar__section">
        <div className="toolbar__col-left col-sm-6">
          <SelectField value={ this.state.value } onChange={ ::this.handleChange }>
            <MenuItem value="IT-A">IT-A</MenuItem>
            <MenuItem value="IT-B">IT-B</MenuItem>
            <MenuItem value="IT-C">IT-C</MenuItem>
            <MenuItem value="IT-D">IT-D</MenuItem>
            <MenuItem value="IT-E">IT-E</MenuItem>
            <MenuItem value="IT-F">IT-F</MenuItem>
            <MenuItem value="IT-G">IT-G</MenuItem>
            <MenuItem value="">Clear</MenuItem>
          </SelectField>
        </div>
         <div className="toolbar__col-right col-sm-offset-3 col-sm-3">
            Total ITSS Personnel: { this.props.people.count }
          </div>
        </div>
      </div>
    );
  }
}
export default Toolbar;
