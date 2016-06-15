import React, { Component, PropTypes } from 'react';
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
      paddingBottom: '25px'
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
      <div className="wrap">
        <div className="row">
        <div className="col-xs">
          <div className="box">

          </div>
          </div>
           <div className="col-xs">
           <div className="box">

           </div>

        </div>
          <div className="col-xs">
           <div className="box">

           </div>
          </div>
          <div className="col-xs">
         <div className="box">
           Total ITSS Personnel: { this.props.total.length }
         </div>
          </div>
        </div>
          </div>
          </div>
    );
  }
}
export default Toolbar;
