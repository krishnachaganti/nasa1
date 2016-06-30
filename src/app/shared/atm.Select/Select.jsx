import React, { PropTypes } from 'react';
import ReactSelect from 'react-select';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  setValue (value) {
    this.setState({ value });
    console.log('Support level selected:', value.label);
  }
  render() {
    const options = [
      { label: 'IT-A', value: 'IT-A' },
      { label: 'IT-B', value: 'IT-B' },
      { label: 'IT-C', value: 'IT-C' },
      { label: 'IT-D', value: 'IT-D' },
      { label: 'IT-E', value: 'IT-E' },
      { label: 'IT-F', value: 'IT-F' },
      { label: 'IT-G', value: 'IT-G' }
    ];
    return (
      <div className="select__wrapper">
        <ReactSelect
          placeholder="Filter by Org Code"
          options={options}
          optionRenderer={this.renderOption}
          onChange={this.setValue}
          value={this.state.value}
          valueRenderer={this.renderValue} />
      </div>
    );
  }
};

export default Select;
