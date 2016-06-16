import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Grid, Row, Col } from 'react-bem-grid';
import SelectField from 'material-ui/SelectField';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleChange = (event, index, value) => this.setState({value});
  render() {
    const inlineStyles = {
      display: 'flex',
      flexDirection: 'row',
      height: '90px',
      backgroundColor: '#11222D',
      color: '#fff',
      alignContent: 'space-between'
    };

    const theOptionsStyle = {
      color: '#11222D'
    };
    const selectStyle = {
      width: '210px',
      backgroundColor: '#fff'
    };
    const select2Style = {
      width: '210px',
      backgroundColor: '#fff',
      marginLeft: '20px'
    };
    const totalStyle = {
      float: 'right'
    }
    return (
      <Row style={ inlineStyles }>
          <Col xs>
            <SelectField value={this.state.value} onChange={this.handleChange} style={ selectStyle }>
              <MenuItem onTouchTap={ this.props.handleFilteringA } value={ 1 } primaryText="IT-A" />
              <MenuItem value={ 2 }><Link to="ita">IT-B</Link></MenuItem>
              <MenuItem value={ 3 } primaryText="IT-C" />
              <MenuItem value={ 4 } primaryText="IT-D" />
              <MenuItem value={ 5 } primaryText="IT-E" />
            </SelectField>
          </Col>
          <Col xs>
            <SelectField value={this.state.value} style={ select2Style }>
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
          </Col>
          <Col xs>
            <div style={totalStyle}>
              Total ITSS Personnel: { this.props.total.length }
            </div>
          </Col>
      </Row>
    );
  }
}
export default Toolbar;
