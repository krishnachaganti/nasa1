import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Select from 'shared/atm.Select';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
//  { this.props.total.length }
  handleChange = (event, index, value) => this.setState({value});
  render() {

    return (
      <div className="toolbar row">
      <div className="toolbar__section">
        <div className="toolbar__col-left col-sm-6">
          <SelectField value={this.state.value}onChange={this.handleChange}>
            <MenuItem value={ 1 }><Link to="ita">IT-A</Link></MenuItem>
            <MenuItem value={ 2 }><Link to="itb">IT-B</Link></MenuItem>
            <MenuItem value={ 3 }><Link to="itc">IT-C</Link></MenuItem>
            <MenuItem value={ 4 }><Link to="itd">IT-D</Link></MenuItem>
            <MenuItem value={ 5 }><Link to="ite">IT-E</Link></MenuItem>
          </SelectField>
        </div>
         <div className="toolbar__col-right col-sm-offset-3 col-sm-3">
              Total ITSS Personnel:
          </div>
        </div>
      </div>
    );
  }
}
export default Toolbar;
