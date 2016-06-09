import React, { Component, PropTypes } from 'react';
import { Select } from 'mx-react-components';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const inlineStyles = {
      width: '100%',
      height: '90px',
      backgroundColor: '#11222D',
      marginBottom: '25px',
      color: '#fff',
      paddingTop: '25px',
      paddingBottom: '25px',
      display: 'flex',
      flexDirection: 'row'
    };
    const flex = {
      width: '80%',
      margin: '0 auto'
    };
    const theOptionsStyle = {
      color: '#11222D'
    };
    const selectStyle = {
      width: '190px',
      position: 'relative',
      float: 'left'
    };
    const select2Style = {
      width: '190px',
      position: 'relative',
      float: 'left',
      marginLeft: '20px'
    };
    return (
      <div style={ inlineStyles }>
        <div style={ flex }>
        <div className="toolbar-left">
          <label>Filter by:</label>
          <Select
            dropdownStyle={ selectStyle }
            optionsStyle={ theOptionsStyle }
            options={ [
              {
                value: '1',
                displayValue: 'IT-A'
              },
              {
                value: '2',
                displayValue: 'IT-B'
              },
              {
                value: '3',
                displayValue: 'IT-C'
              },
              {
                value: '4',
                displayValue: 'IT-D'
              },
              {
                value: '5',
                displayValue: 'IT-E'
              },
              {
                value: '6',
                displayValue: 'IT-F'
              }
            ] }
            valid
          />
          </div>
           <div className="toolbar-left">
          <Select
            dropdownStyle={ select2Style }
            optionsStyle={ theOptionsStyle }
            options={ [
              {
                value: '1',
                displayValue: 'IT-A'
              },
              {
                value: '2',
                displayValue: 'IT-B'
              },
              {
                value: '3',
                displayValue: 'IT-C'
              },
              {
                value: '4',
                displayValue: 'IT-D'
              },
              {
                value: '5',
                displayValue: 'IT-E'
              },
              {
                value: '6',
                displayValue: 'IT-F'
              }
            ] }
            valid
          />
        </div>
          <div className="toolbar-mid">
            <label>Sort by:</label>
            <Select
              dropdownStyle={ selectStyle }
              optionsStyle={ theOptionsStyle }
              options={ [
                {
                  value: '1',
                  displayValue: 'IT-A'
                },
                {
                  value: '2',
                  displayValue: 'IT-B'
                },
                {
                  value: '3',
                  displayValue: 'IT-C'
                },
                {
                  value: '4',
                  displayValue: 'IT-D'
                },
                {
                  value: '5',
                  displayValue: 'IT-E'
                },
                {
                  value: '6',
                  displayValue: 'IT-F'
                }
              ] }
              valid
            />
          </div>

        </div>
          </div>
    );
  }
}
export default Toolbar;
